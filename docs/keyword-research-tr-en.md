# Keyword research: Pamukkale hot-air balloon (TR + EN)

_Researched 2 Nov 2026 (Europe/Istanbul)._

## Method and honesty note
- **Source of the queries:** Google Autocomplete (the `suggestqueries.google.com` endpoint, `hl=tr`/`hl=en`, run on 2 Nov 2026). The raw output is in `/workspace/kw/autocomplete.json`. Autocomplete shows what people actually type, but it gives **no search volumes**.
- **No search volumes are given in this document, on purpose.** Exact numbers need Google Search Console (after the domain goes live) or Google Keyword Planner. Priority below is qualitative: it is based on how often a phrase appeared across the autocomplete seeds and on how clearly it signals intent to book.
- **Competitor pages reviewed** (their titles and topics only; none of their facts are published as ours): pamukkalebalonturufiyatlari.com, excursionpamukkale.com/tr, pamukkalehotairballoon.com, bujuyollarda.com, kadost.com, balloonstatus.com, cottoncastletravel.com, turkeyroutes.com, pamukkale.flights.

## Turkish clusters, mapped to pages
| Cluster | Queries people type (autocomplete) | Intent | Target page |
|---|---|---|---|
| Core | pamukkale balon turu · pamukkale balon · balon turu pamukkale · pamukkale balon uçuşu · pamukkale sıcak hava balonu | Commercial | `/` (home) |
| Price | pamukkale balon fiyatları · pamukkale balon turu fiyatları · pamukkale balon fiyatları 2026 · pamukkale balon turu kaç tl · pamukkale balon turu ne kadar · pamukkale uçan balon fiyatları · denizli pamukkale balon fiyatları · pamukkale sıcak hava balonu fiyatları | Transactional | `/fiyatlar/` (main); the article `/kesfet/pamukkale-balon-turu-fiyatlari-2026/` targets "neye göre değişir" so the two pages don't compete |
| Times | pamukkale balon saatleri · pamukkale balon turu saat kaçta · pamukkale balon kalkış saatleri · denizli balon turu saatleri · pamukkale travertenleri balon saatleri | Informational | `/ucus-bilgileri/` + the "sabah kaçta başlıyor" article + FAQ |
| Take-off point | pamukkale balon turu nereden kalkıyor · denizli balon turu nereden kalkıyor | Informational | FAQ + flight page |
| Booking | pamukkale balon rezervasyon | Transactional | `/rezervasyon/` |
| Regional | denizli balon turu · denizli balon turu fiyatları · denizli balon fiyatları | Commercial | home + prices (the copy says "Pamukkale / Denizli") |
| Flight permission | pamukkale balon uçuş izni | Informational, on the day | FAQ ("her gün uçuyor mu", SHGM). **A live flight-status page is an opportunity, but only with a real daily update.** |
| Reviews | pamukkale balon turu yorumları · fiyatları yorumları | Trust | **Needs real reviews** (Google Business Profile). Never fabricate them. |
| Comparison | kapadokya mı pamukkale mi · pamukkale balon mu kapadokya | Informational | the "Pamukkale mi Kapadokya mı" article + FAQ |
| Supporting | pamukkale gezilecek yerler · pamukkale travertenleri (giriş ücreti, nerede) | Top of funnel | the "after the tour" FAQ and the home Destination section; a future article |

## English clusters, mapped to pages
| Cluster | Queries | Target page |
|---|---|---|
| Core | pamukkale hot air balloon · pamukkale balloon ride · pamukkale balloon flight · pamukkale hot air balloon tour · hot air balloon turkey | `/en/` |
| Price | pamukkale hot air balloon price · pamukkale balloon ride price · pamukkale turkey hot air balloon price | `/en/prices/` + the prices article |
| Time | pamukkale hot air balloon time · pamukkale sunrise hot air balloon · pamukkale sunrise time | `/en/flight-information/` + the start-time article |
| Status | pamukkale balloon flight status (today) · pamukkale hot air balloon status | FAQ "Do balloons fly every day?". A live status page is an opportunity, but only if it is genuinely updated. |
| Comparison | pamukkale hot air balloon vs cappadocia (review) · is pamukkale hot air balloon worth it · does pamukkale have hot air balloon | the Pamukkale vs Cappadocia article + FAQ |
| From resorts | pamukkale hot air balloon from antalya / marmaris / kusadasi / bodrum / side / fethiye | **An opportunity, but it needs Sayed to confirm that transfers from these resorts are offered.** Not published yet. |

## Where the keywords are applied
- **Title and description:** `src/lib/page-meta.ts` (every page, 120–160 characters). The prices article's seoTitle was changed to "…Neye Göre Değişir? (2026 Rehberi)" so that it doesn't cannibalise `/fiyatlar/`.
- **H1 and hero:** "Pamukkale Balon Turu", "Pamukkale Balon Turu Fiyatları", "Balon Turu Rezervasyonu".
- **FAQ:** 16 questions, written the way people search ("kaç TL", "saat kaçta", "kaç dakika", "nereden kalkıyor", "güvenli mi", "değer mi"). FAQPage JSON-LD is on `/sik-sorulan-sorular/`.
- **Structured data:** TravelAgency + WebSite on the home page, BlogPosting + BreadcrumbList on articles, BreadcrumbList on inner pages.

## Ranking checklist once the domain is connected (Sayed)
1. Connect pamukkalebalonturlar.com (the canonical URLs and sitemap already point to it). Verify it in **Google Search Console** and submit `/sitemap.xml`.
2. Create or claim a **Google Business Profile** at the Menderes Cd. address with the same name, phone and website (NAP). For "balon turu" searches, the map pack matters as much as the website.
3. Collect **real** Google reviews from customers.
4. Add real prices, the cancellation policy and real photos when you can. Pages with concrete information rank better and convert better.
5. Get mentioned on local and partner sites (hotels in Pamukkale and Karahayıt, travel blogs).
6. After 4–8 weeks, read the Search Console queries and expand the pages that are getting impressions.
