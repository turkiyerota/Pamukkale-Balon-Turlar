import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/config/site";
import { PAGES, blogListPath, articlePath } from "@/lib/paths";
import { getArticles, totalPages, translatedSlug } from "@/content/articles";

/** Date of the last content change to the static pages (update when pages change). */
const PAGES_UPDATED = "2026-11-02";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const u = (p: string) => `${SITE.url}${p}`;
        const entries: { tr: string; en?: string | undefined; lastmod?: string | undefined }[] = [];
        for (const p of Object.values(PAGES)) entries.push({ tr: p.tr, en: p.en });
        for (let n = 2; n <= totalPages("tr"); n++)
          entries.push({
            tr: blogListPath("tr", n),
            en: n <= totalPages("en") ? blogListPath("en", n) : undefined,
          });
        for (const a of getArticles("tr")) {
          const en = translatedSlug("tr", a.body.slug, "en");
          entries.push({
            tr: articlePath("tr", a.body.slug),
            en: en ? articlePath("en", en) : undefined,
            lastmod: a.updated ?? a.published,
          });
        }
        const urls = entries.flatMap((e) => {
          const alts = e.en
            ? `<xhtml:link rel="alternate" hreflang="tr" href="${u(e.tr)}"/><xhtml:link rel="alternate" hreflang="en" href="${u(e.en)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${u(e.tr)}"/>`
            : "";
          const lm = `<lastmod>${e.lastmod ?? PAGES_UPDATED}</lastmod>`;
          return [e.tr, e.en]
            .filter(Boolean)
            .map((loc) => `<url><loc>${u(loc!)}</loc>${lm}${alts}</url>`);
        });
        const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
