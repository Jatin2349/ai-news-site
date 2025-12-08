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
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col justify-between rounded-xl border border-white/10 bg-zinc-900/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/30 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-amber-900/10"
    >
      <div>
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-white group-hover:text-amber-400 transition-colors">
            {tool.name}
          </h3>
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

        <p className="mt-3 text-sm text-zinc-400 line-clamp-2">
          {tool.summary || 'No summary available.'}
        </p>
      </div>
      
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
         <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
           {tool.category || "General"}
         </span>
         <div className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:text-amber-300">
           VISIT 
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
             <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
             <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
           </svg>
         </div>
      </div>
    </Link>
  );
}