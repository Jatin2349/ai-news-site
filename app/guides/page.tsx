import guides from '@/data/guides.json'

export default function GuidesPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Knowledge Hub</h1>
      <ul className="grid md:grid-cols-2 gap-4">
        {guides.map((g) => (
          <li key={g.slug} className="border rounded-xl p-4">
            <div className="text-xs uppercase text-gray-500">{g.level}</div>
            <a className="font-semibold" href={`/guides/${g.slug}`}>{g.title}</a>
            <p className="text-sm text-gray-600 mt-2">{g.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
