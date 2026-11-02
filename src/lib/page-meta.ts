import type { Lang } from "@/config/site";
import { PAGES, PAGE_LABELS, type PageKey, blogListPath, articlePath } from "./paths";
import {
  seo,
  breadcrumbLd,
  organizationLd,
  websiteLd,
  faqLd,
  abs,
  touristTripLd,
  collectionLd,
} from "./seo";
import { FAQS } from "@/content/faq";
import { SITE } from "@/config/site";
import type { Article } from "@/content/articles";
import { translatedSlug, getPage } from "@/content/articles";

const META: Record<PageKey, Record<Lang, [string, string]>> = {
  home: {
    tr: [
      "Pamukkale Balon Turu | Fiyatlar 6.666 TL'den Başlar",
      "Pamukkale'de gün doğumu balon turu: travertenler ve Hierapolis üzerinde 45–60 dakikalık uçuş. Fiyatlar 6.666 TL'den başlar, WhatsApp'tan hızlı rezervasyon.",
    ],
    en: [
      "Pamukkale Hot Air Balloon Ride | From 6,666 TL",
      "Pamukkale hot air balloon rides at sunrise over the travertines and Hierapolis, 45–60 minutes aloft. Prices from 6,666 TL, quick booking on WhatsApp.",
    ],
  },
  prices: {
    tr: [
      "Pamukkale Balon Turu Fiyatları 2026 | 6.666 TL'den Başlar",
      "Pamukkale balon turu fiyatları 2026: fiyatlar 6.666 TL'den başlar. Standart ve özel sepet paketleri, iptal koşulları ve WhatsApp'tan size özel fiyat.",
    ],
    en: [
      "Pamukkale Hot Air Balloon Prices 2026 | From 6,666 TL",
      "Pamukkale hot air balloon prices for 2026 start from 6,666 TL. Shared and private basket packages, cancellation terms and your exact price on WhatsApp.",
    ],
  },
  reservation: {
    tr: [
      "Pamukkale Balon Turu Rezervasyonu | Online Talep",
      "Pamukkale balon turu rezervasyonu: tarihinizi ve kişi sayınızı yazın, talebinizi WhatsApp'tan gönderin, fiyatı ve koşulları yazılı alın.",
    ],
    en: [
      "Book a Pamukkale Hot Air Balloon Ride | Booking",
      "Book a Pamukkale hot air balloon ride: enter your date and group size, send your request on WhatsApp and get a written quote.",
    ],
  },
  flight: {
    tr: [
      "Pamukkale Balon Uçuşu | Saat, Süre ve Hazırlık",
      "Pamukkale balon uçuşu gün doğumunda başlar, havada 45–60 dakika sürer. Uçuş sabahı, iptal koşulları, yaş sınırı, sağlık kuralları ve ne giyileceği.",
    ],
    en: [
      "Pamukkale Balloon Flight | Times, Duration & What to Expect",
      "Pamukkale balloon flights take off at sunrise and last 45–60 minutes aloft. The flight morning, cancellation terms, age limit, health rules and what to wear.",
    ],
  },
  faq: {
    tr: [
      "Pamukkale Balon Turu: Sık Sorulan Sorular",
      "Pamukkale balon turu sık sorulan sorular: kaç TL (6.666 TL'den başlar), saat kaçta, kaç dakika sürer, iptal olursa ne olur, güvenli mi?",
    ],
    en: [
      "Pamukkale Hot Air Balloon FAQ | Price, Time, Safety",
      "Pamukkale hot air balloon FAQ: price, start time, duration, take-off point, safety, children and whether the ride is worth it.",
    ],
  },
  blog: {
    tr: [
      "Pamukkale Balon Turu Rehberleri | Keşfet",
      "Pamukkale balon turu rehberleri: fiyatlar, uçuş saatleri, kıyafet, iptaller, çocuklar ve Pamukkale mi Kapadokya mı karşılaştırması.",
    ],
    en: [
      "Pamukkale Balloon Ride Guides | Insights",
      "Pamukkale balloon ride guides: hot air balloon prices, start times, what to wear, cancellations, children and Pamukkale vs Cappadocia.",
    ],
  },
  about: {
    tr: [
      "Pamukkale Balon Turları Hakkında | Biz Kimiz?",
      "Pamukkale Balon Turları hakkında: Pamukkale'deki ofisimiz, yaklaşımımız ve balon turu için bize nasıl ulaşabileceğiniz.",
    ],
    en: [
      "About Pamukkale Balloon Tours | Who We Are",
      "About Pamukkale Balloon Tours (Pamukkale Balon Turları): our office in Pamukkale, our approach and how to reach us about a hot air balloon ride.",
    ],
  },
  contact: {
    tr: [
      "Pamukkale Balon Turu İletişim | WhatsApp ve Telefon",
      "Pamukkale balon turu iletişim: WhatsApp, telefon ve e-postayla bize ulaşın. Adresimiz: Menderes Caddesi, Pamukkale / Denizli.",
    ],
    en: [
      "Contact Pamukkale Balloon Tours | WhatsApp & Phone",
      "Contact Pamukkale Balloon Tours about a hot air balloon ride by WhatsApp, phone or email. Our address: Menderes Caddesi, Pamukkale / Denizli.",
    ],
  },
  privacy: {
    tr: [
      "Gizlilik Politikası | Pamukkale Balon Turları",
      "Pamukkale Balon Turları web sitesinde paylaştığınız bilgilerin nasıl ele alındığı ve KVKK kapsamındaki haklarınız.",
    ],
    en: [
      "Privacy Policy | Pamukkale Balloon Tours",
      "How information you share on the Pamukkale Balloon Tours website is handled, and your data protection rights.",
    ],
  },
  cookies: {
    tr: [
      "Çerez Politikası | Pamukkale Balon Turları",
      "Pamukkale Balon Turları web sitesinin çerez kullanımı: analitik, reklam veya takip çerezi kullanılmaz.",
    ],
    en: [
      "Cookie Policy | Pamukkale Balloon Tours",
      "How the Pamukkale Balloon Tours website uses cookies: no analytics, advertising or tracking cookies.",
    ],
  },
  terms: {
    tr: [
      "Kullanım Koşulları | Pamukkale Balon Turları",
      "Pamukkale Balon Turları web sitesinin kullanım koşulları: bilgilendirme, rezervasyon, hava koşulları ve fikri mülkiyet.",
    ],
    en: [
      "Terms of Use | Pamukkale Balloon Tours",
      "Terms of use for the Pamukkale Balloon Tours website: information, bookings, weather and intellectual property.",
    ],
  },
};

