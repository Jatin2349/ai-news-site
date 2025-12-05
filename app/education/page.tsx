import { db } from '@/lib/db';
import Link from 'next/link';

export const revalidate = 0;

function AcademicIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
}

export default async function EducationPage() {
  // Sortiere nach 'order', damit die Lektionen 1-9 in der richtigen Reihenfolge kommen
  const lessons = await db.education?.findMany({ 
    take: 50,
    orderBy: { order: 'asc' } 
  }) || [];

  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-violet-500/30">
      
      <div className="relative border-b border-white/5 bg-black/20 py-16 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Academy</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              From Beginner to AI Engineer. Master the fundamentals and advanced concepts.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        {lessons.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
            <AcademicIcon className="mb-4 h-10 w-10 text-zinc-600" />
            <p className="text-zinc-500">Curriculum is being built.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson: any) => (
              /* HIER IST DER FIX: Link um die ganze Karte */
              <Link key={lesson.id} href={`/education/${lesson.id}`} className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-violet-900/20">
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl transition-all group-hover:bg-violet-500/20" />
                
                <div>
                  <div className="mb-4 inline-flex items-center rounded-full bg-violet-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-300">
                    Module {lesson.order}
                  </div>
                  <h2 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-violet-300">
                    {lesson.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-zinc-400 line-clamp-3">
                    {/* Kurze Vorschau generieren */}
                    {lesson.content ? lesson.content.substring(0, 100).replace(/#/g, '') + "..." : "Start learning now."}
                  </p>
                </div>
                
                <div className="mt-6">
                   <span className="w-full inline-block text-center rounded-xl bg-white/5 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-white/10 group-hover:text-violet-300 border border-white/5 group-hover:border-violet-500/30">
                     Start Lesson
                   </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}