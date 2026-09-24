"use client";
import { useEffect } from "react";

/* Reveal saat elemen masuk viewport.
   - menambahkan class "in" pada .reveal (lihat globals.css)
   - stagger halus antar-elemen yang muncul bersamaan
   - menghormati prefers-reduced-motion (langsung tampil) */
export function useScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (reduce) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const seen = new WeakSet<HTMLElement>();
    let batch = 0;
    let batchTimer: ReturnType<typeof setTimeout> | undefined;

    const obs = new IntersectionObserver(
      (entries) => {
        const fresh = entries.filter((e) => e.isIntersecting && !seen.has(e.target as HTMLElement));
        if (fresh.length === 0) return;

        batch = 0;
        if (batchTimer) clearTimeout(batchTimer);
        batchTimer = setTimeout(() => { batch = 0; }, 260);

        fresh.forEach((e) => {
          const el = e.target as HTMLElement;
          seen.add(el);
          const delay = Math.min(batch++, 6) * 90;
          setTimeout(() => el.classList.add("in"), delay);
          obs.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => {
      obs.disconnect();
      if (batchTimer) clearTimeout(batchTimer);
    };
  }, []);
}
