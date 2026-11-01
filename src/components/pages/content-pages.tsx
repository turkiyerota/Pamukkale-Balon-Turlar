import type { Lang } from "@/config/site";
import { PACKAGES, INCLUSIONS, POLICIES, SITE, telLink, mailLink, whatsappLink } from "@/config/site";
import { PAGES, PAGE_LABELS, type PageKey } from "@/lib/paths";
import { FAQS } from "@/content/faq";
import { PageHero } from "../page-hero";
import { CtaBand, FaqList } from "../blocks";
import { L, btn, Notice, Rich, SectionHeading, WhatsAppIcon } from "../ui-kit";
import imgBurner from "@/assets/img-burner.webp";
import imgWeather from "@/assets/img-weather.webp";
import imgClothing from "@/assets/img-clothing.webp";
import hero2 from "@/assets/hero-2.webp";
import hero4 from "@/assets/hero-4.webp";
import hero5 from "@/assets/hero-5.webp";
import imgSeason from "@/assets/img-season.webp";

export function crumbs(lang: Lang, key: PageKey) {
  return [{ name: PAGE_LABELS.home[lang], path: PAGES.home[lang] }, { name: PAGE_LABELS[key][lang] }];
}

/* ---------------- Prices ---------------- */
export function PricesPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const pricingFaq = FAQS[lang].filter((_, i) => [0, 6, 8].includes(i));
  return (
    <>
      <PageHero image={imgBurner} eyebrow={tr ? "Fiyatlar" : "Prices"} title={tr ? "Pamukkale Balon Turu Fiyatları" : "Pamukkale Hot Air Balloon Prices"} intro={tr ? "Paketler, kapsam ve koşullar — neyin teyitli, neyin teyit beklediğini açıkça belirterek." : "Packages, inclusions and terms — with a clear line between what's confirmed and what isn't yet."} crumbs={crumbs(lang, "prices")} />
      <section className="container-page py-16 md:py-24">
        <Notice>{tr ? "2026 fiyatları henüz yayınlanmadı. Aşağıdaki paketler bilgilendirme amaçlıdır; tarihinize özel fiyat için bizimle iletişime geçin." : "2026 prices haven't been published yet. The packages below are for information only — contact us for a price for your date."}</Notice>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {PACKAGES.map((p) => (
            <div key={p.id} className="flex flex-col rounded-lg bg-card p-8 shadow-soft">
              <h2 className="text-3xl">{p.name[lang]}</h2>
              <p className="mt-3 flex-1 text-muted-foreground">{p.summary[lang]}</p>
              <p className="mt-6 font-display text-3xl text-sage">{p.price && p.confirmed ? `${p.price} ${p.currency}` : tr ? "Fiyat talep üzerine" : "Price on request"}</p>
              <L href={PAGES.reservation[lang]} className={`${btn.primary} mt-6 self-start`}>{tr ? "Teklif İste" : "Request a Quote"}</L>
            </div>
          ))}
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl">{tr ? "Dahil olanlar ve hariç olanlar" : "Included and excluded"}</h2>
            <p className="mt-3 text-muted-foreground">{INCLUSIONS.confirmed.length ? "" : tr ? "Henüz teyit edilmiş bir kapsam listesi yok. Teklif alırken şu kalemleri sorun:" : "No confirmed inclusions list yet. Ask about these items when you request a quote:"}</p>
            <ul className="mt-4 space-y-2">{INCLUSIONS.toVerify.map((x, i) => <li key={i} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber" aria-hidden="true" />{x[lang]}</li>)}</ul>
          </div>
          <div>
            <h2 className="text-3xl">{tr ? "İptal ve tarih değişikliği" : "Cancellation and rescheduling"}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {POLICIES.cancellation?.[lang] ?? (tr ? "İptal, iade ve tarih değişikliği koşullarımız henüz yayınlanmadı. Rezervasyon öncesinde yazılı olarak paylaşılacaktır." : "Our cancellation, refund and rescheduling terms are not yet published. They will be shared in writing before you book.")}
            </p>
            <p className="mt-3 text-sm"><Rich text={tr ? "Genel bilgi için: [iptal durumunda ne olur?](/kesfet/pamukkale-balon-turu-iptal-edilirse-ne-olur/)" : "General guidance: [what happens if a flight is cancelled?](/en/insights/what-happens-if-a-pamukkale-balloon-tour-is-cancelled/)"} /></p>
          </div>
        </div>
        <div className="mt-16">
          <h2 className="text-3xl">{tr ? "Fiyatlarla ilgili sorular" : "Pricing questions"}</h2>
          <div className="mt-6"><FaqList items={pricingFaq} /></div>
        </div>
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------------- Flight info ---------------- */
export function FlightPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const stages = tr
    ? [["Otelden alış", "Transfer dahilse, sabah erken saatte otelinizden alınırsınız. Saat bir gün önceden bildirilir."], ["Bilgilendirme ve şişirme", "Kalkış alanında balonun şişirilmesini izler, pilotun güvenlik bilgilendirmesini dinlersiniz."], ["Uçuş", "Balon rüzgârla süzülür; süre ve rota o günkü koşullara bağlıdır."], ["İniş ve dönüş", "Pilot uygun bir alana iniş yapar; ardından dönüş transferi gerçekleşir."]]
    : [["Hotel pick-up", "If transfers are included, you're collected early in the morning. The time is shared the day before."], ["Briefing and inflation", "At the launch site you watch the inflation and listen to the pilot's safety briefing."], ["The flight", "The balloon drifts with the wind; duration and route depend on the day's conditions."], ["Landing and return", "The pilot lands in a suitable spot, followed by the return transfer."]];
  const blocks = tr
    ? [{ img: imgClothing, h: "Hazırlık ve kıyafet", p: "Sabahlar serin olabilir. Kat kat giyinin, kapalı ve kaymaz ayakkabı tercih edin. Büyük çanta kurallarını önceden sorun.", link: "[Ne giyilir rehberi](/kesfet/pamukkale-balon-turunda-ne-giyilir/)" }, { img: imgWeather, h: "Hava durumu ve iptaller", p: "Rüzgâr, yağış veya sis nedeniyle uçuşlar son dakikada iptal edilebilir. Bu kararlar güvenlik içindir. Mümkünse turu konaklamanızın ilk sabahına planlayın.", link: "[İptal durumunda ne olur?](/kesfet/pamukkale-balon-turu-iptal-edilirse-ne-olur/)" }]
    : [{ img: imgClothing, h: "Preparation and clothing", p: "Mornings can be cool. Wear layers and closed, non-slip shoes. Check bag rules in advance.", link: "[What to wear](/en/insights/what-to-wear-for-a-pamukkale-hot-air-balloon-ride/)" }, { img: imgWeather, h: "Weather and cancellations", p: "Wind, rain or fog can cancel flights at the last minute — for safety. If you can, book your first morning.", link: "[What happens if a flight is cancelled?](/en/insights/what-happens-if-a-pamukkale-balloon-tour-is-cancelled/)" }];
  const confirm = tr
    ? ["Kesin alış saati ve buluşma noktası", "Havada geçen tahmini süre", "Minimum yaş ve boy şartı", "Sağlık durumu ve hareket kısıtlılığıyla ilgili koşullar", "Hava nedeniyle iptalde uygulanacak seçenekler", "Sigorta kapsamı"]
    : ["Exact pick-up time and meeting point", "Approximate time in the air", "Minimum age and height", "Conditions for health or mobility limitations", "What happens if the weather cancels the flight", "Insurance coverage"];
  return (
    <>
      <PageHero image={hero5} eyebrow={tr ? "Uçuş bilgileri" : "Flight information"} title={tr ? "Pamukkale Balon Uçuşu Hakkında" : "About the Pamukkale Balloon Flight"} intro={tr ? "Bu sayfadaki bilgiler geneldir. Operatöre özgü kurallar ve saatler rezervasyon sırasında teyit edilir." : "The information here is general. Operator-specific rules and times are confirmed when you book."} crumbs={crumbs(lang, "flight")} />
      <section className="container-page py-16 md:py-24">
        <SectionHeading eyebrow={tr ? "Aşamalar" : "Stages"} title={tr ? "Tipik bir uçuş sabahı" : "A typical flight morning"} />
        <ol className="mt-10 grid gap-8 md:grid-cols-4">
          {stages.map(([h, p], i) => (
            <li key={h} className="border-t-2 border-amber pt-5"><span className="font-display text-4xl text-amber">0{i + 1}</span><h3 className="mt-2 text-2xl">{h}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p}</p></li>
          ))}
        </ol>
        <div className="mt-20 grid gap-10 md:grid-cols-2">
          {blocks.map((b) => (
            <article key={b.h} className="overflow-hidden rounded-lg bg-card shadow-soft">
              <img src={b.img} alt="" width={1280} height={864} loading="lazy" className="aspect-[16/9] w-full object-cover" />
              <div className="p-8"><h2 className="text-3xl">{b.h}</h2><p className="mt-3 leading-relaxed text-muted-foreground">{b.p}</p><p className="mt-3 text-sage underline underline-offset-4"><Rich text={b.link} /></p></div>
            </article>
          ))}
        </div>
        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-3xl">{tr ? "Çocuklar, uygunluk ve erişilebilirlik" : "Children, eligibility and accessibility"}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{tr ? "Yaş, boy ve sağlık durumuyla ilgili kurallar henüz doğrulanmış olarak yayınlanmadı. Sepete binip inmek belirli bir hareket kabiliyeti gerektirebilir. Hamilelik, yakın zamanda geçirilmiş ameliyat, sırt veya diz sorunları ya da hareket kısıtlılığı varsa lütfen önceden bize danışın." : "Age, height and health rules haven't been published as verified yet. Climbing in and out of the basket can require some mobility. If you're pregnant, have had recent surgery, back or knee problems, or limited mobility, please talk to us first."}</p>
          </div>
          <div className="rounded-lg bg-secondary p-8">
            <h2 className="text-3xl">{tr ? "Rezervasyondan önce teyit edin" : "Confirm before booking"}</h2>
            <ul className="mt-4 space-y-2">{confirm.map((c) => <li key={c} className="flex gap-3"><span aria-hidden="true" className="text-sage">✓</span>{c}</li>)}</ul>
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
      <PageHero image={hero4} eyebrow="FAQ" title={tr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"} intro={tr ? "Teyit bekleyen konuları açıkça belirttik. Yanıtını bulamadığınız sorular için bize yazın." : "Where something is still awaiting confirmation, we say so. Can't find your answer? Get in touch."} crumbs={crumbs(lang, "faq")} />
      <section className="container-page max-w-4xl py-16 md:py-24"><FaqList items={FAQS[lang]} /></section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------------- About ---------------- */
export function AboutPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  return (
    <>
      <PageHero image={hero2} eyebrow={tr ? "Hakkımızda" : "About us"} title={SITE.name} intro={tr ? "Pamukkale'nin gökyüzündeki deneyimini ziyaretçilere açık ve dürüst bilgilerle tanıtıyoruz." : "We introduce visitors to Pamukkale from the sky — with clear, honest information."} crumbs={crumbs(lang, "about")} />
      <section className="container-page grid gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>{tr ? "Pamukkale Balon Turları, Pamukkale'de balon turu yapmak isteyen ziyaretçilere bilgi, teklif ve rezervasyon desteği sunmak amacıyla hizmet verir. Merkezimiz Pamukkale'de, Menderes Caddesi üzerindedir." : "Pamukkale Balon Turları helps visitors who want to fly over Pamukkale with information, quotes and booking support. We're based in Pamukkale, on Menderes Caddesi."}</p>
          <p>{tr ? "Yaklaşımımız basit: neyin kesin olduğunu söylemek, neyin henüz teyit beklediğini açıkça belirtmek ve abartılı vaatlerden kaçınmak." : "Our approach is simple: say what's certain, be clear about what still needs confirming, and avoid overblown promises."}</p>
          <p>{tr ? "Şirket geçmişimiz, filomuz ve ekibimizle ilgili ayrıntıları doğrulanmış bilgilerle yakında bu sayfada paylaşacağız." : "We'll share details about our history, fleet and team on this page once they're verified."}</p>
        </div>
        <img src={imgSeason} alt={tr ? "Pamukkale üzerinde balonlar" : "Balloons above Pamukkale"} width={1280} height={864} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft" />
      </section>
      <CtaBand lang={lang} />
    </>
  );
}

/* ---------------- Contact ---------------- */
export function ContactPage({ lang }: { lang: Lang }) {
  const tr = lang === "tr";
  const items = [
    { h: tr ? "Telefon" : "Phone", v: SITE.contact.phoneDisplay, href: telLink },
    { h: tr ? "E-posta" : "Email", v: SITE.contact.email, href: mailLink },
    { h: tr ? "Adres" : "Address", v: SITE.contact.address },
  ];
  return (
    <>
      <PageHero image={hero4} eyebrow={tr ? "İletişim" : "Contact"} title={tr ? "Bize Ulaşın" : "Get in Touch"} intro={tr ? "Sorularınız, teklif ve rezervasyon talepleriniz için." : "For questions, quotes and booking requests."} crumbs={crumbs(lang, "contact")} />
      <section className="container-page grid gap-10 py-16 md:grid-cols-3 md:py-24">
        {items.map((it) => (
          <div key={it.h} className="rounded-lg bg-card p-8 shadow-soft">
            <h2 className="eyebrow">{it.h}</h2>
            {it.href ? <a href={it.href} className="mt-3 block break-words font-display text-2xl hover:text-sage">{it.v}</a> : <address className="mt-3 font-display text-2xl not-italic">{it.v}</address>}
          </div>
        ))}
        <div className="md:col-span-3 flex flex-wrap gap-3">
          <a href={whatsappLink(lang)} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}><WhatsAppIcon /> {tr ? "WhatsApp ile yazın" : "Message on WhatsApp"}</a>
          <L href={PAGES.reservation[lang]} className={btn.primary}>{tr ? "Rezervasyon talep formu" : "Booking request form"}</L>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.contact.address)}`} target="_blank" rel="noopener noreferrer" className={btn.outline}>{tr ? "Haritada aç" : "Open in Maps"}</a>
        </div>
      </section>
    </>
  );
}
