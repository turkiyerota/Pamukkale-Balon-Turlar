import { SITE, PRICE_FROM, type Lang } from "@/config/site";
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
  ...(SITE.social.length ? { sameAs: SITE.social.map((s) => s.url) } : {}),
  priceRange: `${PRICE_FROM.amount} TRY+`,
  makesOffer: {
    "@type": "Offer",
    name: "Pamukkale Balon Turu",
    itemOffered: { "@type": "TouristTrip", name: "Pamukkale Balon Turu" },
    url: `${SITE.url}/fiyatlar/`,
    priceCurrency: PRICE_FROM.currency,
    price: PRICE_FROM.amount,
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: PRICE_FROM.amount,
      priceCurrency: PRICE_FROM.currency,
    },
    availability: "https://schema.org/InStock",
  },
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

/** The tour itself, with the owner-confirmed starting price (6,666 TRY). No invented schedule or geo. */
export function touristTripLd(lang: Lang, path: string) {
  const tr = lang === "tr";
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "@id": `${abs(path)}#trip`,
    name: tr ? "Pamukkale Balon Turu" : "Pamukkale Hot Air Balloon Ride",
    description: tr
      ? "Gün doğumunda Pamukkale travertenleri ve Hierapolis üzerinde 45–60 dakikalık sıcak hava balonu uçuşu. Otel transferi fiyata dahil değildir."
      : "A 45–60 minute sunrise hot air balloon flight over Pamukkale's travertines and Hierapolis. Hotel transfer is not included in the price.",
    url: abs(path),
    image: abs(DEFAULT_OG_IMAGE),
    inLanguage: lang,
    touristType: tr
      ? ["Çiftler", "Aileler", "Fotoğraf meraklıları"]
      : ["Couples", "Families", "Photographers"],
    itinerary: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "TouristAttraction",
            name: tr ? "Pamukkale Travertenleri" : "Pamukkale Travertines",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: { "@type": "TouristAttraction", name: "Hierapolis" },
        },
      ],
    },
    provider: { "@id": `${SITE.url}/#organization` },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: PRICE_FROM.amount,
      priceCurrency: PRICE_FROM.currency,
      availability: "https://schema.org/InStock",
      url: abs(tr ? "/fiyatlar/" : "/en/prices/"),
      seller: { "@id": `${SITE.url}/#organization` },
    },
  };
}

/** CollectionPage + ItemList for a blog listing page. */
export function collectionLd(opts: {
  lang: Lang;
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    inLanguage: opts.lang,
    isPartOf: { "@id": `${SITE.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.items.length,
      itemListElement: opts.items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        url: abs(it.path),
      })),
    },
  };
}
