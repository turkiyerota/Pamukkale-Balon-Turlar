import type { Lang } from "@/config/site";
import { ARTICLES_PER_PAGE } from "@/lib/paths";
import type { ArticleBody, ArticleSummary } from "./types";
import { SUMMARIES } from "./article-index.gen";

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
  /** Focus keyword phrase (see docs/keyword-mapping.md): used in the summary H2 and footer links. */
  kw: Record<Lang, string>;
};

const META: Meta[] = (
  [
    {
      id: "prices",
      kw: {
        tr: "Pamukkale balon turu fiyatları 2026",
        en: "Pamukkale hot air balloon prices in 2026",
      },
      order: 12,
      category: "pricing",
      covers: { tr: c_prices_tr, en: c_prices_en },
      coverAlt: {
        tr: "Pamukkale balon turu fiyatları 2026: gün doğumunda travertenlerin önünde boş balon sepeti",
        en: "Pamukkale hot air balloon prices 2026: a balloon basket rim above the Pamukkale pools",
      },
    },
    {
      id: "start",
      kw: {
        tr: "Pamukkale balon turu saat kaçta başlar?",
        en: "What time do Pamukkale balloon tours start?",
      },
      order: 11,
      category: "flight",
      covers: { tr: c_start_tr, en: c_start_en },
      coverAlt: {
        tr: "Pamukkale balon turu saat kaçta başlar: mavi saatte brülör ışığıyla şişirilen balonlar",
        en: "What time Pamukkale balloon tours start: a balloon lifting off at sunrise",
      },
    },
    {
      id: "duration",
      kw: {
        tr: "Pamukkale balon turu kaç dakika sürer?",
        en: "How long does a Pamukkale balloon ride last?",
      },
      order: 10,
      category: "flight",
      covers: { tr: c_duration_tr, en: c_duration_en },
      coverAlt: {
        tr: "Pamukkale balon turu kaç dakika sürer: travertenler ve kasaba üzerinde yüksekte tek balon",
        en: "How long a Pamukkale balloon ride lasts: balloon shadows seen from the basket",
      },
    },
    {
      id: "clothing",
      kw: {
        tr: "Pamukkale balon turunda ne giyilir?",
        en: "What to wear for a Pamukkale balloon ride",
      },
      order: 9,
      category: "planning",
      covers: { tr: c_clothing_tr, en: c_clothing_en },
      coverAlt: {
        tr: "Pamukkale balon turunda ne giyilir: bankta lacivert mont, atkı ve ayakkabı",
        en: "What to wear for a Pamukkale balloon ride: beanie, gloves, fleece and a thermos",
      },
    },
    {
      id: "cancel",
      kw: {
        tr: "Pamukkale balon turu iptal edilirse ne olur?",
        en: "If your Pamukkale balloon tour is cancelled",
      },
      order: 8,
      category: "flight",
      covers: { tr: c_cancel_tr, en: c_cancel_en },
      coverAlt: {
        tr: "Pamukkale balon turu iptal edilirse: yağmur altında yerde sönük balon kumaşları",
        en: "Pamukkale balloon tour cancelled: an orange windsock in the fog",
      },
    },
    {
      id: "safety",
      kw: { tr: "Pamukkale balon turu güvenli mi?", en: "Pamukkale balloon ride safety" },
      order: 7,
      category: "flight",
      covers: { tr: c_safety_tr, en: c_safety_en },
      coverAlt: {
        tr: "Pamukkale balon turu güvenli mi: balon brülörünün alevine yakın plan",
        en: "Pamukkale balloon ride safety: an upright balloon tethered beside a windsock",
      },
    },
    {
      id: "booking",
      kw: {
        tr: "Pamukkale balon turu rezervasyonu nasıl yapılır?",
        en: "How to book a Pamukkale balloon tour",
      },
      order: 6,
      category: "pricing",
      covers: { tr: c_booking_tr, en: c_booking_en },
      coverAlt: {
        tr: "Pamukkale balon turu rezervasyonu nasıl yapılır: telefon, Türk çayı ve not defteri",
        en: "How to book a Pamukkale balloon tour: a map and travel journal by a window",
      },
    },
    {
      id: "included",
      kw: {
        tr: "Pamukkale balon turunda fiyata neler dahil?",
        en: "What's included in a Pamukkale balloon tour",
      },
      order: 5,
      category: "pricing",
      covers: { tr: c_included_tr, en: c_included_tr },
      coverAlt: {
        tr: "İnişten sonra balon ve römork: Pamukkale balon turunda fiyata neler dahil",
        en: "A balloon and trailer after landing: what's included in a Pamukkale balloon tour",
      },
    },
    {
      id: "best-time",
      kw: {
        tr: "Pamukkale balon turu için en iyi zaman",
        en: "The best time for a Pamukkale balloon ride",
      },
      order: 4,
      category: "planning",
      covers: { tr: c_best_time_tr, en: c_best_time_en },
      coverAlt: {
        tr: "Pamukkale balon turu için en iyi zaman: sonbahar yaprakları ve uzakta balonlar",
        en: "Best time for a Pamukkale balloon ride: balloons over misty travertines in winter",
      },
    },
    {
      id: "compare",
      kw: {
        tr: "Pamukkale mi Kapadokya mı? Balon turu seçimi",
        en: "Pamukkale vs Cappadocia balloon rides",
      },
      order: 3,
      category: "compare",
      covers: { tr: c_compare_tr, en: c_compare_en },
      coverAlt: {
        tr: "Pamukkale mi Kapadokya mı: gün doğumunda Kapadokya vadisi üzerinde balonlar",
        en: "Pamukkale vs Cappadocia balloon rides: balloons reflected in a travertine pool",
      },
    },
    {
      id: "children",
      kw: {
        tr: "Pamukkale balon turuna çocuklar katılabilir mi?",
        en: "Children on a Pamukkale balloon tour",
      },
      order: 2,
      category: "planning",
      covers: { tr: c_children_tr, en: c_children_en },
      coverAlt: {
        tr: "Pamukkale balon turuna çocuklar katılabilir mi: çocuk montu, sırt çantası ve ayakkabılar",
        en: "Children on a Pamukkale balloon tour: a family watching the balloons",
      },
    },
    {
      id: "before",
      kw: {
        tr: "Pamukkale balon turu öncesi bilmeniz gerekenler",
        en: "What to know before your Pamukkale balloon ride",
      },
      order: 1,
      category: "planning",
      covers: { tr: c_before_tr, en: c_before_en },
      coverAlt: {
        tr: "Pamukkale balon turu öncesi bilmeniz gerekenler: Hierapolis antik tiyatrosu ve bir balon",
        en: "Before your Pamukkale balloon ride: an ancient street in Hierapolis with balloons",
      },
    },
  ] as Omit<Meta, "published">[]
).map((m) => ({ ...m, published: "2026-10-29", updated: "2026-11-02" }));

