import type { Lang } from "@/config/site";
import { PAGES, PAGE_LABELS, type PageKey, blogListPath, articlePath } from "./paths";
import { seo, breadcrumbLd, organizationLd, abs } from "./seo";
import { SITE } from "@/config/site";
import type { Article } from "@/content/articles";
import { translatedSlug } from "@/content/articles";

const META: Record<PageKey, Record<Lang, [string, string]>> = {
  home: { tr: ["Pamukkale Balon Turu | Pamukkale Balon Turları", "Pamukkale'de gün doğumunda balon turu: fiyat bilgisi, uçuş detayları, rezervasyon talebi ve rehber yazılar."], en: ["Pamukkale Hot Air Balloon Tour | Pamukkale Balloon Tours", "Sunrise hot air balloon tours over Pamukkale: pricing info, flight details, booking requests and travel guides."] },
  prices: { tr: ["Pamukkale Balon Turu Fiyatları ve Paketler", "Pamukkale balon turu paketleri, fiyata dahil olabilecek hizmetler, iptal koşulları ve güncel teklif alma."], en: ["Pamukkale Balloon Tour Prices and Packages", "Pamukkale balloon tour packages, possible inclusions, cancellation terms and how to get a current quote."] },
  reservation: { tr: ["Pamukkale Balon Turu Rezervasyon Talebi", "Tarih ve kişi sayınızı iletin, Pamukkale balon turu için yazılı teklif ve teyit alın."], en: ["Book a Pamukkale Balloon Ride | Booking Request", "Send your date and group size to request a Pamukkale balloon ride and receive a written quote."] },
  flight: { tr: ["Pamukkale Balon Uçuş Bilgileri | Aşamalar ve Hazırlık", "Uçuş sabahının aşamaları, kıyafet, hava koşulları, çocuklar ve rezervasyon öncesi teyit edilecekler."], en: ["Pamukkale Balloon Flight Information | What to Expect", "The stages of a flight morning, clothing, weather, children and what to confirm before booking."] },
  faq: { tr: ["Pamukkale Balon Turu Sık Sorulan Sorular", "Fiyat, saat, süre, kıyafet, iptal, güvenlik ve çocuklarla ilgili Pamukkale balon turu soruları."], en: ["Pamukkale Balloon Tour FAQs", "Answers on price, timing, duration, clothing, cancellations, safety and children for Pamukkale balloon rides."] },
  blog: { tr: ["Keşfet: Pamukkale Balon Turu Rehberleri", "Pamukkale balon turu hakkında fiyat, zamanlama, kıyafet ve planlama rehberleri."], en: ["Insights: Pamukkale Balloon Ride Guides", "Guides on Pamukkale balloon ride pricing, timing, clothing and trip planning."] },
  about: { tr: ["Hakkımızda | Pamukkale Balon Turları", "Pamukkale Balon Turları hakkında: yaklaşımımız ve Pamukkale'deki iletişim bilgilerimiz."], en: ["About Us | Pamukkale Balloon Tours", "About Pamukkale Balon Turları: our approach and where to find us in Pamukkale."] },
  contact: { tr: ["İletişim | Pamukkale Balon Turları", "Telefon, e-posta, WhatsApp ve adres: Pamukkale Balon Turları ile iletişime geçin."], en: ["Contact | Pamukkale Balloon Tours", "Phone, email, WhatsApp and address for Pamukkale Balloon Tours."] },
  privacy: { tr: ["Gizlilik Politikası | Pamukkale Balon Turları", "Pamukkale Balon Turları web sitesinde bilgilerinizin nasıl ele alındığı."], en: ["Privacy Policy | Pamukkale Balloon Tours", "How information is handled on the Pamukkale Balloon Tours website."] },
  cookies: { tr: ["Çerez Politikası | Pamukkale Balon Turları", "Pamukkale Balon Turları web sitesinin çerez kullanımı."], en: ["Cookie Policy | Pamukkale Balloon Tours", "How the Pamukkale Balloon Tours website uses cookies."] },
  terms: { tr: ["Kullanım Koşulları | Pamukkale Balon Turları", "Pamukkale Balon Turları web sitesinin kullanım koşulları."], en: ["Terms of Use | Pamukkale Balloon Tours", "Terms of use for the Pamukkale Balloon Tours website."] },
};

export function staticHead(key: PageKey, lang: Lang) {
  const [title, description] = META[key][lang];
  const ld: object[] = [];
  if (key === "home") ld.push(organizationLd);
  else ld.push(breadcrumbLd([{ name: PAGE_LABELS.home[lang], path: PAGES.home[lang] }, { name: PAGE_LABELS[key][lang], path: PAGES[key][lang] }]));
  return seo({ lang, title, description, path: PAGES[key][lang], alt: PAGES[key], jsonLd: ld });
}

export function blogHead(lang: Lang, page: number, total: number) {
  const [t, d] = META.blog[lang];
  const suffix = page > 1 ? (lang === "tr" ? ` – Sayfa ${page}` : ` – Page ${page}`) : "";
  const other: Lang = lang === "tr" ? "en" : "tr";
  const h = seo({ lang, title: t + suffix, description: d + suffix, path: blogListPath(lang, page), alt: { [lang]: blogListPath(lang, page), [other]: blogListPath(other, page) } });
  if (page > 1) h.links.push({ rel: "prev", href: abs(blogListPath(lang, page - 1)) });
  if (page < total) h.links.push({ rel: "next", href: abs(blogListPath(lang, page + 1)) });
  return h;
}

export function articleHead(a: Article) {
  const other: Lang = a.lang === "tr" ? "en" : "tr";
  const otherSlug = translatedSlug(a.lang, a.body.slug, other);
  const path = articlePath(a.lang, a.body.slug);
  return seo({
    lang: a.lang, type: "article", title: a.body.seoTitle, description: a.body.description, path,
    alt: otherSlug ? { [a.lang]: path, [other]: articlePath(other, otherSlug) } : undefined,
    jsonLd: [
      { "@context": "https://schema.org", "@type": "BlogPosting", headline: a.body.title, description: a.body.description, datePublished: a.published, dateModified: a.updated ?? a.published, inLanguage: a.lang, mainEntityOfPage: abs(path), author: { "@type": "Organization", name: SITE.name }, publisher: { "@type": "Organization", name: SITE.name } },
      breadcrumbLd([{ name: PAGE_LABELS.home[a.lang], path: PAGES.home[a.lang] }, { name: PAGE_LABELS.blog[a.lang], path: PAGES.blog[a.lang] }, { name: a.body.title, path }]),
    ],
  });
}
