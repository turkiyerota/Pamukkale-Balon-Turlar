import { useEffect, useState, type FormEvent } from "react";
import type { Lang } from "@/config/site";
import { SITE, PACKAGES, whatsappLink, telLink, mailLink, formatDate } from "@/config/site";
import { PAGES } from "@/lib/paths";
import { PageHero } from "../page-hero";
import { crumbs } from "./content-pages";
import { L, btn, Arrow, WhatsAppIcon } from "../ui-kit";
import { Clock, FileText, MessageCircle, type LucideIcon } from "lucide-react";
import hero1 from "@/assets/hero-1.webp";

type Fields = {
  name: string;
  email: string;
  phone: string;
  date: string;
  guests: string;
  language: string;
  message: string;
  website: string;
  consent: boolean;
  pkg?: string;
  hotel?: string;
};
const empty: Fields = {
  name: "",
  email: "",
  phone: "",
  date: "",
  guests: "2",
  language: "",
  message: "",
  website: "",
  consent: false,
  pkg: "",
  hotel: "",
};

export function validate(f: Fields, lang: Lang) {
  const tr = lang === "tr";
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2)
    e.name = tr ? "Lütfen adınızı ve soyadınızı yazın." : "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = tr ? "Geçerli bir e-posta adresi girin." : "Enter a valid email address.";
  if (f.phone.replace(/\D/g, "").length < 7)
    e.phone = tr ? "Geçerli bir telefon numarası girin." : "Enter a valid phone number.";
  if (!f.date) e.date = tr ? "Tercih ettiğiniz tarihi seçin." : "Choose your preferred date.";
  const g = Number(f.guests);
  if (!Number.isInteger(g) || g < 1 || g > 30)
    e.guests = tr ? "Kişi sayısı 1 ile 30 arasında olmalı." : "Guests must be between 1 and 30.";
  if (!f.consent)
    e.consent = tr
      ? "Devam etmek için gizlilik bilgilendirmesini onaylayın."
      : "Please accept the privacy notice to continue.";
  return e;
}

