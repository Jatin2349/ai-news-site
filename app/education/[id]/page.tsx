import { db } from '@/lib/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export const revalidate = 0;

function BackIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
}

// Daten holen
async function getLesson(id: string) {
  const lesson = await db.education.findUnique({
    where: { id },
  });
  return lesson;
}

export default async function LessonPage({ params }: { params: { id: string } }) {
  const lesson = await getLesson(params.id);

  if (!lesson) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-violet-500/30">
      
      {/* Header */}
      <div className="relative border-b border-white/5 bg-black/20 py-12 backdrop-blur-xl">
        <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <Link href="/education" className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-sm font-medium text-zinc-400 transition-all hover:bg-white/10 hover:text-white">
            <BackIcon className="h-4 w-4" />
            Back to Academy
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-300 border border-violet-500/20">
              Module {lesson.order}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl leading-tight">
            {lesson.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <article className="prose prose-invert prose-zinc max-w-none 
          prose-headings:text-white prose-headings:font-bold 
          prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-violet-100
          prose-h3:text-xl prose-h3:text-white/90
          prose-p:text-zinc-300 prose-p:leading-loose prose-p:text-lg prose-p:mb-8
          prose-strong:text-violet-400 prose-strong:font-semibold
          prose-ul:my-8 prose-li:text-zinc-300 prose-li:marker:text-violet-500
          prose-code:text-violet-300 prose-code:bg-violet-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
          prose-pre:bg-zinc-900/80 prose-pre:border prose-pre:border-white/10 prose-pre:p-6 prose-pre:rounded-2xl prose-pre:shadow-xl
          prose-blockquote:border-l-violet-500 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic
        ">
          <ReactMarkdown>
            {lesson.content || "No content available yet."}
          </ReactMarkdown>
        </article>

        {/* Footer Navigation */}
        <div className="mt-24 border-t border-white/10 pt-12 flex justify-between items-center">
          <Link href="/education" className="text-zinc-500 hover:text-white transition-colors">
            ← Course Overview
          </Link>
          {/* Hier könnte man Logik für "Next Lesson" einbauen */}
        </div>
      </div>
    </main>
  );
}