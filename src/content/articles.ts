import type { Lang } from "@/config/site";
import { ARTICLES_PER_PAGE } from "@/lib/paths";
import type { ArticleBody } from "./types";
import { TR } from "./articles-tr";
import { EN } from "./articles-en";

import imgBurner from "@/assets/img-burner.webp";
import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.webp";
import hero3 from "@/assets/hero-3.webp";
import hero4 from "@/assets/hero-4.webp";
import hero5 from "@/assets/hero-5.webp";
import imgClothing from "@/assets/img-clothing.webp";
import imgWeather from "@/assets/img-weather.webp";
import imgInflation from "@/assets/img-inflation.webp";
import imgSeason from "@/assets/img-season.webp";
import imgCappadocia from "@/assets/img-cappadocia.webp";
import imgHierapolis from "@/assets/img-hierapolis.webp";

export type Category = "pricing" | "flight" | "planning" | "compare";

export const CATEGORY_LABELS: Record<Category, Record<Lang, string>> = {
  pricing: { tr: "Fiyat & Rezervasyon", en: "Pricing & Booking" },
  flight: { tr: "Uçuş Rehberi", en: "Flight Guide" },
  planning: { tr: "Planlama", en: "Planning" },
  compare: { tr: "Karşılaştırma", en: "Comparison" },
};

type Meta = {
  id: string;
  /** ISO date. Add new articles with their real publish date — newest is listed first. */
  published: string;
  updated?: string | undefined;
  /** Tie-breaker for articles published on the same day (higher = newer). */
  order: number;
  category: Category;
  cover: string;
  coverAlt: Record<Lang, string>;
};

const META: Meta[] = ([
  { id: "prices", order: 12, category: "pricing", cover: imgBurner, coverAlt: { tr: "Balon brülörünün alevi ve gün doğumunda balon kumaşı", en: "Balloon burner flame lighting the envelope at dawn" } },
  { id: "start", order: 11, category: "flight", cover: hero4, coverAlt: { tr: "Gün doğumunda Pamukkale üzerinde balon siluetleri", en: "Balloon silhouettes over Pamukkale at sunrise" } },
  { id: "duration", order: 10, category: "flight", cover: hero5, coverAlt: { tr: "Balon sepetinden Pamukkale travertenlerine bakış", en: "View over Pamukkale travertines from a balloon basket" } },
  { id: "clothing", order: 9, category: "planning", cover: imgClothing, coverAlt: { tr: "Sabah uçuşu için mont, atkı ve ayakkabı", en: "Jacket, scarf and shoes laid out for a dawn flight" } },
  { id: "cancel", order: 8, category: "flight", cover: imgWeather, coverAlt: { tr: "Bulutlu havada yerde bekleyen balonlar", en: "Balloons waiting on the ground under cloudy skies" } },
  { id: "safety", order: 7, category: "flight", cover: imgInflation, coverAlt: { tr: "Şafak öncesi balonun şişirilmesi", en: "A balloon being inflated before dawn" } },
  { id: "booking", order: 6, category: "pricing", cover: hero2, coverAlt: { tr: "Altın saatte Hierapolis üzerinde tek balon", en: "A single balloon over Hierapolis at golden hour" } },
  { id: "included", order: 5, category: "pricing", cover: hero3, coverAlt: { tr: "Şafakta yukarıdan Pamukkale traverten havuzları", en: "Pamukkale travertine pools seen from above at dawn" } },
  { id: "best-time", order: 4, category: "planning", cover: imgSeason, coverAlt: { tr: "İlkbaharda kır çiçekleri ve Pamukkale üzerinde balonlar", en: "Spring wildflowers with balloons above Pamukkale" } },
  { id: "compare", order: 3, category: "compare", cover: imgCappadocia, coverAlt: { tr: "Kapadokya peri bacaları üzerinde balonlar", en: "Balloons above Cappadocia's fairy chimneys" } },
  { id: "children", order: 2, category: "planning", cover: hero1, coverAlt: { tr: "Gün doğumunda travertenler üzerinde renkli balonlar", en: "Colourful balloons over the travertines at sunrise" } },
  { id: "before", order: 1, category: "planning", cover: imgHierapolis, coverAlt: { tr: "Sabah ışığında Hierapolis antik tiyatrosu", en: "The Hierapolis theatre in morning light" } },
] as Omit<Meta, "published">[]).map((m) => ({ ...m, published: "2026-10-29" }));

export type Article = Meta & { body: ArticleBody; lang: Lang; readingMinutes: number };

const BODIES: Record<Lang, Record<string, ArticleBody>> = { tr: TR, en: EN };

function words(b: ArticleBody) {
  const text = [
    ...b.intro,
    ...b.sections.flatMap((s) => [s.h, ...s.p, ...(s.list ?? []), ...(s.sub ?? []).flatMap((x) => [x.h, ...x.p])]),
    ...b.takeaways,
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

export function getArticles(lang: Lang): Article[] {
  return META.filter((m) => BODIES[lang][m.id])
    .map((m) => {
      const body = BODIES[lang][m.id]!;
      return { ...m, body, lang, readingMinutes: Math.max(2, Math.round(words(body) / 200)) };
    })
    .sort((a, b) => b.published.localeCompare(a.published) || b.order - a.order);
}

export function getArticle(lang: Lang, slug: string) {
  return getArticles(lang).find((a) => a.body.slug === slug);
}

/** Slug of the same article in the other language, if it exists. */
export function translatedSlug(from: Lang, slug: string, to: Lang) {
  const a = getArticle(from, slug);
  return a ? BODIES[to][a.id]?.slug : undefined;
}

export function totalPages(lang: Lang) {
  return Math.max(1, Math.ceil(getArticles(lang).length / ARTICLES_PER_PAGE));
}

export function getPage(lang: Lang, page: number) {
  const all = getArticles(lang);
  const start = (page - 1) * ARTICLES_PER_PAGE;
  return all.slice(start, start + ARTICLES_PER_PAGE);
}

export function relatedArticles(a: Article, n = 3) {
  const others = getArticles(a.lang).filter((x) => x.id !== a.id);
  const same = others.filter((x) => x.category === a.category);
  const rest = others.filter((x) => x.category !== a.category);
  return [...same, ...rest].slice(0, n);
}
