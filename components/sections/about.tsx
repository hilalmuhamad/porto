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
          {/* Foto — bingkai abstrak, muncul pertama di mobile */}
          <motion.figure
            initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="group relative order-1 mx-auto w-full max-w-[340px] md:order-2 md:col-span-2 md:max-w-none"
          >
            {/* Lapisan abstrak di belakang: blob organik + riak + titik */}
            <div aria-hidden className="absolute -inset-4 sm:-inset-6">
              <div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/25 via-emerald-500/5 to-zinc-500/15 blur-2xl transition-transform duration-700 group-hover:scale-105"
                style={{ borderRadius: "42% 58% 63% 37% / 45% 42% 58% 55%" }}
              />
              <div className="absolute -top-2 right-2 h-32 w-32 rounded-full border border-white/10" />
              <div className="absolute -top-2 right-2 h-44 w-44 translate-x-3 -translate-y-3 rounded-full border border-white/5" />
              <div
                className="absolute -bottom-4 -left-2 h-28 w-36 opacity-60"
                style={{
                  backgroundImage: "radial-gradient(rgba(255,255,255,0.22) 1.2px, transparent 1.2px)",
                  backgroundSize: "12px 12px",
                }}
              />
            </div>
            {/* Foto diagonal abstrak + bingkai offset */}
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-tl-[1.25rem] rounded-tr-[4rem] rounded-br-[1.25rem] rounded-bl-[4rem] bg-gradient-to-br from-emerald-500/40 to-zinc-500/20 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"
              />
              <div className="relative overflow-hidden rounded-tl-[4rem] rounded-tr-[1.25rem] rounded-br-[4rem] rounded-bl-[1.25rem] shadow-lift ring-1 ring-white/10 transition-transform duration-500 group-hover:-translate-y-1.5">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/pasphotohilal.jpeg"
                    alt="Hilal Muhamad Abdul Gani"
                    fill
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                </div>
              </div>
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
