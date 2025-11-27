import { db } from '@/lib/db';
import Link from 'next/link';

// Damit die Seite immer frisch ist (kein Caching für den Test)
export const revalidate = 0; 

export default async function NewsPage() {
  // 1. Echte Daten aus der DB holen
  const newsItems = await db.newsItem.findMany({
    orderBy: {
      publishedAt: 'desc', // Die NEUESTEN zuerst
    },
    take: 50, // Max 50 Artikel laden
  });

  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 py-12 px-4 md:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Latest AI News
        </h1>

        <div className="space-y-4">
          {newsItems.length === 0 ? (
            <p className="text-zinc-500">No news found in database yet.</p>
          ) : (
            newsItems.map((item) => (
              <article 
                key={item.id} 
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      {item.sourceName}
                    </span>
                    <span>
                      {/* Zeigt das Datum an */}
                      {new Date(item.publishedAt).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </h2>

                  <p className="text-sm text-zinc-300 line-clamp-3">
                    {item.summary}
                  </p>

                  {/* Tags anzeigen */}
                  <div className="flex flex-wrap gap-2 mt-3">
                     {/* @ts-ignore */}
                    {item.tags && item.tags.map((tag: string, idx: number) => (
                      <span key={idx} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Keypoints (falls vorhanden) */}
                  {/* @ts-ignore */}
                  {item.keypoints && item.keypoints.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <ul className="list-disc list-inside text-xs text-zinc-400 space-y-1">
                        {/* @ts-ignore */}
                        {item.keypoints.map((kp: string, i: number) => (
                          <li key={i}>{kp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}