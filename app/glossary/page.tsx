'use client'

import { useMemo, useRef } from 'react'
import { useState } from 'react'
import glossary from '../../data/glossary.json'
import ReactMarkdown from 'react-markdown'

type Term = { term: string; definition_md: string }

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export default function GlossaryPage() {
  const [q, setQ] = useState('')
  const items = useMemo(() => {
    const base = [...(glossary as Term[])].sort((a, b) =>
      a.term.localeCompare(b.term, 'en', { sensitivity: 'base' })
    )
    if (!q.trim()) return base
    const needle = q.trim().toLowerCase()
    return base.filter(t => (t.term + ' ' + t.definition_md).toLowerCase().includes(needle))
  }, [q])

  // jump anchors
  const anchors = useRef<Record<string, HTMLDivElement | null>>({})

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Glossary</h1>
      <p className="text-gray-600 mb-4">Quick, practical definitions you’ll reference often.</p>

      {/* Search */}
      <div className="mb-4">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search terms…"
          className="w-full md:w-96 border rounded-md px-3 py-2"
        />
      </div>

      {/* A–Z jump bar */}
      <div className="flex flex-wrap gap-2 text-sm mb-6">
        {LETTERS.map(L => (
          <button
            key={L}
            className="px-2 py-1 rounded border hover:bg-gray-50"
            onClick={() => {
              const el = anchors.current[L]
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          >
            {L}
          </button>
        ))}
      </div>

      {/* List */}
      <dl className="divide-y">
        {items.map((t) => {
          const first = t.term[0]?.toUpperCase() ?? '#'
          return (
            <div
              key={t.term}
              ref={(el) => {
                if (!anchors.current[first]) anchors.current[first] = el
              }}
              className="py-3"
            >
              <dt className="font-semibold">{t.term}</dt>
              <dd className="prose max-w-none">
                <ReactMarkdown>{t.definition_md}</ReactMarkdown>
              </dd>
            </div>
          )
        })}
      </dl>

      {items.length === 0 && (
        <p className="mt-6 text-sm text-gray-500">No matches. Try a different keyword.</p>
      )}
    </div>
  )
}
