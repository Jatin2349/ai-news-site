import type { Metadata } from 'next'
import './globals.css'
import Nav from '../components/Nav'

export const metadata: Metadata = {
  title: {
    default: 'AI Mastery Lab — News & Guides',
    template: '%s | AI Mastery Lab',
  },
  description:
    'Daily AI news summaries, practical guides from beginner to advanced, and a concise A–Z glossary.',
  icons: {
    icon: [{ url: '/icon-512.png', sizes: '512x512', type: 'image/png' }],
    shortcut: '/icon-512.png',
    apple: '/icon-512.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <Nav />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t mt-12 py-8 text-sm text-gray-600">
          <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between gap-3">
            <div>© {new Date().getFullYear()} AI Mastery Lab</div>
            <nav className="flex gap-4">
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/privacy">Privacy</a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  )
}
