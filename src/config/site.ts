/**
 * Central business configuration.
 * Owner-confirmed (Nov 2026): WhatsApp number, starting price (6.666 TL), no social accounts yet.
 * Policy wording follows common practice of Pamukkale/Türkiye balloon operators — see docs/policies-and-assumptions.md.
 */
// Supplied brand logos (original files kept in src/assets/logo-*.webp; these are proportional 480px-wide copies).
import logoDark from "@/assets/logo-dark-480.webp";
import logoLight from "@/assets/logo-light-480.webp";

export type Lang = "tr" | "en";

export const SITE = {
  name: "Pamukkale Balon Turları",
  nameEn: "Pamukkale Balloon Tours",
  domain: "pamukkalebalonturlar.com",
  url: "https://pamukkalebalonturlar.com",
  defaultLang: "tr" as Lang,
  languages: ["tr", "en"] as Lang[],
  logo: {
    /** Navy logo — for light backgrounds */
    onLight: logoDark,
    /** White logo — for dark backgrounds */
    onDark: logoLight,
  },
  colors: {
    navy: "#18354A",
    ivory: "#F7F3EB",
    amber: "#D99A58",
    terracotta: "#D77C65",
    sage: "#537C79",
    white: "#FFFFFF",
  },
  contact: {
    phoneDisplay: "+90 553 000 59 00",
    phoneE164: "+905530005900",
    email: "info@pamukkalebalonturlar.com",
    address: "Pamukkale, Menderes Cd. 12/A, 20190 Pamukkale/Denizli",
  },
  whatsapp: {
    /** Number in wa.me format (digits only). */
    number: "905530005900",
    /** Confirmed by the owner (Nov 2026). */
    confirmed: true,
    messages: {
      tr: "Merhaba, Pamukkale balon turu hakkında bilgi almak istiyorum.",
      en: "Hello, I would like information about a Pamukkale hot air balloon tour.",
    },
  },
  /** No social accounts supplied yet — leave empty rather than inventing. */
  social: [] as { name: string; url: string }[],
  /** Business hours not supplied. */
  hours: null as null | { tr: string; en: string },
};

/** Starting price confirmed by the owner. Exact price is quoted on WhatsApp. */
export const PRICE_FROM = { amount: 6666, currency: "TRY" as const };

/** "6.666 TL" (tr) / "6,666 TL" (en) */
export function formatPrice(lang: Lang, amount: number = PRICE_FROM.amount) {
  // Deterministic (no Intl) so server and client render identically.
  const digits = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, lang === "tr" ? "." : ",");
  return `${digits} TL`;
}
export function priceFromLabel(lang: Lang) {
  return lang === "tr"
    ? `${formatPrice("tr")}'den başlayan fiyatlarla`
    : `From ${formatPrice("en")}`;
}

/** Tour packages. `priceFrom` is a "starting from" figure; `null` = quoted for the date. */
export const PACKAGES: {
  id: string;
  name: Record<Lang, string>;
  summary: Record<Lang, string>;
  priceFrom: number | null;
  currency: "EUR" | "TRY" | "USD";
}[] = [
  {
    id: "standard",
    name: { tr: "Standart Balon Turu", en: "Standard Balloon Flight" },
    summary: {
      tr: "Paylaşımlı sepette, gün doğumunda Pamukkale travertenleri ve Hierapolis üzerinde balon uçuşu.",
      en: "A shared-basket sunrise flight over Pamukkale's travertines and Hierapolis.",
    },
    priceFrom: PRICE_FROM.amount,
    currency: "TRY",
  },
  {
    id: "private",
    name: { tr: "Özel Sepet (talep üzerine)", en: "Private Balloon Flight (on request)" },
    summary: {
      tr: "Sepet yalnızca size ve sevdiklerinize ayrılır. Evlilik teklifi, yıl dönümü veya aile kutlaması için ideal; tarihinize göre uygunluğu size bildiririz.",
      en: "A basket reserved just for you and your companions — ideal for a proposal, anniversary or family celebration. We'll check availability for your date.",
    },
    priceFrom: null,
    currency: "TRY",
  },
];

/** Inclusions: only `confirmed` items are presented as facts. */
export const INCLUSIONS = {
  confirmed: [] as Record<Lang, string>[],
  toVerify: [
    { tr: "Otelden alış ve otele dönüş transferi", en: "Hotel pick-up and drop-off" },
    { tr: "Uçuş öncesi hafif ikram", en: "Light refreshments before the flight" },
    { tr: "Uçuş sonrası kutlama ve sertifika", en: "Post-flight celebration and certificate" },
    { tr: "Uçuş sigortası kapsamı", en: "Flight insurance coverage" },
    { tr: "Uçuş süresi ve kalkış saati", en: "Flight duration and take-off time" },
  ],
};

