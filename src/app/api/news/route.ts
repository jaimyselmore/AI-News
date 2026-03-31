import { NextResponse } from 'next/server';
import { fetchHackerNews } from '@/lib/fetchers/hackerNews';
import { fetchRssFeeds } from '@/lib/fetchers/rss';
import { classifyCategory, classifyTag, isResearch } from '@/lib/utils/classifier';
import { translateToNL } from '@/lib/utils/translate';
import { newsItems } from '@/lib/data';
import type { NewsItem } from '@/lib/data';

// Next.js cachet de response 6 uur — automatisch refresh zonder cron of database
export const dynamic = 'force-static';
export const revalidate = 21600;

export async function GET() {
  try {
    // Haal alle bronnen parallel op — als één bron uitvalt gaat de rest door
    const [hnResult, rssResult] = await Promise.allSettled([
      fetchHackerNews(),
      fetchRssFeeds(),
    ]);

    const hn  = hnResult.status  === 'fulfilled' ? hnResult.value  : [];
    const rss = rssResult.status === 'fulfilled' ? rssResult.value : [];
    const raw = [...hn, ...rss];

    // Dedupliceer op URL
    const seen = new Set<string>();
    const unique = raw.filter(item => {
      if (!item.url || seen.has(item.url)) return false;
      seen.add(item.url);
      return true;
    });

    // Filter academisch onderzoek eruit
    const filtered = unique.filter(item => !isResearch(item.title));

    if (filtered.length === 0) return NextResponse.json(newsItems);

    // Vertaal naar Nederlands (via DeepL; zonder key → originele tekst)
    const [titlesNL, descriptionsNL] = await Promise.all([
      translateToNL(filtered.map(i => i.title)),
      translateToNL(filtered.map(i => i.description || i.title)),
    ]);

    const items: NewsItem[] = filtered.map((item, i) => ({
      id: `live-${i}`,
      title:    titlesNL[i]       || item.title,
      summary:  descriptionsNL[i] || item.description || item.title,
      category: classifyCategory(item.title),
      tag:      classifyTag(item.title),
      date:     item.date,
      readTime: Math.max(2, Math.floor(item.title.length / 40)),
      source:   item.source,
      url:      item.url,
      featured: i === 0,
    }));

    return NextResponse.json(items);
  } catch (err) {
    console.error('[/api/news] ophalen mislukt, fallback op statische data:', err);
    return NextResponse.json(newsItems);
  }
}
