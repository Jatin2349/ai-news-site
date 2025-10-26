import Image from 'next/image'
import news from '../data/news.json'

export const metadata = {
  title: 'AI Mastery Lab — Latest',
  description: 'Curated AI news & education: short briefs, guides, and a concise glossary.'
}

export default function HomePage() {
  // Neueste 6 Einträge (falls du später mehr Daten hast)
  const items = [...news]
    .sort((a: any, b: any) => (a.date < b.date ? 1 : -1))
    .slice(0, 6)

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="mt-2">
        <div className="flex items-center gap-3 md:gap-4">
          <Image
            src="/icon.png"
            alt="AI Mastery Lab logo"
            width={80}
            height={80}
            className="w-10 h-10 md:w-14 md:h-14 rounded-md"
            priority
          />
          <h1 className="text-3xl md:text-4xl font-semibold">AI Mastery Lab</h1>
        </div>
        <p className="text-gray-600 mt-3 max-w-2xl">
          Curated AI news & education. Short daily briefs, practical guides, and a concise A–Z glossary.
        </p>
        <div className="mt-4 text-sm">
          <a href="/news" className="underline underline-offset-4">All news →</a>
        </div>
      </section>

      {/* Neueste 6 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Latest briefings</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((a: any, i: number) => (
            <a
              key={i}
              href={a.url}
              className="block rounded-2xl border p-4 hover:shadow"
              target={a.url.startsWith('http') ? '_blank' : undefined}
            >
              <div className="text-xs uppercase tracking-wide text-gray-500">{a.category}</div>
              <h3 className="mt-1 font-semibold text-lg">{a.title}</h3>
              <p className="mt-2 text-sm text-gray-700 line-clamp-3">{a.summary}</p>
              <div className="mt-3 text-xs text-gray-500">{a.date}</div>
            </a>
          ))}
        </div>

        <div className="mt-4">
          <a href="/news" className="inline-block rounded-md border px-3 py-2 text-sm hover:bg-gray-50">
            Browse all news
          </a>
        </div>
      </section>
    </div>
  )
}
