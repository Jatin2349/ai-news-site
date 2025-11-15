import crypto from 'crypto';

export function urlHash(url: string) {
  return crypto.createHash('sha256').update(url.trim().toLowerCase()).digest('hex');
}

export function normalizeTitle(t: string) {
  return t.toLowerCase()
    .replace(/\b(\d{2,4}|\d+\.\d+)\b/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\b(a|an|the|of|for|and|in|to|with|on|at|by|from)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function titleSimilarity(a: string, b: string) {
  const A = new Set(normalizeTitle(a).split(' '));
  const B = new Set(normalizeTitle(b).split(' '));
  const inter = [...A].filter(x => B.has(x)).length;
  const union = new Set([...A, ...B]).size || 1;
  return inter / union;
}

export function domainOf(u: string) {
  try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return null; }
}
