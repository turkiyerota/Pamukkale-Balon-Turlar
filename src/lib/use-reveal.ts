import { useLayoutEffect } from "react";

/**
 * Progressive-enhancement scroll reveal.
 *
 * Server HTML shows every `.reveal` element. On the client, elements already in (or above) the
 * viewport are marked revealed first, then `html.reveal-ready` is added, so nothing visible ever
 * flashes. Below-the-fold elements fade in once when they intersect.
 *
 * Runs ONCE for the app's lifetime. A MutationObserver picks up `.reveal` elements that mount later
 * (client-side navigation renders the new route only after its lazy chunk/loader resolves, i.e.
 * after the pathname has already changed), so content on a newly navigated page can never be left
 * hidden. Elements React re-renders without `is-in` get it back. No IntersectionObserver or reduced
 * motion → nothing is hidden.
 */
export function useReveal() {
  useLayoutEffect(() => {
    if (typeof IntersectionObserver === "undefined" || typeof MutationObserver === "undefined") {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const shown = new WeakSet<Element>();
    const pending = new Set<Element>();
    const show = (el: Element) => {
      shown.add(el);
      pending.delete(el);
      if (!el.classList.contains("is-in")) el.classList.add("is-in");
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Intersecting, or already scrolled past (e.g. after jumping to an #anchor).
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const track = (el: Element) => {
      if (shown.has(el) || el.classList.contains("is-in")) return show(el);
      if (el.getBoundingClientRect().top < window.innerHeight * 0.98) return show(el);
      pending.add(el);
      io.observe(el);
    };
    // Safety net: IntersectionObserver does not fire for an element that jumps from below to above
    // the viewport between two frames (fast fling, scroll restoration), so also check on scroll.
    let raf = 0;
    const sweep = () => {
      raf = 0;
      const limit = window.innerHeight * 0.98;
      for (const el of pending) {
        if (!el.isConnected) pending.delete(el);
        else if (el.getBoundingClientRect().top < limit) {
          show(el);
          io.unobserve(el);
        }
      }
    };
    const onScroll = () => {
      if (!raf && pending.size) raf = requestAnimationFrame(sweep);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const scan = (root: ParentNode) => {
      if (root instanceof Element && root.classList.contains("reveal")) track(root);
      root.querySelectorAll(".reveal").forEach(track);
    };

    scan(document);
    document.documentElement.classList.add("reveal-ready");

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === "childList") {
          r.addedNodes.forEach((n) => n instanceof Element && scan(n));
        } else if (
          r.target instanceof Element &&
          shown.has(r.target) &&
          !r.target.classList.contains("is-in")
        ) {
          r.target.classList.add("is-in"); // React replaced className on re-render
        } else if (r.target instanceof Element && r.target.classList.contains("reveal")) {
          track(r.target); // class "reveal" added to an existing element
        }
      }
    });
    mo.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    const revealAll = () => document.querySelectorAll(".reveal").forEach(show);
    window.addEventListener("beforeprint", revealAll);
    return () => {
      mo.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeprint", revealAll);
    };
  }, []);
}
