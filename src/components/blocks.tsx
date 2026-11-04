import type { Lang } from "@/config/site";
import { whatsappLink, telLink, SITE, WA_CONTEXT, PACKAGES, formatPrice } from "@/config/site";
import { PAGES, articlePath } from "@/lib/paths";
import type { Article } from "@/content/articles";
import { CATEGORY_LABELS } from "@/content/articles";
import type { Faq } from "@/content/faq";
import { L, btn, Arrow, Rich, WhatsAppIcon } from "./ui-kit";
import { Sunrise, Landmark, ShieldCheck, MessageCircle } from "lucide-react";
import hero1 from "@/assets/hero-1.webp";
import hero5 from "@/assets/hero-5.webp";
/* AI-generated placeholder imagery (see docs/ai-images.md) — swap for the operator's own photos. */
import gBalloons from "@/assets/gallery/balloons-sunrise-wide.webp";
import gBasket from "@/assets/gallery/basket-view.webp";
import gPools from "@/assets/gallery/travertine-pools.webp";
import gHierapolis from "@/assets/gallery/hierapolis-balloons.webp";
import gGlow from "@/assets/gallery/blue-hour-glow.webp";
import gPlain from "@/assets/gallery/denizli-plain.webp";
import { rs } from "@/lib/img";

export function ArticleCard({ a }: { a: Article }) {
  const date = new Date(a.published).toLocaleDateString(a.lang === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <article className="card-lux group reveal flex flex-col overflow-hidden">
      <L
        href={articlePath(a.lang, a.body.slug)}
        className="block overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={a.cover}
          {...rs(a.cover, "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw")}
          alt=""
          width={1024}
          height={768}
          loading="lazy"
          decoding="async"
          className="aspect-[3/2] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
      </L>
      <div className="flex flex-1 flex-col p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
          {CATEGORY_LABELS[a.category][a.lang]}
        </p>
        <h3 className="mt-3 text-[1.65rem] leading-tight">
          <L
            href={articlePath(a.lang, a.body.slug)}
            className="transition-colors hover:text-bronze"
          >
            {a.body.title}
          </L>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{a.body.excerpt}</p>
        <p className="mt-5 flex items-center justify-between border-t border-navy/10 pt-4 text-sm text-muted-foreground">
          <span>
            <time dateTime={a.published}>{date}</time> · {a.readingMinutes}{" "}
            {a.lang === "tr" ? "dk okuma" : "min read"}
          </span>
          <Arrow className="h-4 w-4 text-bronze transition-transform duration-500 group-hover:translate-x-1" />
        </p>
      </div>
    </article>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="grid gap-3">
      {items.map((f, i) => (
        <details
          key={i}
          className="group rounded-2xl border border-navy/10 bg-card px-6 transition-[border-color,box-shadow] duration-500 open:border-gold/50 open:shadow-soft md:px-7"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-[1.4rem] font-semibold leading-snug [&::-webkit-details-marker]:hidden">
            {f.q}
            <span
              aria-hidden="true"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/60 text-xl text-bronze transition-all duration-500 group-open:rotate-45 group-open:bg-gold-gradient group-open:text-navy-deep"
            >
              +
            </span>
          </summary>
          <p className="pb-6 leading-relaxed text-muted-foreground [&_a]:font-semibold [&_a]:text-navy [&_a]:underline [&_a]:decoration-gold [&_a]:decoration-2 [&_a]:underline-offset-4 hover:[&_a]:text-bronze">
            <Rich text={f.a} />
          </p>
        </details>
      ))}
    </div>
  );
}

const TRUST = {
  tr: [
    [Sunrise, "Gün doğumunda uçuş", "Uçuşlar sabahın ilk ışığına göre planlanır."],
    [
      Landmark,
      "UNESCO mirası manzara",
      "Pamukkale–Hierapolis, 1988'den beri Dünya Mirası Listesi'nde.",
    ],
    [
      ShieldCheck,
      "6.666 TL'den başlayan fiyatlar",
      "Kesin fiyat ve koşullar WhatsApp'tan yazılı olarak iletilir.",
    ],
    [MessageCircle, "WhatsApp ile kolay iletişim", "Sorularınızı Türkçe veya İngilizce yazın."],
  ],
  en: [
    [Sunrise, "Sunrise flights", "Flights are planned around the first light of day."],
    [
      Landmark,
      "UNESCO World Heritage views",
      "Pamukkale–Hierapolis has been on the list since 1988.",
    ],
    [
      ShieldCheck,
      "Prices from 6,666 TL",
      "Your exact price and terms are confirmed in writing on WhatsApp.",
    ],
    [MessageCircle, "Easy WhatsApp contact", "Ask us anything in English or Turkish."],
  ],
} as const;

