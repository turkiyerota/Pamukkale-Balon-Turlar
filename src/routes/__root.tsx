import {
  Outlet,
  Link,
  createRootRoute,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";

import appCss from "../styles.css?url";
// Body text face, preloaded so paragraphs don't re-wrap when it arrives (the headings use
// metric-matched fallbacks in styles.css, so they're left to load normally for a faster first paint).
import fontBody from "@/assets/fonts/manrope-var-tr.woff2?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer, FloatingContact } from "@/components/layout";
import { useReveal } from "@/lib/use-reveal";
import { langFromPath, PAGES } from "@/lib/paths";
import { SITE } from "@/config/site";
import notFoundBg from "@/assets/hero-3.webp";
import { rs } from "@/lib/img";

function NotFoundComponent() {
  const lang = langFromPath(useRouterState({ select: (s) => s.location.pathname }));
  const tr = lang === "tr";
  const links = [
    { href: PAGES.home[lang], label: tr ? "Ana sayfa" : "Home" },
    { href: PAGES.prices[lang], label: tr ? "Fiyatlar" : "Prices" },
    { href: PAGES.blog[lang], label: tr ? "Keşfet" : "Insights" },
    { href: PAGES.contact[lang], label: tr ? "İletişim" : "Contact" },
  ];
  return (
    <div className="grain relative isolate flex min-h-[85svh] items-center justify-center overflow-hidden bg-navy-deep px-4 py-14 text-on-dark">
      <img
        src={notFoundBg}
        {...rs(notFoundBg, "100vw")}
        alt=""
        width={1600}
        height={907}
        className="animate-kenburns absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(10,27,41,0.55),rgba(10,27,41,0.92))]" />
      <div className="relative max-w-xl text-center">
        <img
          src={SITE.logo.onDarkSm}
          alt={SITE.name}
          width={260}
          height={136}
          className="mx-auto h-20 w-auto"
        />
        <p className="mt-10 font-display text-8xl text-gold-gradient md:text-9xl">404</p>
        <h1 className="mt-2 text-3xl md:text-4xl">
          {tr ? "Bu sayfa rüzgârla uçup gitmiş olmalı" : "This page seems to have drifted away"}
        </h1>
        <p className="mt-4 text-on-dark-muted">
          {tr
            ? "Aradığınız sayfa mevcut değil veya taşınmış olabilir. Aşağıdaki bağlantılardan devam edebilirsiniz."
            : "The page you're looking for doesn't exist or has moved. You can carry on from one of these links."}
        </p>
        <nav
          aria-label={tr ? "Önerilen sayfalar" : "Suggested pages"}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className={`btn btn-sm ${i === 0 ? "btn-gold" : "btn-outline-light"}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <p className="mt-8 text-sm text-on-dark-muted">
          <a href={tr ? "/en/" : "/"} hrefLang={tr ? "en" : "tr"} className="underline">
            {tr ? "English" : "Türkçe"}
          </a>
        </p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  const tr = langFromPath(useRouterState({ select: (st) => st.location.pathname })) === "tr";
  return (
    <div className="flex min-h-[70svh] items-center justify-center bg-background px-4 py-14">
      <div className="max-w-md text-center">
        <h1 className="text-4xl">{tr ? "Sayfa yüklenemedi" : "This page didn't load"}</h1>
        <p className="mt-3 text-muted-foreground">
          {tr
            ? "Beklenmedik bir sorun oluştu. Sayfayı yenilemeyi deneyebilir veya ana sayfaya dönebilirsiniz."
            : "Something went wrong on our end. You can try again or head back home."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn btn-navy btn-sm"
          >
            {tr ? "Tekrar dene" : "Try again"}
          </button>
          <a href={tr ? "/" : "/en/"} className="btn btn-outline btn-sm">
            {tr ? "Ana sayfaya dön" : "Go home"}
          </a>
        </div>
      </div>
    </div>
  );
}

/** Current path on both server (request URL) and client, so the fallback head can follow the language. */
const currentPath = createIsomorphicFn()
  .server(() => getRequestUrl().pathname)
  .client(() => window.location.pathname);

/**
 * Root defaults. Every page route sets its own title/description, so these only show on 404s;
 * they follow the URL language so /en/… 404s get an English title and description.
 */
function fallbackMeta() {
  let path = "/";
  try {
    path = currentPath();
  } catch {
    /* outside a request (e.g. prerender) */
  }
  return langFromPath(path) === "en"
    ? {
        title: "Page Not Found (404) | Pamukkale Balloon Tours",
        description:
          "This page doesn't exist or has moved. Continue to Pamukkale hot air balloon prices, guides or contact details.",
      }
    : {
        title: "Sayfa Bulunamadı (404) | Pamukkale Balon Turları",
        description:
          "Aradığınız sayfa mevcut değil veya taşınmış. Pamukkale balon turu fiyatları, rehberler ve iletişim bilgileriyle devam edin.",
      };
}

export const Route = createRootRoute({
  head: () => {
    const fb = fallbackMeta();
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: fb.title },
        { name: "description", content: fb.description },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Pamukkale Balon Turları" },
        { name: "theme-color", content: "#0a1b29" },
      ],
      links: [
        {
          rel: "preload",
          href: fontBody,
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "icon", href: "/favicon.png", type: "image/png" },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/**
 * Netlify's free-tier hosting injects an HTML comment ("This site is hosted on Netlify…") into
 * <head> (plus a line break before it). React does not expect those nodes, so hydration failed (React error #418) and the whole
 * page was re-rendered on the client. This tiny inline script runs before the app's module
 * script and removes the host comment and whitespace-only text nodes from <head>, so hydration matches the server HTML.
 */
const STRIP_HOST_COMMENTS =
  "for(var n=document.head.firstChild;n;){var x=n.nextSibling;if((n.nodeType===8&&/netlify/i.test(n.nodeValue||''))||(n.nodeType===3&&!/\\S/.test(n.nodeValue||'')))n.remove();n=x}";

function RootShell({ children }: { children: ReactNode }) {
  const lang = langFromPath(useRouterState({ select: (s) => s.location.pathname }));
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: STRIP_HOST_COMMENTS }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const pathname = useRouterState({ select: (st) => st.location.pathname });
  const tr = langFromPath(pathname) === "tr";
  useReveal();

  return (
    <>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy-deep focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
      >
        {tr ? "İçeriğe geç" : "Skip to content"}
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
