// app/news/feed.json/route.ts
// JSON Feed v1 – später echte News einspielen.
export const dynamic = "force-static";

export async function GET() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL || "https://ai-news-site-alpha.vercel.app";

  const feed = {
    version: "https://jsonfeed.org/version/1",
    title: "AI Mastery Lab — News",
    home_page_url: `${base}/news`,
    feed_url: `${base}/news/feed.json`,
    items: [
      {
        id: "welcome",
        url: `${base}/news`,
        title: "Welcome to AI Mastery Lab",
        content_text: "High-signal AI news.",
        date_published: new Date().toISOString(),
      },
    ],
  };

  return new Response(JSON.stringify(feed), {
    headers: { "Content-Type": "application/feed+json; charset=utf-8" },
  });
}
