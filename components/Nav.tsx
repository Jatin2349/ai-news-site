import Image from 'next/image'

export default function Nav() {
  return (
    <header className="border-b sticky top-0 bg-white/80 backdrop-blur z-50">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-semibold">
          {/* Sichtbares Logo links */}
          <Image src="/icon.png" alt="AI Mastery Lab" width={28} height={28} className="rounded" />
          <span>AI Mastery Lab</span>
        </a>
        <div className="flex items-center gap-4 text-sm">
          <a href="/news">News</a>
          <a href="/guides">Guides</a>
          <a href="/glossary">Glossary</a>
          <a href="/newsletter">Newsletter</a>
          <a href="/tools">Tools</a>
        </div>
      </nav>
    </header>
  )
}
