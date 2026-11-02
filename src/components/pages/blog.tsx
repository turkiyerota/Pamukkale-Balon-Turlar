import type { Lang } from "@/config/site";
import { PAGES, PAGE_LABELS, blogListPath, articlePath } from "@/lib/paths";
import {
  getPage,
  totalPages,
  relatedArticles,
  CATEGORY_LABELS,
  type Article,
} from "@/content/articles";
import { PageHero } from "../page-hero";
import { ArticleCard, CtaBand } from "../blocks";
import { L, Rich, Breadcrumbs, btn, Arrow, WhatsAppIcon } from "../ui-kit";
import { whatsappLink } from "@/config/site";
import type { Section } from "@/content/types";
import heroPlain from "@/assets/gallery/denizli-plain.webp";

export function BlogListPage({ lang, page }: { lang: Lang; page: number }) {
  const tr = lang === "tr";
  const items = getPage(lang, page);
  const total = totalPages(lang);
  const crumbs = [
    { name: PAGE_LABELS.home[lang], path: PAGES.home[lang] },
    { name: PAGE_LABELS.blog[lang], path: page > 1 ? PAGES.blog[lang] : undefined },
    ...(page > 1 ? [{ name: tr ? `Sayfa ${page}` : `Page ${page}` }] : []),
  ];
  return (
    <>
      <PageHero
        image={heroPlain}
        eyebrow={PAGE_LABELS.blog[lang]}
        title={tr ? "Pamukkale Balon Turu Rehberleri" : "Pamukkale Balloon Ride Guides"}
        intro={
          tr
            ? "Fiyatlar, uçuş saatleri, kıyafet, iptaller ve planlama: Pamukkale balon turundan önce bilmeniz gereken her şey."
            : "Prices, flight times, clothing, cancellations and planning: everything to know before your Pamukkale balloon ride."
        }
        crumbs={crumbs}
      />
      <section className="container-page py-20 md:py-28">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <ArticleCard key={a.id} a={a} />
          ))}
        </div>
        {total > 1 && (
          <nav
            aria-label={tr ? "Sayfalama" : "Pagination"}
            className="mt-14 flex flex-wrap items-center justify-center gap-2"
          >
            {page > 1 && (
              <L href={blogListPath(lang, page - 1)} rel="prev" className={`${btn.outline} btn-sm`}>
                ← {tr ? "Önceki" : "Previous"}
              </L>
            )}
            {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
              <L
                key={n}
                href={blogListPath(lang, n)}
                aria-current={n === page ? "page" : undefined}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border font-semibold transition-colors ${n === page ? "border-navy bg-navy text-white" : "border-gold/40 hover:border-gold-deep hover:bg-champagne/40"}`}
              >
                {n}
              </L>
            ))}
            {page < total && (
              <L href={blogListPath(lang, page + 1)} rel="next" className={`${btn.outline} btn-sm`}>
                {tr ? "Sonraki" : "Next"} →
              </L>
            )}
          </nav>
        )}
      </section>
    </>
  );
}

export function ArticlePage({ a }: { a: Article }) {
  const lang = a.lang,
    tr = lang === "tr",
    b = a.body;
  const related = relatedArticles(a);
  const date = (d: string) =>
    new Date(d).toLocaleDateString(tr ? "tr-TR" : "en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  return (
    <>
      <header className="grain relative isolate overflow-hidden bg-navy-deep text-on-dark">
        <img
          src={a.cover}
          alt={a.coverAlt[lang]}
          width={1024}
          height={768}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,27,41,0.9)_0%,rgba(10,27,41,0.65)_55%,rgba(10,27,41,0.35)_100%)]" />
        <div className="container-page py-20 md:py-28">
          <Breadcrumbs
            items={[
              { name: PAGE_LABELS.home[lang], path: PAGES.home[lang] },
              { name: PAGE_LABELS.blog[lang], path: PAGES.blog[lang] },
              { name: b.title },
            ]}
          />
          <p className="eyebrow mt-10 !text-champagne">{CATEGORY_LABELS[a.category][lang]}</p>
          <h1 className="text-shadow-hero mt-4 max-w-4xl text-[2.6rem] leading-[1.05] md:text-6xl lg:text-7xl">
            {b.title}
          </h1>
          <p className="mt-6 text-sm font-medium text-white/80">
            <time dateTime={a.published}>{date(a.published)}</time>
            {a.updated && (
              <>
                {" "}
                · {tr ? "Güncelleme" : "Updated"}:{" "}
                <time dateTime={a.updated}>{date(a.updated)}</time>
              </>
            )}{" "}
            · {a.readingMinutes} {tr ? "dk okuma" : "min read"}
          </p>
        </div>
      </header>
      <div className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <article className="prose-article max-w-3xl">
          {b.intro.map((p, i) => (
            <p key={i} className={i === 0 ? "!text-[1.3rem] !leading-relaxed text-navy-deep" : ""}>
              <Rich text={p} />
            </p>
          ))}
          {b.sections.map((s) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id}>{s.h}</h2>
              {!listFirst(s) &&
                s.p.map((p, i) => (
                  <p key={i}>
                    <Rich text={p} />
                  </p>
                ))}
              {s.list && (
                <ul>
                  {s.list.map((x, i) => (
                    <li key={i}>
                      <Rich text={x} />
                    </li>
                  ))}
                </ul>
              )}
              {s.sub?.map((x) => (
                <div key={x.h}>
                  <h3>{x.h}</h3>
                  {x.p.map((p, i) => (
                    <p key={i}>
                      <Rich text={p} />
                    </p>
                  ))}
                </div>
              ))}
              {listFirst(s) &&
                s.p.map((p, i) => (
                  <p key={i}>
                    <Rich text={p} />
                  </p>
                ))}
            </section>
          ))}
          <aside className="mt-12 rounded-[1.25rem] border border-gold/30 bg-champagne/25 p-7 not-prose">
            <h2 className="!mt-0 text-2xl">{tr ? "Özetle" : "Key takeaways"}</h2>
            <ul>
              {b.takeaways.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </aside>
          <div className="not-prose mt-12 rounded-[1.5rem] bg-navy-deep p-8 text-on-dark shadow-lift md:p-10">
            <p className="font-display text-3xl md:text-4xl">
              {tr ? "Tarihiniz için fiyat alın" : "Get a price for your date"}
            </p>
            <p className="mt-2 text-on-dark/80">
              {tr
                ? "Tarihinizi ve kişi sayınızı yazın; size özel teklifi yazılı olarak iletelim."
                : "Send your date and group size, and we'll reply with a written quote."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <L href={PAGES.reservation[lang]} className={btn.gold}>
                {tr ? "Rezervasyon Yap" : "Book Now"} <Arrow />
              </L>
              <a
                href={whatsappLink(
                  lang,
                  tr
                    ? `Merhaba, "${b.title}" yazısını okudum. Balon turu için fiyat ve müsaitlik öğrenmek istiyorum.\nTarih:\nKişi sayısı:`
                    : `Hello, I read "${b.title}". I'd like a price and availability for a balloon ride.\nDate:\nGuests:`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={btn.whatsapp}
              >
                <WhatsAppIcon className="h-5 w-5" /> {tr ? "WhatsApp'tan Sorun" : "Ask on WhatsApp"}
              </a>
            </div>
          </div>
        </article>
        <aside className="order-first lg:order-none lg:sticky lg:top-28 lg:self-start">
          <nav aria-label={tr ? "İçindekiler" : "Table of contents"} className="card-lux p-6">
            <p className="eyebrow">{tr ? "İçindekiler" : "Contents"}</p>
            <ol className="mt-4 space-y-1 text-[0.95rem]">
              {b.sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="flex gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-champagne/40 hover:text-navy-deep"
                  >
                    <span className="font-display text-lg italic text-bronze">{i + 1}</span>
                    <span>{s.h}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>
      <section className="bg-secondary py-20">
        <div className="container-page">
          <h2 className="text-4xl md:text-5xl">{tr ? "İlgili yazılar" : "Related articles"}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.id} a={r} />
            ))}
          </div>
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
