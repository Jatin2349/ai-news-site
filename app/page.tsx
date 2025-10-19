import Image from 'next/image'
import data from '../data/news.json'

export default function HomePage() {
  const items = data.slice(0, 8) // die neuesten 8 Karten

  return (
    <div>
      {/* HERO */}
      <section className="mb-8">
        <div className="flex items-center gap-3 md:gap-4">
          <Image
            src="/icon.png"
            alt="AI Mastery Lab"
            width={80}
            height={80}
            className="w-10 h-10 md:w-14 md:h-14 rounded-md"
            priority
          />
          <h1 className="text-3xl md:text-4xl font-semibold">AI Mastery Lab</h1>
        </div>
        <p className="text-gray-600 mt-2">
          Curated AI news & education. Quick summaries to stay current — deep dives via guides & glossary.
        </p>

        {/* CTA-Buttons */}
        <div className="mt-4 flex gap-3">
          <a href="/news" className="inline-flex items-center rounded-md border px-4 py-2 font-medium hover:bg-gray-50">
            View News
          </a>
          <a href="/guides" className="inline-flex items-center rounded-md border px-4 py-2 font-medium hover:bg-gray-50">
            Read Guides
          </a>
          <a href="/glossary" className="inline-flex items-center rounded-md border px-4 py-2 font-medium hover:bg-gray-50">
            Glossary A–Z
          </a>
        </div>
      </section>

      {/* GRID der Einträge */}
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((a, i) => (
          <a
            key={i}
            href={a.url}
            className="block rounded-2xl border p-4 hover:shadow transition"
            target={a.url.startsWith('http') ? '_blank' : undefined}
          >
            <div className="text-xs uppercase tracking-wide text-gray-500">{a.category}</div>
            <h2 className="mt-1 font-semibold text-lg">{a.title}</h2>
            <p className="mt-2 text-sm text-gray-700">{a.summary}</p>
            <div className="mt-3 text-xs text-gray-500">{a.date}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
