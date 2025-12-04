import { db } from '@/lib/db';
import { GlossaryList } from '@/components/GlossaryList'; // Wir importieren die neue Komponente

export const revalidate = 0;

export default async function GlossaryPage() {
  // Wir laden ALLES (für client-side filtering)
  const terms = await db.glossaryEntry?.findMany({
    orderBy: { term: 'asc' },
  }) || [];

  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-rose-500/30">
      
      {/* Header */}
      <div className="relative border-b border-white/5 bg-black/20 py-16 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">Glossary</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              The ultimate dictionary for the AI age. Over 100 terms defined clearly.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {/* Hier binden wir die interaktive Liste ein und übergeben die Daten */}
        <GlossaryList initialTerms={terms} />
      </div>
    </main>
  );
}