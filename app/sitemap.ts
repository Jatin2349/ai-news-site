// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://ai-news-site-alpha.vercel.app";

  // Füge hier weitere wichtige Routen hinzu, wenn du neue Seiten anlegst
  const routes = [
    "/",
    "/news",
    "/guides",
    "/education",
    "/tools",
    "/glossary",
    "/newsletter",
    "/about",
    "/contact",
    "/privacy",
  ];

  const now = new Date().toISOString();

  return routes.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.6,
  }));
}
