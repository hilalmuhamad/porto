"use client";
import Image from "next/image";
import {
  GraduationCap,
  MapPin,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage, STR } from "@/lib/LanguageProvider";
import { PROFILE } from "@/lib/portfolio";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-chip px-3 py-1 text-[0.68rem] font-semibold text-ink-2">
      {icon}
      {children}
    </span>
  );
}

export default function Education() {
  const { lang } = useLanguage();
  const t = STR.education;
  const reduce = useReducedMotion();

  const rows = [
    { label: t.coursework[lang], text: t.courseworkText[lang] },
    { label: t.finalProject[lang], text: t.finalProjectText[lang] },
    { label: t.community[lang], text: t.communityText[lang] },
  ];

  return (
    <section id="education" className="px-4 py-20 sm:px-6 md:py-24">
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
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-2 md:text-base">
            {t.lead[lang]}
          </p>
        </div>

        <motion.div
          variants={reduce ? undefined : gridVariants}
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {/* Universitas — kartu lebar */}
          <motion.article
            variants={reduce ? undefined : cardVariants}
            className="flex flex-col rounded-3xl bg-card shadow-card p-7 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lift lg:col-span-3 lg:p-9"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-elevated text-ink-2">
                  <GraduationCap size={21} />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-ink md:text-xl">
                    {t.uniName}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-ink-2">{t.uniDegree[lang]}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/[0.14] px-3 py-1.5 text-[0.72rem] font-bold text-emerald-400">
                <BadgeCheck size={13} />
                {t.gpa[lang]} {PROFILE.gpa} / {PROFILE.gpaScale}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Chip icon={<MapPin size={11} />}>{t.uniLocation[lang]}</Chip>
              <Chip icon={<CalendarDays size={11} />}>{t.uniPeriod}</Chip>
              <Chip icon={<BadgeCheck size={11} />}>{t.status[lang]}</Chip>
            </div>

            <div className="mt-6 flex flex-col gap-5 border-t border-hairline pt-6">
              {rows.map(({ label, text }) => (
                <div key={label} className="flex flex-col gap-1.5 md:flex-row md:gap-6">
                  <div className="w-44 shrink-0 text-[0.62rem] font-bold tracking-[0.14em] text-ink-3 uppercase md:pt-1">
                    {label}
                  </div>
                  <p className="text-sm leading-relaxed text-ink-2 md:text-[0.9rem] md:leading-loose">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </motion.article>

          {/* Sertifikasi */}
          <div className="lg:col-span-3">
            <p className="mb-4 text-[0.62rem] font-bold tracking-[0.16em] text-ink-3 uppercase">
              {t.certsTitle[lang]}
            </p>
          </div>
          {t.certs.map(({ issuer, title, date, logo, desc }) => (
            <motion.article
              key={title}
              variants={reduce ? undefined : cardVariants}
              className="group flex flex-col rounded-3xl bg-card shadow-card p-6 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lift md:p-7"
            >
              <div className="flex items-start gap-3.5">
                {/* Logo penerbit — latar terang tetap agar logo brand selalu terbaca */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 ring-1 ring-black/[0.06]">
                  <Image
                    src={logo}
                    alt={`${issuer} logo`}
                    width={44}
                    height={44}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[0.62rem] font-bold tracking-[0.14em] text-ink-3 uppercase">
                      {issuer}
                    </span>
                    <span className="text-[0.62rem] font-semibold text-ink-4">·</span>
                    <span className="inline-flex items-center gap-1 text-[0.62rem] font-semibold text-ink-4">
                      <CalendarDays size={10} />
                      {date}
                    </span>
                  </div>
                  <h3 className="mt-1 text-[0.95rem] font-bold leading-snug tracking-tight text-ink">
                    {title}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-[0.82rem] leading-relaxed text-ink-2">{desc[lang]}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
