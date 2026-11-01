import type { Lang } from "@/config/site";

export const PAGES = {
  home: { tr: "/", en: "/en/" },
  prices: { tr: "/fiyatlar/", en: "/en/prices/" },
  reservation: { tr: "/rezervasyon/", en: "/en/reservation/" },
  flight: { tr: "/ucus-bilgileri/", en: "/en/flight-information/" },
  faq: { tr: "/sik-sorulan-sorular/", en: "/en/faqs/" },
  blog: { tr: "/kesfet/", en: "/en/insights/" },
  about: { tr: "/hakkimizda/", en: "/en/about/" },
  contact: { tr: "/iletisim/", en: "/en/contact/" },
  privacy: { tr: "/gizlilik-politikasi/", en: "/en/privacy-policy/" },
  cookies: { tr: "/cerez-politikasi/", en: "/en/cookie-policy/" },
  terms: { tr: "/kullanim-kosullari/", en: "/en/terms-of-use/" },
} as const;

export type PageKey = keyof typeof PAGES;

export const PAGE_LABELS: Record<PageKey, Record<Lang, string>> = {
  home: { tr: "Ana Sayfa", en: "Home" },
  prices: { tr: "Fiyatlar", en: "Prices" },
  reservation: { tr: "Rezervasyon", en: "Reservation" },
  flight: { tr: "Uçuş Bilgileri", en: "Flight Information" },
  faq: { tr: "Sık Sorulan Sorular", en: "FAQs" },
  blog: { tr: "Keşfet", en: "Insights" },
  about: { tr: "Hakkımızda", en: "About" },
  contact: { tr: "İletişim", en: "Contact" },
  privacy: { tr: "Gizlilik Politikası", en: "Privacy Policy" },
  cookies: { tr: "Çerez Politikası", en: "Cookie Policy" },
  terms: { tr: "Kullanım Koşulları", en: "Terms of Use" },
};

export const ARTICLES_PER_PAGE = 9;

export function blogListPath(lang: Lang, page: number) {
  if (page <= 1) return PAGES.blog[lang];
  return lang === "tr" ? `/kesfet/sayfa/${page}/` : `/en/insights/page/${page}/`;
}

export function articlePath(lang: Lang, slug: string) {
  return `${PAGES.blog[lang]}${slug}/`;
}

export function langFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "tr";
}

export function normalize(pathname: string) {
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}
