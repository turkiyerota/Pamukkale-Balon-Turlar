import type { Lang } from "@/config/site";
import { PACKAGES, INCLUSIONS } from "@/config/site";
import { PAGES } from "@/lib/paths";
import { getArticles } from "@/content/articles";
import { FAQS } from "@/content/faq";
import { HeroSlider } from "../hero-slider";
import { ArticleCard, CtaBand, FaqList } from "../blocks";
import { L, btn, SectionHeading, Notice } from "../ui-kit";
import imgInflation from "@/assets/img-inflation.webp";
import imgHierapolis from "@/assets/img-hierapolis.webp";
import hero3 from "@/assets/hero-3.webp";

const C = {
  tr: {
    introEy: "Deneyim", introH: "Travertenlerin üzerinde sessiz bir yolculuk",
    introP: ["Pamukkale'nin bembeyaz traverten terasları, gün doğumunun sıcak ışığıyla bambaşka bir görünüme bürünür. Balon turu, bu manzarayı yukarıdan, sakin ve yavaş bir yolculukla izleme fırsatı sunar.", "Bu sitede, karar vermeden önce ihtiyaç duyacağınız bilgileri şeffaf biçimde paylaşıyoruz: neyin kesin olduğunu, neyin henüz teyit beklediğini açıkça belirtiyoruz."],
    essEy: "Temel bilgiler", essH: "Tura dair bilmeniz gerekenler",
    ess: [["Konum", "Pamukkale, Denizli"], ["Zaman", "Gün doğumuna göre, sabah erken saatler"], ["Uçuş süresi", "Teyit bekleniyor"], ["Transfer", "Teyit bekleniyor"]],
    priceEy: "Fiyatlar", priceH: "Paketler ve fiyat bilgisi", priceNote: "Fiyatlar henüz yayınlanmadı. Tarih ve kişi sayısına göre güncel teklif için bize ulaşın.", onRequest: "Fiyat talep üzerine", allPrices: "Tüm fiyat bilgileri",
    incEy: "Kapsam", incH: "Fiyata neler dahil olabilir?", incNote: "Aşağıdaki kalemler henüz teyit edilmedi. Teklif alırken her birini sormanızı öneririz.",
    stepsEy: "Süreç", stepsH: "Rezervasyon nasıl işler?",
    steps: [["Talebinizi iletin", "Tarih, kişi sayısı ve iletişim bilgilerinizi form, telefon veya WhatsApp ile paylaşın."], ["Teklifi inceleyin", "Fiyat, dahil olan hizmetler ve koşullar size iletilir."], ["Yazılı teyit alın", "Rezervasyonunuz yazılı teyitle kesinleşir."], ["Uçuş sabahı", "Bir gün önce alış saati bildirilir; hava uygunsa uçuş gerçekleşir."]],
    faqEy: "Sorular", faqH: "Uçuş bilgileri ve sık sorulanlar", faqAll: "Tüm sorular", flightAll: "Uçuş bilgileri",
    destEy: "Destinasyon", destH: "Pamukkale ve Hierapolis",
    destP: "UNESCO Dünya Mirası Listesi'ndeki Pamukkale, kalsiyum karbonatlı termal suların binlerce yılda oluşturduğu beyaz travertenleri ve hemen üzerindeki Hierapolis antik kentiyle tanınır. Antik tiyatro, Kleopatra Havuzu olarak bilinen antik havuz ve nekropol, balon turundan sonra keşfedilebilecek yerler arasındadır.",
    whyEy: "Neden balon?", whyH: "Pamukkale'yi yukarıdan görmenin farkı",
    why: [["Bütünsel bakış", "Terasların, havuzların ve antik kentin birbiriyle ilişkisini yukarıdan görmek mümkün olur."], ["Gün doğumu ışığı", "Sabahın ilk ışığı travertenleri pembe ve altın tonlarına boyar."], ["Sakin bir ritim", "Balon rüzgârla süzülür; deneyim hızlı değil, dingindir."]],
    blogEy: "Keşfet", blogH: "Son yazılar", blogAll: "Tüm yazılar",
  },
  en: {
    introEy: "The experience", introH: "A quiet journey above the travertines",
    introP: ["Pamukkale's brilliant white travertine terraces take on a completely different look in the warm light of sunrise. A balloon ride lets you take in the landscape from above, slowly and calmly.", "On this site we share what you need before deciding — and we're clear about what is confirmed and what is still awaiting verification."],
    essEy: "Essentials", essH: "What to know about the tour",
    ess: [["Location", "Pamukkale, Denizli"], ["Timing", "Early morning, around sunrise"], ["Flight duration", "To be confirmed"], ["Transfers", "To be confirmed"]],
    priceEy: "Prices", priceH: "Packages and pricing", priceNote: "Prices are not published yet. Contact us for a current quote for your date and group.", onRequest: "Price on request", allPrices: "All pricing details",
    incEy: "Inclusions", incH: "What may be included?", incNote: "The items below are not yet confirmed. We recommend asking about each one when you request a quote.",
    stepsEy: "How it works", stepsH: "How booking works",
    steps: [["Send your request", "Share your date, group size and contact details by form, phone or WhatsApp."], ["Review the quote", "We send the price, inclusions and terms."], ["Get written confirmation", "Your booking is confirmed in writing."], ["Flight morning", "Pick-up time is shared the day before; you fly if the weather allows."]],
    faqEy: "Questions", faqH: "Flight information & FAQs", faqAll: "All FAQs", flightAll: "Flight information",
    destEy: "Destination", destH: "Pamukkale and Hierapolis",
    destP: "A UNESCO World Heritage Site, Pamukkale is known for white travertines formed over millennia by calcium-rich thermal waters, and for the ancient city of Hierapolis just above them. The ancient theatre, the antique pool and the necropolis are all worth exploring after your flight.",
    whyEy: "Why a balloon?", whyH: "Seeing Pamukkale from above",
    why: [["The bigger picture", "See how the terraces, pools and ancient city fit together."], ["Sunrise light", "The first light of day paints the travertines pink and gold."], ["A calm pace", "A balloon drifts with the wind — the experience is serene, not rushed."]],
    blogEy: "Insights", blogH: "Latest articles", blogAll: "All articles",
  },
};

