const AI_KEYWORDS = [
  ' ai ', 'llm', 'gpt', 'claude', 'gemini', 'openai', 'anthropic',
  'midjourney', 'machine learning', 'chatgpt', 'copilot', 'sora',
  'runway', 'elevenlabs', 'generative', 'neural', 'agent',
  'hugging face', 'cursor ', 'perplexity', 'stable diffusion',
  'artificial intelligence', 'large language',
];

function isAiRelevant(title: string): boolean {
  const t = ` ${title.toLowerCase()} `;
  return AI_KEYWORDS.some(kw => t.includes(kw));
}

export async function fetchHackerNews() {
  const ids: number[] = await fetch(
    'https://hacker-news.firebaseio.com/v0/topstories.json',
    { next: { revalidate: 21600 } }
  ).then(r => r.json());

  const results = await Promise.allSettled(
    ids.slice(0, 100).map(id =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
        next: { revalidate: 21600 },
      }).then(r => r.json())
    )
  );

  return results
    .filter((r): r is PromiseFulfilledResult<any> =>
      r.status === 'fulfilled' && !!r.value?.title && isAiRelevant(r.value.title)
    )
    .slice(0, 15)
    .map(r => ({
      title: r.value.title as string,
      description: r.value.title as string, // HN heeft geen body
      url: (r.value.url ?? `https://news.ycombinator.com/item?id=${r.value.id}`) as string,
      date: new Date((r.value.time as number) * 1000).toISOString().split('T')[0],
      source: r.value.url
        ? new URL(r.value.url as string).hostname.replace('www.', '')
        : 'Hacker News',
    }));
}
