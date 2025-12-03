export const revalidate = 0;

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-zinc-500/30">
      
      <div className="relative border-b border-white/5 bg-black/20 py-12 backdrop-blur-xl">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-zinc-500">Last updated: November 2025</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        <div className="prose prose-invert prose-zinc max-w-none rounded-3xl border border-white/10 bg-zinc-900/30 p-8 md:p-12">
          <h3>1. Introduction</h3>
          <p>
            Welcome to AI Mastery Lab. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you as to how we look after your personal data when you visit our website 
            (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
          </p>

          <h3>2. The Data We Collect</h3>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul>
            <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location.</li>
          </ul>

          <h3>3. How We Use Your Data</h3>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g. sending the newsletter).</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}