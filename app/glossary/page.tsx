import items from '@/data/glossary.json'

export default function GlossaryPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Glossary</h1>
      <dl className="divide-y">
        {items.map((t) => (
          <div key={t.term} className="py-3">
            <dt className="font-semibold">{t.term}</dt>
            <dd className="prose">{t.definition}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
