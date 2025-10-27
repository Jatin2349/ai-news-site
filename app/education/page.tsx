'use client'

import data from '../../data/news.json'
import { useMemo } from 'react'

type Item = {
  title: string
  summary: string
  category: string
  date?: string
  url: string
}

export default function EducationPage() {
  const items = useMemo(() => {
    return (data as Item[]).filter(i => i.category?.toLowerCase() === 'education')
  }, [])

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-2">Education</h1>
      <p className="text-gray-600 mb-4">Curated learning bites on LLMs, RAG, agents, safety, and more.</p>

      <div className="grid gap-6 md:grid-cols-2">
        {items.map((a, i) => (
          <a key={i} href={a.url}
             className="block rounded-2xl border p-4 hover:shadow"
             target={a.url.startsWith('http') ? '_blank' : undefined}
             rel={a.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            <div className="text-xs uppercase tracking-wide text-gray-500">{a.category}</div>
            <h2 className="mt-1 font-semibold text-lg">{a.title}</h2>
            <p className="mt-2 text-sm text-gray-700 line-clamp-3">{a.summary}</p>
            {a.date && <div className="mt-3 text-xs text-gray-500">{a.date}</div>}
          </a>
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-6 text-sm text-gray-500">No education items yet.</p>
      )}
    </section>
  )
}
