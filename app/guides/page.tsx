import guides from '../../data/guides.json'

type Guide = {
  slug: string
  title: string
  summary: string
  date: string
  url?: string
}

export default function GuidesIndex() {
  const list = guides as Guide[]

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">Guides</h1>
      <p className="text-gray-600 mb-4">
        Deep-dive guides on core AI concepts and workflows.
      </p>

      <ul className="grid gap-6 md:grid-cols-2">
        {list.map((g) => (
          <li key={g.slug} className="border rounded-xl p-4">
            <div className="text-xs uppercase text-gray-500">Guide</div>
            <a className="font-semibold" href={`/guides/${g.slug}`}>
              {g.title}
            </a>
            <p className="text-sm text-gray-600 mt-2">{g.summary}</p>
            <div className="text-xs text-gray-500 mt-3">{g.date}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
