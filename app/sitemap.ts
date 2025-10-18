export default function sitemap() {
  const base = 'https://ai-news-site-bswt.vercel.app' // später deine Domain
  const pages = ['', 'news', 'guides', 'glossary', 'newsletter', 'about', 'contact', 'privacy']
  const now = new Date()
  return pages.map(p => ({ url: `${base}/${p}`, lastModified: now }))
}
