import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import OpenAI from 'openai';
import Parser from 'rss-parser';
import crypto from 'crypto';

// -----------------------------------------------------------------------------
// KONFIGURATION
// -----------------------------------------------------------------------------

// Ziel: Nur die Top 3 Stories des Tages
const MAX_ARTICLES_PER_RUN = 3; 

const RSS_FEEDS = [
  // Big Tech & Labs
  "https://openai.com/blog/rss.xml",
  "https://www.anthropic.com/rss",
  "https://blog.google/technology/ai/rss/",
  "https://blogs.microsoft.com/ai/feed/",
  "https://aws.amazon.com/blogs/machine-learning/feed/",
  "https://blogs.nvidia.com/blog/category/deep-learning/feed/",
  
  // Tech & Community
  "https://huggingface.co/blog/feed.xml",
  "https://simonwillison.net/atom/entries/",
  "https://www.kdnuggets.com/feed",
  "https://feeds.feedburner.com/TechCrunch/artificial-intelligence",
  "https://news.mit.edu/rss/topic/artificial-intelligence2",
  "https://the-decoder.com/feed/", 
];

const parser = new Parser();

export const runtime = 'nodejs'; 
export const dynamic = 'force-dynamic';

// -----------------------------------------------------------------------------
// HELFER
// -----------------------------------------------------------------------------

// Fisher-Yates Shuffle Algorithmus: Mischt ein Array zufällig
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function mapCategory(aiCategory: string): string {
  const cat = aiCategory.toLowerCase();
  
  if (cat.includes('business') || cat.includes('market')) return 'BUSINESS_MARKET';
  if (cat.includes('research') || cat.includes('paper')) return 'RESEARCH';
  if (cat.includes('policy') || cat.includes('safety') || cat.includes('regulation')) return 'POLICY_SAFETY';
  if (cat.includes('tool') || cat.includes('product') || cat.includes('app')) return 'NEW_TOOLS';
  if (cat.includes('model') || cat.includes('infra') || cat.includes('compute')) return 'MODEL_INFRA_UPDATES';
  
  return 'CURRENT_NEWS';
}

async function generateAIAnalysis(openai: OpenAI, title: string, content: string) {
  const safeContent = content ? content.slice(0, 2000) : "No content available";

  const prompt = `
    Act as a strict Senior AI News Editor. Analyze this news snippet.
    Title: "${title}"
    Content: "${safeContent}"

    Tasks:
    1. Relevance Score: Rate this news from 0-10 based on importance for an AI Engineer. 
       - 10 = Major model release (GPT-5), Huge acquisition, Critical safety flaw.
       - 5 = Standard tutorial, minor update, opinion piece.
       - 0 = Spam, irrelevant, purely marketing.
    2. Summary (max 3 sentences): Journalistic tone. NO filler phrases like "The article discusses". Start with the subject.
    3. Extract 3-5 tags.
    4. Category: Choose ONE from [Business, Research, Policy, Tools, Model Updates, News].
    5. Keypoints: Extract 3 bullet points.

    Output JSON:
    {
      "relevance_score": number,
      "summary": "...",
      "tags": ["..."],
      "category": "...",
      "keypoints": ["...", "..."]
    }
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: "You are a picky AI News Editor." }, { role: "user", content: prompt }],
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
  console.log('🔄 CRON START (Smart Filter Mode)...');
  
  try {
      const authHeader = request.headers.get('authorization');
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
      }

      if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      let processedCount = 0;
      let skippedCount = 0;
      let lowQualityCount = 0;

      // 1. Feeds parallel laden
      const feedPromises = RSS_FEEDS.map(url => parser.parseURL(url).catch(e => null));
      const feeds = (await Promise.all(feedPromises)).filter(f => f !== null);
      
      // 2. Alle Items sammeln
      // @ts-ignore
      let allItems = feeds.flatMap(feed => feed?.items.map(item => ({...item, sourceName: feed?.title})) || []);
      
      // 3. WICHTIG: Erst nach Datum sortieren (damit wir nicht uralte News bewerten), 
      // aber dann mischen wir die Top 50, um Quellen-Vielfalt zu haben.
      // @ts-ignore
      allItems.sort((a, b) => new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime());
      
      // Wir schauen uns nur die neuesten 30 Artikel an, um API-Kosten zu sparen, 
      // aber wir mischen diese 30, damit nicht alle von derselben Quelle kommen.
      const candidates = shuffleArray(allItems.slice(0, 30));

      console.log(`📡 Screening ${candidates.length} candidates for quality...`);

      for (const item of candidates) {
        // Stop wenn wir 3 gute Artikel haben
        if (processedCount >= MAX_ARTICLES_PER_RUN) break;

        if (!item.link || !item.title) continue;

        const urlHash = crypto.createHash('md5').update(item.link).digest('hex');
        
        const existing = await db.newsItem.findUnique({ where: { urlHash } });
        if (existing) {
            skippedCount++;
            continue;
        }

        const textToAnalyze = item.contentSnippet || item.content || item.summary || "";
        if (textToAnalyze.length < 50) continue;

        // KI-Analyse & Bewertung
        const aiResult = await generateAIAnalysis(openai, item.title, textToAnalyze);
        
        // 🚨 DER TÜRSTEHER: Relevanz-Check
        // Nur speichern, wenn Score >= 7 (oder wenn wir verzweifelt sind, können wir das senken)
        if (aiResult?.relevance_score < 7) {
            console.log(`❌ Rejected (Score ${aiResult.relevance_score}/10): ${item.title.slice(0, 40)}...`);
            lowQualityCount++;
            continue;
        }

        console.log(`✅ Accepted (Score ${aiResult.relevance_score}/10): ${item.title.slice(0, 40)}...`);

        const finalCategory = mapCategory(aiResult.category || "");

        await db.newsItem.create({
          data: {
            title: item.title,
            urlHash: urlHash,
            sourceUrl: item.link,
            // @ts-ignore
            sourceName: item.sourceName || "Unknown",
            sourceDomain: new URL(item.link).hostname.replace('www.', ''),
            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
            
            summary: aiResult.summary,
            tags: aiResult.tags || [], 
            category: finalCategory as any,
            keypoints: aiResult.keypoints || [], 
          }
        });
        processedCount++;
      }

      return NextResponse.json({ 
          success: true, 
          message: `Curated ${processedCount} high-quality articles.`,
          stats: {
            saved: processedCount,
            skipped_duplicate: skippedCount,
            rejected_low_quality: lowQualityCount
          }
      });

  } catch (error: any) {
    console.error('CRITICAL ERROR:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}