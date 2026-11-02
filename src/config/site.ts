/**
 * Central business configuration.
 * Owner-confirmed (Nov 2026): WhatsApp number, starting price (6.666 TL), no social accounts yet.
 * Owner-confirmed (Nov 2026): address, firm cancellation/age/health rules, hotel transfer NOT included.
 */
// Supplied brand logos (original files kept in src/assets/logo-*.webp; these are proportional 480px-wide copies).
import logoDark from "@/assets/logo-dark-480.webp";
import logoLight from "@/assets/logo-light-480.webp";
// Small copies (260px wide, ~9 KB) for the header/footer, where the logo is shown ≤ 130px wide.
import logoDarkSm from "@/assets/logo-dark-260.webp";
import logoLightSm from "@/assets/logo-light-260.webp";

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
    onLightSm: logoDarkSm,
    onDarkSm: logoLightSm,
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

/**
 * Inclusions shown on the home and prices pages.
 * Owner-confirmed (Nov 2026): hotel transfer is NOT included in the price.
 * `quoteItems` are listed in every written quote (included or not, stated per booking).
 */
export const INCLUSIONS = {
  quoteItems: [
    { tr: "Uçuş öncesi hafif ikram", en: "Light refreshments before the flight" },
    { tr: "Uçuş sonrası kutlama ve sertifika", en: "Post-flight celebration and certificate" },
    { tr: "Uçuş sigortası kapsamı", en: "Flight insurance coverage" },
    { tr: "Uçuş süresi ve kalkış saati", en: "Flight duration and take-off time" },
  ] as Record<Lang, string>[],
  notIncluded: [
    {
      tr: "Otel transferi (otelden alış ve otele dönüş) fiyata dahil değildir",
      en: "Hotel transfer (pick-up and drop-off) is not included in the price",
    },
  ] as Record<Lang, string>[],
  transferNote: {
    tr: "Otel transferi fiyata dahil değildir. Buluşma noktasına ulaşım hakkında WhatsApp'tan bilgi alabilirsiniz.",
    en: "Hotel transfer is not included in the price. Ask us on WhatsApp about getting to the meeting point.",
  } as Record<Lang, string>,
};

/**
 * Flight rules & cancellation — firm policy, owner-confirmed (Nov 2026).
 * The same wording is reused by the FAQ, flight page, prices page and FAQPage JSON-LD,
 * so every page states exactly the same rules.
 */
export const POLICY_TEXT = {
  cancel: {
    tr: "Uçuştan 24 saat öncesine kadar yapılan iptal ve tarih değişiklikleri ücretsizdir. Uçuşa 24 saatten az kala yapılan iptallerde ve uçuşa katılmama durumunda ücret iadesi yapılmaz.",
    en: "Cancellations and date changes made up to 24 hours before the flight are free of charge. Cancellations made less than 24 hours before the flight and no-shows are non-refundable.",
  },
  weather: {
    tr: "Uçuş, hava koşulları veya güvenlik nedeniyle pilot ya da SHGM kararıyla iptal edilirse ücretsiz olarak yeni bir tarih seçebilir veya ödemenizin tamamını geri alabilirsiniz.",
    en: "If the pilot or SHGM cancels the flight for weather or safety reasons, you can choose a free new date or receive a full refund.",
  },
  age: {
    tr: "Minimum yaş 6'dır; 6 yaşından küçük çocuklar uçuşa alınmaz. Çocuklar bir yetişkin eşliğinde uçar ve sepet kenarını rahatça görebilecek boyda olmalıdır.",
    en: "The minimum age is 6; children under 6 cannot fly. Children fly with an accompanying adult and must be tall enough to see over the basket edge comfortably.",
  },
  pregnancy: {
    tr: "Hamile misafirler uçuşa alınmaz.",
    en: "Pregnant guests cannot fly.",
  },
  health: {
    tr: "Ciddi kalp, sırt veya boyun rahatsızlığı olan misafirler, ancak doktor onayını uçuştan önce bize iletmeleri hâlinde uçabilir. Yakın zamanda ameliyat geçirdiyseniz veya hareket kısıtlılığınız varsa rezervasyondan önce bize danışın.",
    en: "Guests with serious heart, back or neck conditions can fly only if they share a doctor's approval with us before the flight. If you have had recent surgery or have limited mobility, please talk to us before booking.",
  },
} satisfies Record<string, Record<Lang, string>>;

export const POLICIES = {
  minAge: 6,
  flightMinutes: "45–60",
  totalHours: "2,5–3",
  freeCancelHours: 24,
  cancellation: {
    tr: `${POLICY_TEXT.cancel.tr} ${POLICY_TEXT.weather.tr} Rezervasyonunuz WhatsApp'tan yazılı olarak teyit edilir.`,
    en: `${POLICY_TEXT.cancel.en} ${POLICY_TEXT.weather.en} Your booking is confirmed in writing on WhatsApp.`,
  },
  weatherCancellation: {
    tr: `Uçuş kararı her sabah pilot tarafından, Sivil Havacılık Genel Müdürlüğünün (SHGM) kuralları ve güncel hava verileri doğrultusunda verilir. ${POLICY_TEXT.weather.tr}`,
    en: `The go/no-go decision is made each morning by the pilot, under the rules of Türkiye's Directorate General of Civil Aviation (SHGM) and the latest weather data. ${POLICY_TEXT.weather.en}`,
  },
  rules: {
    tr: [
      [
        "Uçuş saati",
        "Uçuşlar gün doğumunda yapılır. Buluşma saati mevsime göre değişir ve gün doğumundan yaklaşık 1–1,5 saat öncedir; kesin saat bir gün önce bildirilir.",
      ],
      [
        "Uçuş süresi",
        "Havada geçen süre 45–60 dakikadır. Hazırlık, uçuş ve iniş sonrasıyla birlikte tüm program yaklaşık 2,5–3 saat sürer.",
      ],
      ["Hava nedeniyle iptal", POLICY_TEXT.weather.tr],
      ["Sizin iptaliniz", POLICY_TEXT.cancel.tr],
      ["Yaş sınırı", POLICY_TEXT.age.tr],
      ["Sağlık", `${POLICY_TEXT.pregnancy.tr} ${POLICY_TEXT.health.tr}`],
      [
        "Kıyafet",
        "Kat kat giyinin; kapalı, düz tabanlı ve rahat ayakkabı tercih edin. Topuklu ayakkabı, terlik ve uzun etek önerilmez.",
      ],
      ["Transfer", INCLUSIONS.transferNote.tr],
      [
        "Uçuş sırasında",
        "Pilotun güvenlik talimatlarına uymak zorunludur. Sepette sigara içilmez; alkollü misafirler uçuşa alınmaz.",
      ],
    ],
    en: [
      [
        "Flight time",
        "Flights take off at sunrise. The meeting time changes with the season and is about 1–1.5 hours before sunrise; we confirm the exact time the day before.",
      ],
      [
        "Flight duration",
        "Time in the air is 45–60 minutes. With preparation, the flight and landing, the whole experience takes about 2.5–3 hours.",
      ],
      ["Weather cancellations", POLICY_TEXT.weather.en],
      ["Cancelling yourself", POLICY_TEXT.cancel.en],
      ["Age limit", POLICY_TEXT.age.en],
      ["Health", `${POLICY_TEXT.pregnancy.en} ${POLICY_TEXT.health.en}`],
      [
        "Clothing",
        "Dress in layers and wear closed, flat, comfortable shoes. Heels, flip-flops and long skirts are not recommended.",
      ],
      ["Transfer", INCLUSIONS.transferNote.en],
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
