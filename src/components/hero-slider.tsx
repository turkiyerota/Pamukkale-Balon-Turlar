import { useCallback, useEffect, useState } from "react";
import type { Lang } from "@/config/site";
import { whatsappLink, WA_CONTEXT } from "@/config/site";
import { PAGES } from "@/lib/paths";
import { L, btn, Arrow, WhatsAppIcon } from "./ui-kit";
import hero0 from "@/assets/hero-0.webp";
import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.webp";
import hero3 from "@/assets/hero-3.webp";
import hero5 from "@/assets/hero-5.webp";
import { rs } from "@/lib/img";

const DURATION = 7000;

const SLIDES = [
  {
    src: hero0,
    pos: "62% 50%",
    alt: {
      tr: "Gün doğumunda Pamukkale travertenleri ve turkuaz havuzlar üzerinde süzülen rengârenk balonlar",
      en: "Colourful hot air balloons drifting over Pamukkale's travertines and turquoise pools at sunrise",
    },
  },
  {
    src: hero1,
    pos: "60% 50%",
    alt: {
      tr: "Pamukkale balon turu: gün doğumunda travertenler üzerinde renkli sıcak hava balonları",
      en: "Pamukkale hot air balloon ride: colourful balloons over the travertines at sunrise",
    },
  },
  {
    src: hero2,
    pos: "45% 40%",
    alt: {
      tr: "Altın saatte Hierapolis ve travertenler üzerinde balon",
      en: "A balloon above Hierapolis and the travertines at golden hour",
    },
  },
  {
    src: hero3,
    pos: "50% 60%",
    alt: {
      tr: "Şafakta havadan Pamukkale traverten havuzları",
      en: "Aerial view of Pamukkale's travertine pools at dawn",
    },
  },
  {
    src: hero5,
    pos: "70% 50%",
    alt: {
      tr: "Balon sepetinden Pamukkale travertenleri manzarası",
      en: "Pamukkale's travertines seen from a balloon basket",
    },
  },
];

const COPY = {
  tr: {
    eyebrow: "Pamukkale · Gün doğumu uçuşu",
    h1a: "Pamukkale",
    h1b: "Balon Turu",
    p: "Pamukkale balon turu ile gün doğarken bembeyaz travertenlerin ve antik Hierapolis'in üzerinde süzülün. Sessiz, büyüleyici ve unutulmaz bir sabah sizi bekliyor.",
    cta: "Hemen Rezervasyon Yap",
    wa: "WhatsApp'tan Fiyat Alın",
    chips: [
      "6.666 TL'den başlayan fiyatlar",
      "Gün doğumunda uçuş",
      "UNESCO Dünya Mirası manzarası",
    ],
    prev: "Önceki görsel",
    next: "Sonraki görsel",
    pause: "Slaytı duraklat",
    play: "Slaytı oynat",
    slide: "Görsel",
    scroll: "Keşfedin",
  },
  en: {
    eyebrow: "Pamukkale · Sunrise flight",
    h1a: "Pamukkale",
    h1b: "Hot Air Balloon Ride",
    p: "On a Pamukkale hot air balloon ride you drift above the white travertines and ancient Hierapolis as the sun comes up — a quiet, breathtaking morning you'll never forget.",
    cta: "Book Your Flight",
    wa: "Get a Price on WhatsApp",
    chips: ["Prices from 6,666 TL", "Sunrise flights", "UNESCO World Heritage views"],
    prev: "Previous image",
    next: "Next image",
    pause: "Pause slideshow",
    play: "Play slideshow",
    slide: "Image",
    scroll: "Discover",
  },
};

