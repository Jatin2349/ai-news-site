import guides from '../../../data/guides.json'

type Guide = {
  slug: string
  title: string
  summary: string
  date: string
  url?: string
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = (guides as Guide[]).find(x => x.slug === params.slug)

  if (!g) {
    return (
      <article className="prose">
        <h1>Guide not found</h1>
        <p className="text-gray-600">We couldn’t find a guide for “{params.slug}”.</p>
      </article>
    )
  }

  return (
    <article className="prose">
      <h1>{g.title}</h1>
      <p className="text-gray-600">{g.summary}</p>
      <p className="text-sm text-gray-500">{g.date}</p>
      <hr />
      <p>
        Full guide coming soon. For now, check the overview and related resources.
      </p>
      {g.url?.startsWith('http') && (
        <p>
          External link:&nbsp;
          <a href={g.url} target="_blank" rel="noopener noreferrer">{g.url}</a>
        </p>
      )}
    </article>
  )
}
