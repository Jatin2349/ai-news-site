import { db } from '@/lib/db';
import Link from 'next/link';
import { Metadata } from 'next'; // Import hinzufügen

export const revalidate = 0;

// HIER IST DAS SEO-UPDATE
export const metadata: Metadata = {
  title: 'Daily AI News & Analysis',
  description: 'Your curated daily brief on the latest in Artificial Intelligence. We filter the noise and summarize breakthroughs from Big Tech, Research, and Community.',
};

// --- Icons als kleine Komponenten (damit wir keine externen Pakete brauchen) ---
function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

export default async function NewsPage() {
  // Daten aus der DB holen (Neueste zuerst)
  const newsItems = await db.newsItem.findMany({
    orderBy: { publishedAt: 'desc' },
    take: 60, 
  });

  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-emerald-500/30">
      
      {/* --- HEADER SECTION --- */}
      <div className="relative border-b border-white/5 bg-black/20 py-16 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AI Insights</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              Curated news, research papers, and industry updates. Automatically analyzed and summarized by AI.
            </p>
          </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        
        {newsItems.length === 0 ? (
          <div className="flex h-64 items-center justify-center rounded-3xl border border-white/10 bg-white/5">
            <p className="text-zinc-500">No news found in database yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item) => (
              <article 
                key={item.id} 
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-emerald-900/20"
              >
                {/* Dekorativer Glow-Effekt im Hintergrund */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl transition-all group-hover:bg-emerald-500/20" />

                <div>
                  {/* Top Meta: Source & Date */}
                  <div className="mb-4 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-zinc-500">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                      </span>
                      {item.sourceName}
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(item.publishedAt).toLocaleDateString('de-DE', {
                        day: '2-digit', month: '2-digit', year: 'numeric'
                      })}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="mb-3 text-xl font-bold leading-snug text-white transition-colors group-hover:text-emerald-300">
                    <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="before:absolute before:inset-0">
                      {item.title}
                    </a>
                  </h2>

                  {/* Summary */}
                  <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                    {item.summary}
                  </p>
                </div>

                {/* Footer: Tags & Action */}
                <div className="relative z-10 mt-auto">
                  {/* Tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {/* @ts-ignore */}
                    {item.tags && item.tags.slice(0, 3).map((tag: string, idx: number) => (
                      <span key={idx} className="inline-flex items-center rounded-md border border-white/5 bg-white/5 px-2 py-1 text-[10px] font-medium text-zinc-300 transition-colors group-hover:border-white/10 group-hover:bg-white/10">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Button (Visuell) */}
                  <div className="flex items-center text-sm font-semibold text-white group-hover:text-emerald-400">
                    Read Source
                    <ExternalLinkIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}