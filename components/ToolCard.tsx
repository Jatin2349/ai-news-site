import Link from 'next/link';
import React from 'react';

// Wir definieren den Typ hier manuell, um Fehler mit dem Prisma-Client zu vermeiden
type ToolProps = {
  tool: {
    id: string;
    name: string;
    url: string;
    // Optionale Felder (können null sein)
    summary: string | null;
    category: string | null;
    pricing: string | null;
    affiliate_code: string | null;
    rating: number | null;
  };
};

export default function ToolCard({ tool }: ToolProps) {
  // Sicherstellen, dass URL existiert (Fallback, falls DB leer)
  const toolUrl = tool.url || '#';
  
  // Affiliate Link Logik
  const link = tool.affiliate_code 
    ? `${toolUrl}?ref=${encodeURIComponent(tool.affiliate_code)}` 
    : toolUrl;

  // Rating Sterne Logik (0 bis 5), Fallback auf 0
  const stars = Math.max(0, Math.min(5, tool.rating ?? 0));

  return (
    <div
      className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-zinc-900/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-amber-900/10"
    >
      <div>
        {/* Header: Name und Pricing */}
        <div className="flex items-start justify-between">
          <Link href={link} target="_blank" rel="noopener noreferrer">
             <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer">
              {tool.name}
            </h3>
          </Link>
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tool.pricing === 'Free' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/10 text-zinc-400'}`}>
            {tool.pricing || "Unknown"}
          </span>
        </div>
        
        {/* Sterne Rating */}
        {tool.rating !== null && tool.rating > 0 && (
          <div className="mt-1 flex items-center gap-0.5 text-amber-500">
             {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill={i < stars ? "currentColor" : "none"} 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className={`h-3 w-3 ${i < stars ? '' : 'opacity-30'}`}
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
             ))}
          </div>
        )}

        {/* SUMMARY MIT TOOLTIP-EFFEKT */}
        <div className="relative group/tooltip mt-3">
          {/* 1. Sichtbarer, gekürzter Text (Vorschau) */}
          <p className="text-sm text-zinc-400 line-clamp-2 cursor-help decoration-zinc-600/50 underline-offset-4 transition-colors group-hover/tooltip:text-zinc-200">
            {tool.summary || 'No summary available.'}
          </p>

          {/* 2. Der Tooltip (Erscheint nur bei Hover über den Text) */}
          {tool.summary && (
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-64 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover/tooltip:opacity-100 group-hover/tooltip:pointer-events-auto z-50">
              <div className="relative rounded-lg border border-white/10 bg-[#0A0B0F] p-4 shadow-2xl shadow-black/50">
                <p className="text-xs leading-relaxed text-zinc-200">
                  {tool.summary}
                </p>
                {/* Kleiner Pfeil nach unten */}
                <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-[#0A0B0F]"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer: Kategorie und Link */}
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
         <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
           {tool.category || "General"}
         </span>
         <Link 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
         >
           VISIT 
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
             <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
             <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
           </svg>
         </Link>
      </div>
    </div>
  );
}