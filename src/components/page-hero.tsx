import type { ReactNode } from "react";
import { Breadcrumbs } from "./ui-kit";
import { rs } from "@/lib/img";

export function PageHero({
  image,
  alt = "",
  eyebrow,
  title,
  intro,
  crumbs,
  position = "50% 50%",
  children,
}: {
  image: string;
  /** Describe the photo (and the page topic) when it is meaningful; empty = decorative. */
  alt?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: { name: string; path?: string | undefined }[];
  position?: string;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-navy-deep text-white">
      <img
        src={image}
        {...rs(image, "100vw")}
        alt={alt}
        width={1600}
        height={900}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        style={{ objectPosition: position }}
        className="animate-kenburns absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,27,41,0.88)_0%,rgba(10,27,41,0.62)_45%,rgba(10,27,41,0.25)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[linear-gradient(180deg,transparent,rgba(10,27,41,0.6))]" />
      <div className="container-page py-9 md:py-12 lg:py-14">
        <Breadcrumbs items={crumbs} />
        {eyebrow && <p className="eyebrow mt-7 !text-champagne">{eyebrow}</p>}
        <h1 className="text-shadow-hero mt-4 max-w-4xl text-[2.5rem] leading-[1.06] md:text-[4rem]">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/88 md:text-xl">{intro}</p>
        )}
        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