/**
 * Flight rules & cancellation — standard practice among Pamukkale / Türkiye balloon operators.
 * Numbers marked "genellikle / typically" are industry norms the owner should verify
 * (docs/policies-and-assumptions.md). Exact terms are confirmed in writing on WhatsApp at booking.
 */
export const POLICIES = {
  minAge: 6,
  flightMinutes: "45–60",
  totalHours: "2,5–3",
  freeCancelHours: 24,
  cancellation: {
    tr: "Uçuştan 24 saat öncesine kadar yaptığınız iptal ve tarih değişikliklerinden ücret alınmaz. Son 24 saat içinde yapılan iptallerde ve uçuşa katılmama durumunda genellikle iade yapılmaz. Hava koşulları veya güvenlik nedeniyle iptal edilen uçuşlarda ise ücretsiz olarak başka bir güne geçebilir ya da ödemenizin tamamını geri alabilirsiniz. Rezervasyonunuza özel koşullar WhatsApp'tan yazılı olarak teyit edilir.",
    en: "Cancellations and date changes made up to 24 hours before the flight are free of charge. Cancellations within the last 24 hours and no-shows are typically non-refundable. If the flight is cancelled for weather or safety reasons, you can move to another morning free of charge or receive a full refund. The exact terms of your booking are confirmed in writing on WhatsApp.",
  },
  weatherCancellation: {
    tr: "Uçuş kararı her sabah pilot tarafından, Sivil Havacılık Genel Müdürlüğünün (SHGM) kuralları ve güncel hava verileri doğrultusunda verilir. Rüzgâr, yağış veya sis nedeniyle uçuş iptal edilirse ücretsiz olarak başka bir güne geçebilir ya da ödemenizin tamamını geri alabilirsiniz.",
    en: "The go/no-go decision is made each morning by the pilot, under the rules of Türkiye's Directorate General of Civil Aviation (SHGM) and the latest weather data. If wind, rain or fog cancels the flight, you can move to another morning free of charge or receive a full refund.",
  },
  rules: {
    tr: [
      [
        "Uçuş saati",
        "Uçuşlar gün doğumunda yapılır. Buluşma saati mevsime göre değişir ve genellikle gün doğumundan yaklaşık 1–1,5 saat öncedir; kesin saat bir gün önce bildirilir.",
      ],
      [
        "Uçuş süresi",
        "Havada geçen süre genellikle 45–60 dakikadır. Hazırlık, uçuş ve iniş sonrasıyla birlikte tüm program yaklaşık 2,5–3 saat sürer.",
      ],
      [
        "Hava nedeniyle iptal",
        "Uçuş kararını pilot, SHGM kuralları ve hava koşullarına göre verir. İptal edilen uçuşlarda ücretsiz tarih değişikliği veya tam iade yapılır.",
      ],
      [
        "Sizin iptaliniz",
        "Uçuştan 24 saat öncesine kadar iptal ve tarih değişikliği ücretsizdir. Son 24 saat içindeki iptallerde ve uçuşa katılmama durumunda genellikle iade yapılmaz.",
      ],
      [
        "Yaş sınırı",
        "Çocuklar genellikle 6 yaşından itibaren ve bir yetişkin eşliğinde uçabilir. Çocuğun sepet kenarını rahatça görebilecek boyda olması gerekir.",
      ],
      [
        "Sağlık",
        "Hamilelerin uçması önerilmez. Ciddi kalp, sırt, bel veya diz rahatsızlığı, yakın zamanda geçirilmiş ameliyat ya da hareket kısıtlılığı varsa lütfen önce bize danışın.",
      ],
      [
        "Kıyafet",
        "Kat kat giyinin; kapalı, düz tabanlı ve rahat ayakkabı tercih edin. Topuklu ayakkabı, terlik ve uzun etek önerilmez.",
      ],
      [
        "Uçuş sırasında",
        "Pilotun güvenlik talimatlarına uymak zorunludur. Sepette sigara içilmez; alkollü misafirler uçuşa alınmaz.",
      ],
    ],
    en: [
      [
        "Flight time",
        "Flights take off at sunrise. The meeting time changes with the season and is typically about 1–1.5 hours before sunrise; we confirm the exact time the day before.",
      ],
      [
        "Flight duration",
        "Time in the air is typically 45–60 minutes. With preparation, the flight and landing, the whole experience takes about 2.5–3 hours.",
      ],
      [
        "Weather cancellations",
        "The pilot decides each morning under SHGM rules and the weather. If the flight is cancelled, you get a free date change or a full refund.",
      ],
      [
        "Cancelling yourself",
        "Cancellations and date changes are free up to 24 hours before the flight. Later cancellations and no-shows are typically non-refundable.",
      ],
      [
        "Age limit",
        "Children can typically fly from age 6, accompanied by an adult, and must be tall enough to see over the basket edge comfortably.",
      ],
      [
        "Health",
        "Flying is not recommended during pregnancy. If you have serious heart, back or knee problems, recent surgery or limited mobility, please ask us first.",
      ],
      [
        "Clothing",
        "Dress in layers and wear closed, flat, comfortable shoes. Heels, flip-flops and long skirts are not recommended.",
      ],
      [
        "During the flight",
        "Following the pilot's safety instructions is mandatory. No smoking in the basket; intoxicated guests cannot fly.",
      ],
    ],
  } as Record<Lang, [string, string][]>,
};

