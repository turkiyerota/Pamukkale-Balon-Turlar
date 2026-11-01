/**
 * Central business configuration.
 * Everything marked `confirmed: false` / `null` is awaiting verification from the operator
 * and is rendered as "to be confirmed" — never as a real offer or fact.
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
    /** Set to true once the operator confirms the number is WhatsApp-enabled. */
    confirmed: false,
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

/** Tour packages. `price: null` means not yet supplied — UI shows "price on request". */
export const PACKAGES: {
  id: string;
  name: Record<Lang, string>;
  summary: Record<Lang, string>;
  price: number | null;
  currency: "EUR" | "TRY" | "USD";
  confirmed: boolean;
}[] = [
  {
    id: "standard",
    name: { tr: "Standart Balon Turu", en: "Standard Balloon Flight" },
    summary: {
      tr: "Paylaşımlı sepette, gün doğumu saatlerinde Pamukkale üzerinde balon uçuşu.",
      en: "A shared-basket sunrise balloon flight over Pamukkale.",
    },
    price: null,
    currency: "EUR",
    confirmed: false,
  },
  {
    id: "private",
    name: { tr: "Özel Sepet (sorunuz)", en: "Private Basket (on request)" },
    summary: {
      tr: "Yalnızca sizin grubunuza ayrılmış sepet seçeneğinin mevcut olup olmadığını sorabilirsiniz.",
      en: "Ask whether a basket reserved for your group alone is available.",
    },
    price: null,
    currency: "EUR",
    confirmed: false,
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

/** Policies — null until supplied by the operator. */
export const POLICIES = {
  cancellation: null as null | Record<Lang, string>,
  weatherCancellation: null as null | Record<Lang, string>,
  minAge: null as null | number,
  flightDurationMinutes: null as null | number,
};

export function whatsappLink(lang: Lang, message?: string) {
  const text = message ?? SITE.whatsapp.messages[lang];
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(text)}`;
}
export const telLink = `tel:${SITE.contact.phoneE164}`;
export const mailLink = `mailto:${SITE.contact.email}`;
