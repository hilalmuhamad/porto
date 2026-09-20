"use client";
import { useLanguage, STR } from "@/lib/LanguageProvider";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { STATS } from "@/lib/portfolio";

export default function Stats() {
  const { lang } = useLanguage();
  const labels = STR.stats.labels[lang];
  useScrollReveal();

  /* Semua angka dihitung dari lib/portfolio.ts — otomatis ikut data.
     Tiap kartu link ke section terkait (Hero berpusat ke section lain). */
  const items = [
    { num: `${STATS.internshipCount}`, plus: true, label: labels[0], href: "#experience" },
    { num: `${STATS.serviceCount}`, plus: false, label: labels[1], href: "#projects" },
    { num: `${STATS.techCount}`, plus: false, label: labels[2], href: "#skills" },
    { num: `${STATS.totalCompleted}`, plus: true, label: labels[3], href: "#projects" },
  ];

  return (
    <section id="stats" className="border-y border-zinc-800/80 bg-zinc-950 px-4 py-14 sm:px-6 md:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-px overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-800/60 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ num, plus, label, href }) => (
          <a
            key={label}
            href={href}
            aria-label={`${num}${plus ? "+" : ""} ${label}`}
            className="reveal group block bg-zinc-950 p-8 text-center transition-colors duration-200 hover:bg-zinc-900/70 md:p-10"
          >
            <div
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-5xl font-black tracking-tight text-zinc-100 transition-transform duration-200 group-hover:-translate-y-1 md:text-6xl"
            >
              {num}
              {plus && <span className="text-emerald-400">+</span>}
            </div>
            <div className="mt-3 text-[0.65rem] font-bold tracking-[0.16em] text-zinc-500 uppercase transition-colors group-hover:text-zinc-300 md:text-xs">
              {label} <span aria-hidden className="opacity-0 transition-opacity group-hover:opacity-100">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
