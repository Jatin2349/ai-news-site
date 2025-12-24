import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import OpenAI from 'openai';
import Parser from 'rss-parser';
import crypto from 'crypto';

// -----------------------------------------------------------------------------
// KONFIGURATION
// -----------------------------------------------------------------------------

// Wir definieren unsere 3 Töpfe explizit
const FEED_CATEGORIES = {
  "Big Tech & Labs": [
    "https://openai.com/blog/rss.xml",
    "https://www.anthropic.com/rss",
    "https://blog.google/technology/ai/rss/",
    "https://blogs.microsoft.com/ai/feed/",
    "https://aws.amazon.com/blogs/machine-learning/feed/",
    "https://blogs.nvidia.com/blog/category/deep-learning/feed/",
  ],
  "Tech & Community": [
    "https://huggingface.co/blog/feed.xml",
    "https://simonwillison.net/atom/entries/",
    "https://www.kdnuggets.com/feed",
  ],
  "News & Research": [
    "https://feeds.feedburner.com/TechCrunch/artificial-intelligence",
    "https://news.mit.edu/rss/topic/artificial-intelligence2",
    "https://the-decoder.com/feed/", 
  ]
};

const parser = new Parser();

export const runtime = 'nodejs'; 
export const dynamic = 'force-dynamic';

// -----------------------------------------------------------------------------
// HELFER
// -----------------------------------------------------------------------------

// Wir mappen die interne Logik-Kategorie auf deine Datenbank-Enums
function mapCategoryToEnum(groupName: string): string {
  if (groupName === "Big Tech & Labs") return 'MODEL_INFRA_UPDATES';
  if (groupName === "Tech & Community") return 'NEW_TOOLS';
  if (groupName === "News & Research") return 'BUSINESS_MARKET'; // oder RESEARCH
  return 'CURRENT_NEWS';
}

async function generateAIAnalysis(openai: OpenAI, title: string, content: string) {
  const safeContent = content ? content.slice(0, 2000) : "No content available";

  const prompt = `
    Act as a strict Senior AI News Editor. Analyze this news snippet.
    Title: "${title}"
    Content: "${safeContent}"

    Tasks:
    1. Relevance Score: Rate 0-10. (Target: >7). 
       - Prioritize major releases, breakthroughs, and highly useful tools.
       - Penalize marketing fluff.
    2. Summary (max 3 sentences): Journalistic tone. Start with the subject.
    3. Extract 3-5 tags.
    4. Keypoints: Extract 3 bullet points.

    Output JSON:
    {
      "relevance_score": number,
      "summary": "...",
      "tags": ["..."],
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
  console.log('🔄 CRON START (Category Champion Mode)...');
  
  try {
      const authHeader = request.headers.get('authorization');
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
      }

      if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY");
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const results = {
        processed: 0,
        categories_filled: [] as string[]
      };

      // --- DER HAUPT-LOOP: Gehe durch jede Kategorie ---
      for (const [categoryName, urls] of Object.entries(FEED_CATEGORIES)) {
        console.log(`\n📂 Processing Category: ${categoryName}`);
        
        let winnerFound = false;

        // 1. Feeds für diese Kategorie laden
        const feedPromises = urls.map(url => parser.parseURL(url).catch(e => null));
        const feeds = (await Promise.all(feedPromises)).filter(f => f !== null);
        
        // 2. Alle Artikel sammeln & nach Datum sortieren (Neueste zuerst)
        // @ts-ignore
        let candidates = feeds.flatMap(feed => feed?.items.map(item => ({...item, sourceName: feed?.title})) || [])
          // @ts-ignore
          .sort((a, b) => new Date(b.pubDate || 0).getTime() - new Date(a.pubDate || 0).getTime());

        // Wir schauen uns nur die Top 5 Kandidaten pro Kategorie an, um Kosten zu sparen
        candidates = candidates.slice(0, 5);

        // 3. Den "Champion" finden
        for (const item of candidates) {
            if (winnerFound) break; // Wir haben schon einen für diese Kategorie!

            if (!item.link || !item.title) continue;

            // Duplikat-Check
            const urlHash = crypto.createHash('md5').update(item.link).digest('hex');
            const existing = await db.news.findUnique({ where: { urlHash } });
            if (existing) continue;

            // Analyse
            const textToAnalyze = item.contentSnippet || item.content || item.summary || "";
            if (textToAnalyze.length < 50) continue;

            const aiResult = await generateAIAnalysis(openai, item.title, textToAnalyze);

            // TÜRSTEHER: Ist er gut genug? (Score >= 7)
            if (aiResult?.relevance_score >= 4) {
                console.log(`🏆 WINNER found for [${categoryName}]: ${item.title}`);
                
                // Wir erzwingen die Kategorie passend zum Topf
                const dbCategory = mapCategoryToEnum(categoryName);

                await db.news.create({
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
                        category: dbCategory as any,
                        keypoints: aiResult.keypoints || [], 
                    }
                });

                winnerFound = true;
                results.processed++;
                results.categories_filled.push(categoryName);
            } else {
                console.log(`❌ Rejected (${aiResult?.relevance_score}/10): ${item.title.slice(0,30)}...`);
            }
        }

        if (!winnerFound) {
            console.log(`⚠️ No high-quality article found for ${categoryName} today.`);
        }
      }

      return NextResponse.json({ 
          success: true, 
          summary: `Run complete. Saved ${results.processed} articles.`,
          categories: results.categories_filled
      });

  } catch (error: any) {
    console.error('CRITICAL ERROR:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}