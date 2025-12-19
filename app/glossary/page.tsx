import { prisma } from '@/lib/prisma'; // 1. Korrigierter Import (prisma statt db)
import { GlossaryList } from '@/components/GlossaryList';
import type { Metadata } from 'next';  // 2. Import für Metadata hinzugefügt

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'AI Glossary - A-Z Dictionary of AI Terms',
  description: 'Find definitions for complex AI terminology including RAG, Hallucination, Transformer, and Alignment. Essential for clarity.',
};

export default async function GlossaryPage() {
  // 3. prisma.glossaryEntry statt db.glossaryEntry nutzen
  const terms = await prisma.glossaryEntry.findMany({
    orderBy: { term: 'asc' },
  });

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
        {/* Wir übergeben die Daten an die Client-Komponente */}
        <GlossaryList initialTerms={terms} />
      </div>
    </main>
  );
}