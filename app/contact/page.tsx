export const revalidate = 0;

function MailIcon({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-indigo-500/30">
      
      <div className="relative border-b border-white/5 bg-black/20 py-16 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Touch</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              Questions, feedback, or partnership opportunities? We'd love to hear from you.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-8 text-center md:p-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10">
            <MailIcon className="h-8 w-8 text-indigo-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-white">Email Us</h2>
          <p className="mt-2 text-zinc-400">
            The best way to reach us is via email. We typically respond within 24-48 hours.
          </p>
          
          <a href="mailto:hello@aimasterylab.com" className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition hover:bg-zinc-200">
            hello@aimasterylab.com
          </a>
        </div>
      </div>
    </main>
  );
}