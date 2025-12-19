import { prisma } from '@/lib/prisma'; // 1. KORREKTUR: prisma statt db
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';

export const revalidate = 0;

// 2. KORREKTUR: "export const metadata = ..." WURDE GELÖSCHT.
// (Es darf nur generateMetadata geben, da die Seite dynamisch ist)

function BackIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
}

function CalendarIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
}

// 1. Daten-Holer Funktion (wiederverwendbar für Metadata & Page)
async function getGuide(slug: string) {
  // 3. KORREKTUR: prisma statt db
  const guide = await prisma.guide.findUnique({
    where: { slug },
  });
  return guide;
}

// 2. SEO MAGIE: Dynamische Metadaten generieren
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const guide = await getGuide(params.slug);

  if (!guide) {
    return {
      title: 'Guide Not Found',
    };
  }

  return {
    title: guide.title, // Wird zu "Guide Titel | AI Mastery Lab"
    description: guide.summary,
    openGraph: {
      title: guide.title,
      description: guide.summary || "Deep dive guide on AI Mastery Lab.",
      type: 'article',
      publishedTime: guide.createdAt.toISOString(),
    },
  };
}

// 3. Die eigentliche Seite
export default async function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = await getGuide(params.slug);

  if (!guide) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-cyan-500/30">
      
      {/* Header */}
      <div className="relative border-b border-white/5 bg-black/20 py-12 backdrop-blur-xl">
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Link href="/guides" className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-sm font-medium text-zinc-400 transition-all hover:bg-white/10 hover:text-white">
            <BackIcon className="h-4 w-4" />
            Back to Guides
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-5xl leading-tight">
            {guide.title}
          </h1>
          
          <div className="mt-6 flex items-center gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{new Date(guide.createdAt).toLocaleDateString()}</span>
            </div>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span className="text-cyan-400">AI Mastery Guide</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <article className="prose prose-invert prose-zinc max-w-none 
          prose-headings:text-white prose-headings:font-bold 
          prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-cyan-100
          prose-h3:text-xl prose-h3:text-white/90
          prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-6
          prose-strong:text-cyan-400 prose-strong:font-semibold
          prose-ul:my-6 prose-li:text-zinc-300 prose-li:marker:text-cyan-500
          prose-code:text-cyan-300 prose-code:bg-cyan-500/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-white/10 prose-pre:p-6 prose-pre:rounded-2xl
        ">
          <ReactMarkdown>
            {guide.content || guide.summary || "No content yet."}
          </ReactMarkdown>
        </article>

        <div className="mt-16 border-t border-white/10 pt-12">
          <Link href="/guides" className="text-zinc-400 hover:text-white transition-colors">
            ← Browse more guides
          </Link>
        </div>
      </div>
    </main>
  );
}