import './globals.css'
import Nav from '../components/Nav'

export const metadata = {
  title: 'AI Mastery Lab',
  description: 'AI News, Education, Automations, Beginner–advanced guides and an A–Z glossary.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <Nav />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="border-t mt-12 py-8 text-sm text-gray-600">
          <div className="mx-auto max-w-6xl px-4">© {new Date().getFullYear()} AI Briefings</div>
        </footer>
      </body>
    </html>
  )
}
