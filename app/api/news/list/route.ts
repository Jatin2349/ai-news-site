import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || undefined;
  const tag = searchParams.get('tag') || undefined;
  const limit = Math.min(Number(searchParams.get('limit') || 40), 100);

  const where: any = { status: 'PUBLISHED' };
  if (category) where.category = category;

  const rows = await db.news.findMany({
    where,
    orderBy: { publishedAt: 'desc' },
    take: limit
  });

  const filtered = tag
    ? rows.filter(r => ((r.tags as string[]) ?? []).includes(tag))
    : rows;

  const items = filtered.map(r => ({
    ...r,
    keypoints: (r.keypoints as string[]) ?? [],
    tags: (r.tags as string[]) ?? [],
  }));

  return NextResponse.json({ items });
}
