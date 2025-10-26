'use client'

import { useMemo, useState } from 'react'
import tools from '../../data/tools.json'
import ToolCard from '../../components/ToolCard'

type Tool = {
  name: string
  url: string
  category: string
  pricing: string
  affiliate_code?: string
  rating?: number
  summary?: string
}

const ALL = 'All'
const categories = [ALL, 'Models', 'RAG', 'Vector DB', 'Orchestration', 'Ecosystem']
const pricing = [ALL, 'Free', 'Free+Paid', 'Paid']

export default function ToolsPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<string>(ALL)
  const [price, setPrice] = useState<string>(ALL)

  const filtered: Tool[] = useMemo(() => {
    return (tools as Tool[])
      .filter(t => (cat === ALL ? true : t.category === cat))
      .filter(t => (price === ALL ? true : t.pricing === price))
      .filter(t => {
        if (!q.trim()) return true
        const s = (t.name + ' ' + (t.summary ?? '') + ' ' + t.category).toLowerCase()
        return s.includes(q.trim().toLowerCase())
      })
      .sort((a, b) => (a.name > b.name ? 1 : -1))
  }, [q, cat, price])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Tools</h1>
      <p className="text-gray-600 mb-4">Browse useful AI tools. Use search and filters to narrow down.</p>

      {/* Controls */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-6">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search tools…"
          className="w-full md:w-72 border rounded-md px-3 py-2"
        />
        <div className="flex flex-wrap gap-2">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-full border text-sm ${cat === c ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
              >
                {c}
              </button>
            ))}
          </div>
          {/* Pricing pills */}
          <div className="flex flex-wrap gap-2">
            {pricing.map(p => (
              <button
                key={p}
                onClick={() => setPrice(p)}
                className={`px-3 py-1.5 rounded-full border text-sm ${price === p ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((t, i) => (
          <ToolCard key={i} tool={t} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-sm text-gray-500">No tools match your filters. Try clearing search or filters.</p>
      )}
    </div>
  )
}
