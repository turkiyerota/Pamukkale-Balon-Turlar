import { Breadcrumbs } from "./ui-kit";

export function PageHero({ image, eyebrow, title, intro, crumbs }: { image: string; eyebrow?: string; title: string; intro?: string; crumbs: { name: string; path?: string | undefined }[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy text-on-dark">
      <img src={image} alt="" width={1600} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60" fetchPriority="high" />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />
      <div className="container-page py-20 md:py-28">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mt-8">{eyebrow}</p>}
        <h1 className="mt-3 max-w-3xl text-5xl md:text-6xl animate-rise">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-on-dark-muted animate-rise">{intro}</p>}
      </div>
    </section>
  );
}
