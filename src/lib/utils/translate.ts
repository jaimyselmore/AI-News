/**
 * Vertaal teksten naar Nederlands via MyMemory (gratis, geen creditcard).
 * Optioneel: zet MYMEMORY_EMAIL in Vercel env vars voor hogere limiet
 * (50.000 tekens/dag met email vs 5.000/dag zonder).
 *
 * Zonder email werkt het gewoon — voor een nieuwssite ruim voldoende.
 */
export async function translateToNL(texts: string[]): Promise<string[]> {
  if (texts.length === 0) return texts;

  const email = process.env.MYMEMORY_EMAIL ?? '';

  try {
    const results = await Promise.all(
      texts.map(async (text) => {
        if (!text || text.trim().length === 0) return text;

        const url = new URL('https://api.mymemory.translated.net/get');
        url.searchParams.set('q', text.slice(0, 500)); // max 500 tekens per request
        url.searchParams.set('langpair', 'en|nl');
        if (email) url.searchParams.set('de', email);

        const res = await fetch(url.toString(), {
          next: { revalidate: 86400 }, // cache 24u per unieke tekst
          signal: AbortSignal.timeout(4000), // max 4s per vertaling
        });

        if (!res.ok) return text;

        const data = await res.json();
        const translated: string = data?.responseData?.translatedText;

        // MyMemory geeft soms de originele tekst terug als vertaling mislukt
        if (!translated || translated === text) return text;
        return translated;
      })
    );

    return results;
  } catch (err) {
    console.warn('[MyMemory] vertaling mislukt, originele tekst gebruikt:', err);
    return texts;
  }
}
