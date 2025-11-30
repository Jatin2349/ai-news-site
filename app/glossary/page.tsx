import { db } from '@/lib/db';

export const revalidate = 0;

function AZIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
}

export default async function GlossaryPage() {
  const terms = await db.glossaryEntry?.findMany({
    orderBy: { term: 'asc' },
    take: 100
  }) || [];

  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-rose-500/30">
      
      <div className="relative border-b border-white/5 bg-black/20 py-16 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">Glossary</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              Speak the language of the future. Essential terms defined clearly.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {terms.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
            <AZIcon className="mb-4 h-10 w-10 text-zinc-600" />
            <p className="text-zinc-500">Glossary is empty right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {terms.map((entry: any) => (
              <div key={entry.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-rose-500/30 hover:bg-zinc-900/80">
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-rose-500/0 via-rose-500/50 to-rose-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
                
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-rose-300 transition-colors">{entry.term}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {entry.definition}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}