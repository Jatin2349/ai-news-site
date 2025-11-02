import guides from "../../../data/guides.json";
import ReactMarkdown from "react-markdown";

const norm = (s: string) =>
  String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

export default function GuidePage({ params }: { params: { slug: string } }) {
  const slug = norm(params.slug);

  // Guide aus guides.json finden (Slug aus Feld oder aus Title normalisieren)
  const item = (guides as any[]).find((g) => {
    const s = g.slug ? norm(g.slug) : norm(g.title);
    return s === slug;
  });

  if (!item) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold">Guide not found</h1>
        <p className="text-sm text-gray-600 mt-2">
          We couldn’t find a guide for “{slug}”.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-xs uppercase opacity-60">Guide</p>
      <h1 className="mt-1 text-3xl font-semibold">{item.title}</h1>
      <div className="mt-1 text-sm opacity-70">{item.date}</div>

      <article className="prose max-w-none mt-6">
        {/* content_md ist die volle Anleitung im Markdown; fallback auf summary */}
        <ReactMarkdown>{item.content_md || item.summary || ""}</ReactMarkdown>
      </article>
    </main>
  );
}
