# Keyword mapping — Pamukkale Balon Turları

Each URL targets **one** primary search intent. Secondary terms support it without competing
with another page. Turkish (TR) is the default language at `/`; English (EN) lives under `/en/`.
Titles and descriptions come from `src/lib/page-meta.ts` (pages) and the article bodies in
`src/content/{tr,en}/part*.ts`.

> No search-volume figures are listed here, because no keyword-tool data was supplied. Check the
> priorities against Google Search Console after launch.

## Core pages

| Page | TR URL | TR primary keyword | EN URL | EN primary keyword | Secondary / supporting |
|---|---|---|---|---|---|
| Home | `/` | pamukkale balon turu | `/en/` | pamukkale hot air balloon tour | pamukkale balon, pamukkale balloon ride, sunrise balloon pamukkale |
| Prices | `/fiyatlar/` | pamukkale balon turu fiyatları | `/en/prices/` | pamukkale balloon tour price | balon turu paketleri, fiyata dahil olanlar / packages, inclusions |
| Reservation | `/rezervasyon/` | pamukkale balon turu rezervasyon | `/en/reservation/` | book pamukkale balloon ride | balon turu rezervasyon talebi / booking request |
| Flight information | `/ucus-bilgileri/` | pamukkale balon uçuşu | `/en/flight-information/` | pamukkale balloon flight information | uçuş sabahı, hava koşulları / what to expect, weather |
| FAQ | `/sik-sorulan-sorular/` | pamukkale balon turu sık sorulan sorular | `/en/faqs/` | pamukkale balloon tour faq | süre, saat, iptal / duration, time, cancellation |
| Blog hub | `/kesfet/` | pamukkale balon turu rehberi | `/en/insights/` | pamukkale balloon ride guide | — |
| About | `/hakkimizda/` | pamukkale balon turları hakkında | `/en/about/` | pamukkale balloon tours company | brand |
| Contact | `/iletisim/` | pamukkale balon turu iletişim | `/en/contact/` | pamukkale balloon tours contact | telefon, whatsapp, adres |
| Legal | `/gizlilik-politikasi/`, `/cerez-politikasi/`, `/kullanim-kosullari/` | — (not targeted) | `/en/privacy-policy/`, `/en/cookie-policy/`, `/en/terms-of-use/` | — | — |

## Articles (12 TR + 12 EN, translation pairs share an `id`)

| id | TR URL | TR primary keyword | EN URL | EN primary keyword | Main internal link target |
|---|---|---|---|---|---|
| prices | `/kesfet/pamukkale-balon-turu-fiyatlari-2026/` | pamukkale balon turu fiyatları 2026 | `/en/insights/pamukkale-hot-air-balloon-prices-2026/` | pamukkale hot air balloon price 2026 | Prices page |
| start | `/kesfet/pamukkale-balon-turu-sabah-kacta-basliyor/` | pamukkale balon turu saat kaçta | `/en/insights/what-time-do-pamukkale-balloon-tours-start/` | what time do pamukkale balloon tours start | Flight info |
| duration | `/kesfet/pamukkale-balon-turu-kac-dakika-surer/` | pamukkale balon turu kaç dakika | `/en/insights/how-long-does-a-pamukkale-balloon-ride-last/` | how long is a pamukkale balloon ride | Flight info |
| clothing | `/kesfet/pamukkale-balon-turunda-ne-giyilir/` | balon turunda ne giyilir | `/en/insights/what-to-wear-for-a-pamukkale-hot-air-balloon-ride/` | what to wear hot air balloon pamukkale | Flight info |
| cancel | `/kesfet/pamukkale-balon-turu-iptal-edilirse-ne-olur/` | balon turu iptal olursa | `/en/insights/what-happens-if-a-pamukkale-balloon-tour-is-cancelled/` | pamukkale balloon tour cancelled | Prices (terms) |
| safety | `/kesfet/pamukkale-balon-turu-guvenli-mi/` | pamukkale balon turu güvenli mi | `/en/insights/are-pamukkale-hot-air-balloon-rides-safe/` | are pamukkale balloon rides safe | Flight info |
| booking | `/kesfet/pamukkale-balon-turu-rezervasyonu-nasil-yapilir/` | balon turu rezervasyonu nasıl yapılır | `/en/insights/how-to-book-a-pamukkale-balloon-tour/` | how to book pamukkale balloon tour | Reservation |
| included | `/kesfet/pamukkale-balon-turunda-fiyata-neler-dahil/` | balon turu fiyata neler dahil | `/en/insights/what-is-included-in-a-pamukkale-balloon-tour/` | pamukkale balloon tour what's included | Prices |
| best-time | `/kesfet/pamukkale-balon-turu-icin-en-iyi-zaman/` | pamukkale balon turu en iyi zaman | `/en/insights/best-time-for-a-pamukkale-balloon-ride/` | best time pamukkale balloon ride | Reservation |
| compare | `/kesfet/pamukkale-mi-kapadokya-mi-balon-turu/` | pamukkale mi kapadokya mı balon | `/en/insights/pamukkale-vs-cappadocia-balloon-experience/` | pamukkale vs cappadocia balloon | Home / Prices |
| children | `/kesfet/pamukkale-balon-turuna-cocuklar-katilabilir-mi/` | balon turuna çocuklar katılabilir mi | `/en/insights/can-children-join-a-pamukkale-balloon-tour/` | pamukkale balloon ride children | FAQ |
| before | `/kesfet/pamukkale-balon-turu-oncesi-bilmeniz-gerekenler/` | balon turu öncesi bilmeniz gerekenler | `/en/insights/what-to-know-before-your-pamukkale-balloon-ride/` | before pamukkale balloon ride checklist | Reservation |

## Cannibalisation rules (follow these for future edits)

- `/fiyatlar/` owns the commercial "price" intent. The *prices* article owns the informational "what
  affects the price" intent. It should link to `/fiyatlar/` and must not compete for "fiyat" + "paket".
  The same split applies to `/en/prices/`.
- `/ucus-bilgileri/` (and `/en/flight-information/`) is the hub for timing, duration, clothing and
  safety. Today the FAQ links to 4 articles and the flight page links to 3. As content grows, add hub-to-article links there.
- The FAQ gives short answers and points to the matching article, so it does not target the article's long-tail query.
- Each article has a closing CTA to the reservation page in its own language.
- The "Main internal link target" column says where each article should send readers. Check the
  inline links in `src/content/*/part*.ts` when you edit an article (`src/test/content.test.ts` checks
  that every inline link resolves).
