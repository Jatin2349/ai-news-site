// app/news/rss.xml/route.ts
// Statischer, minimaler RSS-Feed – ersetze ITEMS später durch echte News.
export const dynamic = "force-static";

type Item = { title: string; url: string; description: string; date: string };

function rssItem({ title, url, description, date }: Item) {
  return `<item>
    <title>${escapeXml(title)}</title>
    <link>${url}</link>
    <description><![CDATA[${description}]]></description>
    <pubDate>${new Date(date).toUTCString()}</pubDate>
  </item>`;
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://ai-news-site-alpha.vercel.app";

  // TODO: Später mit realen Daten ersetzen.
  const ITEMS: Item[] = [
    {
      title: "Welcome to AI Mastery Lab",
      url: `${base}/news`,
      description: "High-signal AI news.",
      date: new Date().toISOString(),
    },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>AI Mastery Lab — News</title>
  <link>${base}/news</link>
  <description>High-signal AI news.</description>
  ${ITEMS.map(rssItem).join("\n")}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
