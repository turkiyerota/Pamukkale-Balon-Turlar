import type { Lang } from "@/config/site";
import { PAGES, blogListPath, articlePath, langFromPath, normalize } from "./paths";
import { translatedSlug, totalPages } from "@/content/articles";

/** Equivalent path in the other language. Falls back to the listing or home page. */
export function alternatePath(pathname: string): { lang: Lang; target: Lang; href: string } {
  const p = normalize(pathname);
  const lang = langFromPath(p);
  const target: Lang = lang === "tr" ? "en" : "tr";

  for (const page of Object.values(PAGES)) {
    if (page[lang] === p) return { lang, target, href: page[target] };
  }
  const base = PAGES.blog[lang];
  if (p.startsWith(base)) {
    const rest = p.slice(base.length).replace(/\/$/, "");
    const pageMatch = rest.match(/^(sayfa|page)\/(\d+)$/);
    if (pageMatch) {
      const n = Number(pageMatch[2]);
      return { lang, target, href: n <= totalPages(target) ? blogListPath(target, n) : PAGES.blog[target] };
    }
    if (rest && !rest.includes("/")) {
      const slug = translatedSlug(lang, rest, target);
      return { lang, target, href: slug ? articlePath(target, slug) : PAGES.blog[target] };
    }
  }
  return { lang, target, href: PAGES.home[target] };
}
