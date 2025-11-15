type Basic = { title: string; text: string };

export function ruleCategory({ title, text }: Basic): { category: string; tags: string[] } {
  const s = (title + ' ' + text).toLowerCase();

  if (/(released|launch|available|beta|general availability|ga|ship)/.test(s))
    return { category: 'NEW_TOOLS', tags: ['release','tool'] };

  if (/(throughput|latency|inference|gpu|memory|kv-cache|fine-tun|quantiz|benchmark)/.test(s))
    return { category: 'MODEL_INFRA_UPDATES', tags: ['inference','infra'] };

  if (/(regulation|act|policy|governance|compliance|risk|safety|audit)/.test(s))
    return { category: 'POLICY_SAFETY', tags: ['policy','safety'] };

  if (/(paper|arxiv|dataset|benchmark|state-of-the-art|sota)/.test(s))
    return { category: 'RESEARCH', tags: ['paper'] };

  if (/(acquire|acquisition|funding|partnership|deal|merger|ipo|pricing)/.test(s))
    return { category: 'BUSINESS_MARKET', tags: ['business'] };

  return { category: 'CURRENT_NEWS', tags: [] };
}
