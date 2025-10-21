export const metadata = {
  title: 'Newsletter',
  description: 'Subscribe to AI news briefings and learning updates.'
}

export default function NewsletterPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-2">Newsletter</h1>
      <p className="text-gray-700 mb-6">
        Get concise AI briefings and education updates in your inbox.
      </p>

      <div className="rounded-2xl border p-5">
        <form className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm">Email address</span>
            <input type="email" className="border rounded-md px-3 py-2" placeholder="you@example.com" />
          </label>
          <button type="button" className="rounded-md bg-black text-white px-4 py-2 w-fit">
            Subscribe (coming soon)
          </button>
          <p className="text-xs text-gray-500">
            We’re setting up the provider. Until then, email us at <a className="underline" href="mailto:hello@example.com">hello@example.com</a>.
          </p>
        </form>
      </div>
    </div>
  )
}
