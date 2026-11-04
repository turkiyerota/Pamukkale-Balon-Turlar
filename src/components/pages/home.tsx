import type { Lang } from "@/config/site";
import { PACKAGES, INCLUSIONS, whatsappLink, WA_CONTEXT } from "@/config/site";
import { PAGES, articlePath } from "@/lib/paths";
import { getArticles } from "@/content/articles";
import { FAQS } from "@/content/faq";
import { HeroSlider } from "../hero-slider";
import { ArticleCard, CtaBand, FaqList, TrustStrip, PackageCard, Gallery } from "../blocks";
import { L, btn, Arrow, SectionHeading, WhatsAppIcon } from "../ui-kit";
import imgInflation from "@/assets/img-inflation.webp";
import imgHierapolis from "@/assets/img-hierapolis.webp";
import hero3 from "@/assets/hero-3.webp";
import { rs } from "@/lib/img";

const C = {
  tr: {
    introEy: "Deneyim",
    introH: "Travertenlerin üzerinde sessiz bir yolculuk",
    introP: [
      "Pamukkale'nin bembeyaz traverten terasları, gün doğumunun sıcak ışığında bambaşka bir görünüme bürünür. Balon turu, bu eşsiz manzarayı yukarıdan, sakin ve yavaş bir yolculukla izlemenin en güzel yoludur.",
      "Tarihinizi ve kişi sayınızı iletmeniz yeterli. Size özel teklifimizde uçuş saati, dahil olan hizmetler ve koşullar yazılı olarak yer alır.",
    ],
    essH: "Bir bakışta",
    ess: [
      ["Konum", "Pamukkale / Denizli"],
      ["Uçuş zamanı", "Gün doğumu; havada 45–60 dakika"],
      ["Manzara", "Travertenler, termal havuzlar ve Hierapolis"],
      ["Fiyat", "6.666 TL'den başlayan fiyatlarla"],
      ["İletişim", "WhatsApp, telefon, e-posta veya form"],
    ],
    essCta: "Fiyatı WhatsApp'tan sorun",
    priceEy: "Paketler",
    priceH: "Size uygun uçuşu seçin",
    priceNote:
      "Fiyatlarımız 6.666 TL'den başlar. Kesin fiyat tarihe, sezona ve kişi sayısına göre değiştiği için size özel fiyatı yazılı olarak iletiyoruz. Tarihinizi WhatsApp'tan yazın, hızlıca dönüş yapalım.",
    allPrices: "Fiyatlar ve paket ayrıntıları",
    incEy: "Şeffaf teklif",
    incH: "Teklifinizde her şey açıkça yazılı",
    incP: "Sürprizlere yer yok. Size gönderdiğimiz teklifte aşağıdaki başlıkların her birinin fiyata dahil olup olmadığı açıkça yazar:",
    incCta: "Teklif isteyin",
    stepsEy: "Nasıl çalışır?",
    stepsH: "Dört adımda gökyüzündesiniz",
    steps: [
      [
        "Talebinizi iletin",
        "Tarihinizi ve kişi sayınızı WhatsApp, telefon veya form ile paylaşın.",
      ],
      ["Teklifinizi alın", "Fiyat, dahil olan hizmetler ve koşullar size yazılı olarak iletilir."],
      [
        "Rezervasyonu kesinleştirin",
        "Onayınızın ardından rezervasyonunuz yazılı teyitle kesinleşir.",
      ],
      [
        "Uçuş sabahı",
        "Buluşma saati bir gün önce bildirilir; hava uygunsa gün doğumunda havalanırsınız.",
      ],
    ],
    stepsCta: "Hemen Rezervasyon Yap",
    guidesEy: "En çok sorulanlar",
    guidesH: "Yola çıkmadan önce kısa yanıtlar",
    faqEy: "Sık sorulan sorular",
    faqH: "Pamukkale balon turu hakkında merak edilenler",
    faqAll: "Tüm sorular",
    flightAll: "Uçuş bilgileri",
    destEy: "Destinasyon",
    destH: "Pamukkale ve Hierapolis",
    destP:
      "1988'den beri UNESCO Dünya Mirası Listesi'nde yer alan Pamukkale–Hierapolis, kalsiyum karbonatlı termal suların binlerce yılda oluşturduğu bembeyaz travertenleri ve hemen üzerindeki antik kentiyle tanınır. Antik tiyatro, Antik Havuz (Kleopatra Havuzu) ve nekropol, balon turundan sonra keşfedebileceğiniz yerler arasındadır.",
    destFacts: [
      ["1988", "UNESCO Dünya Mirası"],
      ["Gün doğumu", "Travertenlerde en etkileyici ışık"],
      ["Sabah", "Ören yerini sakin gezmek için ideal"],
    ],
    whyEy: "Neden balon?",
    whyH: "Pamukkale'yi yukarıdan görmenin farkı",
    why: [
      [
        "Bütünsel bakış",
        "Terasların, havuzların ve antik kentin birbiriyle ilişkisini yalnızca yukarıdan bu kadar net görebilirsiniz.",
      ],
      [
        "Gün doğumu ışığı",
        "Sabahın ilk ışığı travertenleri pembe ve altın tonlarına boyar; fotoğraflarınız için en güzel saat.",
      ],
      [
        "Sakin bir ritim",
        "Balon rüzgârla süzülür; deneyim hızlı değil, dingindir. Gürültüsüz bir sabahın tadını çıkarın.",
      ],
    ],
    blogEy: "Keşfet",
    blogH: "Pamukkale balon turu rehberleri",
    blogAll: "Tüm rehberler",
  },
  en: {
    introEy: "The experience",
    introH: "A quiet journey above the travertines",
    introP: [
      "Pamukkale's brilliant white travertine terraces take on a completely different look in the warm light of sunrise. A balloon ride is the most beautiful way to take in this unique landscape — slowly, calmly, from above.",
      "Just send us your date and group size. Your personal quote sets out the flight time, what's included and the terms in writing.",
    ],
    essH: "At a glance",
    ess: [
      ["Location", "Pamukkale / Denizli, Türkiye"],
      ["Flight time", "Sunrise; 45–60 minutes aloft"],
      ["Views", "Travertines, thermal pools and Hierapolis"],
      ["Price", "From 6,666 TL"],
      ["Contact", "WhatsApp, phone, email or form"],
    ],
    essCta: "Ask for a price on WhatsApp",
    priceEy: "Packages",
    priceH: "Choose your flight",
    priceNote:
      "Prices start from 6,666 TL. The exact price depends on the date, season and group size, so we confirm it in writing. Message us your date on WhatsApp and we'll get back to you.",
    allPrices: "Prices and package details",
    incEy: "A clear quote",
    incH: "Everything spelled out in writing",
    incP: "No surprises. Your quote states clearly whether each of these is included:",
    incCta: "Request a quote",
    stepsEy: "How it works",
    stepsH: "Four steps to the sky",
    steps: [
      ["Send your request", "Share your date and group size by WhatsApp, phone or the form."],
      ["Get your quote", "We send the price, inclusions and terms in writing."],
      ["Confirm your booking", "Once you accept, your booking is confirmed in writing."],
      [
        "Flight morning",
        "The meeting time is shared the day before; if the weather allows, you lift off at sunrise.",
      ],
    ],
    stepsCta: "Book Your Flight",
    guidesEy: "Most asked",
    guidesH: "Quick answers before you fly",
    faqEy: "FAQ",
    faqH: "Pamukkale hot air balloon questions",
    faqAll: "All questions",
    flightAll: "Flight information",
    destEy: "Destination",
    destH: "Pamukkale and Hierapolis",
    destP:
      "On the UNESCO World Heritage List since 1988, Pamukkale–Hierapolis is known for white travertines formed over millennia by calcium-rich thermal waters, and for the ancient city just above them. The theatre, the Antique Pool (Cleopatra's Pool) and the necropolis are all worth exploring after your flight.",
    destFacts: [
      ["1988", "UNESCO World Heritage"],
      ["Sunrise", "The travertines' finest light"],
      ["Morning", "Ideal for a quiet visit to the site"],
    ],
    whyEy: "Why a balloon?",
    whyH: "Seeing Pamukkale from above",
    why: [
      [
        "The bigger picture",
        "Only from above can you see how the terraces, pools and ancient city fit together.",
      ],
      [
        "Sunrise light",
        "The first light of day paints the travertines pink and gold — the best hour for photos.",
      ],
      ["A calm pace", "A balloon drifts with the wind; the experience is serene, never rushed."],
    ],
    blogEy: "Travel guide",
    blogH: "Pamukkale balloon ride guides",
    blogAll: "All guides",
  },
};

