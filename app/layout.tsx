import './globals.css'
import Nav from '../components/Nav'

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
