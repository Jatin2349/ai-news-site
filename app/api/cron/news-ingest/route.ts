// app/api/cron/news-ingest/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
// KEINE Top-Level-ESM-Imports von jsdom/readability!
// import { JSDOM } from 'jsdom';
// import { Readability } from '@mozilla/readability';
// rss-parser auch dynamisch laden, um ESM-Konflikte zu vermeiden
// import Parser from 'rss-parser';

import { db } from '@/lib/db';
import { summarizeDynamic } from '@/lib/llm';
import { ruleCategory } from '@/lib/tagging';
import { refineTags } from '@/lib/tagging-llm';
import { urlHash, titleSimilarity, domainOf } from '@/lib/text';
import { SOURCES } from '@/lib/sources';

const UA = 'AI-Mastery-LabBot/1.0 (+https://example.com)';

async function fetchReadable(url: string): Promise<{ text: string; image: string | null }> {
  // 1) Versuch mit jsdom/readability (ESM) – dynamisch laden
  try {
    const { JSDOM } = await import('jsdom');
    const { Readability } = await import('@mozilla/readability');

    const res = await fetch(url, { headers: { 'User-Agent': UA }, cache: 'no-store' });
    if (!res.ok) return { text: '', image: null };

    const html = await res.text();
    const dom = new JSDOM(html, { url });
    const doc = dom.window.document;

    const reader = new Readability(doc);
    const article = reader.parse();
    const text = (article?.textContent || '').trim();

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
        /* ignore */
      }
    }

    const image = ogImage || firstImg || null;
    return { text, image };
  } catch {
    // 2) Fallback ohne jsdom: grobes HTML -> Text
    try {
      const res = await fetch(url, { headers: { 'User-Agent': UA }, cache: 'no-store' });
      if (!res.ok) return { text: '', image: null };
      const html = await res.text();
      const text = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return { text, image: null };
    } catch {
      return { text: '', image: null };
    }
  }
}

export async function GET(req: Request) {
  try {
    // rss-parser dynamisch importieren, um ESM-Probleme zu vermeiden
    const Parser = (await import('rss-parser')).default;
    const parser = new Parser({ timeout: 10000 });

    let created = 0;

    for (const src of SOURCES) {
      try {
        const looksLikeFeed =
          /\.(xml|rss)$/i.test(src.feed) || src.feed.includes('/rss') || src.feed.includes('feeds');

        if (!looksLikeFeed) {
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
                status: 'PUBLISHED',
              },
            });
            created++;
          }
          continue;
        }

        const feed = await parser.parseURL(src.feed);

        for (const item of (feed.items ?? []).slice(0, 8)) {
          const url = (item.link || '').trim();
          const title = (item.title || '').trim();
          if (!url || !title) continue;

          const uhash = urlHash(url);
          if (await db.newsItem.findUnique({ where: { urlHash: uhash } })) continue;

          const publishedAt = item.isoDate ? new Date(item.isoDate) : new Date();

          const { text, image } = await fetchReadable(url);
          const baseText = (text || item.contentSnippet || item.content || title).toString().trim();
          const words = baseText.split(/\s+/).length;

          const dayStart = new Date(publishedAt);
          dayStart.setHours(0, 0, 0, 0);
          const sameDay = await db.newsItem.findMany({
            where: { publishedAt: { gte: dayStart } },
            orderBy: { publishedAt: 'desc' },
            take: 50,
          });
          const dup = sameDay.find((x) => titleSimilarity(x.title, title) >= 0.92);
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
                status: 'PUBLISHED',
              },
            });
            continue;
          }

          const sum = await summarizeDynamic({ title, text: baseText, url });

          const basic = ruleCategory({ title, text: baseText });
          let refined: any = null;
          try {
            refined = await refineTags({ title, text: baseText });
          } catch {}
          const category = (refined?.category || basic.category) as any;
          const tags = Array.from(
            new Set([...(basic.tags || []), ...((refined?.tags as string[]) || [])]),
          );
          const keywords = Array.from(new Set(((refined?.keywords as string[]) || []))).slice(
            0,
            12,
          );

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
              status: 'PUBLISHED',
            },
          });

          created++;
        }
      } catch (err) {
        console.warn('Source failed:', src.name, err);
        continue;
      }
    }

    return NextResponse.json({ ok: true, created });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: String(err?.message || err), stack: err?.stack },
      { status: 500 },
    );
  }
}
