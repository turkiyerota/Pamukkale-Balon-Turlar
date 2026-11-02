import type { Lang } from "@/config/site";

export type Faq = { q: string; a: string };

/**
 * Questions mirror how people actually search (Google autocomplete, TR + EN — see docs/keyword-research-tr-en.md).
 * Operator-specific facts (price, duration of *our* package, policies) are never invented: answers say they are
 * given in writing with the quote. General facts are attributed ("bölgedeki işletmelerin yayımladığı bilgilere göre").
 * Index order matters: home shows 0–5, the prices page shows PRICE_FAQ_IDX.
 */
export const PRICE_FAQ_IDX = [0, 8, 6, 4];

export const FAQS: Record<Lang, Faq[]> = {
  tr: [
    {
      q: "Pamukkale balon turu fiyatları ne kadar, kaç TL?",
      a: "Fiyat; tarih, sezon, kişi sayısı, sepet tipi (paylaşımlı veya özel) ve pakete dahil hizmetlere göre değişir. Bu yüzden sabit bir liste yerine tarihinize özel yazılı fiyat veriyoruz. En hızlı yol, tarihinizi ve kişi sayınızı [WhatsApp'tan](/iletisim/) yazmanız. Ayrıntılar için [fiyatlar sayfasına](/fiyatlar/) göz atın.",
    },
    {
      q: "Pamukkale balon turu saat kaçta başlıyor?",
      a: "Uçuşlar gün doğumuna göre planlanır; bu yüzden saat mevsime göre değişir. Yazın çok erken, kışın daha geç saatlerde buluşulur. Kesin alış saatini uçuştan bir gün önce bildiririz. Ayrıntılar: [balon turu sabah kaçta başlıyor?](/kesfet/pamukkale-balon-turu-sabah-kacta-basliyor/)",
    },
    {
      q: "Balon uçuşu kaç dakika sürer?",
      a: "Bölgedeki işletmelerin yayımladığı bilgilere göre havada geçen süre genellikle 45 dakika ile 1 saat arasındadır; transfer, hazırlık ve iniş sonrasıyla birlikte sabah programı birkaç saat sürer. Paketinizin uçuş süresini teklifinizde yazılı olarak belirtiriz. [Uçuş süresi rehberi](/kesfet/pamukkale-balon-turu-kac-dakika-surer/)",
    },
    {
      q: "Pamukkale balon turu nereden kalkıyor?",
      a: "Balonlar Pamukkale çevresindeki açık kalkış alanlarından havalanır. Kalkış noktası her sabah rüzgârın yönüne göre belirlenir; bu nedenle buluşma noktasını ve saati rezervasyonunuzda size ayrıca bildiririz.",
    },
    {
      q: "Nasıl rezervasyon yapabilirim?",
      a: "[Rezervasyon formunu](/rezervasyon/) doldurabilir, bize WhatsApp'tan yazabilir, arayabilir veya e-posta gönderebilirsiniz. Rezervasyonunuz, size yazılı teyit gönderdiğimizde kesinleşir.",
    },
    {
      q: "Pamukkale'de balon uçuşları her gün yapılıyor mu?",
      a: "Uçuşlar yıl boyunca yapılabilir; ancak her sabahın uçuş kararı o günkü rüzgâr, yağış ve görüş koşullarına göre verilir. Türkiye'de sıcak hava balonu uçuşları Sivil Havacılık Genel Müdürlüğü (SHGM) kurallarına tabidir ve koşullar uygun değilse uçuşa izin verilmez. Bu karar tamamen güvenlik içindir.",
    },
    {
      q: "İptal, iade ve tarih değişikliği mümkün mü?",
      a: "İptal, iade ve tarih değişikliği koşullarını rezervasyon öncesinde size yazılı olarak iletiriz; onaylamadan önce inceleyebilirsiniz. Genel bilgi için: [tur iptal edilirse ne olur?](/kesfet/pamukkale-balon-turu-iptal-edilirse-ne-olur/)",
    },
    {
      q: "Hava kötü olursa ne olur?",
      a: "Rüzgâr, yağış veya düşük görüş nedeniyle uçuş son anda iptal edilebilir. Böyle bir durumda size sunulan seçenekler (başka bir sabaha erteleme veya iade) teklifinizde yazılı olarak yer alır. Konaklamanızın ilk sabahını seçmeniz, gerekirse ertesi güne kaydırma şansı verir.",
    },
    {
      q: "Fiyata neler dahil?",
      a: "Otel transferi, ikram, uçuş sertifikası ve sigorta gibi kalemler pakete göre değişebilir. Teklifinizde fiyata nelerin dahil olduğunu tek tek yazıyoruz. [Kontrol listesi](/kesfet/pamukkale-balon-turunda-fiyata-neler-dahil/)",
    },
    {
      q: "Balon turunda ne giymeliyim?",
      a: "Sabahlar serin olabilir. Kat kat giyinmenizi, rahat pantolon ve kapalı, kaymaz ayakkabı tercih etmenizi öneririz. Ayrıntılar [kıyafet rehberimizde](/kesfet/pamukkale-balon-turunda-ne-giyilir/).",
    },
    {
      q: "Pamukkale balon turu güvenli mi?",
      a: "Hiçbir hava aktivitesi için risk sıfırdır demek doğru olmaz. Uçuşlar SHGM kurallarına tabidir ve hava uygun değilse yapılmaz. Pilotun bilgilendirmesine uymanız ve sağlık durumunuzu önceden bize bildirmeniz önemlidir. [Güvenlik rehberi](/kesfet/pamukkale-balon-turu-guvenli-mi/)",
    },
    {
      q: "Çocuklar balon turuna katılabilir mi?",
      a: "Yaş ve boy kuralları sepet tipine ve operatöre göre değişir. Çocuğunuzun yaşını ve boyunu bize iletin; katılıp katılamayacağını rezervasyon öncesinde bildirelim. [Aile rehberi](/kesfet/pamukkale-balon-turuna-cocuklar-katilabilir-mi/)",
    },
    {
      q: "Balon turu için en iyi dönem hangisi?",
      a: "Her mevsimin kendine özgü güzelliği vardır. İlkbahar ve sonbahar dengeli seçeneklerdir; kışın hava nedeniyle iptal ihtimali artabilir. [Mevsim rehberine](/kesfet/pamukkale-balon-turu-icin-en-iyi-zaman/) göz atın.",
    },
    {
      q: "Pamukkale mi, Kapadokya mı?",
      a: "Kapadokya peri bacaları ve vadileriyle, Pamukkale ise bembeyaz travertenleri ve Hierapolis antik kentiyle öne çıkar. Pamukkale'de gökyüzü genellikle daha sakindir. [Karşılaştırma yazımızı](/kesfet/pamukkale-mi-kapadokya-mi-balon-turu/) okuyabilirsiniz.",
    },
    {
      q: "Pamukkale balon turuna değer mi?",
      a: "Travertenleri, termal havuzları ve Hierapolis'i aynı anda, gün doğumunun ışığında yukarıdan görmek yalnızca balonla mümkün olur. Pek çok gezgin için yolculuğun en unutulmaz anlarından biridir. Karar vermeden önce [bilmeniz gerekenlere](/kesfet/pamukkale-balon-turu-oncesi-bilmeniz-gerekenler/) göz atın.",
    },
    {
      q: "Balon turundan sonra ne yapabilirim?",
      a: "Tur sabah erken bittiği için günün büyük kısmı size kalır. Kahvaltının ardından travertenleri, Hierapolis antik kentini, antik tiyatroyu ve Antik Havuz'u gezebilirsiniz. Sabah saatlerinde ören yeri genellikle daha sakindir.",
    },
  ],
  en: [
    {
      q: "How much does a Pamukkale hot air balloon ride cost?",
      a: "The price depends on the date, season, group size, basket type (shared or private) and what's included. That's why we give you a written price for your date rather than a fixed list. The quickest way is to send your date and group size [on WhatsApp](/en/contact/). More on our [prices page](/en/prices/).",
    },
    {
      q: "What time does the Pamukkale balloon ride start?",
      a: "Flights are planned around sunrise, so the time changes with the season — very early in summer, later in winter. We share the exact pick-up time the day before. Details: [what time do tours start?](/en/insights/what-time-do-pamukkale-balloon-tours-start/)",
    },
    {
      q: "How long is the balloon flight?",
      a: "According to information published by operators in the area, time in the air is usually 45 minutes to an hour; with transfers, preparation and landing the whole morning takes a few hours. We state your package's flight time in writing in your quote. [Flight duration guide](/en/insights/how-long-does-a-pamukkale-balloon-ride-last/)",
    },
    {
      q: "Where do Pamukkale balloons take off from?",
      a: "Balloons launch from open take-off fields around Pamukkale. The exact launch site is chosen each morning according to the wind, so we send you the meeting point and time with your booking.",
    },
    {
      q: "How do I book?",
      a: "Fill in the [booking form](/en/reservation/), message us on WhatsApp, call or email. Your booking is confirmed once we send you written confirmation.",
    },
    {
      q: "Do balloons fly in Pamukkale every day?",
      a: "Flights can run all year, but each morning's go/no-go decision depends on that day's wind, rain and visibility. Hot air balloon flights in Türkiye are regulated by the Directorate General of Civil Aviation (SHGM), and flights are not allowed when conditions are unsuitable. The decision is purely about safety.",
    },
    {
      q: "Can I cancel, get a refund or change my date?",
      a: "We send you our cancellation, refund and date-change terms in writing before you book, so you can review them first. General guidance: [what happens if a flight is cancelled?](/en/insights/what-happens-if-a-pamukkale-balloon-tour-is-cancelled/)",
    },
    {
      q: "What if the weather is bad?",
      a: "Wind, rain or poor visibility can cancel a flight at the last minute. The options in that case — moving to another morning or a refund — are written into your quote. Booking your first morning in the area leaves room to move to the next day if needed.",
    },
    {
      q: "What's included in the price?",
      a: "Hotel transfers, refreshments, a flight certificate and insurance can vary by package. Your quote lists exactly what's included. [Inclusions checklist](/en/insights/what-is-included-in-a-pamukkale-balloon-tour/)",
    },
    {
      q: "What should I wear?",
      a: "Mornings can be chilly. Wear layers, comfortable trousers and closed, non-slip shoes. More in our [clothing guide](/en/insights/what-to-wear-for-a-pamukkale-hot-air-balloon-ride/).",
    },
    {
      q: "Is a Pamukkale balloon ride safe?",
      a: "No air activity is completely risk-free. Flights are regulated by SHGM and don't go ahead if the weather is unsuitable. Follow the pilot's briefing and tell us about any health concerns in advance. [Safety guide](/en/insights/are-pamukkale-hot-air-balloon-rides-safe/)",
    },
    {
      q: "Can children join?",
      a: "Age and height rules vary by basket type and operator. Tell us your child's age and height and we'll confirm before you book. [Family guide](/en/insights/can-children-join-a-pamukkale-balloon-tour/)",
    },
    {
      q: "When is the best time of year?",
      a: "Every season has its own beauty. Spring and autumn are well balanced; winter can bring more weather cancellations. Read our [seasonal guide](/en/insights/best-time-for-a-pamukkale-balloon-ride/).",
    },
    {
      q: "Pamukkale or Cappadocia?",
      a: "Cappadocia is known for fairy chimneys and valleys; Pamukkale for white travertines and ancient Hierapolis, usually with a quieter sky. See our [comparison](/en/insights/pamukkale-vs-cappadocia-balloon-experience/).",
    },
    {
      q: "Is the Pamukkale hot air balloon worth it?",
      a: "Seeing the travertines, thermal pools and Hierapolis together, in sunrise light, is only possible from a balloon — for many travellers it's a highlight of the trip. Read [what to know before you fly](/en/insights/what-to-know-before-your-pamukkale-balloon-ride/) first.",
    },
    {
      q: "What can I do after the flight?",
      a: "The tour ends early, so most of the day is yours. After breakfast you can walk the travertines and explore Hierapolis, its theatre and the Antique Pool — mornings are usually quieter at the site.",
    },
  ],
};
