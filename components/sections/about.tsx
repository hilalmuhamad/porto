"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage, STR } from "@/lib/LanguageProvider";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function About() {
  const { lang } = useLanguage();
  const t = STR.about;
  const reduce = useReducedMotion();
  useScrollReveal();

  return (
    <section id="about" className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="reveal mb-10 md:mb-12">
          <p className="mb-2 text-xs font-bold tracking-[0.22em] text-ink-3 uppercase">
            {t.eyebrow[lang]}
          </p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl"
          >
            {t.titleA[lang]}{" "}
            <span className="font-bold text-ink-2 italic">{t.titleB[lang]}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg md:leading-loose">
            {t.intro[lang]}
          </p>
        </div>

        {/* Dua kolom: narasi kiri, foto kanan (stack: foto di atas) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-8">
          {/* Foto — muncul pertama di mobile */}
          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={reduce ? undefined : { y: -6 }}
            className="group relative order-1 overflow-hidden rounded-3xl bg-card shadow-card transition-shadow duration-300 hover:shadow-lift md:order-2 md:col-span-2"
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/pasphotohilal.jpeg"
                alt="Hilal Muhamad Abdul Gani"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 768px) 100vw, 380px"
                className="transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </div>
          </motion.figure>

          {/* Narasi */}
          <div className="order-2 flex flex-col gap-5 md:order-1 md:col-span-3">
            <article className="reveal rounded-3xl bg-card shadow-card p-8 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-lift md:p-10">
              <p className="text-sm leading-relaxed text-ink-2 md:text-base md:leading-loose">
                {t.highlight[lang]}
              </p>
              <div aria-hidden className="my-6 h-px bg-gradient-to-r from-transparent via-[var(--line-strong)] to-transparent" />
              <p className="text-sm leading-relaxed text-ink-2 md:text-base md:leading-loose">
                {t.collab[lang]}
              </p>

              {/* Penutup: fokus kerja */}
              <p className="mt-7 border-l-2 border-emerald-500/60 pl-4 text-sm font-medium leading-relaxed text-ink md:text-base">
                {t.focus[lang]}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
