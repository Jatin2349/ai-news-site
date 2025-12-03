export const revalidate = 0;

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-zinc-500/30">
      
      <div className="relative border-b border-white/5 bg-black/20 py-12 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-sm text-zinc-500">Last updated: November 2025</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="prose prose-invert prose-zinc max-w-none rounded-3xl border border-white/10 bg-zinc-900/30 p-8 md:p-12">
          <h3>1. Terms</h3>
          <p>
            By accessing this website, accessible from AI Mastery Lab, you are agreeing to be bound by these Website Terms and Conditions of Use 
            and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, 
            you are prohibited from accessing this site.
          </p>

          <h3>2. Use License</h3>
          <p>
            Permission is granted to temporarily download one copy of the materials on AI Mastery Lab's Website for personal, 
            non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose or for any public display;</li>
            <li>attempt to reverse engineer any software contained on AI Mastery Lab's Website;</li>
          </ul>

          <h3>3. Disclaimer</h3>
          <p>
            All the materials on AI Mastery Lab's Website are provided "as is". AI Mastery Lab makes no warranties, may it be expressed or implied, 
            therefore negates all other warranties. Furthermore, AI Mastery Lab does not make any representations concerning the accuracy or reliability 
            of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
          </p>
        </div>
      </div>
    </main>
  );
}