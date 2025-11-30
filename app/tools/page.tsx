import { db } from '@/lib/db';

export const revalidate = 0;

function ToolIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
}
function LinkIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
}

export default async function ToolsPage() {
  const tools = await db.tool?.findMany({ take: 50 }) || [];

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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool: any) => (
              <div key={tool.id} className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-zinc-900/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-amber-900/10">
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">{tool.name}</h3>
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tool.pricing === 'Free' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/10 text-zinc-400'}`}>
                      {tool.pricing || "Free"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-zinc-400 line-clamp-2">{tool.description}</p>
                </div>
                
                <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                   <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{tool.category || "General"}</span>
                   <a href={tool.url} target="_blank" rel="noopener" className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300">
                     VISIT <LinkIcon className="h-3 w-3" />
                   </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}