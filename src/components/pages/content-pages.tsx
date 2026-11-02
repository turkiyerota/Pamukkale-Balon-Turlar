import type { Lang } from "@/config/site";
import {
  PACKAGES,
  INCLUSIONS,
  POLICIES,
  SITE,
  telLink,
  mailLink,
  whatsappLink,
  WA_CONTEXT,
} from "@/config/site";
import { PAGES, PAGE_LABELS, type PageKey } from "@/lib/paths";
import { FAQS, PRICE_FAQ_IDX } from "@/content/faq";
import { PageHero } from "../page-hero";
import { CtaBand, FaqList, PackageCard } from "../blocks";
import { L, btn, Arrow, Rich, SectionHeading, WhatsAppIcon } from "../ui-kit";
import { Car, Wind, Flame, Flag, Clock, MapPin, Mail, Phone, type LucideIcon } from "lucide-react";
import imgWeather from "@/assets/img-weather.webp";
import imgClothing from "@/assets/img-clothing.webp";
import hero1 from "@/assets/hero-1.webp";
import hero2 from "@/assets/hero-2.webp";
import hero3 from "@/assets/hero-3.webp";
import hero5 from "@/assets/hero-5.webp";
import imgSeason from "@/assets/img-season.webp";
import imgInflation from "@/assets/img-inflation.webp";

export function crumbs(lang: Lang, key: PageKey) {
  return [
    { name: PAGE_LABELS.home[lang], path: PAGES.home[lang] },
    { name: PAGE_LABELS[key][lang] },
  ];
}

function WaButton({
  lang,
  ctx,
  label,
  className = "",
}: {
  lang: Lang;
  ctx: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappLink(lang, WA_CONTEXT[ctx]?.[lang])}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btn.whatsapp} ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" /> {label}
    </a>
  );
}

const check = (
  <span
    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-gradient text-navy-deep"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  </span>
);

