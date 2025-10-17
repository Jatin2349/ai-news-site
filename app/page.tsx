import data from '@/data/news.json'

export default function HomePage() {
  const items = data.slice(0, 8)
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Latest AI Briefings</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((a, i) => (
          <a key={i} href={a.url} className="block rounded-2xl border p-4 hover:shadow" target={a.url.startsWith('http') ? '_blank' : undefined}>
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
