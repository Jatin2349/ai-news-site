import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import OpenAI from 'openai';
import Parser from 'rss-parser';
import crypto from 'crypto';

// -----------------------------------------------------------------------------
// KONFIGURATION
// -----------------------------------------------------------------------------

const MAX_ARTICLES_PER_RUN = 15; 

const RSS_FEEDS = [
  "https://openai.com/blog/rss.xml",
  "https://www.anthropic.com/rss",
  "https://blog.google/technology/ai/rss/",
  "https://blogs.microsoft.com/ai/feed/",
  "https://aws.amazon.com/blogs/machine-learning/feed/",
  "https://blogs.nvidia.com/blog/category/deep-learning/feed/",
  "https://huggingface.co/blog/feed.xml",
  "https://simonwillison.net/atom/entries/",
  "https://www.kdnuggets.com/feed",
  "https://feeds.feedburner.com/TechCrunch/artificial-intelligence",
  "https://news.mit.edu/rss/topic/artificial-intelligence2",
];

const parser = new Parser();

export const runtime = 'nodejs'; 
export const dynamic = 'force-dynamic';

// -----------------------------------------------------------------------------
// HELFER
// -----------------------------------------------------------------------------

async function generateAIAnalysis(openai: OpenAI, title: string, content: string) {
  const safeContent = content ? content.slice(0, 2000) : "No content available";

  const prompt = `
    Analyze this AI news snippet.
    Title: "${title}"
    Content: "${safeContent}"

    Task:
    1. Summary (max 3 sentences).
    2. Extract 3-5 tags.
    3. Category: "Research", "Product", "Business", "Policy", "General".
    4. Keypoints: Extract 3 distinct key takeaways (array of strings).

    Output pure JSON: 
    {
      "summary": "...", 
      "tags": ["..."], 
      "category": "...",
      "keypoints": ["...", "..."]
    }
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
  console.log('🔄 CRON START (Final Fix)...');
  
  try {
      const authHeader = request.headers.get('authorization');
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
      }

      if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      let processedCount = 0;
      let skippedCount = 0;

      const feedPromises = RSS_FEEDS.map(url => parser.parseURL(url).catch(e => {
        console.warn(`Feed Error (${url}):`, e.message);
        return null;
      }));
      
      const feeds = (await Promise.all(feedPromises)).filter(f => f !== null);
      
      // @ts-ignore
      const allItems = feeds.flatMap(feed => feed?.items.map(item => ({...item, sourceName: feed?.title})) || [])
        // @ts-ignore
        .sort((a, b) => new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime());

      console.log(`📡 Found ${allItems.length} total items.`);

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

        const textToAnalyze = item.contentSnippet || item.content || item.summary || "";
        
        if (textToAnalyze.length < 20) continue;

        const aiResult = await generateAIAnalysis(openai, item.title, textToAnalyze);
        
        if (aiResult?.summary) {
            await db.newsItem.create({
              // @ts-ignore
              data: {
                title: item.title,
                urlHash: urlHash,
                sourceUrl: item.link,
                // @ts-ignore
                sourceName: item.sourceName || "Unknown",
                sourceDomain: new URL(item.link).hostname.replace('www.', ''),
                publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
                
                // ✅ CONTENT ENTFERNT (Feld existiert nicht in DB)
                
                summary: aiResult.summary,
                tags: aiResult.tags || [], 
                category: aiResult.category || "General",
                
                // ✅ KEYPOINTS HINZUGEFÜGT (Feld existiert in DB)
                keypoints: aiResult.keypoints || [], 
              }
            });
            processedCount++;
        }
      }

      return NextResponse.json({ 
          success: true, 
          processed: processedCount, 
          skipped: skippedCount
      });

  } catch (error: any) {
    console.error('CRITICAL ERROR:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}