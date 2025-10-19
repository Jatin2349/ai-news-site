import data from '../../data/news.json'

export default function NewsPage() {
  const items = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">AI News</h1>
      <div className="space-y-6">
        {items.map((a, i) => (
          <article key={i} className="border rounded-xl p-4">
            <div className="text-xs uppercase tracking-wide text-gray-500">{a.category}</div>
            <h2 className="font-semibold mt-1">
              <a href={a.url} target={a.url.startsWith('http') ? '_blank' : undefined}>
                {a.title}
              </a>
            </h2>
            <p className="text-sm text-gray-700 mt-2">{a.summary}</p>
            <div className="text-xs text-gray-500 mt-2">{a.date}</div>
          </article>
        ))}
      </div>
    </div>
  )
}
