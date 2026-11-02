# Prices & policies: what's confirmed and what's assumed

All rule text lives in one place: `src/config/site.ts` → `POLICY_TEXT` / `POLICIES` / `INCLUSIONS`.
The FAQ, flight page, prices page, articles (TR + EN) and FAQPage JSON-LD reuse or match it word for word.
If a rule changes, edit `site.ts` first, then search the articles in `src/content/{tr,en}/part*.ts`.

## Confirmed by the owner (Sayed Emad, Nov 2026)
- WhatsApp: +90 553 000 59 00. WhatsApp is the main booking channel. The form sends to WhatsApp, and email is optional.
- Email info@pamukkalebalonturlar.com is listed, but no booking step depends on it.
- Address: Pamukkale, Menderes Cd. 12/A, 20190 Pamukkale / Denizli (used in the footer, contact page and TravelAgency JSON-LD).
- Prices start from **6.666 TL** ("6.666 TL'den başlayan fiyatlarla" / "From 6,666 TL"; JSON-LD `lowPrice: 6666`, `TRY`). The exact price is quoted on WhatsApp.
- No social media accounts yet, so there are no social links and no `sameAs`.
- **Hotel transfer is NOT included in the price.** The site says so in TR and EN and invites questions about getting to the meeting point on WhatsApp. No transfer service or price is advertised.

## Firm rules (owner-confirmed, the same wording everywhere)
| Item | Rule on the site |
| --- | --- |
| Guest cancellation | Free cancellation or date change up to 24 h before the flight. Later cancellations and no-shows are non-refundable. There are no partial refunds. |
| Weather / safety cancellation | If the pilot or SHGM cancels, the guest gets a free new date or a full refund. |
| Minimum age | 6. Children fly with an adult and must see over the basket edge. |
| Pregnancy | Pregnant guests cannot fly. |
| Health | Serious heart, back or neck conditions need a doctor's approval shared with us before the flight. Recent surgery or limited mobility: ask before booking. |

## Common-practice figures (not contractual)
| Item | Value on the site |
| --- | --- |
| Meeting time | About 1–1.5 h before sunrise. The exact time is sent the day before. |
| Time in the air | 45–60 min |
| Whole experience | About 2.5–3 h |
| Clothing | Layers and closed flat shoes. No heels, flip-flops or long skirts. |
| Conduct | The pilot's instructions are mandatory. No smoking. Intoxicated guests cannot fly. |
