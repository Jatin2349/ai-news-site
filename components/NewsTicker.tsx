'use client';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (u:string)=>fetch(u).then(r=>r.json());

export default function NewsTicker() {
  const { data } = useSWR('/api/news/latest?limit=30', fetcher, { refreshInterval: 60_000 });
  const items = data?.items || [];
  if (!items.length) return null;

  return (
    <div className="w-full overflow-hidden border rounded-2xl bg-white/50">
      <div className="flex gap-8 py-2 px-4 whitespace-nowrap animate-[ticker_35s_linear_infinite]">
        {items.concat(items).map((n:any, i:number)=>(
          <Link key={n.id + '-' + i} href={`/en/news/${n.id}`} className="text-sm hover:underline">
            {n.title}
          </Link>
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
