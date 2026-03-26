export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  category: "nieuws" | "tips" | "tools" | "update";
  tag: string;
  date: string;
  readTime: number;
  featured?: boolean;
  image?: string;
  source?: string;
  url?: string;
};

export type Tool = {
  id: string;
  name: string;
  description: string;
  category: "gebruiken-we" | "aanrader" | "nieuwe";
  tags: string[];
  pricing: "gratis" | "betaald" | "freemium";
  url?: string;
  logo?: string;
  trending?: boolean;
};

export type TipItem = {
  id: string;
  title: string;
  content: string;
  level: "beginner" | "gevorderd" | "pro";
  tool?: string;
  date: string;
};

export const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "OpenAI lanceert GPT-5 met razendsnelle beeldgeneratie",
    summary:
      "De nieuwste versie van ChatGPT combineert tekst en beeld in één model. Reactietijden zijn 10x sneller dan GPT-4o en creatieve output is drastisch verbeterd.",
    category: "nieuws",
    tag: "BREAKING",
    date: "2026-03-26",
    readTime: 3,
    featured: true,
    source: "OpenAI Blog",
  },
  {
    id: "2",
    title: "Google Gemini 2.0 Ultra: multimodaal en voor iedereen beschikbaar",
    summary:
      "Google opent Gemini 2.0 Ultra voor alle gebruikers. Het model scoort hoger dan GPT-4o op vrijwel alle benchmarks en biedt native video-begrip.",
    category: "nieuws",
    tag: "UPDATE",
    date: "2026-03-25",
    readTime: 4,
    source: "Google DeepMind",
  },
  {
    id: "3",
    title: "Midjourney V7: fotorealisme op een nieuw niveau",
    summary:
      "Midjourney V7 zet een nieuwe standaard voor AI-beeldgeneratie. Consistentie van karakters, realistische verlichting en stijlcontrole zijn enorm verbeterd.",
    category: "tools",
    tag: "TOOLS",
    date: "2026-03-24",
    readTime: 3,
    source: "Midjourney",
  },
  {
    id: "4",
    title: "Anthropic Claude 4: redeneren op menselijk niveau",
    summary:
      "Claude 4 haalt voor het eerst menselijk niveau op complexe redeneertaken. Ideaal voor langere content workflows en strategische analyses.",
    category: "nieuws",
    tag: "AI",
    date: "2026-03-23",
    readTime: 5,
    source: "Anthropic",
  },
  {
    id: "5",
    title: "Runway Gen-4: volledige advertentiefilms automatisch genereren",
    summary:
      "Runway's Gen-4 model maakt het mogelijk om complete merkfilms te genereren vanuit een briefing. Commercials van 30 seconden in minuten.",
    category: "tools",
    tag: "VIDEO",
    date: "2026-03-22",
    readTime: 4,
    source: "Runway",
  },
  {
    id: "6",
    title: "Adobe Firefly 4 in Creative Cloud: AI als standaard workflow",
    summary:
      "Adobe integreert Firefly 4 dieper in Photoshop en Premiere. Generatieve fill, achtergrondverwijdering en smart reframe werken nu in real-time.",
    category: "update",
    tag: "UPDATE",
    date: "2026-03-21",
    readTime: 3,
    source: "Adobe",
  },
  {
    id: "7",
    title: "EU AI Act: wat betekent dit voor Nederlandse bureaus?",
    summary:
      "De Europese AI-wet treedt gefaseerd in werking. Creative agencies moeten transparant zijn over AI-gebruik in campagnes. Overzicht van de regels.",
    category: "nieuws",
    tag: "REGELGEVING",
    date: "2026-03-20",
    readTime: 6,
    source: "Tweakers",
  },
  {
    id: "8",
    title: "ElevenLabs lanceeert realtime stemkloning voor 150+ talen",
    summary:
      "ElevenLabs maakt stemkloning in 150 talen mogelijk met realtime verwerking. Ideaal voor internationale campagnes en voiceovers.",
    category: "tools",
    tag: "AUDIO",
    date: "2026-03-19",
    readTime: 3,
    source: "ElevenLabs",
  },
];

