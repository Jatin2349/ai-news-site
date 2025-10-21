// app/sitemap.ts
export default function sitemap() {
  const base = 'https://ai-news-site-bswt.vercel.app' // später auf deine Domain ändern
  const now = new Date()
  const routes = ['', '/news', '/guides', '/glossary', '/about', '/contact', '/privacy', '/newsletter']
  return routes.map((p) => ({
    url: `${base}${p || '/'}`,
    lastModified: now
  }))
}
