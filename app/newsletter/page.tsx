'use client';

import { useState } from 'react';
import Link from 'next/link';

// Client Component wegen Interaktivität (useState)
export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subscribe = async () => {
    if (!email) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  const benefits = [
    "Weekly AI Trends & Analysis",
    "Curated Tools & Libraries",
    "Exclusive Tutorials & Guides",
    "No Spam, Unsubscribe Anytime"
  ];

  return (
    <main className="min-h-screen bg-[#0A0B0F] text-zinc-100 selection:bg-indigo-500/30">
      
      {/* Header */}
      <div className="relative border-b border-white/5 bg-black/20 py-16 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              AI Mastery <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">Brief</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-400">
              Join developers and engineers staying ahead of the AI curve. One email per week, zero fluff.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mx-auto max-w-2xl">
          
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-8 text-center transition-all hover:border-indigo-500/30 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-indigo-900/20 md:p-12">
            
            <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl transition-all group-hover:bg-indigo-500/30" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-indigo-400"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>

              <h2 className="text-2xl font-bold text-white">Subscribe to the Newsletter</h2>
              <p className="mt-2 text-zinc-400">
                Get the signal, skip the noise.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-zinc-300">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Active Form */}
              <div className="mt-10 w-full max-w-md">
                {status === 'success' ? (
                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-emerald-400 font-medium">
                    🎉 You're in! Welcome to the club.
                  </div>
                ) : (
                  <div className="relative flex items-center">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && subscribe()}
                      placeholder="Enter your email address" 
                      className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                    <button 
                      onClick={subscribe}
                      disabled={status === 'loading'}
                      className="absolute right-1.5 rounded-lg bg-white px-4 py-1.5 text-sm font-bold text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
                    >
                      {status === 'loading' ? '...' : 'Join'}
                    </button>
                  </div>
                )}
                {status === 'error' && (
                  <p className="mt-3 text-xs font-medium text-red-400">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}