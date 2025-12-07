import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  const links = {
    product: [
      { name: 'News', href: '/news' },
      { name: 'Tools', href: '/tools' },
      { name: 'Guides', href: '/guides' },
      { name: 'Education', href: '/education' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    social: [
      { 
        name: 'X (Twitter)', 
        href: '#', 
        active: false,
        icon: (props: any) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
          </svg>
        ) 
      },
      { 
        name: 'LinkedIn', 
        href: '#', 
        active: false,
        icon: (props: any) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
          </svg>
        ) 
      },
      { 
        name: 'Instagram', 
        href: '#', 
        active: false,
        icon: (props: any) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
          </svg>
        ) 
      },
      { 
        name: 'TikTok', 
        href: '#', 
        active: false,
        icon: (props: any) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 10-1 13.6 6.84 6.84 0 006.91-6.84V9.28a10.03 10.03 0 005.08 1.45v-3.11a6.18 6.18 0 01-1.76-.93z"></path>
          </svg>
        ) 
      },
    ],
  };

  return (
    <footer className="border-t border-white/5 bg-[#050508] text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          
          {/* Logo & Slogan */}
          <div className="space-y-8">
            <Link href="/" className="inline-block">
              <Logo className="h-8 w-8" />
            </Link>
            <p className="text-sm leading-6 text-zinc-400 max-w-sm">
              Your daily source for AI intelligence. We curate, analyze, and summarize the future so you don't have to.
            </p>
            
            {/* Social Icons (Disabled) */}
            <div className="flex space-x-6">
              {links.social.map((item) => (
                <div key={item.name} className="relative group">
                  <a 
                    href={item.active ? item.href : undefined} 
                    className={`transition-all duration-200 block ${
                      item.active 
                        ? 'text-zinc-500 hover:text-white cursor-pointer' 
                        : 'text-zinc-600 cursor-not-allowed opacity-60 hover:opacity-40'
                    }`}
                    title={item.active ? item.name : `${item.name} - Coming Soon`}
                    aria-disabled={!item.active}
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {links.product.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {links.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-16 border-t border-white/5 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-zinc-500">
            &copy; {new Date().getFullYear()} AI Mastery Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}