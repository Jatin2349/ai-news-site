export const metadata = {
  title: 'Privacy',
  description: 'Privacy policy for AI Mastery Lab.'
}

export default function PrivacyPage() {
  return (
    <div className="prose max-w-3xl">
      <h1>Privacy</h1>
      <p>
        We use privacy-friendly, cookie-less analytics (Vercel Analytics/Speed Insights) to understand
        page performance and basic usage. No personal profiles are created.
      </p>
      <p>
        Third-party links may have their own policies. For newsletter sign-ups or community features we’ll
        disclose providers and add settings here before launch.
      </p>
      <h2>Contact</h2>
      <p>
        Questions? <a href="/contact">Contact us</a>.
      </p>
      <p className="text-sm text-gray-500">Last updated: {new Date().toISOString().slice(0,10)}</p>
    </div>
  )
}
