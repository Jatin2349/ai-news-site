import { NextResponse } from "next/server";
import news from "@/data/news.json";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-news-site-alpha.vercel.app";

export async function GET() {
  const items = (news as any[]).slice(0, 20).map((n) => {
    const slug = n.slug ?? "";
    return {
      id: n.id ?? slug || String(n.title ?? Math.random()),
      url: `${BASE}/news/${slug}`,
      title: n.title ?? "Untitled",
      content_text: n.summary ?? "",
      date_published: new Date(n.date ?? Date.now()).toISOString(),
    };
  });

  const body = {
    version: "https://jsonfeed.org/version/1",
    title: "AI Mastery Lab — News",
    home_page_url: `${BASE}/news`,
    feed_url: `${BASE}/news/feed.json`,
    items,
  };

  return NextResponse.json(body, {
    headers: { "Cache-Control": "public, max-age=300, s-maxage=300" },
  });
}
