import news from "../../../data/news.json";
import { notFound } from "next/navigation";

const norm = (s: string) =>
  String(s || "").toLowerCase().trim()
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

// 1. Typ-Definition für Next.js 15 (params ist ein Promise)
type Props = {
  params: Promise<{ slug: string }>
}

// 2. Die Funktion muss "async" sein
export default async function NewsDetail({ params }: Props) {
  
  // 3. Wir warten auf die params und holen den rohen slug heraus
  const { slug: rawSlug } = await params;
  
  // Jetzt normalisieren wir den geholten slug
  const slug = norm(rawSlug);

  const item = (news as any[]).find(n => {
    const catOk = String(n.category || "").toLowerCase() === "news";
    const s = n.slug ? norm(n.slug) : norm(n.title);
    return catOk && s === slug;
  });

  if (!item) return notFound();

  const source = typeof item.url === "string" && item.url.startsWith("http") ? item.url : undefined;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase opacity-60">News</p>
      <h1 className="mt-1 text-3xl font-semibold">{item.title}</h1>
      <div className="mt-1 text-sm opacity-70">{item.date}</div>

      <article className="prose mt-6">
        <p>{item.summary}</p>
      </article>

      {source && (
        <a
          href={source}
          target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-block rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Read original →
        </a>
      )}
    </main>
  );
}