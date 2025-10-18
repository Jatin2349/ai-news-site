import Image from 'next/image'
import data from '../data/news.json'

export default function HomePage() {
  const items = data.slice(0, 8)
  return (
    <div>
      {/* Hero mit großem Titel + Logo */}
      <section className="mb-8">
        <div className="flex items-center gap-3 md:gap-4">
          <Image
            src="/icon.png"
            alt="AI Mastery Lab logo"
            width={80}            // intrinsic size
            height={80}
            className="w-10 h-10 md:w-14 md:h-14 rounded-md"
            priority
          />
          <h1 className="text-3xl md:text-4xl font-semibold">AI Mastery Lab</h1>
        </div>
        <p className="text-gray-600 mt-2">
          Curated AI news & education. Quick summaries to stay current — deep dives via guides & glossary.
        </p>
      </section>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((a, i) => (
          <a
            key={i}
            href={a.url}
            className="block rounded-2xl border p-4 hover:shadow"
            target={a.url.startsWith('http') ? '_blank' : undefined}
          >
            <div className="text-xs uppercase tracking-wide text-gray-500">{a.category}</div>
            <h2 className="mt-1 font-semibold text-lg">{a.title}</h2>
            <p className="mt-2 text-sm text-gray-700 line-clamp-3">{a.summary}</p>
            <div className="mt-3 text-xs text-gray-500">{a.date}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
