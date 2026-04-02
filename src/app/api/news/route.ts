import { NextResponse } from 'next/server';
import { fetchHackerNews } from '@/lib/fetchers/hackerNews';
import { fetchRssFeeds } from '@/lib/fetchers/rss';
import { classifyCategory, classifyTag, isResearch } from '@/lib/utils/classifier';
import { translateToNL } from '@/lib/utils/translate';
import { newsItems } from '@/lib/data';
import type { NewsItem } from '@/lib/data';

// Detecteer niet-Engelse content — filter Arabisch, Chinees, Spaans, Frans, etc.
function isEnglish(text: string): boolean {
  // Niet-Latijnse schriften: Arabisch, Devanagari, CJK, Japans, Koreaans, Cyrillisch, Grieks
  if (/[\u0600-\u06FF\u0900-\u097F\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF\u0400-\u04FF\u0370-\u03FF]/.test(text)) {
    return false;
  }
  // Spaans: ¿ ¡ of veelvoorkomende Spaanse woorden
  if (/[¿¡]/.test(text)) return false;
  if (/\b(cómo|qué|está|están|también|sobre|pero|para|los|las|del|artículo)\b/i.test(text)) return false;
  // Frans: herkenbare patronen
  if (/\b(comment ne plus|pourquoi|qu'il|qu'elle|c'est\b|n'est\b|d'une|l'IA\b|intelligence artificielle)\b/i.test(text)) return false;
  return true;
}

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

    // Filter academisch onderzoek en niet-Engelstalige artikelen eruit
    const filtered = unique.filter(item =>
      !isResearch(item.title) &&
      isEnglish(item.title) &&
      isEnglish(item.description || '')
    );

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
      image:    item.image,
      featured: i === 0,
    }));

    return NextResponse.json(items);
  } catch (err) {
    console.error('[/api/news] ophalen mislukt, fallback op statische data:', err);
    return NextResponse.json(newsItems);
  }
}
