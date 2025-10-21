'use client'
import React from 'react'
import { Twitter, Linkedin, Instagram, Send } from 'lucide-react'
import { SOCIAL } from '../lib/site'   // <- genau so, weil /components relativ zu /lib

type Item = { href: string; label: string; Icon: React.ComponentType<any> }

export default function SocialBar() {
  const items: (Item | null)[] = [
    SOCIAL.x         ? { href: SOCIAL.x,         label: 'X',          Icon: Twitter } : null,
    SOCIAL.linkedin  ? { href: SOCIAL.linkedin,  label: 'LinkedIn',   Icon: Linkedin } : null,
    SOCIAL.instagram ? { href: SOCIAL.instagram, label: 'Instagram',  Icon: Instagram } : null,
    SOCIAL.email     ? { href: `mailto:${SOCIAL.email}`, label: 'Email', Icon: Send }  : null,
  ].filter(Boolean) as Item[]

  if (!items.length) return null

  return (
    <div className="flex items-center gap-4">
      {items.map((it) => (
        <a key={it.href} href={it.href} target="_blank" rel="noopener noreferrer"
           className="text-gray-600 hover:text-gray-900 transition-colors" aria-label={it.label}>
          <it.Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  )
}
