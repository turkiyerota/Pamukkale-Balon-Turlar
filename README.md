# Pamukkale Balon Turları — website

A bilingual marketing site for **pamukkalebalonturlar.com**. Turkish is the default language (`/`)
and English lives under `/en/`. Built with TanStack Start (React 19, SSR), Tailwind CSS v4 and Vite,
and bundled by Nitro for **Cloudflare Workers**.

> The package name in `package.json` stays `tanstack_start_ts` on purpose, as left by the Lovable
> template. Renaming it is optional and purely cosmetic. The Worker name in the generated
> `wrangler.json` is derived from it (`tanstack-start-ts`).

## Commands

```sh
bun install
bun run dev        # local dev server
bun run test       # vitest: content integrity + reservation validation
bunx tsc --noEmit  # type check
bun run build      # production build → .output/ (Cloudflare Worker + static assets)
```

To run the production build locally:

```sh
npx wrangler@4 dev -c .output/server/wrangler.json --port 8787
# If the local workerd says the compatibility date is too new, add e.g. --compatibility-date 2026-10-30
```

Deploying to your own Cloudflare account (you must be logged in to it): `npx nitro deploy --prebuilt`
or `npx wrangler deploy -c .output/server/wrangler.json`.

## Where things live

| What | Where |
|---|---|
| Business data (contact, WhatsApp, packages, prices, hours, social) | `src/config/site.ts` |
| URL map, TR⇄EN page pairs, 9-per-page pagination | `src/lib/paths.ts` |
| SEO helpers (canonical, hreflang tr/en/x-default, Open Graph/Twitter, JSON-LD) | `src/lib/seo.ts`, `src/lib/page-meta.ts` |
| Routes (file-based) | `src/routes/` (`sitemap[.]xml.ts`, `__root.tsx` holds the 404 page) |
| Page components | `src/components/pages/` |
| Article metadata (cover, alt, category, date, order) | `src/content/articles.ts` |
| Article bodies | `src/content/tr/part1-4.ts`, `src/content/en/part1-4.ts` |
| Hero images, logos, article covers | `src/assets/` (`covers/{id}-{tr,en}.webp`, 1024×768) |
| Keyword map | `docs/keyword-mapping.md` |
| robots.txt | `public/robots.txt` |

Fonts (Cormorant Garamond and Manrope) are self-hosted via `@fontsource`, so no request goes to Google Fonts.

## Placeholders — nothing here is invented

Anything unconfirmed renders as "on request / to be confirmed", never as a fact. Before launch the operator must supply or confirm:

- `PACKAGES[*].price` / `confirmed` — prices, currency, and what each package includes
- `SITE.whatsapp.confirmed` — whether +90 553 000 59 00 is WhatsApp-enabled
- `SITE.hours`, `SITE.social`
- Flight duration, pickup times, minimum age, cancellation/refund policy, payment methods,
  operator licence/insurance details. The articles say these are "not yet published".
- Legal pages: have the privacy/cookie/terms text reviewed (KVKK) before going live.
- Reservation form: there is no backend yet. It builds a WhatsApp/e-mail message and clearly says
  the request has **not** been sent. To add a real backend, post to an endpoint and only show success on a 2xx response.

## Adding an article

1. Write the body (`slug`, `title`, `seoTitle`, `description`, `excerpt`, `intro`, `sections`, `takeaways`)
   in the TR and EN `part*.ts` files under the same `id`.
2. Add a meta entry in `src/content/articles.ts`: `id`, `order`, `category`, `covers` (one unique image per
   language), `coverAlt` and `published`.
3. Listings sort newest-first (then by `order`), 9 per page. The sitemap and pagination update automatically.
4. Run `bun run test`. It checks inline links, unique covers, section and takeaway counts, and alt text.
