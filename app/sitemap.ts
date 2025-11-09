import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-news-site-alpha.vercel.app'
  const now = new Date().toISOString()
  const routes = ['', 'news', 'guides', 'education', 'glossary', 'tools', 'newsletter', 'about', 'contact', 'privacy']

  return routes.map((p) => ({
    url: `${BASE}/${p}`.replace(/\/+$/, '').replace(/([^:]\/)\/+/g, '$1'),
    lastModified: now,
    changeFrequency: p === '' ? 'weekly' : 'weekly',
    priority: p === '' ? 1 : 0.7,
  }))
}
