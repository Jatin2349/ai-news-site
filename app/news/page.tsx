// app/news/page.tsx
import news from "../../data/news.json";
import Link from "next/link";

export default function NewsPage({ searchParams }: { searchParams: { page?: string } }) {
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const pageSize = 10;

  const all = (news as any[]).filter(
    (n) => String(n.category || "").toLowerCase() === "news"
  );
  const total = all.length;
  const items = all
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice((page - 1) * pageSize, page * pageSize);

  const pages = Math.ceil(total / pageSize);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">News</h1>
      <div className="space-y-4">
        {items.map((n, i) => {
          const isExternal = n.url?.startsWith("http");
          const href = isExternal ? n.url : `/news/${(n.slug || n.title).toLowerCase().replace(/[^a-z0-9\s-_]/g,"").replace(/[\s_]+/g,"-").replace(/-+/g,"-")}`;
          return (
            <article key={i} className="rounded-xl border p-4">
              <h2 className="text-lg font-medium">
                <Link href={href} className="hover:underline" target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
                  {n.title}
                </Link>
              </h2>
              <div className="text-sm opacity-70">{n.date}</div>
              <p className="mt-2">{n.summary}</p>
            </article>
          );
        })}
      </div>

      {pages > 1 && (
        <nav className="mt-8 flex items-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/news?page=${p}`}
              className={`rounded-md border px-3 py-1 text-sm ${p === page ? "bg-muted font-medium" : ""}`}
            >
              {p}
            </Link>
          ))}
        </nav>
      )}
    </main>
  );
}
