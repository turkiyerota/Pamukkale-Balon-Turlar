import type { Lang } from "@/config/site";
import { SITE } from "@/config/site";
import { PageHero } from "../page-hero";
import { crumbs } from "./content-pages";
import { Notice } from "../ui-kit";
import hero3 from "@/assets/hero-3.webp";

type Kind = "privacy" | "cookies" | "terms";

const T: Record<Kind, Record<Lang, { title: string; s: [string, string][] }>> = {
  privacy: {
    tr: { title: "Gizlilik Politikası", s: [
      ["Kapsam", `Bu politika, ${SITE.domain} web sitesini kullanırken paylaştığınız bilgilerin nasıl ele alındığını açıklar.`],
      ["Topladığımız bilgiler", "Site şu anda form verilerini bir sunucuya kaydetmez. Rezervasyon formuna yazdığınız bilgiler, yalnızca tarayıcınızda bir mesaja dönüştürülür ve siz WhatsApp veya e-posta ile göndermeyi seçerseniz bize ulaşır."],
      ["Kullanım amacı", "Bize ulaşan bilgiler yalnızca talebinizi yanıtlamak ve rezervasyon sürecini yürütmek için kullanılır."],
      ["Üçüncü taraflar", "WhatsApp veya e-posta ile gönderdiğiniz mesajlar ilgili hizmet sağlayıcıların koşullarına tabidir. Sitede analitik veya reklam takibi bulunmamaktadır."],
      ["Haklarınız", `Kişisel verilerinize ilişkin talepleriniz için ${SITE.contact.email} adresine yazabilirsiniz.`],
    ] },
    en: { title: "Privacy Policy", s: [
      ["Scope", `This policy explains how information you share while using ${SITE.domain} is handled.`],
      ["What we collect", "The site does not currently store form data on a server. Details you type into the booking form are turned into a message in your browser and only reach us if you choose to send it by WhatsApp or email."],
      ["How we use it", "Information that reaches us is used only to answer your request and manage your booking."],
      ["Third parties", "Messages sent by WhatsApp or email are subject to those providers' terms. The site uses no analytics or advertising tracking."],
      ["Your rights", `For requests about your personal data, write to ${SITE.contact.email}.`],
    ] },
  },
  cookies: {
    tr: { title: "Çerez Politikası", s: [
      ["Çerez kullanımı", "Bu site şu anda analitik, reklam veya takip çerezi kullanmamaktadır."],
      ["Teknik depolama", "Sitenin çalışması için gerekli teknik veriler dışında tarayıcınızda bilgi saklanmaz."],
      ["Değişiklikler", "İleride analitik veya üçüncü taraf hizmetler eklenirse bu sayfa güncellenecek ve gerektiğinde onayınız istenecektir."],
    ] },
    en: { title: "Cookie Policy", s: [
      ["Use of cookies", "This site does not currently use analytics, advertising or tracking cookies."],
      ["Technical storage", "No information is stored in your browser beyond what is technically needed for the site to work."],
      ["Changes", "If analytics or third-party services are added in future, this page will be updated and your consent requested where required."],
    ] },
  },
  terms: {
    tr: { title: "Kullanım Koşulları", s: [
      ["Bilgilendirme amacı", "Bu sitedeki içerikler genel bilgilendirme amaçlıdır. Fiyat, süre ve koşullar gibi bilgiler rezervasyon sırasında yazılı olarak teyit edilir."],
      ["Rezervasyon", "Siteden iletilen talepler rezervasyon onayı değildir. Rezervasyon yalnızca yazılı teyit ile kesinleşir."],
      ["Hava koşulları", "Balon uçuşları hava koşullarına bağlıdır ve güvenlik nedeniyle iptal edilebilir."],
      ["Fikri mülkiyet", `Sitedeki logo, metin ve görseller ${SITE.name}'na aittir; izinsiz kullanılamaz.`],
    ] },
    en: { title: "Terms of Use", s: [
      ["Informational purpose", "Content on this site is general information. Prices, durations and terms are confirmed in writing at booking."],
      ["Bookings", "Requests sent from this site are not booking confirmations. A booking is only confirmed in writing."],
      ["Weather", "Balloon flights depend on the weather and may be cancelled for safety."],
      ["Intellectual property", `The logo, text and images on this site belong to ${SITE.name} and may not be used without permission.`],
    ] },
  },
};

export function legalTitle(kind: Kind, lang: Lang) { return T[kind][lang].title; }

export function LegalPage({ lang, kind }: { lang: Lang; kind: Kind }) {
  const d = T[kind][lang];
  return (
    <>
      <PageHero image={hero3} title={d.title} crumbs={crumbs(lang, kind)} />
      <section className="container-page max-w-3xl py-16 md:py-24">
        <Notice>{lang === "tr" ? "Bu metin sitenin mevcut işleyişini yansıtır; hukuki danışmanlık yerine geçmez." : "This text reflects how the site currently works; it is not legal advice."}</Notice>
        <div className="prose-article mt-8">
          {d.s.map(([h, p]) => (<div key={h}><h2>{h}</h2><p>{p}</p></div>))}
        </div>
      </section>
    </>
  );
}
