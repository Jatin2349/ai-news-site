import news from "../../../data/news.json";
import { notFound, redirect } from "next/navigation";

const norm = (s: string) =>
  String(s || "").toLowerCase().trim()
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

export default function GuideDetail({ params }: { params: { slug: string } }) {
  const slug = norm(params.slug);

  // 1) Falls der Slug eigentlich ein Education-Artikel ist → redirect
  const isEdu = (news as any[]).some(n => {
    const cat = String(n.category || "").toLowerCase();
    const s = n.slug ? norm(n.slug) : norm(n.title);
    return cat === "education" && s === slug;
  });
  if (isEdu) redirect(`/education/${slug}`);

  // 2) Den Guide in den Daten finden
  const item = (news as any[]).find(n => {
    const cat = String(n.category || "").toLowerCase();
    const s = n.slug ? norm(n.slug) : norm(n.title);
    return cat === "guides" && s === slug;
  });

  if (!item) return notFound();

  const external = typeof item.url === "string" && item.url.startsWith("http");

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase opacity-60">Guide</p>
      <h1 className="mt-1 text-3xl font-semibold">{item.title}</h1>
      <div className="mt-1 text-sm opacity-70">{item.date}</div>

      <article className="prose mt-6">
        <p>{item.summary}</p>
      </article>

      {external && (
        <a
          href={item.url}
          target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-block rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
        >
          Open full guide →
        </a>
      )}
    </main>
  );
}
