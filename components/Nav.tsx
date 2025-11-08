'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const LINKS = [
  { href: '/news', label: 'News' },
  { href: '/guides', label: 'Guides' },
  { href: '/education', label: 'Education' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/tools', label: 'Tools' },
  { href: '/newsletter', label: 'Newsletter' },
];

// 🔧 Robust: vermeidet false positives (z. B. /news vs /newsletter)
function isActive(pathname: string, href: string) {
  if (pathname === href) return true;
  return pathname.startsWith(href + '/');
}

function navClass(active: boolean) {
  return [
    'px-2 py-1 rounded-md text-sm transition-colors',
    active
      ? 'bg-white/10 text-white'
      : 'text-zinc-300 hover:bg-white/10 hover:text-white',
  ].join(' ');
}

export default function Nav() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/40 text-zinc-100">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo + Title */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
          onClick={() => setOpen(false)}
        >
          {/* ✅ Schritt B: Logo + kein Umbruch */}
          <Image
          src="/logo-aml.png"     // <— neu: dein PNG
          alt="AI Mastery Lab"
          width={28}
          height={28}
          priority
          className="shrink-0 rounded-[6px]"   // optional: leichte Abrundung
          />

          <span className="tracking-tight whitespace-nowrap">AI Mastery Lab</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="ml-auto inline-flex items-center rounded-md p-2 text-zinc-300 hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-2 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={navClass(isActive(pathname, l.href))}>
              {l.label}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="/newsletter"
            className="ml-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-black hover:bg-zinc-200"
          >
            Subscribe
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-white/10 bg-black/60 backdrop-blur md:hidden">
          <div className="mx-auto grid max-w-7xl gap-1 px-4 py-3 md:px-6">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={navClass(isActive(pathname, l.href))}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/newsletter"
              className="mt-2 rounded-md bg-white px-3 py-2 text-center text-sm font-medium text-black hover:bg-zinc-200"
              onClick={() => setOpen(false)}
            >
              Subscribe
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
