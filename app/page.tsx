// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

// Decorative FX nur clientseitig laden (keine SSR)
const BackgroundFXNoSSR = dynamic(() => import("./components/BackgroundFX"), { ssr: false });

export default function HomePage() {
  return (
    <main className="relative overflow-hidden bg-[#0A0B0F] text-zinc-100">
      {/* Decorative gradients (client-only) */}
      <BackgroundFXNoSSR />

      <Nav />
      <Hero />
      <Values />
      <WhatYouGet />
      <WhyItMatters />
      <CTA />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="AI Mastery Lab" width={36} height={36} />
          <span className="font-semibold tracking-tight">AI Mastery Lab</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link className="text-zinc-300 hover:text-white/90" href="/news">News</Link>
          <Link className="text-zinc-300 hover:text-white/90" href="/guides">Guides</Link>
          <Link className="text-zinc-300 hover:text-white/90" href="/education">Education</Link>
          <Link className="text-zinc-300 hover:text-white/90" href="/tools">Tools</Link>
          <Link className="text-zinc-300 hover:text-white/90" href="/glossary">Glossary</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/newsletter" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium hover:bg-white/10">Subscribe</Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24 lg:py-28">
        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            New: Weekly AI Briefings
          </div>
          <h1 className="text-balance bg-gradient-to-br from-white via-zinc-100 to-zinc-400 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl">
            Master AI. <span className="block">Build leverage.</span>
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-zinc-300">
            Practical news, guides, education and automations to turn AI from buzzword into daily advantage. Short, clear, and built for busy people.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/guides" className="rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black shadow-sm hover:bg-zinc-100">Explore Guides</Link>
            <Link href="/news" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10">Read News</Link>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-zinc-400">
            <Benefit>Curated, no fluff</Benefit>
            <Benefit>Actionable templates</Benefit>
            <Benefit>Beginner → Pro</Benefit>
          </div>
        </div>

        {/* Logo + geometric shapes */}
        <div className="relative mx-auto aspect-square w-72 md:w-[28rem]">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-emerald-400/20 blur-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid place-items-center rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <Image src="/logo.svg" alt="AI Mastery Lab Logo" width={160} height={160} className="opacity-95" />
              <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-zinc-300">Learn • Build • Automate</p>
            </div>
          </div>
          <ShapeCluster />
        </div>
      </div>
    </section>
  );
}

function Values() {
  const items = [
    { title: "Signal over noise", desc: "We filter the hype. You get only what moves the needle.", icon: "⚡️" },
    { title: "Learn by doing", desc: "Guides and education that ship with checklists and templates.", icon: "🧪" },
    { title: "Own your leverage", desc: "Automations and tools to save time, reduce errors and scale output.", icon: "🛠️" },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <h2 className="text-xl font-semibold text-white/90">Our values</h2>
        <p className="mt-2 max-w-2xl text-zinc-300">We keep things short, useful and real-world. No jargon. No walls of text.</p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm">
              <div className="text-2xl">{it.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-white/90">{it.title}</h3>
              <p className="mt-1 text-sm text-zinc-300">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatYouGet() {
  const items = [
    { title: "News", href: "/news", desc: "Weekly briefs on models, products, and policy — why it matters in 3 bullets." },
    { title: "Guides", href: "/guides", desc: "Step-by-step playbooks for real tasks: prompting, evaluation, RAG, agents." },
    { title: "Education", href: "/education", desc: "Short lessons to build durable intuition, not trivia." },
    { title: "Automations", href: "/tools", desc: "Ready-to-use workflows to save hours per week." },
    { title: "Tools", href: "/tools", desc: "Curated apps by category & pricing with quick comparisons." },
    { title: "Glossary", href: "/glossary", desc: "Plain-English definitions with examples and related links." },
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <h2 className="text-xl font-semibold text-white/90">What you’ll find here</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((card) => (
            <Link key={card.title} href={card.href} className="group rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-5 transition hover:border-white/20 hover:from-white/10">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-semibold text-white/90">{card.title}</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-300 group-hover:border-white/20">Open</span>
              </div>
              <p className="mt-2 text-sm text-zinc-300">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyItMatters() {
  const bullets = [
    "AI is a force multiplier: the same person ships 2–10× more.",
    "Winners learn fast, experiment often, and automate the boring parts.",
    "Mastery comes from consistent small wins, not one-off hacks.",
  ];

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white/90">Why AI mastery matters</h2>
          <p className="mt-2 max-w-3xl text-zinc-300">
            AI isn’t optional anymore. It’s the new baseline for productivity, creativity and decision-making. We give you the shortest path from theory to impact.
          </p>
          <ul className="mt-4 grid list-disc grid-cols-1 gap-2 pl-5 text-sm text-zinc-300 md:grid-cols-3">
            {bullets.map((b) => (<li key={b}>{b}</li>))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-6 md:p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white">Get the weekly brief</h2>
              <p className="mt-1 max-w-xl text-zinc-300">One concise email: biggest shifts, best tools, and one actionable play.</p>
            </div>
            <form action="/newsletter" className="flex w-full max-w-md items-center gap-2">
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="flex-1 rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-white/20"
              />
              <button className="rounded-xl bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-zinc-100">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <FooterLinks />
      </div>
    </section>
  );
}

function FooterLinks() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-zinc-400 sm:grid-cols-3 md:grid-cols-6">
      <Link className="hover:text-zinc-200" href="/about">About</Link>
      <Link className="hover:text-zinc-200" href="/contact">Contact</Link>
      <Link className="hover:text-zinc-200" href="/privacy">Privacy</Link>
      <Link className="hover:text-zinc-200" href="/news">News</Link>
      <Link className="hover:text-zinc-200" href="/guides">Guides</Link>
      <Link className="hover:text-zinc-200" href="/education">Education</Link>
    </div>
  );
}

// --- Small atoms ----------------------------------------------------------------
function Benefit({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="h-5 w-5 rounded-full border border-white/15 bg-white/10" />
      <span className="text-sm text-zinc-300">{children}</span>
    </div>
  );
}

function ShapeCluster() {
  // Just some floating shapes for visual interest
  return (
    <div aria-hidden={true} className="pointer-events-none absolute inset-0">
      <span className="absolute -left-4 top-6 h-16 w-16 rounded-2xl border border-white/10 bg-white/5" />
      <span className="absolute bottom-6 right-8 h-10 w-10 rounded-full border border-white/10 bg-white/5" />
      <span className="absolute left-20 bottom-10 h-6 w-24 rounded-full border border-white/10 bg-white/5" />
    </div>
  );
}
