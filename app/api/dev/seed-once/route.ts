// app/api/dev/seed-once/route.ts
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

// kleiner Helper für stabile IDs
const hash = (s: string) => crypto.createHash('sha256').update(s).digest('hex')

export async function GET() {
  try {
    const link = 'https://example.com/seed-news'
    const urlHash = hash(link)

    // absichtlich locker typisiert, damit TS nicht meckert, Enum als String
    const data = {
      title: 'Hello AI Mastery Lab',
      sourceUrl: link,
      sourceName: 'Seed',
      sourceDomain: 'example.com',
      publishedAt: new Date(),
      summary: 'This is a seeded news item to validate DB read/write.',
      keypoints: ['ok'],
      tags: ['seed'],
      lang: 'en',
      urlHash,
      status: 'PUBLISHED' as const,
    } as any

    const item = await db.newsItem.upsert({
      where: { urlHash },
      update: data,
      create: data,
    })

    return NextResponse.json({ ok: true, id: item.id })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'unknown' }, { status: 500 })
  }
}
