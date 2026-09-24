"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLanguage, STR } from "@/lib/LanguageProvider";
import { STATS } from "@/lib/portfolio";

/* Angka menghitung naik saat masuk viewport */
function CountUp({ value, plus }: { value: number; plus?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) { setN(value); return; }
    const start = performance.now();
    const DURATION = 1200;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      /* easeOutExpo untuk hentakan yang lebih hidup */
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {plus && <span className="text-emerald-400">+</span>}
    </span>
  );
}

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 34, scale: 0.94, filter: "blur(8px)" },
  show: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Stats() {
  const { lang } = useLanguage();
  const labels = STR.stats.labels[lang];
  const reduce = useReducedMotion();

  /* Semua angka dihitung dari lib/portfolio.ts — otomatis ikut data.
     Tiap kartu link ke section terkait. */
  const items = [
    { value: STATS.internshipCount, plus: true, label: labels[0], href: "#experience" },
    { value: STATS.serviceCount, plus: false, label: labels[1], href: "#projects" },
    { value: STATS.techCount, plus: false, label: labels[2], href: "#skills" },
    { value: STATS.totalCompleted, plus: true, label: labels[3], href: "#projects" },
  ];

  return (
    <section id="stats" className="border-y border-hairline bg-panel px-4 py-14 sm:px-6 md:py-16">
      <motion.div
        variants={reduce ? undefined : gridVariants}
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "show"}
        viewport={{ once: true, amount: 0.25 }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map(({ value, plus, label, href }) => (
          <motion.a
            key={label}
            href={href}
            variants={reduce ? undefined : cardVariants}
            aria-label={`${value}${plus ? "+" : ""} ${label}`}
            className="group relative block overflow-hidden rounded-3xl bg-card p-8 text-center shadow-card backdrop-blur-sm transition-shadow duration-300 hover:shadow-lift md:p-10"
          >
            {/* garis aksen atas: tumbuh saat hover */}
            <motion.span
              aria-hidden
              className="absolute inset-x-8 top-0 h-px origin-center bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={reduce ? undefined : { scaleX: 1, opacity: 0.55 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            />

            <motion.div
              style={{ fontFamily: "'Playfair Display', serif" }}
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-5xl font-black tracking-tight text-ink md:text-6xl"
            >
              <CountUp value={value} plus={plus} />
            </motion.div>

            <div className="mt-3 text-[0.65rem] font-bold tracking-[0.16em] text-ink-3 uppercase transition-colors duration-200 group-hover:text-ink-2 md:text-xs">
              {label}{" "}
              <span aria-hidden className="inline-block opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">→</span>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
