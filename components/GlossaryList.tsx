'use client';

import { useState, useMemo } from 'react';

interface GlossaryEntry {
  id: string;
  term: string;
  definition: string;
}

export function GlossaryList({ initialTerms }: { initialTerms: GlossaryEntry[] }) {
  const [search, setSearch] = useState('');
  
  // Das Alphabet für die Navigation
  const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Filtern
  const filteredTerms = useMemo(() => {
    return initialTerms.filter((item) => 
      item.term.toLowerCase().includes(search.toLowerCase()) || 
      item.definition.toLowerCase().includes(search.toLowerCase())
    );
  }, [initialTerms, search]);

  // Gruppieren
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryEntry[]> = {};
    filteredTerms.forEach(term => {
      const letter = term.term.charAt(0).toUpperCase();
      const key = isNaN(Number(letter)) ? letter : '#';
      if (!groups[key]) groups[key] = [];
      groups[key].push(term);
    });
    return groups;
  }, [filteredTerms]);

  // Scroll-Funktion
  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      // Smooth scroll mit etwas Abstand nach oben (offset)
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative flex flex-col lg:flex-row lg:gap-12">
      
      {/* --- LEFT SIDEBAR (Desktop Only) --- */}
      <div className="hidden lg:block lg:w-16">
        <div className="sticky top-24 flex flex-col items-center gap-1 rounded-full border border-white/10 bg-[#0A0B0F]/90 py-4 backdrop-blur-md">
          {alphabet.map((char) => (
            <button
              key={char}
              onClick={() => scrollToLetter(char)}
              disabled={!groupedTerms[char]} // Ausgrauen, wenn keine Begriffe da sind
              className={`h-6 w-6 text-[10px] font-bold transition-all ${
                groupedTerms[char] 
                  ? 'text-zinc-400 hover:text-rose-400 hover:scale-125' 
                  : 'text-zinc-800 cursor-not-allowed'
              }`}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1">
        
        {/* Search Bar (Top) */}
        <div className="mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search 100+ AI terms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-lg text-white placeholder-zinc-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
            <div className="absolute right-6 top-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
          </div>
        </div>

        {/* --- MOBILE FILTER (Horizontal Scroll) --- */}
        <div className="lg:hidden mb-8 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex gap-2">
            {alphabet.map((char) => (
              <button
                key={char}
                onClick={() => scrollToLetter(char)}
                disabled={!groupedTerms[char]}
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold border ${
                  groupedTerms[char] 
                    ? 'border-white/10 bg-white/5 text-white' 
                    : 'border-transparent text-zinc-700'
                }`}
              >
                {char}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-16">
          {Object.keys(groupedTerms).sort().map((letter) => (
            <div key={letter} id={`letter-${letter}`} className="scroll-mt-28">
              
              {/* Letter Header */}
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-2xl font-bold text-rose-500 border border-rose-500/20">
                  {letter}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-rose-500/20 to-transparent" />
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {groupedTerms[letter].map((entry) => (
                  <div key={entry.id} className="group relative overflow-hidden rounded-xl border border-white/5 bg-zinc-900/30 p-5 transition-all hover:border-rose-500/30 hover:bg-zinc-900/60">
                    <h3 className="mb-2 font-bold text-white group-hover:text-rose-300 transition-colors">
                      {entry.term}
                    </h3>
                    <p className="text-sm leading-relaxed text-zinc-400">
                      {entry.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredTerms.length === 0 && (
            <div className="text-center py-20">
              <p className="text-zinc-500">No terms found matching "{search}".</p>
            </div>
          )}
        </div>
      </div>

      {/* --- BACK TO TOP BUTTON (Fixed Bottom Right) --- */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/30 transition-transform hover:scale-110 hover:bg-rose-400 active:scale-95"
        title="Back to Top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
      </button>

    </div>
  );
}