import { NextResponse } from "next/server";
import news from "@/data/news.json";

// Basis-URL aus Env (fällt zurück auf Vercel-URL)
const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-news-site-alpha.vercel.app";

// Hilfsfunktion: XML escapen
function escapeXml(s = "") {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]!));
}

export async function GET() {
  // Nimm die neuesten Einträge (max 20)
  const itemsXml = (news as any[])
    .slice(0, 20)
    .map((n) => {
      const slug = n.slug ?? "";
      const url = `${BASE}/news/${slug}`;
      const title = escapeXml(n.title ?? "Untitled");
      const summary = n.summary ?? "";
      const pubDate = new Date(n.date ?? Date.now()).toUTCString();
      const guid = url;

      return `
  <item>
    <title>${title}</title>
    <link>${url}</link>
    <description><![CDATA[${summary}]]></description>
    <pubDate>${pubDate}</pubDate>
    <guid>${guid}</guid>
  </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>AI Mastery Lab — News</title>
  <link>${BASE}/news</link>
  <description>High-signal AI news.</description>
  ${itemsXml}
</channel>
</rss>`.trim();

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300, s-maxage=300" },
  });
}