const GUIDES: Record<Lang, [string, string][]> = {
  tr: [
    ["Balon turu saat kaçta başlıyor?", "pamukkale-balon-turu-sabah-kacta-basliyor"],
    ["Uçuş kaç dakika sürer?", "pamukkale-balon-turu-kac-dakika-surer"],
    ["Fiyat neye göre değişir?", "pamukkale-balon-turu-fiyatlari-2026"],
    ["Balon turunda ne giyilir?", "pamukkale-balon-turunda-ne-giyilir"],
    ["Hava kötü olursa ne olur?", "pamukkale-balon-turu-iptal-edilirse-ne-olur"],
    ["Pamukkale mi, Kapadokya mı?", "pamukkale-mi-kapadokya-mi-balon-turu"],
  ],
  en: [
    ["What time does it start?", "what-time-do-pamukkale-balloon-tours-start"],
    ["How long is the flight?", "how-long-does-a-pamukkale-balloon-ride-last"],
    ["What affects the price?", "pamukkale-hot-air-balloon-prices-2026"],
    ["What should I wear?", "what-to-wear-for-a-pamukkale-hot-air-balloon-ride"],
    ["What if the weather is bad?", "what-happens-if-a-pamukkale-balloon-tour-is-cancelled"],
    ["Pamukkale or Cappadocia?", "pamukkale-vs-cappadocia-balloon-experience"],
  ],
};

