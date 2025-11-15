export const SOURCES: { name: string; feed: string }[] = [
  { name: 'OpenAI Blog',           feed: 'https://openai.com/blog/rss.xml' },
  { name: 'Google AI Blog',        feed: 'https://ai.googleblog.com/feeds/posts/default?alt=rss' },
  { name: 'Google Research',       feed: 'https://research.google/blog/rss/' },
  { name: 'DeepMind',              feed: 'https://deepmind.google/discover/rss.xml' },
  { name: 'Anthropic News',        feed: 'https://www.anthropic.com/news' }, // kein RSS -> nur verlinken
  { name: 'Microsoft Research',    feed: 'https://www.microsoft.com/en-us/research/blog/feed/' },
  { name: 'Meta AI Blog',          feed: 'https://ai.meta.com/blog/' },      // ggf. via RSSHub; sonst nur verlinken
  { name: 'NVIDIA Tech Blog',      feed: 'https://developer.nvidia.com/blog/feed/' },
  { name: 'Hugging Face Blog',     feed: 'https://huggingface.co/blog/feed.xml' },
  { name: 'Stability AI',          feed: 'https://stability.ai/blog/rss.xml' },
  { name: 'Mistral AI',            feed: 'https://mistral.ai/news/feed.xml' },
  { name: 'arXiv cs.CL',           feed: 'https://rss.arxiv.org/rss/cs.CL' },
  { name: 'arXiv cs.LG',           feed: 'https://rss.arxiv.org/rss/cs.LG' },
  { name: 'NIST News (AI relevant)', feed: 'https://www.nist.gov/news-events/news.rss' },
  { name: 'EU AI Office (News Hub)', feed: 'https://digital-strategy.ec.europa.eu/en/policies/ai-office' } // HTML only
];
