// RSS feeds gericht op praktische AI — tools, tips, nieuws
const FEEDS = [
  { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', source: 'TechCrunch' },
  { url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', source: 'The Verge' },
  { url: 'https://dev.to/feed/tag/ai', source: 'dev.to' },
];

function extractXml(block: string, tag: string): string {
  // CDATA eerst proberen
  const cdata = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
  if (cdata) return cdata[1].trim();
  // Daarna plain tekst
  const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return plain ? plain[1].replace(/<[^>]+>/g, '').trim() : '';
}

async function parseFeed(url: string, source: string) {
  try {
    const xml = await fetch(url, { next: { revalidate: 21600 } }).then(r => r.text());
    const items: { title: string; description: string; url: string; date: string; source: string }[] = [];
    const re = /<(?:item|entry)>([\s\S]*?)<\/(?:item|entry)>/g;
    let m;

    while ((m = re.exec(xml)) !== null && items.length < 8) {
      const b = m[1];
      const title = extractXml(b, 'title');
      const description = (
        extractXml(b, 'description') ||
        extractXml(b, 'summary') ||
        extractXml(b, 'content')
      ).slice(0, 400);
      // <link> kan een plain element of een href-attribuut hebben (Atom)
      const link = extractXml(b, 'link') || (b.match(/href="([^"]+)"/) ?? [])[1] || '';
      const pubDate = extractXml(b, 'pubDate') || extractXml(b, 'published') || extractXml(b, 'updated');

      if (title) {
        items.push({
          title,
          description,
          url: link,
          date: pubDate
            ? new Date(pubDate).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          source,
        });
      }
    }
    return items;
  } catch {
    return [];
  }
}

export async function fetchRssFeeds() {
  const results = await Promise.allSettled(FEEDS.map(f => parseFeed(f.url, f.source)));
  return results
    .filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled')
    .flatMap(r => r.value);
}