export function ReservationPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [ready, setReady] = useState<string | null>(null);
  const [minDate, setMinDate] = useState<string | undefined>(undefined);
  useEffect(() => {
    const d = new Date();
    setMinDate(
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    );
  }, []);
  const set =
    (k: keyof Fields) => (ev: { target: { value: string; checked?: boolean; type?: string } }) =>
      setF((p) => ({
        ...p,
        [k]: ev.target.type === "checkbox" ? ev.target.checked : ev.target.value,
      }));

  function submit(ev: FormEvent) {
    ev.preventDefault();
    if (f.website) return; // honeypot
    const e = validate(f, lang);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    const pkg = PACKAGES.find((p) => p.id === f.pkg)?.name[lang];
    const date = formatDate(lang, f.date);
    const msg = tr
      ? `Merhaba, Pamukkale balon turu için rezervasyon talebimi iletiyorum:\nAd Soyad: ${f.name}\nTarih: ${date}\nKişi sayısı: ${f.guests}\nPaket: ${pkg || "Henüz karar vermedim"}\nOtel: ${f.hotel?.trim() || "-"}\nTelefon: ${f.phone}\nE-posta: ${f.email}\nTercih edilen dil: ${f.language || "-"}\nNot: ${f.message.trim() || "-"}`
      : `Hello, here is my booking request for a Pamukkale hot air balloon ride:\nName: ${f.name}\nDate: ${date}\nGuests: ${f.guests}\nPackage: ${pkg || "Not decided yet"}\nHotel: ${f.hotel?.trim() || "-"}\nPhone: ${f.phone}\nEmail: ${f.email}\nPreferred language: ${f.language || "-"}\nNote: ${f.message.trim() || "-"}`;
    setReady(msg);
    requestAnimationFrame(() =>
      document
        .getElementById("rezervasyon-formu")
        ?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  const field =
    "mt-2 w-full rounded-xl border border-navy/15 bg-white px-4 py-3.5 text-base text-navy-deep shadow-[inset_0_1px_2px_rgba(10,27,41,0.05)] outline-none transition-[border-color,box-shadow] placeholder:text-muted-foreground/70 hover:border-navy/30 focus:border-gold-deep focus:ring-4 focus:ring-gold/25 aria-[invalid=true]:border-destructive";
  const lab = "text-sm font-bold uppercase tracking-[0.12em] text-navy";
  const Err = ({ k }: { k: keyof Fields }) =>
    errors[k] ? (
      <p id={`e-${k}`} role="alert" className="mt-1.5 text-sm font-medium text-destructive">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Fields) => ({
    id: `f-${k}`,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
  });
  const steps: [LucideIcon, string, string][] = tr
    ? [
        [FileText, "Formu doldurun", "Tarih, kişi sayısı ve iletişim bilgileriniz."],
        [
          MessageCircle,
          "WhatsApp'tan gönderin",
          "Bilgileriniz hazır bir mesaja dönüşür; tek dokunuşla gönderirsiniz.",
        ],
        [
          Clock,
          "Yazılı teklifinizi alın",
          "Fiyat, kapsam ve koşulları size yazılı olarak iletiriz.",
        ],
      ]
    : [
        [FileText, "Fill in the form", "Your date, group size and contact details."],
        [
          MessageCircle,
          "Send it on WhatsApp",
          "Your details become a ready-made message you send in one tap.",
        ],
        [
          Clock,
          "Get your written quote",
          "We reply in writing with the price, inclusions and terms.",
        ],
      ];

  return (
    <>
      <PageHero
        image={hero1}
        position="60% 50%"
        eyebrow={tr ? "Rezervasyon" : "Booking"}
        title={tr ? "Balon Turu Rezervasyonu" : "Book Your Balloon Flight"}
        intro={
          tr
            ? "Tarihinizi ve kişi sayınızı yazın; fiyatı, kapsamı ve koşulları size yazılı olarak iletelim."
            : "Tell us your date and group size, and we'll send you the price, inclusions and terms in writing."
        }
        crumbs={crumbs(lang, "reservation")}
      />
      <section className="container-page py-16 md:py-24">
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map(([Icon, h, p], i) => (
            <li key={h as string} className="card-lux flex items-start gap-4 p-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-champagne">
                <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.7} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-bronze">
                  {tr ? "Adım" : "Step"} {i + 1}
                </p>
                <h2 className="mt-1 text-2xl">{h as string}</h2>
                <p className="mt-1 text-muted-foreground">{p as string}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div id="rezervasyon-formu" className="card-lux scroll-mt-28 p-6 sm:p-10">
            {ready ? (
              <div role="status">
                <p className="eyebrow">{tr ? "Son adım" : "Final step"}</p>
                <h2 className="mt-3 text-4xl">
                  {tr ? "Mesajınız hazır" : "Your message is ready"}
                </h2>
                <p className="mt-3 text-muted-foreground">
                  {tr
                    ? "Talebiniz henüz bize ulaşmadı. Göndermek için WhatsApp veya e-postayı seçin."
                    : "Your request hasn't reached us yet. Choose WhatsApp or email to send it."}
                </p>
                <pre className="mt-6 whitespace-pre-wrap rounded-xl border border-gold/25 bg-champagne/25 p-5 font-sans text-[0.95rem] leading-relaxed text-navy-deep">
                  {ready}
                </pre>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={whatsappLink(lang, ready)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${btn.whatsapp} btn-lg`}
                  >
                    <WhatsAppIcon className="h-5 w-5" />{" "}
                    {tr ? "WhatsApp'tan Gönder" : "Send on WhatsApp"}
                  </a>
                  <a
                    href={`${mailLink}?subject=${encodeURIComponent(tr ? "Balon turu rezervasyon talebi" : "Balloon flight booking request")}&body=${encodeURIComponent(ready)}`}
                    className={btn.primary}
                  >
                    {tr ? "E-postayla Gönder" : "Send by Email"}
                  </a>
                  <button type="button" onClick={() => setReady(null)} className={btn.outline}>
                    {tr ? "Düzenle" : "Edit"}
                  </button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={submit} className="grid gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <h2 className="text-4xl">{tr ? "Rezervasyon bilgileri" : "Booking details"}</h2>
                  <p className="mt-2 text-muted-foreground">
                    {tr ? "* ile işaretli alanlar zorunludur." : "Fields marked * are required."}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-name" className={lab}>
                    {tr ? "Ad Soyad" : "Full name"} *
                  </label>
                  <input
                    {...aria("name")}
                    autoComplete="name"
                    className={field}
                    value={f.name}
                    onChange={set("name")}
                    maxLength={100}
                  />
                  <Err k="name" />
                </div>
                <div>
                  <label htmlFor="f-date" className={lab}>
                    {tr ? "Uçuş tarihi" : "Flight date"} *
                  </label>
                  <input
                    {...aria("date")}
                    type="date"
                    min={minDate}
                    className={field}
                    value={f.date}
                    onChange={set("date")}
                  />
                  <Err k="date" />
                </div>
                <div>
                  <label htmlFor="f-guests" className={lab}>
                    {tr ? "Kişi sayısı" : "Guests"} *
                  </label>
                  <input
                    {...aria("guests")}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={30}
                    className={field}
                    value={f.guests}
                    onChange={set("guests")}
                  />
                  <Err k="guests" />
                </div>
                <div>
                  <label htmlFor="f-phone" className={lab}>
                    {tr ? "Telefon / WhatsApp" : "Phone / WhatsApp"} *
                  </label>
                  <input
                    {...aria("phone")}
                    type="tel"
                    autoComplete="tel"
                    placeholder="+90 5xx xxx xx xx"
                    className={field}
                    value={f.phone}
                    onChange={set("phone")}
                    maxLength={30}
                  />
                  <Err k="phone" />
                </div>
                <div>
                  <label htmlFor="f-email" className={lab}>
                    {tr ? "E-posta" : "Email"} *
                  </label>
                  <input
                    {...aria("email")}
                    type="email"
                    autoComplete="email"
                    className={field}
                    value={f.email}
                    onChange={set("email")}
                    maxLength={150}
                  />
                  <Err k="email" />
                </div>
                <div>
                  <label htmlFor="f-pkg" className={lab}>
                    {tr ? "Paket" : "Package"}
                  </label>
                  <select id="f-pkg" className={field} value={f.pkg} onChange={set("pkg")}>
                    <option value="">{tr ? "Henüz karar vermedim" : "Not decided yet"}</option>
                    {PACKAGES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name[lang]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="f-language" className={lab}>
                    {tr ? "İletişim dili" : "Preferred language"}
                  </label>
                  <select
                    id="f-language"
                    className={field}
                    value={f.language}
                    onChange={set("language")}
                  >
                    <option value="">{tr ? "Seçiniz" : "Select"}</option>
                    <option>Türkçe</option>
                    <option>English</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-hotel" className={lab}>
                    {tr ? "Konakladığınız otel" : "Your hotel"}
                  </label>
                  <input
                    id="f-hotel"
                    autoComplete="off"
                    placeholder={tr ? "Biliyorsanız yazın" : "If you know it already"}
                    className={field}
                    value={f.hotel}
                    onChange={set("hotel")}
                    maxLength={120}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-message" className={lab}>
                    {tr ? "Notunuz" : "Your note"}
                  </label>
                  <textarea
                    id="f-message"
                    rows={4}
                    placeholder={
                      tr
                        ? "Özel bir gün, çocuklar veya sorularınız…"
                        : "A special occasion, children or any questions…"
                    }
                    className={field}
                    value={f.message}
                    onChange={set("message")}
                    maxLength={1000}
                  />
                </div>
                <div className="hidden" aria-hidden="true">
                  <label>
                    Website
                    <input
                      tabIndex={-1}
                      autoComplete="off"
                      value={f.website}
                      onChange={set("website")}
                    />
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <label className="flex items-start gap-3 text-[0.95rem]">
                    <input
                      {...aria("consent")}
                      type="checkbox"
                      checked={f.consent}
                      onChange={set("consent")}
                      className="mt-1 h-5 w-5 shrink-0 accent-[var(--navy)]"
                    />
                    <span>
                      {tr
                        ? "Bilgilerimin yalnızca talebimi yanıtlamak için kullanılacağını anladım. "
                        : "I understand my details will only be used to answer my request. "}
                      <L
                        href={PAGES.privacy[lang]}
                        className="font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
                      >
                        {tr ? "Gizlilik Politikası" : "Privacy Policy"}
                      </L>
                    </span>
                  </label>
                  <Err k="consent" />
                </div>
                <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button type="submit" className={`${btn.gold} btn-lg`}>
                    {tr ? "Talebimi Hazırla" : "Prepare My Request"} <Arrow />
                  </button>
                  <p className="text-sm text-muted-foreground">
                    {tr
                      ? "Sonraki adımda WhatsApp veya e-postayla gönderirsiniz."
                      : "Next, you send it by WhatsApp or email."}
                  </p>
                </div>
              </form>
            )}
          </div>
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="grain relative isolate overflow-hidden rounded-[1.5rem] bg-navy-deep p-8 text-on-dark shadow-lift">
              <h2 className="text-3xl">{tr ? "Hızlı yanıt için" : "For a quick answer"}</h2>
              <p className="mt-2 text-on-dark/80">
                {tr
                  ? "Formla uğraşmak istemiyorsanız doğrudan yazın veya arayın."
                  : "Prefer not to use the form? Message or call us directly."}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={whatsappLink(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={btn.whatsapp}
                >
                  <WhatsAppIcon className="h-5 w-5" /> WhatsApp
                </a>
                <a href={telLink} className={btn.outlineLight}>
                  {SITE.contact.phoneDisplay}
                </a>
                <a
                  href={mailLink}
                  className="text-center text-sm text-on-dark/80 underline decoration-gold/60 underline-offset-4 [overflow-wrap:anywhere]"
                >
                  {SITE.contact.email}
                </a>
              </div>
            </div>
            <div className="rounded-[1.25rem] border border-gold/30 bg-champagne/25 p-6 text-[0.95rem] leading-relaxed text-navy-deep">
              <p className="font-bold">{tr ? "Bilmeniz gerekenler" : "Good to know"}</p>
              <p className="mt-2">
                {tr
                  ? "Form, bilgilerinizi bir sunucuya kaydetmez; yalnızca WhatsApp veya e-postayla göndereceğiniz bir mesaj hazırlar. Rezervasyonunuz, size ileteceğimiz yazılı teyitle kesinleşir."
                  : "The form doesn't store your details on a server — it only prepares a message for you to send by WhatsApp or email. Your booking is final once we confirm it in writing."}
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
