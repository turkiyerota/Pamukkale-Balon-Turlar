import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SITE, telLink, mailLink, whatsappLink, WA_CONTEXT, type Lang } from "@/config/site";
import { PAGES, PAGE_LABELS, langFromPath, normalize, type PageKey } from "@/lib/paths";
import { alternatePath } from "@/lib/alternate";
import { L, btn, Arrow, WhatsAppIcon } from "./ui-kit";

const NAV: PageKey[] = ["prices", "flight", "faq", "blog", "about", "contact"];

export function useLang(): Lang {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return langFromPath(pathname);
}

/** Which static page (if any) a pathname belongs to. */
export function pageKeyFromPath(pathname: string): PageKey | "article" | null {
  const p = normalize(pathname);
  for (const k of Object.keys(PAGES) as PageKey[])
    if (PAGES[k].tr === p || PAGES[k].en === p) return k;
  if (/^\/(kesfet|en\/insights)\/(?!sayfa\/|page\/)[^/]+\/$/.test(p)) return "article";
  return null;
}

/**
 * WhatsApp link with a pre-filled message that matches the current page.
 * Articles: after hydration the message mentions the article title (read from the page's h1).
 */
export function useWhatsAppHref(): string {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lang = langFromPath(pathname);
  const key = pageKeyFromPath(pathname);
  const base =
    key && key !== "article" && WA_CONTEXT[key]
      ? WA_CONTEXT[key][lang]
      : SITE.whatsapp.messages[lang];
  const [href, setHref] = useState(() => whatsappLink(lang, base));
  useEffect(() => {
    if (key === "article") {
      const title = document.querySelector("h1")?.textContent?.trim();
      if (title) {
        const msg =
          lang === "tr"
            ? `Merhaba, “${title}” yazınızı okudum. Balon turu hakkında bilgi almak istiyorum.`
            : `Hello, I read your article “${title}”. I'd like some information about a balloon flight.`;
        setHref(whatsappLink(lang, msg));
        return;
      }
    }
    setHref(whatsappLink(lang, base));
  }, [pathname, lang, key, base]);
  return href;
}

