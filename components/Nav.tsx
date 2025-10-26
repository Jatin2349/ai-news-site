'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const LINKS = [
  { href: '/news', label: 'News' },
  { href: '/guides', label: 'Guides' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/tools', label: 'Tools' },
  { href: '/newsletter', label: 'Newsletter' },
]

// Styles für aktive vs. normale Links
function navClass(active: boolean) {
  return [
    'px-2 py-1 rounded-md text-sm transition-colors',
    active ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100',
  ].join(' ')
}

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
          <Image
            src="/icon.png"
            alt="AI Mastery Lab"
            width={28}
            height={28}
            className="rounded-md"
            priority
          />
          <span>AI Mastery Lab</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="ml-auto inline-flex items-center rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden gap-2 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={navClass(pathname.startsWith(l.href))}>
              {l.label}
            </Link>
          ))}

          {/* Kleiner CTA */}
          <Link
            href="/newsletter"
            className="ml-2 rounded-md bg-black px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
          >
            Subscribe
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={navClass(pathname.startsWith(l.href))}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/newsletter"
              className="mt-2 rounded-md bg-black px-3 py-2 text-center text-sm font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Subscribe
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
