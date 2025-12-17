'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Logo } from './Logo';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'News', href: '/news' },
    { name: 'Tools', href: '/tools' },
    { name: 'Guides', href: '/guides' },
    { name: 'Education', href: '/education' },
    { name: 'Glossary', href: '/glossary' },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#0A0B0F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        
        {/* Logo - HIER WAR DER FEHLER */}
        <div className="flex items-center">
          <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2">
            {/* Das Logo enthält bereits Icon UND Text */}
            <Logo className="h-8 w-8" />
          </Link>
          {/* Ich habe den doppelten <span> Text hier entfernt */}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-8">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  isActive ? 'text-white' : 'text-zinc-400'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Action Button (Desktop) */}
        <div className="hidden md:block">
          <Link
            href="/newsletter"
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-zinc-200"
          >
            Subscribe
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-zinc-400 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-white/5 bg-[#0A0B0F]">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    isActive ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="mt-4 border-t border-white/5 pt-4">
               <Link
                href="/newsletter"
                onClick={() => setIsOpen(false)}
                className="block w-full rounded-md bg-white px-3 py-2 text-center text-base font-bold text-black hover:bg-zinc-200"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}