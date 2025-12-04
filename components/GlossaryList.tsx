'use client';

import { useState, useMemo, useEffect } from 'react';

interface GlossaryEntry {
  id: string;
  term: string;
  definition: string;
}

export function GlossaryList({ initialTerms }: { initialTerms: GlossaryEntry[] }) {
  const [search, setSearch] = useState('');
  const [showTopBtn, setShowTopBtn] = useState(false);
  
  const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Scroll-Listener für den "Nach oben"-Button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Scrollen zu Buchstabe
  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 40; // Kleiner Offset
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      
      {/* --- CONTROLS (Search + Horizontal Alphabet) --- */}
      {/* Nicht mehr sticky, scrollt einfach mit weg */}
      <div className="mb-16 space-y-6">
        
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search 100+ AI terms (e.g. 'RAG', 'Transformer')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-lg text-white placeholder-zinc-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 shadow-xl"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>

        {/* Horizontal Alphabet Bar */}
        <div className="flex flex-wrap justify-center gap-2 px-4">
          {alphabet.map((char) => (
            <button
              key={char}
              onClick={() => scrollToLetter(char)}
              disabled={!groupedTerms[char]}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                groupedTerms[char] 
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-rose-500 hover:text-white cursor-pointer hover:scale-110' 
                  : 'bg-transparent text-zinc-800 cursor-not-allowed'
              }`}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      {/* --- RESULTS --- */}
      <div className="space-y-20 min-h-[50vh]">
        {Object.keys(groupedTerms).sort().map((letter) => (
          <div key={letter} id={`letter-${letter}`} className="scroll-mt-12">
            
            {/* Letter Header */}
            <div className="mb-8 flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-3xl font-bold text-rose-500 border border-rose-500/20 shadow-lg shadow-rose-900/20">
                {letter}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-rose-500/20 to-transparent" />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groupedTerms[letter].map((entry) => (
                <div key={entry.id} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/30 p-6 transition-all hover:border-rose-500/30 hover:bg-zinc-900/60 hover:shadow-xl hover:shadow-rose-900/10">
                  <h3 className="mb-3 text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
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
            <p className="text-zinc-500 text-lg">No terms found matching "{search}".</p>
            <button onClick={() => setSearch('')} className="mt-4 text-rose-400 hover:underline">Clear Search</button>
          </div>
        )}
      </div>

      {/* Back to Top Button (Nur sichtbar wenn gescrollt) */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/30 transition-all duration-300 hover:scale-110 hover:bg-rose-400 active:scale-95 ${
          showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        title="Back to Top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
      </button>

    </div>
  );
}