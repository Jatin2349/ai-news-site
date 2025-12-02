import Link from 'next/link';
import { Logo } from './Logo';

export function Navbar() {
  const navLinks = [
    { name: 'News', href: '/news' },
    { name: 'Guides', href: '/guides' },
    { name: 'Education', href: '/education' },
    { name: 'Tools', href: '/tools' },
    { name: 'Glossary', href: '/glossary' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0A0B0F]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0A0B0F]/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        
        {/* 1. Logo Links */}
        <Link href="/" className="group flex items-center gap-2 transition-opacity hover:opacity-90">
          <Logo className="h-6 w-6 md:h-7 md:w-7" />
        </Link>

        {/* 2. Navigation Mitte (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/5 bg-white/5 px-2 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-400 transition-all hover:bg-white/10 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 3. Action Rechts */}
        <div className="flex items-center gap-4">
          <Link 
            href="/newsletter"
            className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20"
          >
            Subscribe
          </Link>
          
          {/* Mobile Menu Button (Placeholder für später) */}
          <button className="md:hidden p-2 text-zinc-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>

      </div>
    </header>
  );
}