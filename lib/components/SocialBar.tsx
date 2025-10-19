'use client'

import { SOCIAL } from '../lib/site'
import { Twitter, Linkedin, Instagram, Send } from 'lucide-react'
import React from 'react'

// neutrales TikTok-Icon (SVG) als Platzhalter
function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 3v9.2a3.8 3.8 0 1 1-2-3.3V5.2c0-.66.54-1.2 1.2-1.2H14zM16 3.6c1.2 1.4 2.6 2.2 4.2 2.4v2.2c-1.9-.2-3.4-1-4.6-2.2V3.6z" />
    </svg>
  )
}

type Item = { href: string; label: string; Icon: React.ComponentType<any> }

export default function SocialBar() {
  const items: (Item | null)[] = [
    SOCIAL.x        ? { href: SOCIAL.x,        label: 'X (Twitter)', Icon: Twitter }   : null,
    SOCIAL.linkedin ? { href: SOCIAL.linkedin, label: 'LinkedIn',    Icon: Linkedin }  : null,
    SOCIAL.instagram? { href: SOCIAL.instagram,label: 'Instagram',   Icon: Instagram } : null,
    SOCIAL.threads  ? { href: SOCIAL.threads,  label: 'Threads',     Icon: Instagram } : null,
    SOCIAL.tiktok   ? { href: SOCIAL.tiktok,   label: 'TikTok',      Icon: TikTokIcon } : null,
    SOCIAL.email    ? { href: `mailto:${SOCIAL.email}`, label: 'Email', Icon: Send }    : null,
  ]

  const visible = items.filter(Boolean) as Item[]
  if (visible.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel="noreferrer"
          aria-label={label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  )
}
