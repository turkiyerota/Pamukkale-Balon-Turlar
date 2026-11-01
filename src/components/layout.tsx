import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SITE, telLink, mailLink, whatsappLink, type Lang } from "@/config/site";
import { PAGES, PAGE_LABELS, langFromPath, type PageKey } from "@/lib/paths";
import { alternatePath } from "@/lib/alternate";
import { L, btn, WhatsAppIcon } from "./ui-kit";

const NAV: PageKey[] = ["prices", "flight", "faq", "blog", "about", "contact"];

export function useLang(): Lang {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return langFromPath(pathname);
}

function LangSwitch({ className = "" }: { className?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { lang, target, href } = alternatePath(pathname);
  return (
    <div className={`flex items-center gap-1 text-xs font-bold tracking-widest ${className}`} aria-label={lang === "tr" ? "Dil seçimi" : "Language"}>
      <span aria-current="true" className="rounded px-2 py-1 bg-primary text-primary-foreground">{lang.toUpperCase()}</span>
      <L href={href} hrefLang={target} lang={target} className="rounded px-2 py-1 hover:bg-muted">
        {target.toUpperCase()}
      </L>
    </div>
  );
}

export function Header() {
  const lang = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <L href={PAGES.home[lang]} aria-label={SITE.name} className="shrink-0">
          <img src={SITE.logo.onLight} alt={SITE.name} width={480} height={242} className="h-11 w-auto md:h-12" />
        </L>
        <nav aria-label={lang === "tr" ? "Ana menü" : "Main menu"} className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {NAV.map((k) => (
              <li key={k}>
                <L href={PAGES[k][lang]} className="relative py-1 transition-colors hover:text-sage">
                  {PAGE_LABELS[k][lang]}
                </L>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitch className="hidden sm:flex" />
          <L href={PAGES.reservation[lang]} className={`${btn.accent} hidden md:inline-flex py-2.5`}>
            {lang === "tr" ? "Rezervasyon" : "Book"}
          </L>
          <a href={whatsappLink(lang)} target="_blank" rel="noopener noreferrer" className={`${btn.whatsapp} hidden sm:inline-flex px-3 py-2.5`} aria-label="WhatsApp">
            <WhatsAppIcon />
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? (lang === "tr" ? "Menüyü kapat" : "Close menu") : lang === "tr" ? "Menüyü aç" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="text-xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background lg:hidden animate-rise">
          <nav className="container-page py-4" aria-label={lang === "tr" ? "Mobil menü" : "Mobile menu"}>
            <ul className="flex flex-col">
              {NAV.map((k) => (
                <li key={k}>
                  <L href={PAGES[k][lang]} className="block border-b border-border/60 py-3 text-lg font-display">
                    {PAGE_LABELS[k][lang]}
                  </L>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <L href={PAGES.reservation[lang]} className={btn.accent}>{lang === "tr" ? "Rezervasyon Talebi" : "Request a Booking"}</L>
              <a href={whatsappLink(lang)} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}><WhatsAppIcon /> WhatsApp</a>
              <LangSwitch />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  const lang = useLang();
  const tr = lang === "tr";
  return (
    <footer className="bg-navy text-on-dark">
      <div className="container-page grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={SITE.logo.onDark} alt={SITE.name} width={480} height={250} loading="lazy" className="h-14 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-on-dark-muted">
            {tr
              ? "Pamukkale'nin travertenleri üzerinde balon turu hakkında bilgi alın, sorularınızı iletin ve size uygun seçenekleri birlikte değerlendirelim."
              : "Ask about hot air balloon tours over Pamukkale's travertines — send us your questions and we'll go through the options with you."}
          </p>
          <a href={whatsappLink(lang)} target="_blank" rel="noopener noreferrer" className={`${btn.whatsapp} mt-6`}>
            <WhatsAppIcon /> {tr ? "WhatsApp ile Yazın" : "Message on WhatsApp"}
          </a>
        </div>
        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-amber">{tr ? "Sayfalar" : "Pages"}</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {(["prices", "reservation", "flight", "faq", "blog", "about"] as PageKey[]).map((k) => (
              <li key={k}><L href={PAGES[k][lang]} className="text-on-dark-muted hover:text-on-dark">{PAGE_LABELS[k][lang]}</L></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-amber">{tr ? "İletişim" : "Contact"}</h2>
          <address className="mt-4 space-y-2 text-sm not-italic text-on-dark-muted">
            <p><a href={telLink} className="hover:text-on-dark">{SITE.contact.phoneDisplay}</a></p>
            <p><a href={mailLink} className="break-all hover:text-on-dark">{SITE.contact.email}</a></p>
            <p>{SITE.contact.address}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-on-dark/15">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <ul className="flex flex-wrap gap-4">
            {(["privacy", "cookies", "terms", "contact"] as PageKey[]).map((k) => (
              <li key={k}><L href={PAGES[k][lang]} className="hover:text-on-dark">{PAGE_LABELS[k][lang]}</L></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
