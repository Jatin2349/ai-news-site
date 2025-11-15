import Link from 'next/link';
import NewsFilters from '@/components/NewsFilters';

type NewsDTO = {
  id: string;
  title: string;
  sourceUrl: string;
  sourceName: string;
  sourceDomain?: string | null;
  publishedAt: string;
  summary: string;
  keypoints: string[];
  keywords: string[];
  category: string;
  imageUrl?: string | null;
  lang?: string;
};

async function fetchNews({ category, tag }:{ category?:string; tag?:string }) {
  const qs = new URLSearchParams();
  if (category) qs.set('category', category);
  if (tag) qs.set('tag', tag);
  qs.set('limit', '60');
  const base = process.env.NEXT_PUBLIC_BASE_URL || '';
  const res = await fetch(`${base}/api/news/list?${qs.toString()}`, { cache: 'no-store' });
  return res.json();
}

// ... (bestehender Code von Zeile 1 bis zum Start der NewsPage Funktion)

export default async function NewsPage({ searchParams }:{
  searchParams?: { category?: string; tag?: string }
}) {
  const category = searchParams?.category;
  const tag = searchParams?.tag;
  const data = await fetchNews({ category, tag });

  const items: NewsDTO[] = (data?.items ?? []).map((r: any) => ({
    ...r,
    keypoints: Array.isArray(r?.keypoints) ? r.keypoints : [],
    keywords: Array.isArray(r?.keywords) ? r.keywords : [],
  }));

  const keywordPool = Array.from(new Set(items.flatMap(n => n.keywords)));

  // HIER STARTET DAS FEHLENDE RETURN-STATEMENT
  return (
    <main className="mx-auto max-w-3xl p-4 space-y-6">
      <h1 className="text-2xl font-semibold">AI News</h1>
      <NewsFilters keywords={keywordPool} />

      {items.map((n:NewsDTO) => ( // Typisierung von n hinzugefügt
        <article key={n.id} className="rounded-2xl border p-4 space-y-2">
          <h2 className="text-lg font-semibold">
            <Link href={`/en/news/${n.id}`}>{n.title}</Link>
          </h2>
          <p className="text-xs opacity-70">
            {n.sourceName} • {new Date(n.publishedAt).toLocaleDateString()} • {n.category.replaceAll('_',' ')}
          </p>
          <p className="mt-1">{n.summary}</p>
          {n.keypoints?.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-sm">
              {n.keypoints.slice(0,6).map((kp:string, i:number)=>(<li key={i}>{kp}</li>))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {(n.keywords || []).slice(0,8).map((k:string)=>(<span key={k} className="text-xs border rounded-md px-2 py-0.5">#{k}</span>))}
          </div>
          <a
            className="mt-3 inline-block underline text-sm"
            href={n.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read original source ({n.sourceDomain || 'source'})
          </a>
        </article>
      ))}

      {!items.length && <p>No items found for your filters.</p>}
    </main>
  );
} // <- Dies ist die abschließende Klammer der NewsPage-Funktion