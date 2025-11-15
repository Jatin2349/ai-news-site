// app/api/news/daily/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type BucketKey = 'trends' | 'tools' | 'bigtech' | 'research';

const DAILY_BUCKETS: { key: BucketKey; label: string }[] = [
  { key: 'trends',  label: 'Latest AI Trends' },
  { key: 'tools',   label: 'New AI Tools' },
  { key: 'bigtech', label: 'Big AI Companies' },
  { key: 'research',label: 'Research & Innovation' },
];

const BIG_TECH = ['openai','google','deepmind','anthropic','meta','microsoft','xai','amazon','apple','nvidia'];

type Row = {
  id: string;
  title: string | null;
  sourceName: string | null;
  sourceUrl: string;
  sourceDomain?: string | null;
  publishedAt: Date | string | null;
  category: string | null;
  tags: string[] | null;
  summary: string | null;
  createdAt?: Date | string | null;
};

function toText(a: Row): string {
  const title = a.title ?? '';
  const src   = a.sourceName ?? '';
  const tags  = Array.isArray(a.tags) ? a.tags.join(' ') : '';
  const dom   = a.sourceDomain ?? '';
  return `${title} ${src} ${tags} ${dom}`.toLowerCase();
}

function inferBucket(a: Row): BucketKey {
  const t = toText(a);
  if (BIG_TECH.some(s => t.includes(s))) return 'bigtech';
  if (t.includes('arxiv') || t.includes('paper') || t.includes('research') || t.includes('study')) return 'research';
  if (t.includes('tool') || t.includes('plugin') || t.includes('model release') || t.includes('sdk')) return 'tools';
  return 'trends';
}

function score(a: Row): number {
  const tsRaw = a.publishedAt ?? a.createdAt;
  const ts = tsRaw ? new Date(tsRaw).getTime() : Date.now();
  const ageHours = Math.max(1, (Date.now() - ts) / (1000 * 60 * 60));
  let s = 1000 / ageHours;
  const txt = toText(a);
  if (BIG_TECH.some(b => txt.includes(b))) s += 2;
  if ((a.summary?.length ?? 0) > 200) s += 1;
  return s;
}

export async function GET() {
  const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // 1) Letzte 24h
  let pool = await db.newsItem.findMany({
    where: { publishedAt: { gte: since24h } },
    orderBy: { publishedAt: 'desc' },
    take: 120,
    select: {
      id: true,
      title: true,
      sourceName: true,
      sourceUrl: true,
      sourceDomain: true,
      publishedAt: true,
      category: true,
      tags: true,
      summary: true,
      createdAt: true,
    },
  });

  // 2) Fallback 72h
  if (pool.length < 6) {
    const since72h = new Date(Date.now() - 72 * 60 * 60 * 1000);
    const fallback = await db.newsItem.findMany({
      where: { publishedAt: { gte: since72h } },
      orderBy: { publishedAt: 'desc' },
      take: 120,
      select: {
        id: true,
        title: true,
        sourceName: true,
        sourceUrl: true,
        sourceDomain: true,
        publishedAt: true,
        category: true,
        tags: true,
        summary: true,
        createdAt: true,
      },
    });
    pool = fallback;
  }

  // 3) Buckets + Score  (hier casten wir einmalig, um TS zufrieden zu stellen)
  const enriched = (pool as unknown as Row[]).map((a) => ({
    ...a,
    _bucket: (a.category ? String(a.category).toLowerCase() : inferBucket(a)) as BucketKey,
    _score: score(a),
  }));

  // 4) Top 1 je Bucket
  const chosen: {
    id: string;
    bucket: string;
    title: string | null;
    sourceName: string | null;
    sourceUrl: string;
    publishedAt: Date | string | null;
    summary: string | null;
  }[] = [];

  for (const bucket of DAILY_BUCKETS) {
    const inBucket = enriched
      .filter(r => r._bucket === bucket.key)
      .sort((r1, r2) => r2._score - r1._score);

    if (inBucket[0]) {
      const top = inBucket[0];
      chosen.push({
        id: top.id,
        bucket: bucket.label,
        title: top.title,
        sourceName: top.sourceName,
        sourceUrl: top.sourceUrl,
        publishedAt: top.publishedAt,
        summary: top.summary,
      });
    }
  }

  // 5) Auffüllen bis 4
  if (chosen.length < DAILY_BUCKETS.length) {
    const picked = new Set(chosen.map(x => x.id));
    const trends = enriched
      .filter(r => !picked.has(r.id))
      .sort((r1, r2) => r2._score - r1._score);

    for (const t of trends) {
      if (chosen.length >= DAILY_BUCKETS.length) break;
      chosen.push({
        id: t.id,
        bucket: 'Latest AI Trends',
        title: t.title,
        sourceName: t.sourceName,
        sourceUrl: t.sourceUrl,
        publishedAt: t.publishedAt,
        summary: t.summary,
      });
    }
  }

  return NextResponse.json(chosen);
}
