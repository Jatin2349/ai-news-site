export const metadata = {
  title: 'Contact',
  description: 'How to get in touch with AI Mastery Lab.'
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold mb-4">Contact</h1>
      <p className="text-gray-700 mb-6">
        Questions, feedback, or partnership ideas? Reach out below.
      </p>

      <div className="rounded-2xl border p-5">
        <form className="grid gap-4">
          <label className="grid gap-1">
            <span className="text-sm">Name</span>
            <input className="border rounded-md px-3 py-2" placeholder="Your name" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Email</span>
            <input type="email" className="border rounded-md px-3 py-2" placeholder="you@example.com" />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">Message</span>
            <textarea className="border rounded-md px-3 py-2 min-h-[120px]" placeholder="How can we help?" />
          </label>
          {/* Placeholder submit – no backend yet */}
          <button type="button" className="rounded-md bg-black text-white px-4 py-2 w-fit">
            Send (coming soon)
          </button>
          <p className="text-xs text-gray-500">
            No email service connected yet. You can also email us at <a className="underline" href="mailto:hello@example.com">hello@example.com</a>.
          </p>
        </form>
      </div>
    </div>
  )
}
