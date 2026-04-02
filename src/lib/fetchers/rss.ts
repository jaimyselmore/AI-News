// Decode common HTML entities (numeric + named)
function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g,  '&')
    .replace(/&lt;/g,   '<')
    .replace(/&gt;/g,   '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&ldquo;/g, '\u201C');
}

// RSS feeds gericht op praktische AI — tools, tips, nieuws
const FEEDS = [
  { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', source: 'TechCrunch' },
  { url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', source: 'The Verge' },
  { url: 'https://venturebeat.com/category/ai/feed/', source: 'VentureBeat' },
  { url: 'https://www.wired.com/feed/tag/artificial-intelligence/latest/rss', source: 'Wired' },
];

function extractXml(block: string, tag: string): string {
  // CDATA eerst proberen
  const stripTags = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const cdata = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
  if (cdata) return stripTags(cdata[1]);
  // Daarna plain tekst
  const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  return plain ? stripTags(plain[1]) : '';
}

async function parseFeed(url: string, source: string) {
  try {
    const xml = await fetch(url, { next: { revalidate: 21600 } }).then(r => r.text());
    const items: { title: string; description: string; url: string; date: string; source: string; image?: string }[] = [];
    const re = /<(?:item|entry)>([\s\S]*?)<\/(?:item|entry)>/g;
    let m;

    while ((m = re.exec(xml)) !== null && items.length < 8) {
      const b = m[1];
      const title = decodeEntities(extractXml(b, 'title'));
      const description = decodeEntities(
        (extractXml(b, 'description') ||
         extractXml(b, 'summary') ||
         extractXml(b, 'content'))
        .slice(0, 400)
      );
      // <link> kan een plain element of een href-attribuut hebben (Atom)
      const link = extractXml(b, 'link') || (b.match(/href="([^"]+)"/) ?? [])[1] || '';
      const pubDate = extractXml(b, 'pubDate') || extractXml(b, 'published') || extractXml(b, 'updated');

      // Extraheer afbeelding — probeer meerdere patronen in volgorde van betrouwbaarheid
      const imgMatch =
        // media:content met medium="image" (volgorde-onafhankelijk)
        b.match(/media:content[^>]*\bmedium="image"[^>]*url="([^"]+)"/) ||
        b.match(/media:content[^>]*url="([^"]+)"[^>]*\bmedium="image"/) ||
        // media:thumbnail
        b.match(/media:thumbnail[^>]*url="([^"]+)"/) ||
        // enclosure met image type
        b.match(/enclosure[^>]*url="([^"]+)"[^>]*type="image/) ||
        b.match(/enclosure[^>]*type="image[^"]*"[^>]*url="([^"]+)"/) ||
        // media:content met image extensie
        b.match(/media:content[^>]*url="([^"]*\.(?:jpg|jpeg|png|webp)(?:\?[^"]*)?)"/) ||
        // img tag in content/description
        b.match(/<img[^>]+src="(https?:[^"]+\.(?:jpg|jpeg|png|webp)(?:[^"]*)?)"/) ||
        null;
      const image = imgMatch ? imgMatch[1] : undefined;

      if (title) {
        items.push({
          title,
          description,
          url: link,
          date: pubDate
            ? new Date(pubDate).toISOString().split('T')[0]
            : new Date().toISOString().split('T')[0],
          source,
          image,
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
