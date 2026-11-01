import type { Lang } from "@/config/site";
import { ARTICLES_PER_PAGE } from "@/lib/paths";
import type { ArticleBody } from "./types";
import { TR } from "./articles-tr";
import { EN } from "./articles-en";

import c_prices_tr from "@/assets/covers/prices-tr.webp";
import c_prices_en from "@/assets/covers/prices-en.webp";
import c_start_tr from "@/assets/covers/start-tr.webp";
import c_start_en from "@/assets/covers/start-en.webp";
import c_duration_tr from "@/assets/covers/duration-tr.webp";
import c_duration_en from "@/assets/covers/duration-en.webp";
import c_clothing_tr from "@/assets/covers/clothing-tr.webp";
import c_clothing_en from "@/assets/covers/clothing-en.webp";
import c_cancel_tr from "@/assets/covers/cancel-tr.webp";
import c_cancel_en from "@/assets/covers/cancel-en.webp";
import c_safety_tr from "@/assets/covers/safety-tr.webp";
import c_safety_en from "@/assets/covers/safety-en.webp";
import c_booking_tr from "@/assets/covers/booking-tr.webp";
import c_booking_en from "@/assets/covers/booking-en.webp";
import c_included_tr from "@/assets/covers/included-tr.webp";
import c_included_en from "@/assets/covers/included-en.webp";
import c_best_time_tr from "@/assets/covers/best-time-tr.webp";
import c_best_time_en from "@/assets/covers/best-time-en.webp";
import c_compare_tr from "@/assets/covers/compare-tr.webp";
import c_compare_en from "@/assets/covers/compare-en.webp";
import c_children_tr from "@/assets/covers/children-tr.webp";
import c_children_en from "@/assets/covers/children-en.webp";
import c_before_tr from "@/assets/covers/before-tr.webp";
import c_before_en from "@/assets/covers/before-en.webp";

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
  covers: Record<Lang, string>;
  coverAlt: Record<Lang, string>;
};

const META: Meta[] = ([
  { id: "prices", order: 12, category: "pricing", covers: { tr: c_prices_tr, en: c_prices_en }, coverAlt: { tr: "Gün doğumunda travertenlerin önünde boş balon sepeti", en: "The leather rim of a balloon basket above the Pamukkale pools" } },
  { id: "start", order: 11, category: "flight", covers: { tr: c_start_tr, en: c_start_en }, coverAlt: { tr: "Mavi saatte brülör ışığıyla şişirilen balonlar", en: "A colourful balloon lifting off at sunrise" } },
  { id: "duration", order: 10, category: "flight", covers: { tr: c_duration_tr, en: c_duration_en }, coverAlt: { tr: "Pamukkale travertenleri ve kasaba üzerinde yüksekte tek balon", en: "Looking down from the basket at balloon shadows on the ground" } },
  { id: "clothing", order: 9, category: "planning", covers: { tr: c_clothing_tr, en: c_clothing_en }, coverAlt: { tr: "Bankta lacivert mont, atkı ve ayakkabı; arkada balonlar", en: "A beanie, gloves, fleece and thermos laid out flat" } },
  { id: "cancel", order: 8, category: "flight", covers: { tr: c_cancel_tr, en: c_cancel_en }, coverAlt: { tr: "Gri yağmur altında yerde sönük balon kumaşları", en: "An orange windsock in the fog" } },
  { id: "safety", order: 7, category: "flight", covers: { tr: c_safety_tr, en: c_safety_en }, coverAlt: { tr: "Balon brülörünün alevine yakın plan", en: "An upright balloon tethered to a vehicle beside a windsock" } },
  { id: "booking", order: 6, category: "pricing", covers: { tr: c_booking_tr, en: c_booking_en }, coverAlt: { tr: "Telefon, Türk çayı ve not defteri", en: "A map and travel journal by a window" } },
  { id: "included", order: 5, category: "pricing", covers: { tr: c_included_tr, en: c_included_en }, coverAlt: { tr: "İnişten sonra balon ve römork", en: "A white transfer minibus waiting at blue hour" } },
  { id: "best-time", order: 4, category: "planning", covers: { tr: c_best_time_tr, en: c_best_time_en }, coverAlt: { tr: "Sonbahar yaprakları ve uzakta balonlar", en: "Balloons over the travertines on a misty winter morning with snowy mountains" } },
  { id: "compare", order: 3, category: "compare", covers: { tr: c_compare_tr, en: c_compare_en }, coverAlt: { tr: "Gün doğumunda Kapadokya vadisi üzerinde balonlar", en: "Balloons reflected in a Pamukkale travertine pool" } },
  { id: "children", order: 2, category: "planning", covers: { tr: c_children_tr, en: c_children_en }, coverAlt: { tr: "Taş duvarda çocuk montu, sırt çantası ve ayakkabılar; arkada balonlar", en: "A family seen from behind watching the balloons" } },
  { id: "before", order: 1, category: "planning", covers: { tr: c_before_tr, en: c_before_en }, coverAlt: { tr: "Sabah ışığında Hierapolis antik tiyatrosu ve uzakta bir balon", en: "A colonnaded ancient street in Hierapolis with balloons in the sky" } },
] as Omit<Meta, "published">[]).map((m) => ({ ...m, published: "2026-10-29" }));

export type Article = Meta & { body: ArticleBody; lang: Lang; readingMinutes: number; /** Cover for this language (each language has its own image). */ cover: string; wordCount: number };

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
      const wc = words(body);
      return { ...m, body, lang, cover: m.covers[lang], wordCount: wc, readingMinutes: Math.max(2, Math.round(wc / 200)) };
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