export function TrustStrip({ lang }: { lang: Lang }) {
  return (
    <section
      aria-label={lang === "tr" ? "Neden bizimle" : "Why book with us"}
      className="relative z-10 -mt-px border-b border-gold/20 bg-ivory"
    >
      <ul className="container-page grid gap-px py-2 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST[lang].map(([Icon, h, p]) => (
          <li key={h} className="flex items-start gap-4 px-2 py-6 lg:px-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/50 bg-card text-bronze shadow-soft">
              <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.6} />
            </span>
            <span>
              <span className="block font-display text-xl font-semibold">{h}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{p}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

const PKG_EXTRA: Record<
  string,
  {
    img: string;
    alt: Record<Lang, string>;
    tag: Record<Lang, string>;
    feats: Record<Lang, string[]>;
  }
> = {
  standard: {
    img: hero1,
    alt: {
      tr: "Gün doğumunda Pamukkale üzerinde balonlar",
      en: "Balloons over Pamukkale at sunrise",
    },
    tag: { tr: "Klasik deneyim", en: "The classic experience" },
    feats: {
      tr: ["Gün doğumu uçuşu", "Paylaşımlı sepet", "Travertenler ve Hierapolis manzarası"],
      en: ["Sunrise flight", "Shared basket", "Travertine and Hierapolis views"],
    },
  },
  private: {
    img: hero5,
    alt: { tr: "Balon sepetinden Pamukkale manzarası", en: "Pamukkale seen from a balloon basket" },
    tag: { tr: "Özel günler için", en: "For special occasions" },
    feats: {
      tr: ["Gün doğumu uçuşu", "Yalnızca size ayrılan sepet", "Evlilik teklifi ve kutlamalar için"],
      en: [
        "Sunrise flight",
        "A basket just for your group",
        "For proposals, celebrations and family memories",
      ],
    },
  },
};

export function PackageCard({
  p,
  lang,
  index = 0,
  headingLevel = 3,
}: {
  p: (typeof PACKAGES)[number];
  lang: Lang;
  index?: number;
  headingLevel?: 2 | 3;
}) {
  const tr = lang === "tr";
  const x = PKG_EXTRA[p.id];
  const H = headingLevel === 2 ? "h2" : "h3";
  const price = p.priceFrom
    ? tr
      ? `${formatPrice(lang, p.priceFrom)}'den başlayan`
      : `From ${formatPrice(lang, p.priceFrom)}`
    : tr
      ? "Tarihinize özel teklif"
      : "Quoted for your date";
  return (
    <article
      className="card-lux group reveal flex flex-col overflow-hidden"
      style={{ ["--reveal-delay" as string]: `${index * 100}ms` }}
    >
      {x && (
        <div className="relative overflow-hidden">
          <img
            src={x.img}
            {...rs(x.img, "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw")}
            alt={x.alt[lang]}
            width={1600}
            height={907}
            loading="lazy"
            decoding="async"
            className="aspect-[16/9] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />
          <span className="absolute left-5 top-5 rounded-full bg-navy-deep/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-champagne backdrop-blur">
            {x.tag[lang]}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <H className="text-[1.75rem] leading-tight">{p.name[lang]}</H>
        <p className="mt-3 leading-relaxed text-muted-foreground">{p.summary[lang]}</p>
        {x && (
          <ul className="mt-6 grid gap-2.5">
            {x.feats[lang].map((f) => (
              <li key={f} className="flex items-center gap-3 font-medium">
                <span className="h-1.5 w-1.5 rotate-45 bg-gold-deep" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-6">
          <div className="flex items-baseline justify-between gap-4 border-t border-navy/10 pt-5">
            <span className="text-sm font-semibold uppercase tracking-wider text-bronze">
              {tr ? "Fiyat" : "Price"}
            </span>
            <span className="font-display text-2xl font-semibold">{price}</span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={whatsappLink(lang, WA_CONTEXT[p.id]?.[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className={btn.whatsapp}
            >
              <WhatsAppIcon className="h-5 w-5" /> {tr ? "Fiyat Al" : "Get a Price"}
            </a>
            <L href={PAGES.reservation[lang]} className={btn.primary}>
              {tr ? "Rezervasyon" : "Book"} <Arrow />
            </L>
          </div>
        </div>
      </div>
    </article>
  );
}

export function CtaBand({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  return (
    <section className="grain relative isolate overflow-hidden bg-navy text-on-dark">
      <img
        src={hero1}
        {...rs(hero1, "100vw")}
        alt=""
        width={1600}
        height={907}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(10,27,41,0.95)_0%,rgba(16,40,58,0.82)_55%,rgba(16,40,58,0.55)_100%)]" />
      <div className="container-page grid items-center gap-10 py-7 md:py-11 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow !text-champagne">
            {tr ? "Bilgi ve rezervasyon" : "Questions & bookings"}
          </p>
          <h2 className="mt-4 text-[2rem] md:text-5xl">
            {tr ? (
              <>
                Gün doğumunu <em className="not-italic text-gold-gradient">gökyüzünden</em> izlemeye
                hazır mısınız?
              </>
            ) : (
              <>
                Ready to watch the sunrise{" "}
                <em className="not-italic text-gold-gradient">from the sky</em>?
              </>
            )}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-on-dark/85">
            {tr
              ? "Fiyatlarımız 6.666 TL'den başlar. Tarihinizi ve kişi sayınızı iletin; size özel fiyatı ve koşulları yazılı olarak paylaşalım."
              : "Prices start from 6,666 TL. Send us your date and group size, and we'll confirm your exact price and terms in writing."}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:items-stretch">
          <L href={PAGES.reservation[lang]} className={`${btn.gold} btn-lg`}>
            {tr ? "Hemen Rezervasyon Yap" : "Book Your Flight"} <Arrow />
          </L>
          <a
            href={whatsappLink(lang, WA_CONTEXT["reservation"]?.[lang])}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn.whatsapp} btn-lg`}
          >
            <WhatsAppIcon className="h-5 w-5" /> {tr ? "WhatsApp'tan Yazın" : "Chat on WhatsApp"}
          </a>
          <a href={telLink} className={`${btn.outlineLight} btn-lg`}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
            </svg>
            {tr ? "Ara" : "Call"}: {SITE.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

export const GALLERY: {
  src: string;
  w: number;
  h: number;
  cls: string;
  alt: Record<Lang, string>;
}[] = [
  {
    src: gBalloons,
    w: 1280,
    h: 720,
    cls: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    alt: {
      tr: "Gün doğumunda Pamukkale travertenleri üzerinde yükselen sıcak hava balonları",
      en: "Hot air balloons rising over Pamukkale's travertines at sunrise",
    },
  },
  {
    src: gGlow,
    w: 864,
    h: 1152,
    cls: "lg:row-span-2",
    alt: {
      tr: "Şafak öncesi mavi saatte brülör alevi ile parlayan balon",
      en: "A balloon glowing with burner flame in the blue hour before dawn",
    },
  },
  {
    src: gBasket,
    w: 1152,
    h: 864,
    cls: "",
    alt: {
      tr: "Balon sepetinin kenarından gün doğumunda Pamukkale travertenleri",
      en: "Pamukkale's travertines at sunrise seen from the edge of a balloon basket",
    },
  },
  {
    src: gPools,
    w: 1152,
    h: 864,
    cls: "sm:col-span-2 lg:col-span-1",
    alt: {
      tr: "Turkuaz traverten havuzlarına yansıyan sıcak hava balonu",
      en: "A hot air balloon reflected in Pamukkale's turquoise travertine pools",
    },
  },
  {
    src: gHierapolis,
    w: 1152,
    h: 864,
    cls: "sm:col-span-2 lg:col-span-2",
    alt: {
      tr: "Gün doğumunda Hierapolis antik kentinin sütunlu caddesi üzerinde balonlar",
      en: "Balloons above the colonnaded street of ancient Hierapolis at sunrise",
    },
  },
  {
    src: gPlain,
    w: 1152,
    h: 864,
    cls: "sm:col-span-2 lg:col-span-2",
    alt: {
      tr: "Sabah sisi içinde Denizli ovası üzerinde süzülen lacivert-altın balon",
      en: "A navy and gold balloon drifting over the misty Denizli plain in the morning",
    },
  },
];

export function Gallery({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  return (
    <section className="container-page py-7 md:py-11" aria-labelledby="galeri-baslik">
      <div className="max-w-2xl">
        <p className="eyebrow">{tr ? "Galeri" : "Gallery"}</p>
        <h2 id="galeri-baslik" className="mt-4 text-[2rem] md:text-5xl">
          {tr ? "Gökyüzünden Pamukkale" : "Pamukkale from the sky"}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {tr
            ? "Travertenler, turkuaz havuzlar, Hierapolis ve gün doğumunun altın ışığı: uçuş sabahı sizi bekleyen manzaralar."
            : "Travertines, turquoise pools, Hierapolis and golden sunrise light: the views waiting for you on the flight morning."}
        </p>
      </div>
      <ul className="mt-7 grid auto-rows-[15rem] gap-4 sm:grid-cols-2 md:auto-rows-[17rem] lg:grid-cols-4">
        {GALLERY.map((g, i) => (
          <li
            key={g.src}
            className={`group reveal relative overflow-hidden rounded-[1.25rem] shadow-soft ${g.cls}`}
            style={{ ["--reveal-delay" as string]: `${(i % 4) * 80}ms` }}
          >
            <img
              src={g.src}
              {...rs(g.src, "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw")}
              alt={g.alt[lang]}
              width={g.w}
              height={g.h}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
            />
            <span
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(10,27,41,0.55))] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">
        {tr ? "Görseller temsilidir." : "Images are illustrative."}
      </p>
    </section>
  );
}
