import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import OpenAI from 'openai';
import Parser from 'rss-parser';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import crypto from 'crypto';

// -----------------------------------------------------------------------------
// KONFIGURATION
// -----------------------------------------------------------------------------

const MAX_ARTICLES_PER_RUN = 5; 

const RSS_FEEDS = [
  "https://openai.com/blog/rss.xml",
  "https://www.anthropic.com/rss",
  "https://blogs.microsoft.com/ai/feed/",
  "https://huggingface.co/blog/feed.xml",
  "https://feeds.feedburner.com/TechCrunch/artificial-intelligence",
  "https://simonwillison.net/atom/entries/",
];

const parser = new Parser();

// WICHTIG: OpenAI nicht hier oben initialisieren, sonst stürzt der Server beim Start ab!
// const openai = ... (Wir machen das jetzt sicher weiter unten)

export const runtime = 'nodejs'; 
export const dynamic = 'force-dynamic';

// -----------------------------------------------------------------------------
// HELFER-FUNKTIONEN
// -----------------------------------------------------------------------------

async function fetchFullContent(url: string) {
  try {
    const response = await fetch(url, { 
      headers: { 'User-Agent': 'AI-News-Bot/1.0' } 
    });
    const html = await response.text();
    const dom = new JSDOM(html, { url });
    // @ts-ignore
    const reader = new Readability(dom.window.document);
    const article = reader.parse();
    return article ? article.textContent : null;
  } catch (error) {
    console.error(`⚠️ Failed to fetch full content for ${url}`, error);
    return null;
  }
}

async function generateAIAnalysis(openai: OpenAI, title: string, content: string) {
  const prompt = `
    Analyze the following AI news article.
    Title: "${title}"
    Content: "${content.slice(0, 8000)}" (truncated)

    Task:
    1. Write a concise, bullet-pointed summary (max 3 sentences).
    2. Extract 3-5 relevant tags (e.g., LLMs, Regulation, Robotics, Tools).
    3. Categorize it into ONE of these: "Research", "Product", "Business", "Policy", "General".

    Output pure JSON format:
    {
      "summary": "...",
      "tags": ["tag1", "tag2"],
      "category": "..."
    }
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "You are an AI News Analyst." }, { role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    return JSON.parse(completion.choices[0].message.content || "{}");
  } catch (e) {
    console.error("Failed to call OpenAI or parse JSON", e);
    return null;
  }
}

// -----------------------------------------------------------------------------
// MAIN CRON JOB
// -----------------------------------------------------------------------------

export async function GET(request: Request) {
  console.log('🔄 CRON START: Daily News Ingestion initiated...');
  const startTime = Date.now();

  try {
      // 1. Sicherheits-Check
      const authHeader = request.headers.get('authorization');
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
      }

      // 2. OpenAI Key Check (Der wichtige Teil!)
      if (!process.env.OPENAI_API_KEY) {
          // Wir werfen einen Fehler, den wir unten fangen können -> Kein 500er Crash mehr
          throw new Error("CRITICAL: OPENAI_API_KEY is missing in environment variables! Did you redeploy?");
      }
      
      // Jetzt erst initialisieren wir OpenAI sicher
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      let processedCount = 0;
      let skippedCount = 0;
      let errorsCount = 0;

      // 3. Feeds holen
      const feedPromises = RSS_FEEDS.map(url => parser.parseURL(url).catch(e => {
          console.error(`Error parsing feed ${url}:`, e);
          return null;
      }));
      
      const feeds = (await Promise.all(feedPromises)).filter(f => f !== null);
      
      // @ts-ignore
      const allItems = feeds.flatMap(feed => feed?.items.map(item => ({...item, sourceName: feed?.title})) || [])
        // @ts-ignore
        .sort((a, b) => new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime());

      console.log(`📡 Found ${allItems.length} total items in RSS feeds.`);

      // 4. Artikel verarbeiten
      for (const item of allItems) {
        if (processedCount >= MAX_ARTICLES_PER_RUN) break;

        if (!item.link || !item.title) continue;

        const urlHash = crypto.createHash('md5').update(item.link).digest('hex');
        
        const existing = await db.newsItem.findUnique({ where: { urlHash } });
        if (existing) {
          skippedCount++;
          continue;
        }

        console.log(`🤖 Processing: ${item.title}`);
        
        const fullContent = await fetchFullContent(item.link);
        const textToAnalyze = fullContent || item.contentSnippet || item.content || "";

        if (textToAnalyze.length < 50) continue;

        const aiResult = await generateAIAnalysis(openai, item.title, textToAnalyze);
        if (!aiResult || !aiResult.summary) {
          errorsCount++;
          continue;
        }

        await db.newsItem.create({
          // @ts-ignore
          data: {
            title: item.title,
            urlHash: urlHash,
            sourceUrl: item.link,
            // @ts-ignore
            sourceName: item.sourceName || "Unknown Source",
            sourceDomain: new URL(item.link).hostname.replace('www.', ''),
            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
            summary: aiResult.summary || "No summary available.",
            tags: aiResult.tags || [], 
            category: aiResult.category || "General",
          }
        });

        processedCount++;
      }

      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      
      return NextResponse.json({ 
        success: true, 
        processed: processedCount, 
        skipped: skippedCount, 
        duration: `${duration}s` 
      });

  } catch (error: any) {
    console.error('❌ CRON FATAL ERROR:', error);
    // Das hier ist der wichtigste Teil: Wir sehen jetzt den echten Fehler als JSON
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}