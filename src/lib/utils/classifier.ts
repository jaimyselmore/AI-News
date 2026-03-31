import type { NewsItem } from "@/lib/data";

const RESEARCH   = ['arxiv', ' paper', 'theorem', 'proof', 'dataset', 'benchmark', 'methodology'];
const TOOLS_KW   = ['launch', 'release', 'new tool', 'introducing', 'now available', 'unveil', 'debut', 'ships', 'just dropped'];
const TIPS_KW    = ['how to', 'tutorial', 'tips', 'workflow', 'prompt', 'tricks', 'guide', 'learn', 'master'];
const UPDATE_KW  = ['update', 'v2', 'v3', 'v4', 'v5', 'changelog', 'improved', 'version '];

export function isResearch(title: string): boolean {
  const t = title.toLowerCase();
  return RESEARCH.some(kw => t.includes(kw));
}

export function classifyCategory(title: string): NewsItem['category'] {
  const t = title.toLowerCase();
  if (TOOLS_KW.some(kw => t.includes(kw)))  return 'tools';
  if (TIPS_KW.some(kw => t.includes(kw)))   return 'tips';
  if (UPDATE_KW.some(kw => t.includes(kw))) return 'update';
  return 'nieuws';
}

export function classifyTag(title: string): string {
  const t = title.toLowerCase();
  if (t.match(/break|breaking|urgent|exclusive/)) return 'BREAKING';
  if (t.match(/video|film|animat/))               return 'VIDEO';
  if (t.match(/audio|voice|sound|music|speech/))  return 'AUDIO';
  if (t.match(/tool|app|platform|plugin/))        return 'TOOLS';
  if (t.match(/update|version|changelog/))        return 'UPDATE';
  return 'AI';
}
