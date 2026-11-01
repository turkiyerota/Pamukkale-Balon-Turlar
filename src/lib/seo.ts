import { SITE, type Lang } from "@/config/site";

type Alt = { tr?: string | undefined; en?: string | undefined };

export function abs(path: string) {
  return `${SITE.url}${path}`;
}

export function seo(opts: {
  lang: Lang;
  title: string;
  description: string;
  path: string;
  alt?: Alt | undefined;
  type?: "website" | "article";
  jsonLd?: object[];
  noindex?: boolean;
}) {
  const { lang, title, description, path, alt, type = "website", jsonLd = [], noindex } = opts;
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
  ];
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
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
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
