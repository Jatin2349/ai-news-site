export default function robots() {
  const base = 'https://ai-news-site-bswt.vercel.app'
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${base}/sitemap.xml`, host: base }
}
