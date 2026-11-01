import { useState, type FormEvent } from "react";
import type { Lang } from "@/config/site";
import { SITE, whatsappLink, telLink, mailLink } from "@/config/site";
import { PAGES } from "@/lib/paths";
import { PageHero } from "../page-hero";
import { crumbs } from "./content-pages";
import { L, btn, Notice, WhatsAppIcon } from "../ui-kit";
import hero1 from "@/assets/hero-1.webp";

type Fields = { name: string; email: string; phone: string; date: string; guests: string; language: string; message: string; website: string; consent: boolean };
const empty: Fields = { name: "", email: "", phone: "", date: "", guests: "2", language: "", message: "", website: "", consent: false };

export function validate(f: Fields, lang: Lang) {
  const tr = lang === "tr";
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) e.name = tr ? "Lütfen adınızı ve soyadınızı yazın." : "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = tr ? "Geçerli bir e-posta adresi girin." : "Enter a valid email address.";
  if (f.phone.replace(/\D/g, "").length < 7) e.phone = tr ? "Geçerli bir telefon numarası girin." : "Enter a valid phone number.";
  if (!f.date) e.date = tr ? "Tercih ettiğiniz tarihi seçin." : "Choose your preferred date.";
  const g = Number(f.guests);
  if (!Number.isInteger(g) || g < 1 || g > 30) e.guests = tr ? "Kişi sayısı 1 ile 30 arasında olmalı." : "Guests must be between 1 and 30.";
  if (!f.consent) e.consent = tr ? "Devam etmek için gizlilik bilgilendirmesini onaylayın." : "Please accept the privacy notice to continue.";
  return e;
}

