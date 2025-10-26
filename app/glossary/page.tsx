import type { Metadata } from 'next'
import glossary from '../../data/glossary.json'
import ReactMarkdown from 'react-markdown'

export const metadata: Metadata = {
  title: 'Glossary',
  description: 'A–Z of core AI terms: concise definitions you can skim fast.',
}

type Term = {
  term: string
  definition_md: string
}

export default function GlossaryPage() {
  const items = [...(glossary as Term[])].sort((a, b) =>
    a.term.localeCompare(b.term, 'en', { sensitivity: 'base' })
  )

  return (
    <section className="max-w-3xl">
      <h1 className="text-2xl font-semibold mb-2">Glossary</h1>
      <p className="text-gray-600 mb-4">Concise definitions for AI terms A–Z.</p>

      <dl>
        {items.map((t) => (
          <div key={t.term} className="py-3 border-b first:border-t">
            <dt className="font-semibold">{t.term}</dt>
            <dd className="prose prose-sm max-w-none text-gray-800">
              <ReactMarkdown>{t.definition_md}</ReactMarkdown>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
