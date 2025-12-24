import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get('limit') || 30), 100);

  const rows = await db.news.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: limit
  });

  const items = rows.map(r => ({
    ...r,
    keypoints: (r.keypoints as string[]) ?? [],
    tags: (r.tags as string[]) ?? [],
    keywords: (r.keywords as string[]) ?? []
  }));

  return NextResponse.json({ items });
}
