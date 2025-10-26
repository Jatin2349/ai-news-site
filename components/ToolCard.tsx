'use client'

import { Star } from 'lucide-react'
import React from 'react'

type Tool = {
  name: string
  url: string
  category: string
  pricing: string
  affiliate_code?: string
  rating?: number
  summary?: string
}

export default function ToolCard({ tool }: { tool: Tool }) {
  const link = tool.affiliate_code ? `${tool.url}?ref=${encodeURIComponent(tool.affiliate_code)}` : tool.url
  const stars = Math.max(0, Math.min(5, tool.rating ?? 0))

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-2xl border p-4 hover:shadow transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-lg">{tool.name}</h3>
          <div className="mt-1 text-xs uppercase tracking-wide text-gray-500">
            {tool.category} • {tool.pricing}
          </div>
        </div>
        <div className="flex items-center gap-0.5 text-amber-500" aria-label={`${stars} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < stars ? 'fill-current' : 'opacity-30'}`} />
          ))}
        </div>
      </div>
      {tool.summary && <p className="mt-3 text-sm text-gray-700">{tool.summary}</p>}
    </a>
  )
}
