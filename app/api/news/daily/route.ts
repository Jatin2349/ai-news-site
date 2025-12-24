// app/api/news/daily/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'              // <— WICHTIG
import type { News } from '@prisma/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type DailyItem = Pick<News, 'id'|'title'|'sourceName'|'sourceUrl'|'publishedAt'|'category'|'tags'|'summary'>
type BucketKey = 'trends'|'tools'|'bigtech'|'research'
const DAILY_BUCKETS = [
  { key: 'trends', label: 'Latest AI Trends' },
  { key: 'tools', label: 'New AI Tools' },
  { key: 'bigtech', label: 'Big AI Companies' },
  { key: 'research', label: 'Research & Innovation' },
] as const
const BIG_TECH = ['openai','google','deepmind','anthropic','meta','microsoft','xai','amazon','apple','nvidia']

function toText(a: DailyItem){ const t=a.tags as unknown
  const tag = Array.isArray(t)?t.join(' '): typeof t==='string'?t: t&&typeof t==='object'?Object.values(t as any).map(v=>typeof v==='string'?v:'').join(' '):''
  return `${a.title??''} ${a.sourceName??''} ${tag}`.toLowerCase()
}
const inferBucket=(a:DailyItem):BucketKey=>{
  const t=toText(a)
  if (BIG_TECH.some(s=>t.includes(s))) return 'bigtech'
  if (t.includes('arxiv')||t.includes('paper')||t.includes('research')||t.includes('study')) return 'research'
  if (t.includes('tool')||t.includes('plugin')||t.includes('model release')||t.includes('sdk')) return 'tools'
  return 'trends'
}
const score=(a:DailyItem)=>{ const ts=a.publishedAt?+new Date(a.publishedAt):Date.now()
  let s=1000/Math.max(1,(Date.now()-ts)/3.6e6)
  const text=`${a.title??''} ${a.sourceName??''}`.toLowerCase()
  if (BIG_TECH.some(b=>text.includes(b))) s+=2
  if ((a.summary?.length??0)>200) s+=1
  return s
}

export async function GET(){
  try{
    const since24h=new Date(Date.now()-24*3600*1000)
    let pool:DailyItem[]=await db.news.findMany({
      where:{ publishedAt:{ gte: since24h } },
      orderBy:{ publishedAt:'desc' },
      take:100
    })
    if (pool.length<6){
      const since72h=new Date(Date.now()-72*3600*1000)
      pool=await db.news.findMany({ where:{ publishedAt:{ gte: since72h } }, orderBy:{ publishedAt:'desc' }, take:100 })
    }
    if (pool.length<DAILY_BUCKETS.length){
      const since7d=new Date(Date.now()-7*24*3600*1000)
      pool=await db.news.findMany({ where:{ publishedAt:{ gte: since7d } }, orderBy:{ publishedAt:'desc' }, take:200 })
    }

    const enriched = pool.map(a=>({ ...a, _bucket: (a.category?String(a.category).toLowerCase():inferBucket(a)) as BucketKey, _score: score(a)}))
    const chosen:any[]=[]
    for (const b of DAILY_BUCKETS){
      const top=enriched.filter(r=>r._bucket===b.key).sort((a,b)=>b._score-a._score)[0]
      if (top) chosen.push({ id:top.id, bucket:b.label, title:top.title, sourceName:top.sourceName, sourceUrl:top.sourceUrl, publishedAt:top.publishedAt, summary:top.summary })
    }
    if (chosen.length<DAILY_BUCKETS.length){
      const picked=new Set(chosen.map(x=>x.id))
      for (const t of enriched.filter(r=>!picked.has(r.id)).sort((a,b)=>b._score-a._score)){
        if (chosen.length>=DAILY_BUCKETS.length) break
        chosen.push({ id:t.id, bucket:'Latest AI Trends', title:t.title, sourceName:t.sourceName, sourceUrl:t.sourceUrl, publishedAt:t.publishedAt, summary:t.summary })
      }
    }
    return NextResponse.json(chosen)
  }catch(err:any){
    console.error('GET /api/news/daily failed:', err)
    return NextResponse.json({ ok:false, error: err?.message??'Unknown error' }, { status:500 })
  }
}