export function HomePage({ lang }: { lang: Lang }) {
  const t = C[lang];
  const latest = getArticles(lang).slice(0, 3);
  return (
    <>
      <HeroSlider lang={lang} />

      <section className="container-page grid gap-12 py-20 md:grid-cols-2 md:py-28">
        <div className="reveal">
          <SectionHeading eyebrow={t.introEy} title={t.introH} />
          {t.introP.map((p, i) => <p key={i} className="mt-5 text-lg leading-relaxed text-muted-foreground">{p}</p>)}
        </div>
        <div className="reveal">
          <h2 className="eyebrow">{t.essEy}</h2>
          <p className="mt-3 font-display text-3xl font-semibold">{t.essH}</p>
          <dl className="mt-6 divide-y divide-border border-y border-border">
            {t.ess.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-4">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="container-page">
          <SectionHeading eyebrow={t.priceEy} title={t.priceH} intro={t.priceNote} />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {PACKAGES.map((p) => (
              <div key={p.id} className="rounded-lg bg-card p-8 shadow-soft reveal">
                <h3 className="text-3xl">{p.name[lang]}</h3>
                <p className="mt-3 text-muted-foreground">{p.summary[lang]}</p>
                <p className="mt-6 font-display text-2xl text-sage">{p.price && p.confirmed ? `${p.price} ${p.currency}` : t.onRequest}</p>
              </div>
            ))}
          </div>
          <L href={PAGES.prices[lang]} className={`${btn.primary} mt-8`}>{t.allPrices}</L>
        </div>
      </section>

      <section className="container-page grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
        <img src={imgInflation} alt={lang === "tr" ? "Şafak öncesi şişirilen balon" : "A balloon being inflated before dawn"} width={1280} height={864} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft reveal" />
        <div>
          <SectionHeading eyebrow={t.incEy} title={t.incH} />
          <div className="mt-6"><Notice>{t.incNote}</Notice></div>
          <ul className="mt-6 space-y-3">
            {INCLUSIONS.toVerify.map((x, i) => (
              <li key={i} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber" aria-hidden="true" /><span>{x[lang]}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy py-20 text-on-dark md:py-28">
        <div className="container-page">
          <p className="eyebrow">{t.stepsEy}</p>
          <h2 className="mt-3 text-4xl md:text-5xl">{t.stepsH}</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {t.steps.map(([h, p], i) => (
              <li key={i} className="border-t border-on-dark/25 pt-6 reveal">
                <span className="font-display text-5xl text-amber">0{i + 1}</span>
                <h3 className="mt-3 text-2xl">{h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">{p}</p>
              </li>
            ))}
          </ol>
          <L href={PAGES.reservation[lang]} className={`${btn.accent} mt-10`}>{lang === "tr" ? "Rezervasyon Talebi" : "Request a Booking"}</L>
        </div>
      </section>

      <section className="container-page py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t.faqEy} title={t.faqH} />
          <div className="flex gap-3">
            <L href={PAGES.flight[lang]} className={btn.outline}>{t.flightAll}</L>
            <L href={PAGES.faq[lang]} className={btn.outline}>{t.faqAll}</L>
          </div>
        </div>
        <div className="mt-10"><FaqList items={FAQS[lang].slice(0, 5)} /></div>
      </section>

      <section className="relative isolate overflow-hidden bg-navy-deep text-on-dark">
        <img src={imgHierapolis} alt={lang === "tr" ? "Hierapolis antik tiyatrosu" : "The Hierapolis theatre"} width={1280} height={864} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="container-page py-28 md:py-36">
          <p className="eyebrow">{t.destEy}</p>
          <h2 className="mt-3 max-w-2xl text-5xl md:text-6xl">{t.destH}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-dark-muted">{t.destP}</p>
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 md:grid-cols-[1fr_1.2fr] md:py-28">
        <div>
          <SectionHeading eyebrow={t.whyEy} title={t.whyH} />
          <img src={hero3} alt="" width={1600} height={907} loading="lazy" className="mt-8 aspect-[4/3] w-full rounded-lg object-cover" />
        </div>
        <ul className="flex flex-col justify-center gap-8">
          {t.why.map(([h, p]) => (
            <li key={h} className="border-l-2 border-terracotta pl-6 reveal">
              <h3 className="text-3xl">{h}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{p}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-secondary py-20 md:py-28">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t.blogEy} title={t.blogH} />
            <L href={PAGES.blog[lang]} className={btn.outline}>{t.blogAll}</L>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {latest.map((a) => <ArticleCard key={a.id} a={a} />)}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
