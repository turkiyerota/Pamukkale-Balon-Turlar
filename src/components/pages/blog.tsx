import type { Lang } from "@/config/site";
import { PAGES, PAGE_LABELS, blogListPath, articlePath } from "@/lib/paths";
import { getPage, totalPages, relatedArticles, CATEGORY_LABELS, type Article } from "@/content/articles";
import { PageHero } from "../page-hero";
import { ArticleCard, CtaBand } from "../blocks";
import { L, Rich, Breadcrumbs, btn } from "../ui-kit";
import type { Section } from "@/content/types";
import hero2 from "@/assets/hero-2.webp";

export function BlogListPage({ lang, page }: { lang: Lang; page: number }) {
  const tr = lang === "tr";
  const items = getPage(lang, page);
  const total = totalPages(lang);
  const crumbs = [{ name: PAGE_LABELS.home[lang], path: PAGES.home[lang] }, { name: PAGE_LABELS.blog[lang], path: page > 1 ? PAGES.blog[lang] : undefined }, ...(page > 1 ? [{ name: tr ? `Sayfa ${page}` : `Page ${page}` }] : [])];
  return (
    <>
      <PageHero image={hero2} eyebrow={PAGE_LABELS.blog[lang]} title={tr ? "Pamukkale Balon Turu Rehberleri" : "Pamukkale Balloon Ride Guides"} intro={tr ? "Fiyat, zamanlama, kıyafet ve planlama üzerine pratik yazılar." : "Practical guides on pricing, timing, clothing and planning."} crumbs={crumbs} />
      <section className="container-page py-16 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((a) => <ArticleCard key={a.id} a={a} />)}</div>
        {total > 1 && (
          <nav aria-label={tr ? "Sayfalama" : "Pagination"} className="mt-14 flex flex-wrap items-center justify-center gap-2">
            {page > 1 && <L href={blogListPath(lang, page - 1)} rel="prev" className={btn.outline}>← {tr ? "Önceki" : "Previous"}</L>}
            {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
              <L key={n} href={blogListPath(lang, n)} aria-current={n === page ? "page" : undefined} className={`inline-flex h-11 w-11 items-center justify-center rounded-md border font-semibold ${n === page ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"}`}>{n}</L>
            ))}
            {page < total && <L href={blogListPath(lang, page + 1)} rel="next" className={btn.outline}>{tr ? "Sonraki" : "Next"} →</L>}
          </nav>
        )}
      </section>
    </>
  );
}

export function ArticlePage({ a }: { a: Article }) {
  const lang = a.lang, tr = lang === "tr", b = a.body;
  const related = relatedArticles(a);
  const date = (d: string) => new Date(d).toLocaleDateString(tr ? "tr-TR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <header className="relative isolate overflow-hidden bg-navy text-on-dark">
        <img src={a.cover} alt={a.coverAlt[lang]} width={1024} height={768} fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="container-page py-20 md:py-28">
          <Breadcrumbs items={[{ name: PAGE_LABELS.home[lang], path: PAGES.home[lang] }, { name: PAGE_LABELS.blog[lang], path: PAGES.blog[lang] }, { name: b.title }]} />
          <p className="eyebrow mt-8">{CATEGORY_LABELS[a.category][lang]}</p>
          <h1 className="mt-3 max-w-4xl text-4xl md:text-6xl">{b.title}</h1>
          <p className="mt-5 text-sm text-on-dark-muted"><time dateTime={a.published}>{date(a.published)}</time>{a.updated && <> · {tr ? "Güncelleme" : "Updated"}: <time dateTime={a.updated}>{date(a.updated)}</time></>} · {a.readingMinutes} {tr ? "dk okuma" : "min read"}</p>
        </div>
      </header>
      <div className="container-page grid gap-12 py-14 lg:grid-cols-[1fr_17rem]">
        <article className="prose-article max-w-3xl">
          {b.intro.map((p, i) => <p key={i} className={i === 0 ? "text-xl" : ""}><Rich text={p} /></p>)}
          {b.sections.map((s) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id}>{s.h}</h2>
              {!listFirst(s) && s.p.map((p, i) => <p key={i}><Rich text={p} /></p>)}
              {s.list && <ul>{s.list.map((x, i) => <li key={i}><Rich text={x} /></li>)}</ul>}
              {s.sub?.map((x) => <div key={x.h}><h3>{x.h}</h3>{x.p.map((p, i) => <p key={i}><Rich text={p} /></p>)}</div>)}
              {listFirst(s) && s.p.map((p, i) => <p key={i}><Rich text={p} /></p>)}
            </section>
          ))}
          <aside className="mt-12 rounded-lg bg-secondary p-6 not-prose">
            <h2 className="!mt-0 text-2xl">{tr ? "Özetle" : "Key takeaways"}</h2>
            <ul>{b.takeaways.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </aside>
          <div className="mt-10 flex flex-wrap gap-3">
            <L href={PAGES.reservation[lang]} className={`${btn.accent} !no-underline !text-navy-deep`}>{tr ? "Rezervasyon Talebi" : "Request a Booking"}</L>
            <L href={PAGES.prices[lang]} className={`${btn.outline} !no-underline`}>{tr ? "Fiyatlar" : "Prices"}</L>
          </div>
        </article>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav aria-label={tr ? "İçindekiler" : "Table of contents"} className="rounded-lg border border-border bg-card p-6">
            <p className="eyebrow">{tr ? "İçindekiler" : "Contents"}</p>
            <ol className="mt-4 space-y-2 text-sm">{b.sections.map((s) => <li key={s.id}><a href={`#${s.id}`} className="hover:text-sage">{s.h}</a></li>)}</ol>
          </nav>
        </aside>
      </div>
      <section className="bg-secondary py-16">
        <div className="container-page">
          <h2 className="text-4xl">{tr ? "İlgili yazılar" : "Related articles"}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">{related.map((r) => <ArticleCard key={r.id} a={r} />)}</div>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/** A section written as `{ list, p }` (list key before p) shows the paragraphs after the list. */
function listFirst(s: Section) {
  const k = Object.keys(s);
  return !!s.list && k.indexOf("list") < k.indexOf("p");
}

export { articlePath };
