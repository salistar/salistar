/**
 * @file app/lib/library.ts
 * @description Acces typé a la bibliotheque technique generee (scripts/gen.py) :
 *   - catalog.json : CV + arborescence (categories, index techno, index IA)
 *   - app/content/tech/<slug>.json : 1 techno = role + commandes + 5 articles
 *   - app/content/ai/<slug>.json   : 1 article IA detaille
 * Les contenus volumineux sont charges par import() dynamique (cote serveur)
 * afin de ne pas tout embarquer dans chaque route.
 */
import catalogJson from './catalog.json';

export type Block =
  | { type: 'lead'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'li'; text: string }
  | { type: 'code'; lines: string[] }
  | { type: 'cmds'; items: { cmd: string; desc: string }[] };

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  blocks: Block[];
}

export interface TechDoc {
  slug: string;
  name: string;
  category: string;
  role: string;
  commands: { cmd: string; desc: string }[];
  articles: Article[];
}

export interface AiDoc {
  slug: string;
  title: string;
  subtitle: string;
  blocks: Block[];
}

export interface CvSkill {
  0: string;
  1: string;
}

export type Lang = 'fr' | 'en' | 'ar';

export interface CvDoc {
  lang: Lang;
  name: string;
  title: string;
  status: string;
  profile: string;
  contact: Record<string, string>;
  skills: { cat: string; items: string }[];
  experience: { company: string; period: string; role: string; bullets: string[] }[];
  education: string[];
  languages: string;
  labels: Record<string, string>;
}

export interface ProjectItem {
  slug: string;
  name: string;
  tag: Record<Lang, string>;
  desc: Record<Lang, string>;
  stack: string[];
  url: string;
  shot: string;
  color: string;
}

export interface Catalog {
  generatedAt: string;
  cvI18n: Record<Lang, CvDoc>;
  ui: Record<string, Record<Lang, string>>;
  projects: ProjectItem[];
  photo: string;
  photoSm: string;
  cvPdf: Record<Lang, string>;
  cv: {
    name: string;
    first: string;
    last: string;
    title: string;
    status: string;
    profile: string;
    contact: Record<string, string>;
    skills: [string, string][];
    experience: {
      company: string;
      period: string;
      role: string;
      bullets: string[];
    }[];
    education: string[];
    languages: string;
  };
  categories: { name: string; techs: { slug: string; name: string; role: string }[] }[];
  techIndex: {
    slug: string;
    name: string;
    category: string;
    role: string;
    articles: { slug: string; title: string; subtitle: string }[];
  }[];
  ai: { slug: string; title: string; subtitle: string }[];
  counts: { technologies: number; techArticles: number; aiArticles: number };
}

export const catalog = catalogJson as unknown as Catalog;

export const SIGNATURE = {
  name: catalog.cv.name,
  first: catalog.cv.first,
  last: catalog.cv.last,
  title: catalog.cv.title,
  status: catalog.cv.status,
  profile: catalog.cv.profile,
};

export async function getTech(slug: string): Promise<TechDoc | null> {
  try {
    const mod = await import(`../content/tech/${slug}.json`);
    return (mod.default ?? mod) as TechDoc;
  } catch {
    return null;
  }
}

export async function getAi(slug: string): Promise<AiDoc | null> {
  try {
    const mod = await import(`../content/ai/${slug}.json`);
    return (mod.default ?? mod) as AiDoc;
  } catch {
    return null;
  }
}

export function findTechMeta(slug: string) {
  return catalog.techIndex.find((t) => t.slug === slug) ?? null;
}

/** Traduction d'une cle d'interface (fallback FR puis cle brute). */
export function tr(key: string, lang: Lang): string {
  const e = catalog.ui[key];
  if (!e) return key;
  return e[lang] || e.fr || key;
}