export function HomePage({ lang }: { lang: Lang }) {
  const t = C[lang];
  const latest = getArticles(lang).slice(0, 3);
  return (
    <>
      <HeroSlider lang={lang} />
      <TrustStrip lang={lang} />

      {/* Intro + at a glance */}
      <section
        id="ana-icerik"
        className="container-page grid items-start gap-10 py-7 md:grid-cols-[1.15fr_1fr] md:py-11"
      >
        <div className="reveal">
          <SectionHeading eyebrow={t.introEy} title={t.introH} />
          {t.introP.map((p, i) => (
            <p key={i} className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
        <div className="card-lux reveal p-8 md:p-10">
          <h2 className="text-3xl md:text-4xl">{t.essH}</h2>
          <dl className="mt-6 divide-y divide-navy/10">
            {t.ess.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5">
                <dt className="text-sm font-semibold uppercase tracking-wider text-bronze">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <a
            href={whatsappLink(lang, WA_CONTEXT["prices"]?.[lang])}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn.whatsapp} mt-7 w-full`}
          >
            <WhatsAppIcon className="h-5 w-5" /> {t.essCta}
          </a>
        </div>
      </section>

      {/* Packages */}
      <section className="relative overflow-hidden bg-secondary py-7 md:py-11">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t.priceEy} title={t.priceH} intro={t.priceNote} />
            <L href={PAGES.prices[lang]} className={btn.outline}>
              {t.allPrices} <Arrow />
            </L>
          </div>
          <div className="mt-7 grid gap-8 md:grid-cols-2">
            {PACKAGES.map((p, i) => (
              <PackageCard key={p.id} p={p} lang={lang} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Clear quote */}
      <section className="container-page grid items-center gap-10 py-7 md:grid-cols-2 md:py-11">
        <div className="relative reveal">
          <img
            src={imgInflation}
            {...rs(imgInflation, "(min-width: 768px) 50vw, 100vw")}
            alt={
              lang === "tr"
                ? "Şafak öncesi brülör alevi ile şişirilen sıcak hava balonu"
                : "A hot air balloon being inflated with the burner before dawn"
            }
            width={1280}
            height={864}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full rounded-[1.5rem] object-cover shadow-lift md:aspect-[4/4.4]"
          />
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-navy-deep px-6 py-5 text-on-dark shadow-lift sm:block">
            <p className="font-display text-3xl text-gold-gradient">
              {lang === "tr" ? "Yazılı teyit" : "Written confirmation"}
            </p>
            <p className="mt-1 text-sm text-on-dark-muted">
              {lang === "tr" ? "Her rezervasyonda" : "With every booking"}
            </p>
          </div>
        </div>
        <div className="reveal">
          <SectionHeading eyebrow={t.incEy} title={t.incH} />
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t.incP}</p>
          <ul className="mt-7 grid gap-3">
            {INCLUSIONS.quoteItems.map((x, i) => (
              <li
                key={i}
                className="flex items-center gap-4 rounded-xl border border-navy/10 bg-card px-5 py-4 font-medium"
              >
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold-gradient text-navy-deep"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                {x[lang]}
              </li>
            ))}
            {INCLUSIONS.notIncluded.map((x, i) => (
              <li
                key={`n${i}`}
                className="flex items-center gap-4 rounded-xl border border-navy/20 bg-secondary px-5 py-4 font-semibold text-navy"
              >
                <span
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy/25 bg-card text-navy"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </span>
                {x[lang]}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">{INCLUSIONS.transferNote[lang]}</p>
          <L href={PAGES.reservation[lang]} className={`${btn.primary} mt-8`}>
            {t.incCta} <Arrow />
          </L>
        </div>
      </section>

      {/* Steps */}
      <section className="grain relative overflow-hidden bg-navy-deep py-7 text-on-dark md:py-11">
        <div
          className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(225,182,115,0.18),transparent)]"
          aria-hidden="true"
        />
        <div className="container-page relative">
          <SectionHeading eyebrow={t.stepsEy} title={t.stepsH} dark />
          <ol className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {t.steps.map(([h, p], i) => (
              <li
                key={i}
                className="reveal rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-gold/40 hover:bg-white/[0.07]"
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
              >
                <span className="font-display text-6xl font-semibold leading-none text-gold-gradient">
                  0{i + 1}
                </span>
                <h3 className="mt-5 text-[1.7rem]">{h}</h3>
                <p className="mt-3 leading-relaxed text-on-dark/80">{p}</p>
              </li>
            ))}
          </ol>
          <div className="mt-7 flex flex-wrap gap-3">
            <L href={PAGES.reservation[lang]} className={`${btn.gold} btn-lg`}>
              {t.stepsCta} <Arrow />
            </L>
            <a
              href={whatsappLink(lang, WA_CONTEXT["reservation"]?.[lang])}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn.glass} btn-lg`}
            >
              <WhatsAppIcon className="h-5 w-5 text-[#25d366]" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Quick answers (internal links to guides) */}
      <section className="container-page py-7 md:py-11">
        <SectionHeading eyebrow={t.guidesEy} title={t.guidesH} />
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES[lang].map(([q, slug], i) => (
            <li
              key={slug}
              className="reveal"
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}
            >
              <L
                href={articlePath(lang, slug)}
                className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-navy/10 bg-card px-6 py-5 font-display text-2xl font-semibold transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lift"
              >
                {q}
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/50 text-bronze transition-colors group-hover:bg-gold-gradient group-hover:text-navy-deep">
                  <Arrow />
                </span>
              </L>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-7 md:py-11">
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading eyebrow={t.faqEy} title={t.faqH} />
            <div className="mt-8 flex flex-wrap gap-3">
              <L href={PAGES.faq[lang]} className={btn.primary}>
                {t.faqAll} <Arrow />
              </L>
              <L href={PAGES.flight[lang]} className={btn.outline}>
                {t.flightAll}
              </L>
            </div>
          </div>
          <FaqList items={FAQS[lang].slice(0, 6)} />
        </div>
      </section>

      {/* Destination */}
      <section className="grain relative isolate overflow-hidden bg-navy-deep text-on-dark">
        <img
          src={imgHierapolis}
          {...rs(imgHierapolis, "100vw")}
          alt={
            lang === "tr"
              ? "Gün doğumunda Hierapolis antik tiyatrosu"
              : "The ancient theatre of Hierapolis at sunrise"
          }
          width={1280}
          height={864}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,27,41,0.92)_0%,rgba(10,27,41,0.65)_55%,rgba(10,27,41,0.3)_100%)]" />
        <div className="container-page py-10 md:py-14">
          <div className="max-w-2xl reveal">
            <p className="eyebrow !text-champagne">{t.destEy}</p>
            <h2 className="mt-4 text-[2.5rem] md:text-6xl">{t.destH}</h2>
            <p className="mt-6 text-lg leading-relaxed text-on-dark/85">{t.destP}</p>
          </div>
          <dl className="mt-7 grid max-w-3xl gap-6 sm:grid-cols-3">
            {t.destFacts.map(([k, v]) => (
              <div key={k} className="border-l border-gold/50 pl-5">
                <dt className="font-display text-4xl font-semibold text-gold-gradient">{k}</dt>
                <dd className="mt-1 text-sm text-on-dark/80">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Gallery lang={lang} />

      {/* Why */}
      <section className="container-page grid items-center gap-10 py-7 md:grid-cols-[1fr_1.1fr] md:py-11">
        <div className="reveal">
          <SectionHeading eyebrow={t.whyEy} title={t.whyH} />
          <img
            src={hero3}
            {...rs(hero3, "(min-width: 768px) 50vw, 100vw")}
            alt={
              lang === "tr"
                ? "Havadan Pamukkale traverten havuzları"
                : "Pamukkale's travertine pools from above"
            }
            width={1600}
            height={907}
            loading="lazy"
            decoding="async"
            className="mt-7 aspect-[4/3] w-full rounded-[1.5rem] object-cover shadow-lift"
          />
        </div>
        <ul className="flex flex-col gap-6">
          {t.why.map(([h, p], i) => (
            <li
              key={h}
              className="card-lux reveal p-6 md:p-8"
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <div className="flex items-start gap-5">
                <span className="font-display text-4xl text-bronze">0{i + 1}</span>
                <div>
                  <h3 className="text-3xl">{h}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{p}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Blog */}
      <section className="bg-secondary py-7 md:py-11">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow={t.blogEy} title={t.blogH} />
            <L href={PAGES.blog[lang]} className={btn.outline}>
              {t.blogAll} <Arrow />
            </L>
          </div>
          <div className="mt-7 grid gap-8 md:grid-cols-3">
            {latest.map((a) => (
              <ArticleCard key={a.id} a={a} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand lang={lang} />
    </>
  );
}
