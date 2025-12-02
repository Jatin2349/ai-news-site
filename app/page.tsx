import Image from "next/image";
import Link from "next/link";

export const revalidate = 0;

// --- Icons ---
function ArrowRight({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
}
function SparklesIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M9 5H3"/></svg>
}
function TrendIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
}
function ToolIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
}
function BookIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-emerald-500/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        {/* Background Glows */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute right-0 top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[100px]" />

        <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300 backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Updated Daily with AI
          </div>
          
          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
            Master AI. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">
              Build Leverage.
            </span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
            Stop drowning in noise. We curate the most important AI news, tools, and guides so you can focus on building the future.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/news" className="group flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition hover:bg-zinc-200">
              Start Reading News
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/newsletter" className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">
              Get Weekly Brief
            </Link>
          </div>
        </div>
      </section>

      {/* --- VALUE PROPOSITION (Why AI?) --- */}
      <section className="relative border-y border-white/5 bg-black/20 py-24 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
            
            <div>
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Why learn AI <span className="text-emerald-400">now?</span>
              </h2>
              <p className="mt-4 text-lg text-zinc-400 leading-relaxed">
                AI is not just a trend; it's a fundamental shift in how we work and create. 
                Those who adapt will build incredible leverage, automating tasks and solving problems faster than ever before.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  "Automate repetitive work and save 10+ hours/week.",
                  "Build software and products without deep coding knowledge.",
                  "Analyze data and make decisions faster than competitors."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual Abstract Graphic */}
            <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8">
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-emerald-500/20 blur-[80px]" />
              
              <div className="relative z-10 grid h-full grid-cols-2 gap-4">
                <div className="flex flex-col justify-end rounded-2xl bg-zinc-900/80 p-6 border border-white/5 backdrop-blur-md">
                  <span className="text-4xl font-bold text-white">10x</span>
                  <span className="text-sm text-zinc-400">Productivity</span>
                </div>
                <div className="flex flex-col justify-start rounded-2xl bg-zinc-900/80 p-6 border border-white/5 backdrop-blur-md mt-12">
                  <span className="text-4xl font-bold text-white">24/7</span>
                  <span className="text-sm text-zinc-400">Intelligence</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BENTO GRID NAVIGATION (What to expect) --- */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Everything you need to grow</h2>
            <p className="mt-4 text-zinc-400">We've organized the chaos of AI into four clear pillars.</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 h-[800px] md:h-[600px]">
            
            {/* 1. NEWS (Large Card) */}
            <Link href="/news" className="group relative col-span-1 md:col-span-2 md:row-span-2 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-8 transition-all hover:bg-zinc-900/80 hover:border-emerald-500/30">
              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-[80px] transition-all group-hover:bg-emerald-500/20" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-4 inline-flex items-center rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                    <TrendIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Daily AI News</h3>
                  <p className="mt-2 max-w-md text-zinc-400">
                    Stay updated with the latest breakthroughs from OpenAI, Google, and open source. Summarized for clarity.
                  </p>
                </div>
                <div className="mt-8 flex items-center text-sm font-bold text-white group-hover:text-emerald-400">
                  Read News <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* 2. TOOLS */}
            <Link href="/tools" className="group relative col-span-1 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-8 transition-all hover:bg-zinc-900/80 hover:border-amber-500/30">
              <div className="absolute right-0 top-0 h-full w-full bg-amber-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center rounded-lg bg-amber-500/10 p-2 text-amber-400">
                  <ToolIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Toolbox</h3>
                <p className="mt-2 text-sm text-zinc-400">Find the right AI for every task.</p>
              </div>
            </Link>

            {/* 3. EDUCATION */}
            <Link href="/education" className="group relative col-span-1 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-8 transition-all hover:bg-zinc-900/80 hover:border-violet-500/30">
              <div className="absolute right-0 top-0 h-full w-full bg-violet-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex items-center rounded-lg bg-violet-500/10 p-2 text-violet-400">
                  <SparklesIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Education</h3>
                <p className="mt-2 text-sm text-zinc-400">Learn the concepts that matter.</p>
              </div>
            </Link>

          </div>
          
          {/* Extra Row for Guides */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
             <Link href="/guides" className="group relative flex items-center justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 transition-all hover:bg-zinc-900/80 hover:border-cyan-500/30">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
                    <BookIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Guides</h3>
                    <p className="text-sm text-zinc-400">Deep dives into specific topics.</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan-400" />
             </Link>
             
             <Link href="/glossary" className="group relative flex items-center justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 transition-all hover:bg-zinc-900/80 hover:border-rose-500/30">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-rose-500/10 p-2 text-rose-400 font-bold text-xl">Aa</div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Glossary</h3>
                    <p className="text-sm text-zinc-400">Understand the terminology.</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-rose-400" />
             </Link>
          </div>

        </div>
      </section>

      {/* --- NEWSLETTER CTA --- */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 p-12 backdrop-blur-md">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Stay ahead of the curve</h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-zinc-400">
              Get the most important AI updates delivered to your inbox weekly. No fluff, just leverage.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/newsletter" className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition hover:bg-zinc-200">
                Subscribe for Free
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}