import { Link } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Fragment } from "react";

/** Button styles live in styles.css (.btn*) — shine sweep, lift, press feedback, arrow slide, focus ring. */
export const btn = {
  primary: "btn btn-navy",
  accent: "btn btn-gold",
  gold: "btn btn-gold",
  whatsapp: "btn btn-wa",
  glass: "btn btn-glass",
  outline: "btn btn-outline",
  outlineLight: "btn btn-outline-light",
};

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`btn-arrow ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Internal link that accepts plain path strings like "/fiyatlar/". */
export function L({
  href,
  children,
  ...rest
}: { href: string; children: ReactNode } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={href as never} {...(rest as object)}>
      {children}
    </Link>
  );
}

/** Renders inline [text](href) links and **bold** markup. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link)
          return (
            <L key={i} href={link[2]!}>
              {link[1]}
            </L>
          );
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-1-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.5 13.5 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.2-.3-.3-.6-.4ZM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
  dark,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`eyebrow ${dark ? "!text-champagne" : ""}`}>{eyebrow}</p>}
      <h2 className="mt-4 text-4xl leading-[1.05] md:text-[3.4rem]">{title}</h2>
      {intro && (
        <p
          className={`mt-5 text-lg leading-relaxed ${dark ? "text-on-dark-muted" : "text-muted-foreground"}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-gold/40 bg-champagne/35 px-5 py-4 text-[0.95rem] leading-relaxed text-foreground">
      {children}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path?: string | undefined }[] }) {
  const label = items[0]?.name === "Home" ? "Breadcrumb" : "Sayfa yolu";
  return (
    <nav aria-label={label} className="text-sm font-medium">
      <ol className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-white/20 bg-navy-deep/45 px-4 py-1.5 text-on-dark/85 backdrop-blur-md">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden="true" className="text-champagne">
                ›
              </span>
            )}
            {it.path ? (
              <L href={it.path} className="hover:text-on-dark underline-offset-4 hover:underline">
                {it.name}
              </L>
            ) : (
              <span aria-current="page" className="text-on-dark">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