export function staticHead(key: PageKey, lang: Lang) {
  const [title, description] = META[key][lang];
  const ld: object[] = [];
  if (key === "home") ld.push(organizationLd, websiteLd, touristTripLd(lang, PAGES.home[lang]));
  else if (key === "faq")
    ld.push(
      faqLd(FAQS[lang]),
      breadcrumbLd([
        { name: PAGE_LABELS.home[lang], path: PAGES.home[lang] },
        { name: PAGE_LABELS[key][lang], path: PAGES[key][lang] },
      ]),
    );
  else
    ld.push(
      breadcrumbLd([
        { name: PAGE_LABELS.home[lang], path: PAGES.home[lang] },
        { name: PAGE_LABELS[key][lang], path: PAGES[key][lang] },
      ]),
    );
  if (key === "prices") ld.push(touristTripLd(lang, PAGES.prices[lang]));
  if (key === "contact" || key === "about") ld.push(organizationLd);
  const h = seo({ lang, title, description, path: PAGES[key][lang], alt: PAGES[key], jsonLd: ld });
  return h;
}

export function blogHead(lang: Lang, page: number, total: number) {
  const [t, d] = META.blog[lang];
  const suffix = page > 1 ? (lang === "tr" ? ` – Sayfa ${page}` : ` – Page ${page}`) : "";
  const other: Lang = lang === "tr" ? "en" : "tr";
  const h = seo({
    lang,
    title: t + suffix,
    description: page > 1 ? `${d} ${lang === "tr" ? "Sayfa" : "Page"} ${page}.` : d,
    path: blogListPath(lang, page),
    alt: { [lang]: blogListPath(lang, page), [other]: blogListPath(other, page) },
    jsonLd: [
      collectionLd({
        lang,
        name: t + suffix,
        description: d,
        path: blogListPath(lang, page),
        items: getPage(lang, page).map((a) => ({
          name: a.body.title,
          path: articlePath(lang, a.body.slug),
        })),
      }),
      breadcrumbLd([
        { name: PAGE_LABELS.home[lang], path: PAGES.home[lang] },
        { name: PAGE_LABELS.blog[lang], path: PAGES.blog[lang] },
        ...(page > 1
          ? [{ name: `${PAGE_LABELS.blog[lang]}${suffix}`, path: blogListPath(lang, page) }]
          : []),
      ]),
    ],
  });
  if (page > 1) h.links.push({ rel: "prev", href: abs(blogListPath(lang, page - 1)) });
  if (page < total) h.links.push({ rel: "next", href: abs(blogListPath(lang, page + 1)) });
  return h;
}

export function articleHead(a: Article) {
  const other: Lang = a.lang === "tr" ? "en" : "tr";
  const otherSlug = translatedSlug(a.lang, a.body.slug, other);
  const path = articlePath(a.lang, a.body.slug);
  return seo({
    lang: a.lang,
    type: "article",
    title: a.body.seoTitle,
    description: a.body.description,
    path,
    image: a.cover,
    imageAlt: a.coverAlt[a.lang],
    alt: otherSlug ? { [a.lang]: path, [other]: articlePath(other, otherSlug) } : undefined,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: a.body.title,
        image: abs(a.cover),
        wordCount: a.wordCount,
        description: a.body.description,
        datePublished: a.published,
        dateModified: a.updated ?? a.published,
        inLanguage: a.lang,
        mainEntityOfPage: abs(path),
        author: { "@type": "Organization", name: SITE.name },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          logo: { "@type": "ImageObject", url: abs(SITE.logo.onLight) },
        },
      },
      breadcrumbLd([
        { name: PAGE_LABELS.home[a.lang], path: PAGES.home[a.lang] },
        { name: PAGE_LABELS.blog[a.lang], path: PAGES.blog[a.lang] },
        { name: a.body.title, path },
      ]),
    ],
  });
}