export function HeroSlider({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const [i, setI] = useState(0);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));
  const [paused, setPaused] = useState(false);

  const go = useCallback((n: number) => {
    const next = (n + SLIDES.length) % SLIDES.length;
    setLoaded((s) => new Set(s).add(next).add((next + 1) % SLIDES.length));
    setI(next);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
    const id = setTimeout(() => setLoaded((s) => new Set(s).add(1)), 1500);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(i + 1), DURATION);
    return () => clearTimeout(id);
  }, [i, paused, go]);

  return (
    <section
      className="grain relative isolate -mt-[4.5rem] flex min-h-[88svh] md:min-h-[92svh] flex-col overflow-hidden bg-navy-deep text-white"
      aria-roledescription={lang === "tr" ? "slayt gösterisi" : "carousel"}
      aria-label={`${t.h1a} ${t.h1b}`}
    >
      {SLIDES.map((s, n) => (
        <div
          key={n}
          className={`absolute inset-0 -z-20 transition-opacity duration-[1600ms] ease-out ${n === i ? "opacity-100" : "opacity-0"}`}
          aria-hidden={n !== i}
        >
          {loaded.has(n) && (
            <img
              src={s.src}
              {...rs(s.src, "100vw")}
              alt={n === i ? s.alt[lang] : ""}
              width={1600}
              height={907}
              fetchPriority={n === 0 ? "high" : "low"}
              loading={n === 0 ? "eager" : "lazy"}
              decoding={n === 0 ? "sync" : "async"}
              style={{ objectPosition: s.pos }}
              className={`h-full w-full object-cover ${n === i ? "animate-kenburns" : ""}`}
            />
          )}
        </div>
      ))}
      {/* v7e: photo stays bright; only localized soft scrims behind the copy (left on desktop, lower part on mobile). */}
      <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-[linear-gradient(180deg,rgba(10,27,41,0.4),rgba(10,27,41,0))]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,27,41,0)_0%,rgba(10,27,41,0)_20%,rgba(10,27,41,0.62)_32%,rgba(10,27,41,0.6)_64%,rgba(10,27,41,0.25)_100%)] md:bg-[radial-gradient(ellipse_48%_74%_at_20%_50%,rgba(10,27,41,0.76)_0%,rgba(10,27,41,0.58)_45%,rgba(10,27,41,0)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 hidden h-28 bg-[linear-gradient(0deg,rgba(10,27,41,0.4),rgba(10,27,41,0))] md:block" />

      <div className="container-page flex flex-1 flex-col justify-end pt-28 pb-24 md:justify-center md:pt-28 md:pb-32">
        <p className="eyebrow !text-white text-shadow-hero">{t.eyebrow}</p>
        <h1 className="text-shadow-hero mt-4 max-w-3xl text-[clamp(2.4rem,6.2vw,5.25rem)] font-bold leading-[1.02] tracking-[-0.035em]">
          <span className="block">{t.h1a}</span>
          <span className="block font-semibold text-white">{t.h1b}</span>
        </h1>
        <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-white text-shadow-hero md:mt-5 md:text-xl">
          {t.p}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8">
          <L href={PAGES.reservation[lang]} className={`${btn.gold} btn-lg`}>
            {t.cta} <Arrow />
          </L>
          <a
            href={whatsappLink(lang, WA_CONTEXT["prices"]?.[lang])}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn.whatsapp} btn-lg`}
          >
            <WhatsAppIcon className="h-5 w-5" /> {t.wa}
          </a>
        </div>
        <ul className="mt-8 hidden flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white text-shadow-hero md:flex">
          {t.chips.map((c) => (
            <li key={c} className="flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute inset-x-0 bottom-0 pb-7">
        <div className="container-page flex items-end justify-between gap-6">
          <div className="flex w-full max-w-md items-center gap-4">
            <span className="font-display text-xl tabular-nums text-champagne" aria-hidden="true">
              0{i + 1}
            </span>
            <div className="flex flex-1 gap-1" role="group" aria-label={t.slide}>
              {SLIDES.map((_, n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => go(n)}
                  aria-label={`${t.slide} ${n + 1}`}
                  aria-current={n === i}
                  className="group relative h-11 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded bg-white/30 transition-colors group-hover:bg-white/60">
                    {n === i && (
                      <span
                        key={`${i}-${paused}`}
                        className={`absolute inset-0 bg-gold ${paused ? "" : "animate-progress"}`}
                        style={{ animationDuration: `${DURATION}ms` }}
                      />
                    )}
                    {n < i && <span className="absolute inset-0 bg-white/70" />}
                  </span>
                </button>
              ))}
            </div>
            <span className="font-display text-xl tabular-nums text-white/60" aria-hidden="true">
              0{SLIDES.length}
            </span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? t.play : t.pause}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-white/5 backdrop-blur transition-colors hover:bg-white/20"
            >
              {paused ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M7 5h3v14H7zM14 5h3v14h-3z" />
                </svg>
              )}
            </button>
            <button
              type="button"
              onClick={() => go(i - 1)}
              aria-label={t.prev}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-white/5 backdrop-blur transition-colors hover:bg-white/20"
            >
              <Arrow className="h-4 w-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => go(i + 1)}
              aria-label={t.next}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-white/5 backdrop-blur transition-colors hover:bg-white/20"
            >
              <Arrow className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <a
        href="#ana-icerik"
        className="absolute bottom-24 right-10 hidden flex-col items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-white text-shadow-hero hover:text-gold lg:flex"
        aria-label={t.scroll}
      >
        {t.scroll}
        <span className="relative h-10 w-px overflow-hidden bg-white/40" aria-hidden="true">
          <span className="animate-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gold" />
        </span>
      </a>
    </section>
  );
}
