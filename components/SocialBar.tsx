'use client'

import React from 'react'
import { Linkedin, Instagram, Send } from 'lucide-react'
import { SOCIAL } from '../lib/site'

// Neues X-Logo (schlichtes, neutrales SVG)
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3.3 3h3.6l6 7.3L18.7 3h2.9l-7.4 9 7.6 9H18l-6.3-7.7L5 21H2.1l7.8-9L3.3 3z" />
    </svg>
  )
}

// (dein TikTokIcon kann bleiben, falls du es nutzt)
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.9 3c.4 1.7 1.7 3.1 3.3 3.6v2.5c-1.3-.1-2.5-.5-3.6-1.2v6.5c0 4-2.7 6.7-6.3 6.7-3.3 0-6.3-2.5-6.3-6 0-3.6 2.7-5.8 6.2-5.8.5 0 1 .1 1.5.2v2.7c-.4-.1-.8-.2-1.3-.2-2 0-3.3 1.4-3.3 3.1 0 1.8 1.4 3.1 3.2 3.1 1.9 0 3.2-1.4 3.2-3.4V3h3.4z" />
    </svg>
  )
}

type Item = { href?: string; label: string; Icon: React.ComponentType<any> }

export default function SocialBar() {
  const xLink = SOCIAL.twitter || SOCIAL.x
  const newsletter = SOCIAL.newsletter || SOCIAL.email

  const items: Item[] = [
    { href: xLink,            label: 'X',         Icon: XIcon },
    { href: SOCIAL.linkedin,  label: 'LinkedIn',  Icon: Linkedin },
    { href: SOCIAL.instagram, label: 'Instagram', Icon: Instagram },
    { href: SOCIAL.threads,   label: 'Threads',   Icon: Instagram },
    { href: SOCIAL.tiktok,    label: 'TikTok',    Icon: TikTokIcon },
    { href: newsletter,       label: 'Newsletter / Email', Icon: Send },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map(({ href, label, Icon }) => {
        const available = Boolean(href && href.trim().length > 0)
        const base =
          'inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-black/10'
        return available ? (
          <a
            key={label}
            href={href}
            target={href!.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            aria-label={label}
            title={label}
            className={`${base} text-gray-700 hover:bg-gray-50`}
          >
            <Icon className="h-4 w-4" />
          </a>
        ) : (
          <span
            key={label}
            aria-label={`${label} (coming soon)`}
            title={`${label} (coming soon)`}
            className={`${base} text-gray-400 bg-gray-50/40 cursor-not-allowed`}
          >
            <Icon className="h-4 w-4 opacity-60" />
          </span>
        )
      })}
    </div>
  )
}
