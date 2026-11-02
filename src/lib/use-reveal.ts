import { useLayoutEffect } from "react";

/**
 * Progressive-enhancement scroll reveal.
 * Server HTML shows every `.reveal` element. On the client we first mark elements that are already
 * in (or above) the viewport as revealed, then add `html.reveal-ready`, so nothing visible ever flashes.
 * Below-the-fold elements fade in once when they intersect. No IntersectionObserver → nothing is hidden.
 */
export function useReveal(key: string) {
  useLayoutEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));
    const vh = window.innerHeight;
    for (const el of els) if (el.getBoundingClientRect().top < vh * 0.98) el.classList.add("is-in");
    document.documentElement.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => !el.classList.contains("is-in") && io.observe(el));
    const reveal = () => els.forEach((el) => el.classList.add("is-in"));
    window.addEventListener("beforeprint", reveal);
    return () => {
      io.disconnect();
      window.removeEventListener("beforeprint", reveal);
    };
  }, [key]);
}
