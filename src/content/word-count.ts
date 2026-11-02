import type { ArticleBody } from "./types";

/** Words in an article body (intro, sections, sub-sections, lists, takeaways). */
export function countWords(b: ArticleBody) {
  const text = [
    ...b.intro,
    ...b.sections.flatMap((s) => [
      s.h,
      ...s.p,
      ...(s.list ?? []),
      ...(s.sub ?? []).flatMap((x) => [x.h, ...x.p]),
    ]),
    ...b.takeaways,
  ].join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

/** The small part of an article every page needs (cards, footer links, meta, sitemap). */
export function summarize(b: ArticleBody) {
  return {
    slug: b.slug,
    title: b.title,
    seoTitle: b.seoTitle,
    description: b.description,
    excerpt: b.excerpt,
    words: countWords(b),
  };
}
