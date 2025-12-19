import { prisma } from '@/lib/prisma';
import ToolCard from '@/components/ToolCard';
import type { Metadata } from 'next'; // <--- HIER WAR DER FEHLER: Dieser Import fehlte!

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'AI Toolbox - Curated Tools for Developers',
  description: 'The definitive list of AI tools for engineers: LLMs (GPT, Claude), Vector Databases (Pinecone), and Automation Platforms (n8n, Make).',
};

function ToolIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
}

export default async function ToolsPage() {
  const tools = await prisma.tool.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-amber-500/30">
      
      <div className="relative border-b border-white/5 bg-black/20 py-16 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Toolbox</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              Curated collection of the best AI tools for productivity, coding, and creative work.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {tools.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
            <ToolIcon className="mb-4 h-10 w-10 text-zinc-600" />
            <p className="text-zinc-500">Tool database is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}