export const tools: Tool[] = [
  {
    id: "1",
    name: "ChatGPT",
    description:
      "Tekstgeneratie, brieven, concepts, strategie en contentcreatie.",
    category: "gebruiken-we",
    tags: ["tekst", "strategie", "content"],
    pricing: "freemium",
    url: "https://chat.openai.com",
    trending: false,
  },
  {
    id: "2",
    name: "Midjourney",
    description:
      "De beste AI voor fotorealistische beelden en creatieve visuals.",
    category: "gebruiken-we",
    tags: ["beeld", "design", "fotografie"],
    pricing: "betaald",
    url: "https://midjourney.com",
    trending: true,
  },
  {
    id: "3",
    name: "Runway",
    description:
      "AI-videobewerking en -generatie voor commercials en social content.",
    category: "gebruiken-we",
    tags: ["video", "animatie", "film"],
    pricing: "freemium",
    url: "https://runwayml.com",
    trending: true,
  },
  {
    id: "4",
    name: "ElevenLabs",
    description: "Realistische AI-stemmen en voiceovers in elke taal.",
    category: "gebruiken-we",
    tags: ["audio", "voice", "podcast"],
    pricing: "freemium",
    url: "https://elevenlabs.io",
    trending: false,
  },
  {
    id: "5",
    name: "Adobe Firefly",
    description: "Generatieve AI direct in Photoshop en Premiere Pro.",
    category: "gebruiken-we",
    tags: ["design", "foto", "video"],
    pricing: "betaald",
    url: "https://firefly.adobe.com",
    trending: false,
  },
  {
    id: "6",
    name: "Claude",
    description:
      "Langere documenten, strategie en complexe redeneertaken. Sterk in schrijven.",
    category: "gebruiken-we",
    tags: ["tekst", "analyse", "strategie"],
    pricing: "freemium",
    url: "https://claude.ai",
    trending: true,
  },
  {
    id: "7",
    name: "Sora",
    description:
      "OpenAI's videogeneratiemodel. Lange, coherente video clips vanuit tekst.",
    category: "aanrader",
    tags: ["video", "animatie"],
    pricing: "betaald",
    url: "https://openai.com/sora",
    trending: true,
  },
  {
    id: "8",
    name: "Kling AI",
    description:
      "Chinese concurrent van Sora — soms betere resultaten, gratis tier beschikbaar.",
    category: "aanrader",
    tags: ["video", "animatie"],
    pricing: "freemium",
    url: "https://kling.ai",
    trending: true,
  },
  {
    id: "9",
    name: "Perplexity",
    description:
      "AI-zoekmachine met bronvermelding. Ideaal voor research en marktanalyse.",
    category: "aanrader",
    tags: ["research", "search", "analyse"],
    pricing: "freemium",
    url: "https://perplexity.ai",
    trending: false,
  },
  {
    id: "10",
    name: "Notion AI",
    description:
      "AI direct in je projectmanagement. Samenvattingen, taken en drafts.",
    category: "aanrader",
    tags: ["productiviteit", "planning"],
    pricing: "betaald",
    url: "https://notion.so",
    trending: false,
  },
  {
    id: "11",
    name: "HeyGen",
    description:
      "Maak AI-avatars die jouw script presenteren. Ideaal voor productvideo's.",
    category: "aanrader",
    tags: ["video", "avatar", "presentatie"],
    pricing: "freemium",
    url: "https://heygen.com",
    trending: true,
  },
  {
    id: "12",
    name: "Lovable",
    description:
      "Bouw complete web apps met AI. Van prompt naar werkende website in minuten.",
    category: "nieuwe",
    tags: ["development", "no-code", "web"],
    pricing: "freemium",
    url: "https://lovable.dev",
    trending: true,
  },
];

export const tips: TipItem[] = [
  {
    id: "1",
    title: "Gebruik 'Act as' voor betere ChatGPT output",
    content:
      "Begin elke prompt met 'Act as a senior creative director at an Amsterdam agency' — je krijgt direct meer relevante en professionele antwoorden die aansluiten bij jouw werk.",
    level: "beginner",
    tool: "ChatGPT",
    date: "2026-03-26",
  },
  {
    id: "2",
    title: "Midjourney stijlcodes voor consistente branding",
    content:
      "Gebruik '--style raw' voor fotografische resultaten en '--cref [url]' om een karakterreferentie mee te geven. Zo behoud je consistente visuals over meerdere afbeeldingen.",
    level: "gevorderd",
    tool: "Midjourney",
    date: "2026-03-25",
  },
  {
    id: "3",
    title: "Runway motion brush voor professionele video-effecten",
    content:
      "Met de Motion Brush in Runway kun je bepaalde delen van een beeld laten bewegen. Selecteer alleen de achtergrond voor een subtiel parallax-effect zonder de subject te verstoren.",
    level: "gevorderd",
    tool: "Runway",
    date: "2026-03-24",
  },
  {
    id: "4",
    title: "ElevenLabs: de perfecte stem vinden voor je merk",
    content:
      "Maak altijd een Voice Design test van 30 seconden voordat je een volledige voiceover opneemt. Varieer 'stability' (0.3-0.6) en 'similarity' (0.7-0.9) voor de beste balans tussen expressie en consistentie.",
    level: "pro",
    tool: "ElevenLabs",
    date: "2026-03-23",
  },
  {
    id: "5",
    title: "Claude voor lange briefings: de 'dump-methode'",
    content:
      "Gooi je volledige briefing, referenties en doelgroepomschrijving in Claude als één grote tekst. Vraag dan pas om een samenvatting. Claude haalt er automatisch de kern uit — beter dan zelf filteren.",
    level: "beginner",
    tool: "Claude",
    date: "2026-03-22",
  },
  {
    id: "6",
    title: "Combineer tools: Midjourney → Runway workflow",
    content:
      "Genereer je keyframe in Midjourney, importeer het in Runway en gebruik 'Image to Video'. Je hebt volledige controle over de stijl én de beweging. Zo maak je campagnebeelden die bewegen.",
    level: "pro",
    tool: "Runway",
    date: "2026-03-21",
  },
];

export const categoryLabels: Record<string, string> = {
  "gebruiken-we": "Wij gebruiken",
  aanrader: "Aanraders",
  nieuwe: "Nieuw & Hot",
};

export const levelColors: Record<string, string> = {
  beginner: "#22C55E",
  gevorderd: "#F97316",
  pro: "#E8392A",
};
