import type { Lang } from "@/config/site";
import { whatsappLink, telLink, SITE } from "@/config/site";
import { PAGES, articlePath } from "@/lib/paths";
import type { Article } from "@/content/articles";
import { CATEGORY_LABELS } from "@/content/articles";
import type { Faq } from "@/content/faq";
import { L, btn, Rich, WhatsAppIcon } from "./ui-kit";

export function ArticleCard({ a }: { a: Article }) {
  const date = new Date(a.published).toLocaleDateString(a.lang === "tr" ? "tr-TR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg bg-card shadow-soft transition-transform duration-300 hover:-translate-y-1 reveal">
      <L href={articlePath(a.lang, a.body.slug)} className="block overflow-hidden" tabIndex={-1} aria-hidden="true">
        <img src={a.cover} alt="" width={1024} height={768} loading="lazy" className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </L>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-sage">{CATEGORY_LABELS[a.category][a.lang]}</p>
        <h3 className="mt-2 text-2xl">
          <L href={articlePath(a.lang, a.body.slug)} className="hover:text-sage">{a.body.title}</L>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{a.body.excerpt}</p>
        <p className="mt-4 text-xs text-muted-foreground">
          <time dateTime={a.published}>{date}</time> · {a.readingMinutes} {a.lang === "tr" ? "dk okuma" : "min read"}
        </p>
      </div>
    </article>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-border rounded-lg border border-border bg-card">
      {items.map((f, i) => (
        <details key={i} className="group px-5 py-1 md:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-xl font-semibold [&::-webkit-details-marker]:hidden">
            {f.q}
            <span aria-hidden="true" className="text-amber transition-transform duration-300 group-open:rotate-45 text-2xl">+</span>
          </summary>
          <p className="pb-5 leading-relaxed text-muted-foreground">
            <Rich text={f.a} />
          </p>
        </details>
      ))}
    </div>
  );
}

export function CtaBand({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  return (
    <section className="bg-navy text-on-dark">
      <div className="container-page grid items-center gap-8 py-16 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div>
          <p className="eyebrow">{tr ? "Bilgi ve rezervasyon" : "Questions & bookings"}</p>
          <h2 className="mt-3 text-4xl md:text-5xl">{tr ? "Gün doğumunu gökyüzünden izlemeye hazır mısınız?" : "Ready to watch the sunrise from the sky?"}</h2>
          <p className="mt-4 max-w-xl text-on-dark-muted">
            {tr ? "Tarihinizi ve kişi sayınızı iletin; seçenekleri, fiyatı ve koşulları sizinle paylaşalım." : "Send us your date and group size, and we'll share the options, price and terms."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <L href={PAGES.reservation[lang]} className={btn.accent}>{tr ? "Rezervasyon Talebi" : "Request a Booking"}</L>
          <a href={whatsappLink(lang)} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}><WhatsAppIcon /> WhatsApp</a>
          <a href={telLink} className={btn.outlineLight}>{SITE.contact.phoneDisplay}</a>
        </div>
      </div>
    </section>
  );
}
