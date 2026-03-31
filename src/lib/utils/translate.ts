/**
 * Vertaal teksten naar Nederlands via de DeepL Free API.
 * Zet DEEPL_API_KEY in .env.local (en Vercel env vars).
 * Zonder key worden de originele teksten teruggegeven.
 *
 * Gratis DeepL key: https://www.deepl.com/pro#developer
 */
export async function translateToNL(texts: string[]): Promise<string[]> {
  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey || texts.length === 0) return texts;

  try {
    const res = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: texts, target_lang: 'NL' }),
      // Cache vertalingen 1 week — elk uniek stuk tekst wordt maar 1x vertaald
      next: { revalidate: 604800 },
    });

    if (!res.ok) {
      console.warn('[DeepL] vertaling mislukt:', res.status);
      return texts;
    }

    const data = await res.json();
    return (data.translations as { text: string }[]).map(t => t.text);
  } catch (err) {
    console.warn('[DeepL] fout:', err);
    return texts;
  }
}
