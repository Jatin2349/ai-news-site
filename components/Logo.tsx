import React from 'react';

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Das Logo-Icon: Ein Laborkolben mit einem "Neural Node" darin */}
      <div className="relative flex items-center justify-center">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={`${className} text-emerald-400`}
        >
          {/* Kolben Form */}
          <path d="M10 2v7.31l-4.5 9.15a1 1 0 0 0 .9 1.54h11.2a1 1 0 0 0 .9-1.54L14 9.31V2" />
          <path d="M8 2h8" />
          <path d="M12 14v6" />
          
          {/* Bubbles / Nodes (AI Element) */}
          <circle cx="12" cy="11" r="1" className="fill-current animate-pulse" />
        </svg>
        
        {/* Glow Effekt hinter dem Logo */}
        <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full" />
      </div>

      {/* Text Mark */}
      <span className="font-bold tracking-tight text-white text-lg">
        AI Mastery <span className="text-emerald-400">Lab</span>
      </span>
    </div>
  );
}