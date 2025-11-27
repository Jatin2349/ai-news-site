import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import OpenAI from 'openai';
import Parser from 'rss-parser';
import crypto from 'crypto';

// -----------------------------------------------------------------------------
// KONFIGURATION
// -----------------------------------------------------------------------------

// Wir erhöhen das Limit leicht, da wir jetzt mehr Quellen haben.
// Bei 10 Quellen x 1 neuer Artikel sind das 10 Artikel.
// Vercel schafft das meistens in 10-15 Sekunden.
const MAX_ARTICLES_PER_RUN = 15; 

// ERWEITERTE QUELLEN-LISTE
const RSS_FEEDS = [
  // --- BIG TECH & LABS ---
  "https://openai.com/blog/rss.xml",
  "https://www.anthropic.com/rss",
  "https://blog.google/technology/ai/rss/", // Google DeepMind / AI Updates
  "https://blogs.microsoft.com/ai/feed/",
  "https://aws.amazon.com/blogs/machine-learning/feed/",
  "https://blogs.nvidia.com/blog/category/deep-learning/feed/",
  
  // --- TECH & COMMUNITY ---
  "https://huggingface.co/blog/feed.xml",
  "https://simonwillison.net/atom/entries/", // Exzellente Analysen
  "https://www.kdnuggets.com/feed",          // Data Science & AI

  // --- NEWS & RESEARCH ---
  "https://feeds.feedburner.com/TechCrunch/artificial-intelligence",
  "https://news.mit.edu/rss/topic/artificial-intelligence2", // MIT Forschung
];

const parser = new Parser();

export const runtime = 'nodejs'; 
export const dynamic = 'force-dynamic';

// -----------------------------------------------------------------------------
// HELFER
// -----------------------------------------------------------------------------

async function generateAIAnalysis(openai: OpenAI, title: string, content: string) {
  // Sicherheit: Inhalt kürzen
  const safeContent = content ? content.slice(0, 2000) : "No content available";

  const prompt = `
    Analyze this AI news snippet.
    Title: "${title}"
    Content: "${safeContent}"

    Task:
    1. Summary (max 3 sentences).
    2. Extract 3-5 tags.
    3. Category: "Research", "Product", "Business", "Policy", "General".

    Output JSON: {"summary": "...", "tags": [], "category": "..."}
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "AI News Bot." }, { role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });
    return JSON.parse(completion.choices[0].message.content || "{}");
  } catch (e) {
    console.error("OpenAI Error:", e);
    return null;
  }
}

// -----------------------------------------------------------------------------
// MAIN CRON
// -----------------------------------------------------------------------------

export async function GET(request: Request) {
  console.log('🔄 CRON START (Extended Sources)...');
  
  try {
      // 1. Auth Check
      const authHeader = request.headers.get('authorization');
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
      }

      // 2. OpenAI Check
      if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      let processedCount = 0;
      let skippedCount = 0;

      // 3. Feeds laden (Parallel)
      const feedPromises = RSS_FEEDS.map(url => parser.parseURL(url).catch(e => {
        console.warn(`Feed Error (${url}):`, e.message); // Nur Warnung, kein Abbruch
        return null;
      }));
      
      const feeds = (await Promise.all(feedPromises)).filter(f => f !== null);
      
      // Flatten & Sortieren
      // @ts-ignore
      const allItems = feeds.flatMap(feed => feed?.items.map(item => ({...item, sourceName: feed?.title})) || [])
        // @ts-ignore
        .sort((a, b) => new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime());

      console.log(`📡 Found ${allItems.length} total items.`);

      // 4. Verarbeiten
      for (const item of allItems) {
        if (processedCount >= MAX_ARTICLES_PER_RUN) break;
        if (!item.link || !item.title) continue;

        const urlHash = crypto.createHash('md5').update(item.link).digest('hex');
        
        // Dubletten-Check
        const existing = await db.newsItem.findUnique({ where: { urlHash } });
        if (existing) {
            skippedCount++;
            continue;
        }

        console.log(`🤖 Processing: ${item.title}`);

        const textToAnalyze = item.contentSnippet || item.content || item.summary || "";
        
        if (textToAnalyze.length < 20) continue;

        const aiResult = await generateAIAnalysis(openai, item.title, textToAnalyze);
        
        if (aiResult?.summary) {
            await db.newsItem.create({
              // @ts-ignore
              data: {
                title: item.title,
                urlHash: urlHash,
                
                // HIER IST DER LINK FÜR DEN LESER:
                sourceUrl: item.link, 
                
                // @ts-ignore
                sourceName: item.sourceName || "Unknown",
                sourceDomain: new URL(item.link).hostname.replace('www.', ''),
                publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
                // content: textToAnalyze, // ENTFERNT: Verursacht Fehler, da Feld in DB fehlt
                summary: aiResult.summary,
                tags: aiResult.tags || [], 
                category: aiResult.category || "General",
              }
            });
            processedCount++;
        }
      }

      return NextResponse.json({ 
          success: true, 
          processed: processedCount, 
          skipped: skippedCount,
          sources: RSS_FEEDS.length 
      });

  } catch (error: any) {
    console.error('CRITICAL ERROR:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}