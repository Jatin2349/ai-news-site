import { db } from '@/lib/db';
import Link from 'next/link';

export const revalidate = 0;

function BookIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
}
function ArrowRight({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
}

export default async function GuidesPage() {
  const guides = await db.guide?.findMany({ take: 20 }) || [];

  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-cyan-500/30">
      
      {/* Header */}
      <div className="relative border-b border-white/5 bg-black/20 py-16 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Deep Dive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Guides</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              Step-by-step playbooks and tutorials to master AI workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {guides.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
            <BookIcon className="mb-4 h-10 w-10 text-zinc-600" />
            <p className="text-zinc-500">Guides are coming soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide: any) => (
              <Link key={guide.id} href={`/guides/${guide.slug}`} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/30 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-cyan-900/20">
                {/* Glow Effect */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition-all group-hover:bg-cyan-500/20" />
                
                <div>
                  <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-cyan-400">
                    <BookIcon className="h-4 w-4" />
                    <span>Guide</span>
                  </div>
                  <h2 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-cyan-300">
                    {guide.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-zinc-400 line-clamp-3">
                    {guide.summary || "No summary available."}
                  </p>
                </div>

                <div className="mt-6 flex items-center text-sm font-semibold text-white group-hover:text-cyan-400">
                  Read Guide <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}