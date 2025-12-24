// app/api/dev/seed-once/route.ts
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'

const hash = (s: string) => crypto.createHash('sha256').update(s).digest('hex')

// HINWEIS: Wenn dein enum anders heißt/andere Werte hat,
// passe 'TRENDS' unten an (z. B. 'TOOLS' | 'BIGTECH' | 'RESEARCH').
const CATEGORY_VALUE = 'TRENDS' as const

export async function GET() {
  try {
    const ts = Date.now()
    const link = `https://example.com/seed-news-${ts}` // unique wegen @unique auf sourceUrl
    const urlHash = hash(link)

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
      category: CATEGORY_VALUE as any // Pflichtfeld erfüllen
    } as any

    const item = await db.news.upsert({
      where: { urlHash },
      update: data,
      create: data,
    })

    return NextResponse.json({ ok: true, id: item.id })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? 'unknown' }, { status: 500 })
  }
}
