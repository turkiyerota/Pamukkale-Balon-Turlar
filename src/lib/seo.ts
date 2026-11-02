import { SITE, type Lang } from "@/config/site";
const defaultOg = "/og-image.jpg";

type Alt = { tr?: string | undefined; en?: string | undefined };

export function abs(path: string) {
  return /^https?:\/\//.test(path) ? path : `${SITE.url}${path}`;
}

/** Default social preview image (hero photo); articles pass their own cover. */
export const DEFAULT_OG_IMAGE = defaultOg;

export function seo(opts: {
  lang: Lang;
  title: string;
  description: string;
  path: string;
  alt?: Alt | undefined;
  type?: "website" | "article";
  jsonLd?: object[];
  noindex?: boolean;
  image?: string;
  imageAlt?: string;
}) {
  const {
    lang,
    title,
    description,
    path,
    alt,
    type = "website",
    jsonLd = [],
    noindex,
    image = DEFAULT_OG_IMAGE,
    imageAlt,
  } = opts;
  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: abs(path) },
    { property: "og:site_name", content: SITE.name },
    { property: "og:locale", content: lang === "tr" ? "tr_TR" : "en_GB" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { property: "og:image", content: abs(image) },
    ...(image === DEFAULT_OG_IMAGE
      ? [
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
          { property: "og:image:type", content: "image/jpeg" },
        ]
      : []),
    { name: "twitter:image", content: abs(image) },
  ];
  if (imageAlt)
    meta.push(
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:image:alt", content: imageAlt },
    );
  if (alt?.tr && alt?.en)
    meta.push({ property: "og:locale:alternate", content: lang === "tr" ? "en_GB" : "tr_TR" });
  if (noindex) meta.push({ name: "robots", content: "noindex" });
  const links: Record<string, string>[] = [{ rel: "canonical", href: abs(path) }];
  if (alt?.tr && alt?.en) {
    links.push(
      { rel: "alternate", hrefLang: "tr", href: abs(alt.tr) },
      { rel: "alternate", hrefLang: "en", href: abs(alt.en) },
      { rel: "alternate", hrefLang: "x-default", href: abs(alt.tr) },
    );
  }
  return {
    meta,
    links,
    scripts: jsonLd.map((j) => ({ type: "application/ld+json", children: JSON.stringify(j) })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: SITE.nameEn,
  image: abs(DEFAULT_OG_IMAGE),
  areaServed: { "@type": "Place", name: "Pamukkale, Denizli" },
  sameAs: SITE.social.map((s) => s.url),
  url: SITE.url,
  logo: abs(SITE.logo.onLight),
  email: SITE.contact.email,
  telephone: SITE.contact.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Menderes Cd. 12/A",
    addressLocality: "Pamukkale",
    addressRegion: "Denizli",
    postalCode: "20190",
    addressCountry: "TR",
  },
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  inLanguage: ["tr", "en"],
  publisher: { "@id": `${SITE.url}/#organization` },
};

/** Strips the `[text](href)` and `**bold**` markup used in FAQ answers. */
const plain = (t: string) => t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: plain(it.a) },
    })),
  };
}
