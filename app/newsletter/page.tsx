export default function NewsletterPage() {
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold mb-2">Newsletter</h1>
      <p className="text-gray-600 mb-4">
        Weekly AI Insider: key news, tools, and takeaways.
      </p>

      {/* static form (no event handlers) */}
      <form action="#" className="flex gap-2">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="you@example.com"
          name="email"
          type="email"
          required
        />
        <button className="border rounded px-4" type="submit" disabled>
          Subscribe
        </button>
      </form>

      <p className="mt-3 text-sm text-gray-600">
        Phase 0: Static demo. We’ll add real double opt-in later.
      </p>
    </div>
  )
}
