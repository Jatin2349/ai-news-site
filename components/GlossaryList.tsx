'use client';

import { useState, useMemo } from 'react';

interface GlossaryEntry {
  id: string;
  term: string;
  definition: string;
}

export function GlossaryList({ initialTerms }: { initialTerms: GlossaryEntry[] }) {
  const [search, setSearch] = useState('');
  const [activeLetter, setActiveLetter] = useState('ALL');

  // Alphabet generieren
  const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Filtern der Begriffe
  const filteredTerms = useMemo(() => {
    return initialTerms.filter((item) => {
      const matchesSearch = item.term.toLowerCase().includes(search.toLowerCase()) || 
                            item.definition.toLowerCase().includes(search.toLowerCase());
      
      const firstChar = item.term.charAt(0).toUpperCase();
      const matchesLetter = activeLetter === 'ALL' || 
                            (activeLetter === '#' ? !isNaN(Number(firstChar)) : firstChar === activeLetter);

      return matchesSearch && matchesLetter;
    });
  }, [initialTerms, search, activeLetter]);

  // Gruppieren für die Anzeige (A-Z Headers)
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

  return (
    <div>
      {/* --- Controls --- */}
      <div className="sticky top-20 z-30 mb-12 space-y-6 rounded-2xl border border-white/10 bg-[#0A0B0F]/80 p-6 backdrop-blur-xl shadow-2xl">
        
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search 100+ AI terms (e.g. 'RAG', 'Transformer')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-lg text-white placeholder-zinc-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </div>

        {/* Alphabet Bar */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveLetter('ALL')}
            className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
              activeLetter === 'ALL' 
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25' 
                : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            ALL
          </button>
          {alphabet.map((char) => (
            <button
              key={char}
              onClick={() => setActiveLetter(char)}
              className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-full transition-all ${
                activeLetter === char 
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25' 
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {char}
            </button>
          ))}
        </div>
      </div>

      {/* --- Results --- */}
      <div className="space-y-12">
        {Object.keys(groupedTerms).sort().map((letter) => (
          <div key={letter} className="relative">
            
            {/* Letter Header */}
            <div className="sticky top-44 z-20 mb-6 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-2xl font-bold text-rose-500 border border-rose-500/20 backdrop-blur-md">
                {letter}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-rose-500/20 to-transparent" />
            </div>

            {/* Grid for this Letter */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groupedTerms[letter].map((entry) => (
                <div key={entry.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-6 transition-all hover:border-rose-500/30 hover:bg-zinc-900/80">
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
    </div>
  );
}