import { useCallback, useEffect, useState } from "react";
import type { Lang } from "@/config/site";
import { whatsappLink } from "@/config/site";
import { PAGES } from "@/lib/paths";
import { L, btn, WhatsAppIcon } from "./ui-kit";
import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.webp";
import hero3 from "@/assets/hero-3.webp";
import hero4 from "@/assets/hero-4.webp";
import hero5 from "@/assets/hero-5.webp";

const SLIDES = [
  { src: hero1, pos: "60% 50%", alt: { tr: "Gün doğumunda Pamukkale travertenleri üzerinde renkli balonlar", en: "Colourful balloons over Pamukkale's travertines at sunrise" } },
  { src: hero2, pos: "45% 40%", alt: { tr: "Altın saatte Hierapolis ve travertenler üzerinde balon", en: "A balloon above Hierapolis and the travertines at golden hour" } },
  { src: hero3, pos: "50% 60%", alt: { tr: "Şafakta havadan Pamukkale traverten havuzları", en: "Aerial view of Pamukkale's pools at dawn" } },
  { src: hero4, pos: "60% 50%", alt: { tr: "Turuncu gökyüzünde balon siluetleri", en: "Balloon silhouettes against an orange sky" } },
  { src: hero5, pos: "70% 50%", alt: { tr: "Balon sepetinden Pamukkale manzarası", en: "Pamukkale seen from a balloon basket" } },
];

const COPY = {
  tr: { eyebrow: "PAMUKKALE’DE GÜN DOĞARKEN", h1: "Pamukkale Balon Turu", p: "Pamukkale’nin eşsiz manzarasını gökyüzünden keşfetme deneyimi hakkında bilgi alın ve size uygun seçenekleri inceleyin.", cta: "Fiyatları İncele", wa: "WhatsApp ile Bilgi Al", prev: "Önceki görsel", next: "Sonraki görsel", pause: "Duraklat", play: "Oynat", slide: "Görsel" },
  en: { eyebrow: "SUNRISE OVER PAMUKKALE", h1: "Pamukkale Hot Air Balloon Tour", p: "Find out what it's like to see Pamukkale's extraordinary landscape from the sky, and explore the options that suit you.", cta: "View Prices", wa: "Ask on WhatsApp", prev: "Previous image", next: "Next image", pause: "Pause", play: "Play", slide: "Image" },
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
    const id = setTimeout(() => go(i + 1), 6500);
    return () => clearTimeout(id);
  }, [i, paused, go]);

  return (
    <section className="relative isolate h-[78svh] min-h-[520px] max-h-[860px] overflow-hidden bg-navy-deep text-on-dark" aria-roledescription="carousel" aria-label={t.h1}>
      {SLIDES.map((s, n) => (
        <div key={n} className={`absolute inset-0 -z-10 transition-opacity duration-[1400ms] ${n === i ? "opacity-100" : "opacity-0"}`} aria-hidden={n !== i}>
          {loaded.has(n) && (
            <img
              src={s.src}
              alt={s.alt[lang]}
              width={1600}
              height={907}
              fetchPriority={n === 0 ? "high" : "low"}
              loading={n === 0 ? "eager" : "lazy"}
              style={{ objectPosition: s.pos }}
              className={`h-full w-full object-cover ${n === i ? "animate-kenburns" : ""}`}
            />
          )}
        </div>
      ))}
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />

      <div className="container-page flex h-full flex-col justify-end pb-24 md:justify-center md:pb-0">
        <p className="eyebrow animate-rise">{t.eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-5xl sm:text-6xl md:text-7xl lg:text-8xl animate-rise [animation-delay:120ms]">{t.h1}</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-on-dark-muted md:text-lg animate-rise [animation-delay:240ms]">{t.p}</p>
        <div className="mt-8 flex flex-wrap gap-3 animate-rise [animation-delay:360ms]">
          <L href={PAGES.prices[lang]} className={btn.accent}>{t.cta}</L>
          <a href={whatsappLink(lang)} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}>
            <WhatsAppIcon /> {t.wa}
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0">
        <div className="container-page flex items-center justify-between gap-4">
          <div className="flex gap-2" role="group" aria-label={t.slide}>
            {SLIDES.map((_, n) => (
              <button key={n} type="button" onClick={() => go(n)} aria-label={`${t.slide} ${n + 1}`} aria-current={n === i} className={`h-1.5 rounded-full transition-all ${n === i ? "w-10 bg-amber" : "w-5 bg-on-dark/50 hover:bg-on-dark"}`} />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? t.play : t.pause} className="h-10 w-10 rounded-full border border-on-dark/40 text-sm hover:bg-on-dark/15">{paused ? "▶" : "❚❚"}</button>
            <button type="button" onClick={() => go(i - 1)} aria-label={t.prev} className="h-10 w-10 rounded-full border border-on-dark/40 hover:bg-on-dark/15">←</button>
            <button type="button" onClick={() => go(i + 1)} aria-label={t.next} className="h-10 w-10 rounded-full border border-on-dark/40 hover:bg-on-dark/15">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