export type Article = Meta & {
  /** Title, slug, meta texts and word count. The full body is loaded with loadArticleBody(). */
  body: ArticleSummary;
  lang: Lang;
  readingMinutes: number;
  /** Cover for this language (each language has its own image). */ cover: string;
  wordCount: number;
};

/**
 * Full article text, loaded on demand so the ~150 KB of bodies are not bundled into every page
 * (only the article routes call this, from their loader; SSR inlines the result).
 */
export async function loadArticleBody(lang: Lang, id: string): Promise<ArticleBody> {
  const bodies =
    lang === "tr" ? (await import("./articles-tr")).TR : (await import("./articles-en")).EN;
  const b = bodies[id];
  if (!b) throw new Error(`No ${lang} body for article ${id}`);
  return b;
}

export function getArticles(lang: Lang): Article[] {
  return META.filter((m) => SUMMARIES[lang][m.id])
    .map((m) => {
      const body = SUMMARIES[lang][m.id]!;
      return {
        ...m,
        body,
        lang,
        cover: m.covers[lang],
        wordCount: body.words,
        readingMinutes: Math.max(2, Math.round(body.words / 200)),
      };
    })
    .sort((a, b) => b.published.localeCompare(a.published) || b.order - a.order);
}

export function getArticle(lang: Lang, slug: string) {
  return getArticles(lang).find((a) => a.body.slug === slug);
}

/** Slug of the same article in the other language, if it exists. */
export function translatedSlug(from: Lang, slug: string, to: Lang) {
  const a = getArticle(from, slug);
  return a ? SUMMARIES[to][a.id]?.slug : undefined;
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
