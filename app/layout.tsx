import './globals.css'
import Nav from '../components/Nav'

export const metadata = {
  title: 'AI Mastery Lab — News & Guides',
  description:
    'Daily AI news summaries, practical guides from beginner to advanced, and a concise A–Z glossary.',
  icons: {
    icon: '/icon.png',      // Favicon
    shortcut: '/icon.png',
    apple: '/icon.png',     // Apple Touch Icon
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
