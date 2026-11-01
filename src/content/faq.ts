import type { Lang } from "@/config/site";

export type Faq = { q: string; a: string };

export const FAQS: Record<Lang, Faq[]> = {
  tr: [
    { q: "Pamukkale balon turu fiyatları ne kadar?", a: "Fiyatlar tarih, sezon, sepet tipi ve dahil olan hizmetlere göre değişir. 2026 fiyatlarımız henüz sitede doğrulanmış olarak yayınlanmadı; güncel teklif için [fiyatlar sayfasına](/fiyatlar/) bakabilir veya bize ulaşabilirsiniz." },
    { q: "Nasıl rezervasyon yapabilirim?", a: "[Rezervasyon talep formunu](/rezervasyon/) doldurabilir, bizi arayabilir veya e-posta gönderebilirsiniz. Rezervasyonunuz yalnızca yazılı teyit aldığınızda kesinleşir." },
    { q: "Tur sabah kaçta başlıyor?", a: "Uçuşlar gün doğumuna göre planlanır; bu nedenle alış saati mevsime ve güne göre değişir. Kesin saat genellikle bir gün önceden bildirilir." },
    { q: "Uçuş kaç dakika sürer?", a: "Havada geçen süre rüzgâr koşulları ve pakete göre değişebilir. Doğrulanmış uçuş süresini henüz yayınlamıyoruz; rezervasyon sırasında teyit etmenizi öneririz." },
    { q: "Ne giymeliyim?", a: "Sabahlar serin olabilir. Kat kat giyinmenizi ve kapalı, kaymaz ayakkabı seçmenizi öneririz. Ayrıntılar [kıyafet rehberimizde](/kesfet/pamukkale-balon-turunda-ne-giyilir/)." },
    { q: "Hava kötü olursa ne olur?", a: "Rüzgâr, yağış veya düşük görüş nedeniyle uçuş iptal edilebilir. Böyle bir durumda uygulanacak seçenekleri (erteleme veya iade) rezervasyon öncesinde yazılı olarak sormanızı öneririz." },
    { q: "İade ve tarih değişikliği mümkün mü?", a: "İptal ve iade koşullarımız henüz sitede yayınlanmamıştır. Rezervasyon talebinizde bu koşulları sorabilirsiniz." },
    { q: "Balon turu güvenli mi?", a: "Hiçbir hava aktivitesi için risk yok demek doğru olmaz. İzinler, sigorta ve pilot bilgileri hakkında soru sormanızı ve uçuş öncesi bilgilendirmeye uymanızı öneririz. Sağlık durumunuzu önceden paylaşın." },
    { q: "Fiyata neler dahil?", a: "Transfer, ikram, sertifika gibi hizmetlerin dahil olup olmadığı henüz kesinleşmiş olarak yayınlanmadı. Teklif alırken bu kalemleri mutlaka sorun." },
    { q: "En iyi ziyaret dönemi hangisi?", a: "Her mevsimin kendine özgü avantajları vardır. İlkbahar ve sonbahar dengeli seçenekler olabilir; kışın iptal ihtimali artabilir. [Mevsim rehberine](/kesfet/pamukkale-balon-turu-icin-en-iyi-zaman/) göz atın." },
    { q: "Çocuklar katılabilir mi?", a: "Yaş ve boy kuralları henüz doğrulanmış olarak yayınlanmadı. Çocuklarla katılmayı planlıyorsanız rezervasyon öncesinde mutlaka sorun." },
    { q: "Pamukkale ile Kapadokya arasındaki fark nedir?", a: "Kapadokya peri bacaları ve vadileriyle, Pamukkale ise beyaz travertenleri ve Hierapolis antik kentiyle öne çıkar. [Karşılaştırma yazımızı](/kesfet/pamukkale-mi-kapadokya-mi-balon-turu/) okuyabilirsiniz." },
  ],
  en: [
    { q: "How much does a Pamukkale balloon ride cost?", a: "Prices depend on the date, season, basket type and inclusions. Verified 2026 prices aren't published on the site yet — see our [prices page](/en/prices/) or contact us for a quote." },
    { q: "How do I book?", a: "Fill in the [reservation request form](/en/reservation/), call or email us. Your booking is only confirmed once you receive written confirmation." },
    { q: "What time does the tour start?", a: "Flights are planned around sunrise, so pick-up times vary by season and day. The exact time is usually shared the day before." },
    { q: "How long is the flight?", a: "Time in the air depends on the wind and the package. We haven't published a verified duration yet, so please confirm it when booking." },
    { q: "What should I wear?", a: "Mornings can be chilly. Wear layers and closed, non-slip shoes. More in our [clothing guide](/en/insights/what-to-wear-for-a-pamukkale-hot-air-balloon-ride/)." },
    { q: "What if the weather is bad?", a: "Flights may be cancelled due to wind, rain or poor visibility. Ask in writing before booking what happens in that case — a new date or a refund." },
    { q: "Can I get a refund or reschedule?", a: "Our cancellation and refund terms are not yet published on the site. You can ask about them in your booking request." },
    { q: "Is it safe?", a: "No air activity is risk-free. We encourage you to ask about permits, insurance and pilots, follow the pre-flight briefing, and share any health concerns in advance." },
    { q: "What's included?", a: "Whether transfers, refreshments or certificates are included hasn't been published as final yet. Be sure to ask about each item when you request a quote." },
    { q: "When is the best season to visit?", a: "Every season has its strengths. Spring and autumn can be well balanced; winter may see more cancellations. Read our [seasonal guide](/en/insights/best-time-for-a-pamukkale-balloon-ride/)." },
    { q: "Can children join?", a: "Age and height rules haven't been published as verified yet. If you're travelling with children, please ask before booking." },
    { q: "How does Pamukkale compare with Cappadocia?", a: "Cappadocia is known for fairy chimneys and valleys; Pamukkale for white travertines and ancient Hierapolis. See our [comparison](/en/insights/pamukkale-vs-cappadocia-balloon-experience/)." },
  ],
};
