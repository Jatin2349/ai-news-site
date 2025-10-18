import './globals.css'
import Nav from '../components/Nav'

export const metadata = {
  title: 'AI Mastery Lab — News & Guides',
  description:
    'Daily AI news summaries, practical guides from beginner to advanced, and a concise A–Z glossary.',
  icons: {
    icon: [
      { url: '/icon-512.png?v=2', sizes: '512x512', type: 'image/png' },
      { url: '/icon-32.png?v=2', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico?v=2', type: 'image/x-icon' } // optional, falls du ein .ico hast
    ],
    shortcut: '/icon-512.png?v=2',
    apple: '/icon-512.png?v=2',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <Nav />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t mt-12 py-8 text-sm text-gray-600">
          <div className="mx-auto max-w-6xl px-4">
            © {new Date().getFullYear()} AI Mastery Lab
          </div>
        </footer>
      </body>
    </html>
  )
}