/* ---------------- Prices ---------------- */
export function PricesPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const pricingFaq = PRICE_FAQ_IDX.map((i) => FAQS[lang][i]!).filter(Boolean);
  const factors = tr
    ? [
        ["Tarih ve sezon", "Yoğun aylar ve hafta sonları fiyatı etkileyebilir."],
        ["Kişi sayısı", "Grup büyüklüğü teklifinizi doğrudan belirler."],
        ["Sepet tipi", "Paylaşımlı sepet veya yalnızca size ayrılan özel sepet."],
        ["Dahil hizmetler", "Transfer, ikram ve sertifika gibi kalemler."],
      ]
    : [
        ["Date and season", "Busy months and weekends can affect the price."],
        ["Group size", "The number of guests shapes your quote."],
        ["Basket type", "A shared basket or one reserved just for you."],
        ["Inclusions", "Items such as transfers, refreshments and a certificate."],
      ];
  return (
    <>
      <PageHero
        image={hero1}
        position="60% 50%"
        eyebrow={tr ? "Fiyatlar 2026" : "Prices 2026"}
        title={tr ? "Pamukkale Balon Turu Fiyatları" : "Pamukkale Hot Air Balloon Prices"}
        intro={
          tr
            ? "Pamukkale balon turu fiyatlarımız 6.666 TL'den başlar. Kesin fiyat tarihe, sezona ve kişi sayısına göre değişir; tarihinizi yazın, size özel fiyatı yazılı olarak iletelim."
            : "Our Pamukkale balloon ride prices start from 6,666 TL. The exact price depends on the date, season and group size — tell us your date and we'll confirm it in writing."
        }
        crumbs={crumbs(lang, "prices")}
      >
        <WaButton
          lang={lang}
          ctx="prices"
          label={tr ? "WhatsApp'tan Fiyat Alın" : "Get a Price on WhatsApp"}
          className="btn-lg"
        />
        <L href={PAGES.reservation[lang]} className={`${btn.glass} btn-lg`}>
          {tr ? "Rezervasyon Formu" : "Booking Form"} <Arrow />
        </L>
      </PageHero>

      <section className="container-page py-20 md:py-28">
        <SectionHeading
          eyebrow={tr ? "Paketler" : "Packages"}
          title={tr ? "Balon turu paketleri" : "Balloon flight packages"}
          intro={
            tr
              ? "İki seçenek sunuyoruz. Standart uçuş 6.666 TL'den başlar; özel sepet için tarihinize ve kişi sayınıza göre fiyat veriyoruz. Kesin fiyat için WhatsApp'tan yazmanız yeterli."
              : "Two options. The standard flight starts from 6,666 TL; private baskets are priced for your date and group. Message us on WhatsApp for your exact price."
          }
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {PACKAGES.map((p, i) => (
            <PackageCard key={p.id} p={p} lang={lang} index={i} headingLevel={2} />
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={tr ? "Fiyatı belirleyenler" : "What shapes the price"}
              title={tr ? "Fiyat neye göre değişir?" : "What affects the price?"}
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {factors.map(([h, p]) => (
                <li key={h} className="card-lux p-6">
                  <h3 className="text-2xl">{h}</h3>
                  <p className="mt-2 text-muted-foreground">{p}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted-foreground">
              <Rich
                text={
                  tr
                    ? "Ayrıntılı rehber: [Pamukkale balon turu fiyatı neye göre değişir?](/kesfet/pamukkale-balon-turu-fiyatlari-2026/)"
                    : "Full guide: [what affects Pamukkale balloon prices?](/en/insights/pamukkale-hot-air-balloon-prices-2026/)"
                }
              />
            </p>
          </div>
          <div className="space-y-8">
            <div className="card-lux p-8">
              <h2 className="text-3xl">
                {tr ? "Teklifinizde yazan başlıklar" : "What your quote covers"}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {tr
                  ? "Aşağıdaki her kalemin fiyata dahil olup olmadığı teklifinizde açıkça belirtilir:"
                  : "Your quote states clearly whether each item below is included:"}
              </p>
              <ul className="mt-5 grid gap-3">
                {INCLUSIONS.toVerify.map((x, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    {check}
                    {x[lang]}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-lux p-8">
              <h2 className="text-3xl">
                {tr ? "İptal ve tarih değişikliği" : "Cancellation and date changes"}
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {POLICIES.cancellation[lang]}
              </p>
              <L
                href={
                  tr
                    ? "/kesfet/pamukkale-balon-turu-iptal-edilirse-ne-olur/"
                    : "/en/insights/what-happens-if-a-pamukkale-balloon-tour-is-cancelled/"
                }
                className={`${btn.outline} btn-sm mt-5`}
              >
                {tr ? "Tur iptal edilirse ne olur?" : "What if a flight is cancelled?"} <Arrow />
              </L>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading
          eyebrow={tr ? "Sorular" : "Questions"}
          title={tr ? "Fiyatlarla ilgili sorular" : "Pricing questions"}
        />
        <FaqList items={pricingFaq} />
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------------- Flight info ---------------- */
export function FlightPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const stages: [LucideIcon, string, string][] = tr
    ? [
        [
          Car,
          "Otelden alış",
          "Gün doğumundan genellikle 1–1,5 saat önce buluşma noktasında ya da otelinizde (transfer pakete dahilse) alınırsınız. Kesin saat bir gün önce bildirilir.",
        ],
        [
          Flame,
          "Güvenlik brifingi ve balonun şişirilmesi",
          "Kalkış alanında balonun şişirilmesini izler, pilotun güvenlik bilgilendirmesini dinlersiniz.",
        ],
        [
          Wind,
          "Uçuş",
          "Balon rüzgârla süzülür; havada geçen süre genellikle 45–60 dakikadır. Rotayı o sabahki koşullara göre pilot belirler.",
        ],
        [
          Flag,
          "İniş ve dönüş",
          "Pilot uygun bir alana iniş yapar; ardından dönüş için transfer noktasına geçilir.",
        ],
      ]
    : [
        [
          Car,
          "Hotel pick-up",
          "Typically 1–1.5 hours before sunrise you're collected from the meeting point or your hotel (if transfers are included). We confirm the exact time the day before.",
        ],
        [
          Flame,
          "Safety briefing and inflation",
          "At the launch site you watch the balloon being inflated and listen to the pilot's safety briefing.",
        ],
        [
          Wind,
          "The flight",
          "The balloon drifts with the wind for typically 45–60 minutes; the pilot sets the route according to the morning's conditions.",
        ],
        [
          Flag,
          "Landing and return",
          "The pilot lands in a suitable spot, then you head back for the return transfer.",
        ],
      ];
  const blocks = tr
    ? [
        {
          img: imgClothing,
          alt: "Balon turu için kat kat giysiler ve rahat ayakkabılar",
          h: "Hazırlık ve kıyafet",
          p: "Sabahlar serin olabilir. Kat kat giyinin, kapalı ve kaymaz ayakkabı tercih edin. Sepette alan sınırlı olduğu için büyük çanta yerine küçük bir sırt çantası yeterlidir.",
          link: "[Balon turunda ne giyilir?](/kesfet/pamukkale-balon-turunda-ne-giyilir/)",
        },
        {
          img: imgWeather,
          alt: "Sisli bir sabahta rüzgâr tulumu",
          h: "Hava durumu ve iptaller",
          p: "Rüzgâr, yağış veya sis nedeniyle uçuşlar son dakikada iptal edilebilir; bu kararlar tamamen güvenlik içindir. Hava nedeniyle iptalde ücretsiz tarih değişikliği veya tam iade yapılır. Mümkünse turu konaklamanızın ilk sabahına planlayın.",
          link: "[Tur iptal edilirse ne olur?](/kesfet/pamukkale-balon-turu-iptal-edilirse-ne-olur/)",
        },
      ]
    : [
        {
          img: imgClothing,
          alt: "Layered clothing and comfortable shoes for a balloon ride",
          h: "Preparation and clothing",
          p: "Mornings can be cool. Wear layers and closed, non-slip shoes. Space in the basket is limited, so a small backpack is better than a large bag.",
          link: "[What to wear](/en/insights/what-to-wear-for-a-pamukkale-hot-air-balloon-ride/)",
        },
        {
          img: imgWeather,
          alt: "A windsock on a foggy morning",
          h: "Weather and cancellations",
          p: "Wind, rain or fog can cancel flights at the last minute — always for safety. Weather cancellations get a free date change or a full refund. If you can, book your first morning in the area.",
          link: "[What happens if a flight is cancelled?](/en/insights/what-happens-if-a-pamukkale-balloon-tour-is-cancelled/)",
        },
      ];
  return (
    <>
      <PageHero
        image={hero5}
        position="65% 55%"
        eyebrow={tr ? "Uçuş bilgileri" : "Flight information"}
        title={
          tr ? "Pamukkale Balon Uçuşu: Adım Adım" : "The Pamukkale Balloon Flight, Step by Step"
        }
        intro={
          tr
            ? "Uçuş sabahı neler olur, ne giymelisiniz, hava kötü olursa ne yapılır? Bilmeniz gereken her şey bu sayfada."
            : "What happens on the morning, what to wear and what if the weather turns? Everything you need to know is here."
        }
        crumbs={crumbs(lang, "flight")}
      >
        <WaButton
          lang={lang}
          ctx="flight"
          label={tr ? "Uçuş Hakkında Sorun" : "Ask About the Flight"}
          className="btn-lg"
        />
      </PageHero>
      <section className="container-page py-20 md:py-28">
        <SectionHeading
          eyebrow={tr ? "Uçuş sabahı" : "Flight morning"}
          title={tr ? "Tipik bir uçuş sabahı" : "A typical flight morning"}
          intro={
            tr
              ? "Uçuşlar gün doğumuna göre planlanır; bu yüzden program mevsime göre daha erken veya daha geç başlar."
              : "Flights are timed to sunrise, so the morning starts earlier or later depending on the season."
          }
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stages.map(([Icon, h, p], i) => (
            <li
              key={h as string}
              className="card-lux reveal p-7"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-champagne">
                  <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.7} />
                </span>
                <span className="font-display text-5xl italic text-gold-gradient">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-[1.65rem] leading-tight">{h as string}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{p as string}</p>
            </li>
          ))}
        </ol>
        <div className="mt-24 grid gap-8 md:grid-cols-2">
          {blocks.map((b) => (
            <article key={b.h} className="card-lux group reveal overflow-hidden">
              <div className="overflow-hidden">
                <img
                  src={b.img}
                  alt={b.alt}
                  width={1280}
                  height={864}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-9">
                <h2 className="text-3xl">{b.h}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{b.p}</p>
                <p className="mt-5 font-semibold [&_a]:text-navy [&_a]:underline [&_a]:decoration-gold [&_a]:decoration-2 [&_a]:underline-offset-4">
                  <Rich text={b.link} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id={tr ? "kurallar" : "rules"} className="bg-secondary py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow={tr ? "Kurallar ve koşullar" : "Rules and terms"}
            title={
              tr
                ? "Uçuş saati, süre, iptal ve katılım kuralları"
                : "Flight times, duration, cancellation and eligibility"
            }
            intro={
              tr
                ? "Pamukkale'deki balon işletmelerinin genel uygulamalarıyla uyumlu standart kurallarımız. Rezervasyonunuza özel koşullar WhatsApp'tan yazılı olarak teyit edilir."
                : "Our standard terms, in line with common practice among Pamukkale balloon operators. The exact terms of your booking are confirmed in writing on WhatsApp."
            }
          />
          <dl className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {POLICIES.rules[lang].map(([h, p], i) => (
              <div
                key={h}
                className="card-lux reveal p-7"
                style={{ ["--reveal-delay" as string]: `${(i % 4) * 80}ms` }}
              >
                <dt className="flex items-center gap-3 font-display text-2xl font-semibold">
                  {check}
                  {h}
                </dt>
                <dd className="mt-3 leading-relaxed text-muted-foreground">{p}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-3">
            <WaButton
              lang={lang}
              ctx="flight"
              label={tr ? "Durumumu sormak istiyorum" : "Ask about my situation"}
            />
            <L href={PAGES.prices[lang]} className={btn.outline}>
              {tr ? "Fiyatlar 6.666 TL'den başlar" : "Prices from 6,666 TL"} <Arrow />
            </L>
          </div>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------------- FAQ ---------------- */
export function FaqPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  return (
    <>
      <PageHero
        image={hero2}
        eyebrow={tr ? "SSS" : "FAQ"}
        title={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
        intro={
          tr
            ? "Fiyat, saat, uçuş süresi, kıyafet, iptal ve güvenlikle ilgili en çok sorulan soruların yanıtları."
            : "Answers to the most common questions about price, timing, flight length, clothing, cancellations and safety."
        }
        crumbs={crumbs(lang, "faq")}
      />
      <section className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_2.2fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card-lux p-8">
            <h2 className="text-3xl">
              {tr ? "Sorunuz burada yok mu?" : "Can't find your question?"}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {tr
                ? "Bize WhatsApp'tan yazın; Türkçe veya İngilizce yanıtlayalım."
                : "Message us on WhatsApp — we reply in English or Turkish."}
            </p>
            <WaButton
              lang={lang}
              ctx="faq"
              label={tr ? "WhatsApp'tan Sorun" : "Ask on WhatsApp"}
              className="mt-6 w-full"
            />
            <a href={telLink} className={`${btn.outline} mt-3 w-full`}>
              {SITE.contact.phoneDisplay}
            </a>
          </div>
        </aside>
        <FaqList items={FAQS[lang]} />
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------------- About ---------------- */
export function AboutPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const values = tr
    ? [
        [
          "Açık bilgi",
          "Fiyat, saat ve koşulları size yazılı olarak iletiriz; neyin dahil olduğunu baştan bilirsiniz.",
        ],
        [
          "Önce güvenlik",
          "Uçuş kararı her sabah hava koşullarına göre verilir; uygun değilse uçulmaz.",
        ],
        [
          "Kişisel ilgi",
          "Sorularınızı WhatsApp, telefon veya e-postayla doğrudan bize iletebilirsiniz.",
        ],
      ]
    : [
        [
          "Clear information",
          "Price, timing and terms are sent to you in writing, so you know what's included from the start.",
        ],
        [
          "Safety first",
          "The flight decision is made each morning according to the weather; if it isn't suitable, we don't fly.",
        ],
        ["Personal attention", "Reach us directly by WhatsApp, phone or email with any question."],
      ];
  return (
    <>
      <PageHero
        image={imgSeason}
        eyebrow={tr ? "Hakkımızda" : "About us"}
        title={tr ? SITE.name : SITE.nameEn}
        intro={
          tr
            ? "Pamukkale'nin gökyüzündeki büyüleyici deneyimi, açık ve doğru bilgilerle misafirlerimize sunuyoruz."
            : "We bring visitors the magic of Pamukkale from the sky — with clear, accurate information."
        }
        crumbs={crumbs(lang, "about")}
      />
      <section className="container-page grid items-center gap-14 py-20 md:grid-cols-2 md:py-28">
        <div className="reveal space-y-5 text-lg leading-relaxed text-muted-foreground">
          <SectionHeading
            eyebrow={tr ? "Biz kimiz?" : "Who we are"}
            title={tr ? "Pamukkale'de, Pamukkale için" : "Based in Pamukkale"}
          />
          <p>
            {tr
              ? "Pamukkale Balon Turları, Pamukkale'de balon turu yapmak isteyen misafirlere bilgi, teklif ve rezervasyon desteği sunar. Ofisimiz Pamukkale'de, Menderes Caddesi üzerindedir."
              : "Pamukkale Balon Turları helps visitors who want to fly over Pamukkale with information, quotes and bookings. Our office is in Pamukkale, on Menderes Caddesi."}
          </p>
          <p>
            {tr
              ? "Yaklaşımımız basit: abartılı vaatler yerine net bilgi vermek, sorularınızı hızla yanıtlamaya çalışmak ve uçuş sabahını sizin için olabildiğince kolay hâle getirmek."
              : "Our approach is simple: clear information instead of big promises, answering your questions as quickly as we can, and making your flight morning as easy as possible."}
          </p>
        </div>
        <img
          src={imgInflation}
          alt={
            tr
              ? "Şafak öncesi şişirilen sıcak hava balonu"
              : "A hot air balloon being inflated before dawn"
          }
          width={1280}
          height={864}
          loading="lazy"
          decoding="async"
          className="reveal aspect-[4/3] w-full rounded-[1.5rem] object-cover shadow-lift"
        />
      </section>
      <section className="bg-secondary py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow={tr ? "Değerlerimiz" : "Our values"}
            title={tr ? "Neye önem veriyoruz?" : "What matters to us"}
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map(([h, p], i) => (
              <li
                key={h}
                className="card-lux reveal p-8"
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              >
                <span className="font-display text-5xl italic text-gold-gradient">0{i + 1}</span>
                <h3 className="mt-4 text-3xl">{h}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------------- Contact ---------------- */
export function ContactPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const address = SITE.contact.address.replace("Pamukkale/Denizli", "Pamukkale / Denizli");
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.contact.address)}`;
  const items = [
    {
      Icon: Phone,
      h: tr ? "Telefon" : "Phone",
      v: SITE.contact.phoneDisplay,
      href: telLink,
      cta: tr ? "Hemen arayın" : "Call now",
    },
    {
      Icon: Mail,
      h: tr ? "E-posta" : "Email",
      v: SITE.contact.email,
      href: mailLink,
      cta: tr ? "E-posta gönderin" : "Send an email",
    },
    {
      Icon: MapPin,
      h: tr ? "Adres" : "Address",
      v: address,
      href: mapsHref,
      cta: tr ? "Haritada açın" : "Open in Maps",
      ext: true,
    },
  ];
  return (
    <>
      <PageHero
        image={hero3}
        eyebrow={tr ? "İletişim" : "Contact"}
        title={tr ? "Bize Ulaşın" : "Get in Touch"}
        intro={
          tr
            ? "Fiyat, müsaitlik ve rezervasyon için en hızlı yol WhatsApp. Telefon ve e-postayla da bize ulaşabilirsiniz."
            : "WhatsApp is the quickest way to ask about prices, availability and bookings. You can also call or email us."
        }
        crumbs={crumbs(lang, "contact")}
      />
      <section className="container-page py-20 md:py-28">
        <div className="grain relative isolate overflow-hidden rounded-[1.75rem] bg-navy-deep p-8 text-on-dark shadow-lift md:p-12">
          <div
            className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(closest-side,rgba(37,211,102,0.25),transparent)]"
            aria-hidden="true"
          />
          <div className="grid items-center gap-8 md:grid-cols-[1.5fr_1fr]">
            <div>
              <p className="eyebrow !text-champagne">WhatsApp</p>
              <h2 className="mt-4 text-4xl md:text-5xl">
                {tr
                  ? "Tarihinizi yazın, size özel teklif hazırlayalım"
                  : "Send your date and we'll prepare your quote"}
              </h2>
              <p className="mt-4 text-lg text-on-dark/85">{SITE.contact.phoneDisplay}</p>
            </div>
            <div className="flex flex-col gap-3">
              <WaButton
                lang={lang}
                ctx="contact"
                label={tr ? "WhatsApp'tan Yazın" : "Chat on WhatsApp"}
                className="btn-lg"
              />
              <L href={PAGES.reservation[lang]} className={`${btn.gold} btn-lg`}>
                {tr ? "Rezervasyon Formu" : "Booking Form"} <Arrow />
              </L>
            </div>
          </div>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map(({ Icon, h, v, href, cta, ext }) => (
            <li key={h} className="card-lux flex flex-col p-8">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-navy text-champagne">
                <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.7} />
              </span>
              <h2 className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-bronze">{h}</h2>
              {h === (tr ? "Adres" : "Address") ? (
                <address className="mt-2 flex-1 font-display text-2xl font-semibold not-italic leading-snug">
                  {v}
                </address>
              ) : (
                <p className="mt-3 flex-1 text-lg font-semibold leading-snug text-navy-deep [overflow-wrap:anywhere] lg:text-xl">
                  {v}
                </p>
              )}
              <a
                href={href}
                {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`${btn.outline} btn-sm mt-6 self-start`}
              >
                {cta} <Arrow />
              </a>
            </li>
          ))}
        </ul>
        {/* No embedded Google Map: it would load third-party cookies, which the cookie policy says the site doesn't use. */}
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mt-10 block overflow-hidden rounded-[1.5rem] shadow-soft"
        >
          <img
            src={hero3}
            alt=""
            width={1600}
            height={907}
            loading="lazy"
            decoding="async"
            className="h-64 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 md:h-80"
          />
          <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,27,41,0.85),rgba(10,27,41,0.3))]" />
          <span className="absolute inset-0 flex flex-col justify-center gap-3 p-8 text-white md:p-12">
            <MapPin className="h-8 w-8 text-champagne" aria-hidden="true" />
            <span className="font-display text-3xl font-semibold md:text-4xl">{address}</span>
            <span className="inline-flex items-center gap-2 font-semibold text-champagne">
              {tr ? "Google Haritalar'da yol tarifi alın" : "Get directions on Google Maps"}{" "}
              <Arrow />
            </span>
          </span>
        </a>
        {SITE.hours && (
          <p className="mt-6 flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" aria-hidden="true" /> {SITE.hours[lang]}
          </p>
        )}
      </section>
    </>
  );
}
