import { describe, expect, it } from "vitest";
import { getArticles, getPage, totalPages, translatedSlug } from "@/content/articles";
import { alternatePath } from "@/lib/alternate";
import { PAGES, articlePath } from "@/lib/paths";
import { validate } from "@/components/pages/reservation";

describe("articles", () => {
  it("lists 9 articles on page 1 and 3 on page 2", () => {
    for (const l of ["tr", "en"] as const) {
      expect(getPage(l, 1)).toHaveLength(9);
      expect(getPage(l, 2)).toHaveLength(3);
      expect(totalPages(l)).toBe(2);
      expect(new Set(getArticles(l).map((a) => a.body.slug)).size).toBe(12);
    }
  });
  it("maps article slugs between languages", () => {
    expect(translatedSlug("tr", "pamukkale-balon-turunda-ne-giyilir", "en")).toBe(
      "what-to-wear-for-a-pamukkale-hot-air-balloon-ride",
    );
  });
  it("language switcher goes to the equivalent page", () => {
    expect(alternatePath("/fiyatlar/").href).toBe("/en/prices/");
    expect(alternatePath("/en/insights/page/2/").href).toBe("/kesfet/sayfa/2/");
  });
  it("rejects a booking request without consent", () => {
    const e = validate(
      {
        name: "Ali Veli",
        email: "a@b.co",
        phone: "05551234567",
        date: "2026-11-10",
        guests: "2",
        language: "",
        message: "",
        website: "",
        consent: false,
      },
      "tr",
    );
    expect(Object.keys(e)).toEqual(["consent"]);
  });

  it("every inline link in every article points to an existing page or article", () => {
    const valid = new Set<string>();
    for (const l of ["tr", "en"] as const) {
      for (const p of Object.values(PAGES)) valid.add(p[l]);
      for (const a of getArticles(l)) valid.add(articlePath(l, a.body.slug));
    }
    const bad: string[] = [];
    for (const l of ["tr", "en"] as const) {
      for (const a of getArticles(l)) {
        const b = a.body;
        const text = [
          ...b.intro,
          ...b.sections.flatMap((s) => [
            ...s.p,
            ...(s.list ?? []),
            ...(s.sub ?? []).flatMap((x) => x.p),
          ]),
          ...b.takeaways,
        ].join(" ");
        for (const m of text.matchAll(/\]\((\/[^)]*)\)/g)) {
          const href = m[1]!;
          if (!valid.has(href)) bad.push(`${l}:${a.id} -> ${href}`);
          if (l === "en" && !href.startsWith("/en/"))
            bad.push(`${l}:${a.id} links to TR page ${href}`);
          if (l === "tr" && href.startsWith("/en/"))
            bad.push(`${l}:${a.id} links to EN page ${href}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });
  it("every article has a unique cover per language, a TOC, internal links and takeaways", () => {
    const covers = new Set<string>();
    for (const l of ["tr", "en"] as const) {
      for (const a of getArticles(l)) {
        covers.add(a.cover);
        expect(a.body.sections.length).toBeGreaterThanOrEqual(5);
        expect(a.body.takeaways.length).toBeGreaterThanOrEqual(3);
        expect(a.wordCount).toBeGreaterThan(400);
        expect(a.coverAlt[l].length).toBeGreaterThan(10);
      }
    }
    expect(covers.size).toBe(24);
  });
});
