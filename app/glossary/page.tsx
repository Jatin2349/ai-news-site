import type { Metadata } from 'next'
import glossary from '../../data/glossary.json'
import Link from 'next/link'
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
      <p className="text-gray-600 mb-3">
        Quick definitions for AI terms you’ll see often.
      </p>

      {/* HIER den CTA einfügen – im JSX, nicht oben bei der Sortierung */}
      <div className="mb-6">
        <Link
          href="/glossary/suggest"
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Missing a term? Suggest one →
        </Link>
      </div>

      <dl>
        {items.map(t => (
          <div key={t.term} className="py-3">
            <dt className="font-semibold">{t.term}</dt>
            <dd className="prose">
              {/* Wenn du definition_md nutzt: */}
              <ReactMarkdown>{t.definition_md}</ReactMarkdown>
              {/* Falls du ein plain-text Feld „definition“ hast, nimm stattdessen:
              <p>{t.definition}</p>
              */}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

