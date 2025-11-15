// app/api/cron/news-ingest/route.ts
export const runtime = 'nodejs';            // <- wichtig für jsdom/readability
export const dynamic = 'force-dynamic';     // keine Caches bei Cron

import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

import { db } from '@/lib/db';
import { summarizeDynamic } from '@/lib/llm';
import { ruleCategory } from '@/lib/tagging';
import { refineTags } from '@/lib/tagging-llm';
import { urlHash, titleSimilarity, domainOf } from '@/lib/text';
import { SOURCES } from '@/lib/sources';

const UA = 'AI-Mastery-LabBot/1.0 (+https://example.com)';

async function fetchReadable(url: string): Promise<{ text: string; image: string | null }> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) return { text: '', image: null };

    const html = await res.text();
    const dom = new JSDOM(html, { url });
    const doc = dom.window.document;

    // Readability-Artikel extrahieren
    const reader = new Readability(doc);
    const article = reader.parse(); // type: ReadabilityParseResult | null

    // Fallback-Text, falls Readability nichts liefert
    const text = (article?.textContent || '').trim();

    // Bild: erst OG/Twitter, dann erstes <img> aus dem Artikelinhalt
    const ogImage =
      doc.querySelector('meta[property="og:image"]')?.getAttribute('content') ||
      doc.querySelector('meta[name="twitter:image"]')?.getAttribute('content') ||
      null;

    let firstImg: string | null = null;
    if (article?.content) {
      try {
        const articleDom = new JSDOM(article.content);
        const imgEl = articleDom.window.document.querySelector('img');
        firstImg = imgEl?.getAttribute('src') || null;
      } catch {
        // ignore
      }
    }

    const image = ogImage || firstImg || null;

    return { text, image };
  } catch {
    return { text: '', image: null };
  }
}


export async function GET() {
  const parser = new Parser({ timeout: 10000 });
  let created = 0;

  for (const src of SOURCES) {
    try {
      // rudimentär erkennen, ob wirklich ein Feed vorliegt
      const looksLikeFeed = /\.(xml|rss)$/i.test(src.feed) || src.feed.includes('/rss') || src.feed.includes('feeds');

      if (!looksLikeFeed) {
        // Nur als „Quelle“ verlinken, keine Items parsen
        const uhash = urlHash(src.feed);
        const exists = await db.newsItem.findUnique({ where: { urlHash: uhash } });
        if (!exists) {
          await db.newsItem.create({
            data: {
              title: src.name,
              sourceUrl: src.feed,
              sourceName: src.name,
              sourceDomain: domainOf(src.feed),
              publishedAt: new Date(),
              summary: 'Visit source for latest updates.',
              keypoints: [],
              category: 'CURRENT_NEWS',
              tags: ['source'],
              keywords: [],
              imageUrl: null,
              lang: 'en',
              words: 0,
              urlHash: uhash,
              status: 'PUBLISHED'
            }
          });
          created++;
        }
        continue;
      }

      // Feed parsen
      const feed = await parser.parseURL(src.feed);

      for (const item of (feed.items ?? []).slice(0, 8)) {
        const url = (item.link || '').trim();
        const title = (item.title || '').trim();
        if (!url || !title) continue;

        const uhash = urlHash(url);
        if (await db.newsItem.findUnique({ where: { urlHash: uhash } })) continue;

        const publishedAt = item.isoDate ? new Date(item.isoDate) : new Date();

        // Artikeltext holen
        const { text, image } = await fetchReadable(url);
        const baseText = (text || item.contentSnippet || item.content || title).toString().trim();
        const words = baseText.split(/\s+/).length;

        // Duplicate-Check (ähnliche Titel am gleichen Tag)
        const dayStart = new Date(publishedAt); dayStart.setHours(0, 0, 0, 0);
        const sameDay = await db.newsItem.findMany({
          where: { publishedAt: { gte: dayStart } },
          orderBy: { publishedAt: 'desc' },
          take: 50
        });
        const dup = sameDay.find(x => titleSimilarity(x.title, title) >= 0.92);
        if (dup) {
          await db.newsItem.create({
            data: {
              title,
              sourceUrl: url,
              sourceName: src.name,
              sourceDomain: domainOf(url),
              publishedAt,
              summary: 'Duplicate of another item.',
              keypoints: [],
              category: 'CURRENT_NEWS',
              tags: ['duplicate'],
              keywords: [],
              imageUrl: image,
              lang: 'en',
              words,
              urlHash: uhash,
              isDuplicateOf: dup.id,
              status: 'PUBLISHED'
            }
          });
          continue;
        }

        // Zusammenfassung (LLM)
        const sum = await summarizeDynamic({ title, text: baseText, url });

        // Tagging (Regel + LLM, robust gemerged)
        const basic = ruleCategory({ title, text: baseText });
        let refined: any = null;
        try { refined = await refineTags({ title, text: baseText }); } catch {}
        const category = (refined?.category || basic.category) as any;
        const tags = Array.from(new Set([...(basic.tags || []), ...((refined?.tags as string[]) || [])]));
        const keywords = Array.from(new Set(((refined?.keywords as string[]) || []))).slice(0, 12);

        // Speichern
        await db.newsItem.create({
          data: {
            title,
            sourceUrl: url,
            sourceName: src.name,
            sourceDomain: domainOf(url),
            publishedAt,
            summary: sum.summary,
            keypoints: sum.keypoints || [],
            category,
            tags,
            keywords,
            imageUrl: image,
            lang: 'en',
            words,
            urlHash: uhash,
            status: 'PUBLISHED'
          }
        });

        created++;
      }
    } catch (err) {
      console.warn('Source failed:', src.name, err);
      continue;
    }
  }

  return NextResponse.json({ ok: true, created });
}
