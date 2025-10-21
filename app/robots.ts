// app/robots.ts
export default function robots() {
  const base = 'https://ai-news-site-bswt.vercel.app' // später Domain setzen
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`
  }
}
