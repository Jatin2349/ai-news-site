import news from "../../data/news.json";
import Link from "next/link";

const normalize = (s: string) =>
  String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

export const metadata = {
  title: "Education – AI Mastery Lab",
  description: "Curated learning bites on LLMs, RAG, agents, safety, and more.",
};

export default function EducationIndex() {
  const items = [...(news as any[])]
    .filter((n) => String(n.category || "").toLowerCase() === "education")
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Education</h1>
      <p className="mt-2 text-gray-600">
        Curated learning bites on LLMs, RAG, agents, safety, and more.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map((a, i) => {
          const slug = a.slug ? normalize(a.slug) : normalize(a.title);
          const href = `/education/${slug}`;
          return (
            <Link
              key={i}
              href={href}
              className="block rounded-2xl border p-4 hover:shadow"
            >
              <div className="text-xs uppercase tracking-wide text-gray-500">
                {a.category}
              </div>
              <h3 className="mt-1 font-semibold text-lg">{a.title}</h3>
              <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                {a.summary}
              </p>
              <div className="mt-3 text-xs text-gray-500">{a.date}</div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