export function whatsappLink(lang: Lang, message?: string) {
  const text = message ?? SITE.whatsapp.messages[lang];
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(text)}`;
}
/** Context-aware WhatsApp openers (pre-filled text is URL-encoded by whatsappLink). */
export const WA_CONTEXT: Record<string, Record<Lang, string>> = {
  home: {
    tr: "Merhaba, Pamukkale balon turu hakkında bilgi almak istiyorum.",
    en: "Hello, I would like information about a Pamukkale hot air balloon tour.",
  },
  prices: {
    tr: "Merhaba, Pamukkale balon turu için fiyat almak istiyorum.\nTarih: \nKişi sayısı: ",
    en: "Hello, I'd like a price for a Pamukkale balloon flight.\nDate: \nGuests: ",
  },
  standard: {
    tr: "Merhaba, Standart Balon Turu için fiyat almak istiyorum.\nTarih: \nKişi sayısı: ",
    en: "Hello, I'd like a price for the Standard Balloon Flight.\nDate: \nGuests: ",
  },
  private: {
    tr: "Merhaba, Özel Sepet balon uçuşu için uygunluk ve fiyat sormak istiyorum.\nTarih: \nKişi sayısı: ",
    en: "Hello, I'd like to ask about availability and price for a private balloon flight.\nDate: \nGuests: ",
  },
  availability: {
    tr: "Merhaba, Pamukkale balon turu için müsaitlik sormak istiyorum.",
    en: "Hello, I'd like to check availability for a Pamukkale balloon flight.",
  },
  flight: {
    tr: "Merhaba, Pamukkale balon uçuşu (saat, buluşma noktası, hazırlık) hakkında sorum var.",
    en: "Hello, I have a question about the Pamukkale balloon flight (timing, meeting point, preparation).",
  },
  faq: {
    tr: "Merhaba, Pamukkale balon turu hakkında bir sorum var.",
    en: "Hello, I have a question about the Pamukkale balloon tour.",
  },
  reservation: {
    tr: "Merhaba, Pamukkale balon turu için rezervasyon yapmak istiyorum.\nTarih: \nKişi sayısı: ",
    en: "Hello, I'd like to book a Pamukkale balloon flight.\nDate: \nGuests: ",
  },
  contact: {
    tr: "Merhaba, Pamukkale balon turu hakkında bilgi almak istiyorum.",
    en: "Hello, I would like information about a Pamukkale hot air balloon tour.",
  },
};

export function availabilityMessage(lang: Lang, date: string, guests: string) {
  const d = formatDate(lang, date);
  return lang === "tr"
    ? `Merhaba, Pamukkale balon turu için müsaitlik sormak istiyorum.\nTarih: ${d || "-"}\nKişi sayısı: ${guests || "-"}`
    : `Hello, I'd like to check availability for a Pamukkale balloon flight.\nDate: ${d || "-"}\nGuests: ${guests || "-"}`;
}

/** "2026-11-14" → "14 Kasım 2026" / "14 November 2026" (timezone-safe). */
export function formatDate(lang: Lang, iso: string) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  return d.toLocaleDateString(lang === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
    timeZone: "UTC",
  });
}

export const telLink = `tel:${SITE.contact.phoneE164}`;
export const mailLink = `mailto:${SITE.contact.email}`;
