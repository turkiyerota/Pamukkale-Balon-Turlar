import { describe, expect, it } from "vitest";
import { getArticles, getPage, totalPages, translatedSlug } from "@/content/articles";
import { alternatePath } from "@/lib/alternate";
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
    expect(translatedSlug("tr", "pamukkale-balon-turunda-ne-giyilir", "en")).toBe("what-to-wear-for-a-pamukkale-hot-air-balloon-ride");
  });
  it("language switcher goes to the equivalent page", () => {
    expect(alternatePath("/fiyatlar/").href).toBe("/en/prices/");
    expect(alternatePath("/en/insights/page/2/").href).toBe("/kesfet/sayfa/2/");
  });
  it("rejects a booking request without consent", () => {
    const e = validate({ name: "Ali Veli", email: "a@b.co", phone: "05551234567", date: "2026-11-10", guests: "2", language: "", message: "", website: "", consent: false }, "tr");
    expect(Object.keys(e)).toEqual(["consent"]);
  });
});