function LangSwitch({ className = "", light = false }: { className?: string; light?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { lang, target, href } = alternatePath(pathname);
  return (
    <div
      role="group"
      className={`flex items-center rounded-full border p-0.5 text-xs font-bold tracking-widest ${light ? "border-white/35" : "border-navy/20"} ${className}`}
      aria-label={lang === "tr" ? "Dil seçimi" : "Language"}
    >
      <span
        aria-current="true"
        className={`rounded-full px-2.5 py-1 ${light ? "bg-white text-navy" : "bg-navy text-on-dark"}`}
      >
        {lang.toUpperCase()}
      </span>
      <L
        href={href}
        hrefLang={target}
        lang={target}
        aria-label={target === "en" ? "English" : "Türkçe"}
        className={`rounded-full px-2.5 py-1 transition-colors ${light ? "text-white hover:bg-white/15" : "hover:bg-navy/10"}`}
      >
        {target.toUpperCase()}
      </L>
    </div>
  );
}

export function Header() {
  const lang = useLang();
  const tr = lang === "tr";
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/" || pathname === "/en" || pathname === "/en/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wa = useWhatsAppHref();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Transparent over the home hero until the user scrolls (or opens the menu).
  const overHero = isHome && !scrolled && !open;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500 ${
          overHero
            ? "border-b border-transparent bg-transparent text-white"
            : "border-b border-gold/20 bg-ivory/85 text-navy shadow-[0_10px_30px_-20px_rgba(16,37,54,0.45)] backdrop-blur-xl backdrop-saturate-150"
        }`}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
          <L
            href={PAGES.home[lang]}
            aria-label={tr ? `${SITE.name} – Ana sayfa` : `${SITE.nameEn} – Home`}
            className="relative shrink-0"
          >
            <img
              src={SITE.logo.onLight}
              alt=""
              width={480}
              height={242}
              className={`h-11 w-auto transition-opacity duration-500 md:h-12 ${overHero ? "opacity-0" : "opacity-100"}`}
            />
            <img
              src={SITE.logo.onDark}
              alt=""
              width={480}
              height={250}
              className={`absolute inset-0 h-11 w-auto transition-opacity duration-500 md:h-12 ${overHero ? "opacity-100" : "opacity-0"}`}
            />
          </L>
          <nav aria-label={tr ? "Ana menü" : "Main menu"} className="hidden xl:block">
            <ul className="flex items-center gap-7 text-[0.95rem] font-semibold">
              {NAV.map((k) => (
                <li key={k}>
                  <L href={PAGES[k][lang]} className="link-u py-1.5">
                    {k === "faq" && lang === "tr" ? "Sık Sorulanlar" : PAGE_LABELS[k][lang]}
                  </L>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-2.5">
            <LangSwitch className="hidden xl:flex" light={overHero} />
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden h-11 w-11 items-center justify-center rounded-full transition-colors xl:inline-flex ${overHero ? "bg-white/15 text-white hover:bg-white/25" : "bg-whatsapp/10 text-whatsapp hover:bg-whatsapp hover:text-white"}`}
              aria-label={tr ? "WhatsApp ile yazın" : "Message us on WhatsApp"}
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <L
              href={PAGES.reservation[lang]}
              className={`${btn.gold} btn-sm hidden sm:inline-flex`}
              data-active={pathname.startsWith(PAGES.reservation[lang]) || undefined}
            >
              {tr ? "Rezervasyon Yap" : "Book Now"}
            </L>
            <button
              type="button"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors xl:hidden ${overHero ? "border-white/40 hover:bg-white/15" : "border-navy/20 hover:bg-navy/5"}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={
                open ? (tr ? "Menüyü kapat" : "Close menu") : tr ? "Menüyü aç" : "Open menu"
              }
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[6px] h-0.5 w-5 rounded bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 top-3 h-0.5 w-5 rounded bg-current transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-[4.5rem] z-50 overflow-y-auto bg-ivory xl:hidden"
        >
          <nav
            className="container-page flex min-h-full flex-col py-6"
            aria-label={tr ? "Mobil menü" : "Mobile menu"}
          >
            <ul className="flex flex-col">
              {(["home", ...NAV, "reservation"] as PageKey[]).map((k, i) => (
                <li key={k} className="animate-rise" style={{ animationDelay: `${i * 45}ms` }}>
                  <L
                    href={PAGES[k][lang]}
                    className="flex items-center justify-between border-b border-navy/10 py-4 font-display text-[1.7rem] font-semibold"
                  >
                    {PAGE_LABELS[k][lang]}
                    <Arrow className="h-5 w-5 text-bronze" />
                  </L>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <L href={PAGES.reservation[lang]} className={btn.gold}>
                {tr ? "Rezervasyon Yap" : "Book Now"} <Arrow />
              </L>
              <a href={wa} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}>
                <WhatsAppIcon className="h-5 w-5" />{" "}
                {tr ? "WhatsApp'tan Yazın" : "Chat on WhatsApp"}
              </a>
              <a href={telLink} className={btn.outline}>
                {SITE.contact.phoneDisplay}
              </a>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <LangSwitch />
              <span className="text-sm text-muted-foreground">Pamukkale / Denizli</span>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

/** Desktop: floating round WhatsApp button with pulse ring. Mobile: slim bottom action bar (content gets matching bottom padding). */
export function FloatingContact() {
  const lang = useLang();
  const tr = lang === "tr";
  const wa = useWhatsAppHref();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onReservation = pathname.startsWith(PAGES.reservation[lang]);
  return (
    <>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-float hidden md:inline-flex"
        aria-label={tr ? "WhatsApp ile yazın" : "Message us on WhatsApp"}
      >
        <WhatsAppIcon className="h-8 w-8" />
        <span className="wa-label" aria-hidden="true">
          {tr ? "WhatsApp'tan yazın" : "Chat on WhatsApp"}
        </span>
      </a>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gold/25 bg-ivory/92 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-12px_30px_-18px_rgba(16,37,54,0.5)] backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-[auto_1fr_1fr] gap-2">
          <a
            href={telLink}
            className="btn btn-outline btn-sm !px-3.5"
            aria-label={
              tr ? `Ara: ${SITE.contact.phoneDisplay}` : `Call ${SITE.contact.phoneDisplay}`
            }
          >
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
          </a>
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa btn-sm !px-3"
          >
            <WhatsAppIcon className="h-5 w-5" /> WhatsApp
          </a>
          {onReservation ? (
            <a href="#rezervasyon-formu" className="btn btn-gold btn-sm !px-3">
              {tr ? "Forma Git" : "To the form"}
            </a>
          ) : (
            <L href={PAGES.reservation[lang]} className="btn btn-gold btn-sm !px-3">
              {tr ? "Rezervasyon" : "Book Now"}
            </L>
          )}
        </div>
      </div>
    </>
  );
}

export function Footer() {
  const lang = useLang();
  const tr = lang === "tr";
  const wa = useWhatsAppHref();
  const year = new Date().getFullYear();
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.contact.address)}`;
  return (
    <footer className="relative bg-navy-deep pb-20 text-on-dark md:pb-0">
      <div className="h-px bg-gold-gradient opacity-70" aria-hidden="true" />
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:py-20">
        <div>
          <img
            src={SITE.logo.onDark}
            alt={tr ? SITE.name : SITE.nameEn}
            width={480}
            height={250}
            loading="lazy"
            className="h-16 w-auto"
          />
          <p className="mt-6 max-w-sm leading-relaxed text-on-dark-muted">
            {tr
              ? "Gün doğarken Pamukkale travertenleri ve Hierapolis üzerinde balon turu. Tarihinizi yazın, size özel teklifimizi hazırlayalım."
              : "Sunrise hot air balloon flights over Pamukkale's travertines and Hierapolis. Tell us your date and we'll prepare your quote."}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn.whatsapp} btn-sm`}
            >
              <WhatsAppIcon className="h-5 w-5" /> {tr ? "WhatsApp'tan Yazın" : "Chat on WhatsApp"}
            </a>
          </div>
        </div>
        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-champagne">
            {tr ? "Balon Turu" : "Balloon Flight"}
          </h2>
          <ul className="mt-5 space-y-3">
            {(["prices", "reservation", "flight", "faq"] as PageKey[]).map((k) => (
              <li key={k}>
                <L href={PAGES[k][lang]} className="link-u text-on-dark/85 hover:text-white">
                  {PAGE_LABELS[k][lang]}
                </L>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-champagne">
            {tr ? "Kurumsal" : "Company"}
          </h2>
          <ul className="mt-5 space-y-3">
            {(["about", "blog", "contact"] as PageKey[]).map((k) => (
              <li key={k}>
                <L href={PAGES[k][lang]} className="link-u text-on-dark/85 hover:text-white">
                  {PAGE_LABELS[k][lang]}
                </L>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.24em] text-champagne">
            {tr ? "Bize Ulaşın" : "Get in Touch"}
          </h2>
          <address className="mt-5 space-y-3 not-italic text-on-dark/85">
            <p>
              <a href={telLink} className="link-u text-lg font-semibold text-white">
                {SITE.contact.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={mailLink} className="link-u [overflow-wrap:anywhere] hover:text-white">
                {SITE.contact.email}
              </a>
            </p>
            <p className="leading-relaxed">
              {SITE.contact.address.replace("Pamukkale/Denizli", "Pamukkale / Denizli")}
            </p>
            <p>
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-u text-champagne"
              >
                {tr ? "Haritada göster" : "Show on map"} ↗
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-sm text-on-dark/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {tr ? SITE.name : SITE.nameEn}.{" "}
            {tr ? "Tüm hakları saklıdır." : "All rights reserved."}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {(["privacy", "cookies", "terms"] as PageKey[]).map((k) => (
              <li key={k}>
                <L href={PAGES[k][lang]} className="link-u hover:text-white">
                  {PAGE_LABELS[k][lang]}
                </L>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
