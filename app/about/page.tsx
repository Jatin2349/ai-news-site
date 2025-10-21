export const metadata = {
  title: 'About',
  description: 'What AI Mastery Lab is and what you can expect.'
}

export default function AboutPage() {
  return (
    <div className="prose max-w-3xl">
      <h1>About AI Mastery Lab</h1>
      <p>
        AI Mastery Lab curates daily AI news and publishes clear, short summaries.
        We also maintain beginner-to-advanced guides and a concise A–Z glossary.
      </p>
      <p>
        Roadmap: tools directory, prompt library, newsletter, and community integrations.
        We aim to keep content practical, neutral, and source-linked wherever possible.
      </p>
      <h2>Contact</h2>
      <p>
        For feedback, partnerships, or press: see our <a href="/contact">Contact page</a>.
      </p>
    </div>
  )
}