export function ReservationPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [ready, setReady] = useState<string | null>(null);
  const set = (k: keyof Fields) => (ev: { target: { value: string; checked?: boolean; type?: string } }) =>
    setF((p) => ({ ...p, [k]: ev.target.type === "checkbox" ? ev.target.checked : ev.target.value }));

  function submit(ev: FormEvent) {
    ev.preventDefault();
    if (f.website) return; // honeypot
    const e = validate(f, lang);
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    const msg = tr
      ? `Merhaba, Pamukkale balon turu için rezervasyon talebim:\nAd Soyad: ${f.name}\nE-posta: ${f.email}\nTelefon: ${f.phone}\nTarih: ${f.date}\nKişi sayısı: ${f.guests}\nTercih edilen dil: ${f.language || "-"}\nNot: ${f.message || "-"}`
      : `Hello, my booking request for a Pamukkale balloon tour:\nName: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone}\nDate: ${f.date}\nGuests: ${f.guests}\nPreferred language: ${f.language || "-"}\nNote: ${f.message || "-"}`;
    setReady(msg);
  }

  const field = "mt-1.5 w-full rounded-md border border-input bg-card px-4 py-3 text-base outline-none focus:border-amber focus:ring-2 focus:ring-amber/40";
  const Err = ({ k }: { k: keyof Fields }) => errors[k] ? <p id={`e-${k}`} role="alert" className="mt-1 text-sm text-destructive">{errors[k]}</p> : null;
  const aria = (k: keyof Fields) => ({ id: `f-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <>
      <PageHero image={hero1} eyebrow={tr ? "Rezervasyon" : "Reservation"} title={tr ? "Rezervasyon Talebi" : "Booking Request"} intro={tr ? "Bilgilerinizi iletin; fiyat, kapsam ve koşulları size yazılı olarak bildirelim." : "Send your details and we'll reply in writing with the price, inclusions and terms."} crumbs={crumbs(lang, "reservation")} />
      <section className="container-page grid gap-12 py-16 md:grid-cols-[1.5fr_1fr] md:py-24">
        <div>
          <Notice>
            {tr
              ? "Bu form şu an bilgileri sunucuya göndermez. Formu doldurduğunuzda talebiniz WhatsApp veya e-posta ile göndermeniz için hazır bir mesaja dönüştürülür. Bu bir rezervasyon onayı değildir; rezervasyon yalnızca yazılı teyitle kesinleşir."
              : "This form does not send data to a server yet. When you complete it, your request becomes a ready-made message to send by WhatsApp or email. This is not a booking confirmation — bookings are only confirmed in writing."}
          </Notice>
          {ready ? (
            <div className="mt-8 rounded-lg bg-card p-8 shadow-soft" role="status">
              <h2 className="text-3xl">{tr ? "Mesajınız hazır" : "Your message is ready"}</h2>
              <p className="mt-3 text-muted-foreground">{tr ? "Talebiniz henüz gönderilmedi. Göndermek için aşağıdaki seçeneklerden birini kullanın:" : "Your request has not been sent yet. Use one of the options below to send it:"}</p>
              <pre className="mt-4 whitespace-pre-wrap rounded-md bg-secondary p-4 text-sm">{ready}</pre>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={whatsappLink(lang, ready)} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}><WhatsAppIcon /> {tr ? "WhatsApp ile gönder" : "Send via WhatsApp"}</a>
                <a href={`${mailLink}?subject=${encodeURIComponent(tr ? "Balon turu rezervasyon talebi" : "Balloon tour booking request")}&body=${encodeURIComponent(ready)}`} className={btn.primary}>{tr ? "E-posta ile gönder" : "Send via email"}</a>
                <button type="button" onClick={() => setReady(null)} className={btn.outline}>{tr ? "Düzenle" : "Edit"}</button>
              </div>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2"><label htmlFor="f-name" className="font-semibold">{tr ? "Ad Soyad" : "Full name"} *</label><input {...aria("name")} autoComplete="name" className={field} value={f.name} onChange={set("name")} maxLength={100} /><Err k="name" /></div>
              <div><label htmlFor="f-email" className="font-semibold">{tr ? "E-posta" : "Email"} *</label><input {...aria("email")} type="email" autoComplete="email" className={field} value={f.email} onChange={set("email")} maxLength={150} /><Err k="email" /></div>
              <div><label htmlFor="f-phone" className="font-semibold">{tr ? "Telefon / WhatsApp" : "Phone / WhatsApp"} *</label><input {...aria("phone")} type="tel" autoComplete="tel" className={field} value={f.phone} onChange={set("phone")} maxLength={30} /><Err k="phone" /></div>
              <div><label htmlFor="f-date" className="font-semibold">{tr ? "Tercih edilen tarih" : "Preferred date"} *</label><input {...aria("date")} type="date" className={field} value={f.date} onChange={set("date")} /><Err k="date" /></div>
              <div><label htmlFor="f-guests" className="font-semibold">{tr ? "Kişi sayısı" : "Guests"} *</label><input {...aria("guests")} type="number" min={1} max={30} className={field} value={f.guests} onChange={set("guests")} /><Err k="guests" /></div>
              <div className="sm:col-span-2"><label htmlFor="f-language" className="font-semibold">{tr ? "Tercih edilen dil" : "Preferred language"}</label>
                <select id="f-language" className={field} value={f.language} onChange={set("language")}>
                  <option value="">{tr ? "Seçiniz" : "Select"}</option><option>Türkçe</option><option>English</option>
                </select></div>
              <div className="sm:col-span-2"><label htmlFor="f-message" className="font-semibold">{tr ? "Ek mesaj" : "Additional message"}</label><textarea id="f-message" rows={4} className={field} value={f.message} onChange={set("message")} maxLength={1000} /></div>
              <div className="hidden" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} /></label></div>
              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm"><input {...aria("consent")} type="checkbox" checked={f.consent} onChange={set("consent")} className="mt-1 h-4 w-4 accent-[var(--navy)]" />
                  <span>{tr ? "Bilgilerimin yalnızca talebimi yanıtlamak için kullanılacağını anladım. " : "I understand my details will only be used to answer my request. "}<L href={PAGES.privacy[lang]} className="text-sage underline">{tr ? "Gizlilik Politikası" : "Privacy Policy"}</L></span></label>
                <Err k="consent" />
              </div>
              <div className="sm:col-span-2"><button type="submit" className={btn.accent}>{tr ? "Mesajı hazırla" : "Prepare my message"}</button></div>
            </form>
          )}
        </div>
        <aside className="space-y-6">
          <div className="rounded-lg bg-navy p-8 text-on-dark">
            <h2 className="text-3xl">{tr ? "Doğrudan ulaşın" : "Contact us directly"}</h2>
            <div className="mt-5 flex flex-col gap-3">
              <a href={whatsappLink(lang)} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}><WhatsAppIcon /> WhatsApp</a>
              <a href={telLink} className={btn.outlineLight}>{SITE.contact.phoneDisplay}</a>
              <a href={mailLink} className="break-all text-sm text-on-dark-muted underline">{SITE.contact.email}</a>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
