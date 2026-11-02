import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header, Footer, FloatingContact } from "@/components/layout";
import { useReveal } from "@/lib/use-reveal";
import { langFromPath, PAGES } from "@/lib/paths";
import { SITE } from "@/config/site";
import notFoundBg from "@/assets/hero-3.webp";

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
    <div className="grain relative isolate flex min-h-[85svh] items-center justify-center overflow-hidden bg-navy-deep px-4 py-20 text-on-dark">
      <img
        src={notFoundBg}
        alt=""
        width={1600}
        height={907}
        className="animate-kenburns absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(10,27,41,0.55),rgba(10,27,41,0.92))]" />
      <div className="relative max-w-xl text-center">
        <img
          src={SITE.logo.onDark}
          alt={SITE.name}
          width={480}
          height={250}
          className="mx-auto h-20 w-auto"
        />
        <p className="mt-10 font-display text-8xl italic text-gold-gradient md:text-9xl">404</p>
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
    <div className="flex min-h-[70svh] items-center justify-center bg-background px-4 py-20">
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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pamukkale Balon Turları" },
      { name: "description", content: "Pamukkale'de gün doğumunda balon turu." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Pamukkale Balon Turları" },
      { name: "theme-color", content: "#0a1b29" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const lang = langFromPath(useRouterState({ select: (s) => s.location.pathname }));
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (st) => st.location.pathname });
  const tr = langFromPath(pathname) === "tr";
  useReveal(pathname);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
