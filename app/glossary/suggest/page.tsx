'use client'

import { useState } from 'react'

export default function GlossarySuggestPage() {
  const [term, setTerm] = useState('')
  const [definition, setDefinition] = useState('')
  const [email, setEmail] = useState('')
  const [ok, setOk] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hp, setHp] = useState('') // honeypot

  // TODO: Ersetze durch deine Formspree-Endpoint-URL
  const FORM_ACTION = 'https://formspree.io/f/your-endpoint'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!term.trim() || !definition.trim()) {
      setError('Please provide both a term and a short definition.')
      return
    }
    if (hp) {
      setError('Spam detected.')
      return
    }

    setLoading(true)
    try {
      const payload = {
        term,
        definition_md: definition,
        email, // optional
        source: 'glossary-suggest-form'
      }

      // Sende an Formspree (oder später an /api/suggest-glossary)
      const res = await fetch(FORM_ACTION, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        throw new Error('Submit failed')
      }

      setOk(true)
      setTerm('')
      setDefinition('')
      setEmail('')
      // kleiner „Rate-Limit“ lokal
      try {
        const n = Number(localStorage.getItem('glossary_suggest_count') || '0') + 1
        localStorage.setItem('glossary_suggest_count', String(n))
      } catch {}
    } catch (err) {
      setError('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-2">Suggest a Glossary Term</h1>
      <p className="text-gray-600 mb-4">
        Found a missing concept? Propose a short, neutral definition. We’ll review and add it if it fits.
      </p>

      {ok ? (
        <div className="rounded-lg border p-4 bg-green-50 text-green-800">
          Thanks! Your suggestion was submitted. We’ll review it soon.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Honeypot (nicht ausfüllen) */}
          <input
            type="text"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <label className="block text-sm font-medium">Term</label>
            <input
              className="mt-1 w-full border rounded px-3 py-2"
              placeholder="e.g., Retrieval-Augmented Generation"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Short definition (Markdown supported)</label>
            <textarea
              className="mt-1 w-full border rounded px-3 py-2 h-32"
              placeholder="One to three sentences, concise and neutral."
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Your email (optional)</label>
            <input
              type="email"
              className="mt-1 w-full border rounded px-3 py-2"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center rounded-md bg-black text-white px-4 py-2 text-sm hover:opacity-90 disabled:opacity-60"
          >
            {loading ? 'Submitting…' : 'Submit suggestion'}
          </button>
        </form>
      )}
    </section>
  )
}
