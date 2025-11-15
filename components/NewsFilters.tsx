'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const CATEGORIES = [
  { id: 'CURRENT_NEWS', label: 'Current' },
  { id: 'NEW_TOOLS', label: 'New Tools' },
  { id: 'MODEL_INFRA_UPDATES', label: 'Model/Infra' },
  { id: 'POLICY_SAFETY', label: 'Policy/Safety' },
  { id: 'RESEARCH', label: 'Research' },
  { id: 'BUSINESS_MARKET', label: 'Business' },
];

export default function NewsFilters({ keywords = [] as string[] }) {
  const router = useRouter();
  const sp = useSearchParams();
  const pathname = usePathname();

  const activeCat = sp.get('category') || '';
  const activeTag = sp.get('tag') || '';

  function setParam(k:string, v:string) {
    const p = new URLSearchParams(sp.toString());
    if (v) p.set(k, v); else p.delete(k);
    router.push(`${pathname}?${p.toString()}`);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={()=>setParam('category', activeCat===c.id ? '' : c.id)}
            className={`px-3 py-1 rounded-2xl border text-sm ${activeCat===c.id ? 'bg-black text-white' : ''}`}
          >
            {c.label}
          </button>
        ))}
      </div>
      {!!keywords.length && (
        <div className="flex flex-wrap gap-2">
          {keywords.slice(0,20).map(k => (
            <button
              key={k}
              onClick={()=>setParam('tag', activeTag===k ? '' : k)}
              className={`px-2 py-1 rounded-xl border text-xs ${activeTag===k ? 'bg-black text-white' : ''}`}
            >
              #{k}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
