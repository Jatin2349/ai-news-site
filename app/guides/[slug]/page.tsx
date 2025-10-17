import guides from '@/data/guides.json'

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = guides.find(x => x.slug === params.slug)
  if (!g) return <div className="text-gray-600">Guide not found.</div>
  return (
    <article className="prose">
      <h1>{g.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: g.body.replace(/\n/g, '<br/>') }} />
    </article>
  )
}
