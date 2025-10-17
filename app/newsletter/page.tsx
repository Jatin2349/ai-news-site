export default function NewsletterPage() {
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold mb-2">Newsletter</h1>
      <p className="text-gray-600 mb-4">Weekly AI Insider: key news, tools, and takeaways.</p>
      <form onSubmit={(e)=>e.preventDefault()} className="flex gap-2">
        <input className="border rounded px-3 py-2 flex-1" placeholder="you@example.com" />
        <button className="border rounded px-4">Subscribe</button>
      </form>
      <p className="mt-3 text-sm text-gray-600">Phase 0: static form. Double opt-in will be added later.</p>
    </div>
  )
}
