'use client'

import React from 'react'
import { Twitter, Linkedin, Instagram, Send } from 'lucide-react'
import { SOCIAL } from '../lib/site' // <- relativ: /components -> /lib

// Einfaches TikTok-Icon (SVG)
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.9 3c.4 1.7 1.7 3.1 3.3 3.6v2.5c-1.3-.1-2.5-.5-3.6-1.2v6.5c0 4-2.7 6.7-6.3 6.7-3.3 0-6.3-2.5-6.3-6 0-3.6 2.7-5.8 6.2-5.8.5 0 1 .1 1.5.2v2.7c-.4-.1-.8-.2-1.3-.2-2 0-3.3 1.4-3.3 3.1 0 1.8 1.4 3.1 3.2 3.1 1.9 0 3.2-1.4 3.2-3.4V3h3.4z" />
    </svg>
  )
}

type Item = { href: string; label: string; Icon: React.ComponentType<any> }

export default function SocialBar() {
  // baue die Liste ggf. mit nulls...
  const raw: (Item | null)[] = [
    SOCIAL.twitter   ? { href: SOCIAL.twitter,   label: 'Twitter/X', Icon: Twitter }     : null,
    SOCIAL.linkedin  ? { href: SOCIAL.linkedin,  label: 'LinkedIn',  Icon: Linkedin }    : null,
    SOCIAL.instagram ? { href: SOCIAL.instagram, label: 'Instagram', Icon: Instagram }   : null,
    SOCIAL.tiktok    ? { href: SOCIAL.tiktok,    label: 'TikTok',    Icon: TikTokIcon }   : null,
    SOCIAL.newsletter? { href: SOCIAL.newsletter,label: 'Newsletter',Icon: Send }        : null,
  ]

  // ...und filtere nulls mit Typ-Prädikat heraus
  const items = raw.filter((i): i is Item => Boolean(i))

  if (!items.length) return null

  return (
    <div className="flex items-center gap-4">
      {items.map((it) => (
        <a
          key={it.href}
          href={it.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={it.label}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <it.Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  )
}
