export const revalidate = 0;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-emerald-500/30">
      
      {/* Header */}
      <div className="relative border-b border-white/5 bg-black/20 py-16 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AI Mastery Lab</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              We are building the operating system for the AI-native generation.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-16 md:px-6">
        <div className="space-y-12">
          
          {/* Section 1 */}
          <section className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-zinc-400 leading-relaxed">
              Artificial Intelligence is the biggest technological shift since the internet. But the noise is deafening. 
              Every day, hundreds of new tools, models, and papers are released. It is impossible to keep up alone.
            </p>
            <p className="mt-4 text-zinc-400 leading-relaxed">
              <strong>AI Mastery Lab exists to filter the signal from the noise.</strong> We don't just report news; 
              we analyze it for leverage. We don't just list tools; we test them for real-world utility.
            </p>
          </section>

          {/* Section 2 */}
          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8">
              <h3 className="text-xl font-bold text-white mb-2">For Builders</h3>
              <p className="text-sm text-zinc-400">
                We provide the blueprints, code snippets, and architectural decisions you need to build robust AI applications.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8">
              <h3 className="text-xl font-bold text-white mb-2">For Leaders</h3>
              <p className="text-sm text-zinc-400">
                Strategic insights into how AI is reshaping industries, workflows, and the future of work.
              </p>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}