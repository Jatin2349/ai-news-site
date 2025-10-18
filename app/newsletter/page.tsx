export default function NewsletterPage() {
  return (
    <div className="prose max-w-xl">
      <h1>Newsletter</h1>
      <p>We’re launching our weekly newsletter soon. Stay tuned!</p>
      <p>Follow us for updates:</p>
      <ul>
        <li><a href="https://twitter.com/intent/follow?screen_name=YOUR_HANDLE" target="_blank">X (Twitter)</a></li>
        <li><a href="https://www.linkedin.com/company/YOUR_PAGE" target="_blank">LinkedIn</a></li>
      </ul>
      <p className="text-gray-500">No spam. We’ll announce the launch on our socials.</p>
    </div>
  )
}
