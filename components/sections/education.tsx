"use client";
import Image from "next/image";
import {
  GraduationCap,
  MapPin,
  CalendarDays,
  BadgeCheck,
  ShieldCheck,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
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

/* ── Slider berkas sertifikat (geser menyamping) + lightbox ── */
function CertSlider() {
  const { lang } = useLanguage();
  const t = STR.education;
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const withFiles = t.certs
    .map((c, i) => ({ ...c, i }))
    .filter((c) => c.file);

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 360), behavior: reduce ? "auto" : "smooth" });
  };

  useEffect(() => {
    if (openIdx === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") setOpenIdx((v) => (v === null ? v : (v + 1) % withFiles.length));
      if (e.key === "ArrowLeft") setOpenIdx((v) => (v === null ? v : (v - 1 + withFiles.length) % withFiles.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIdx, withFiles.length]);

  if (withFiles.length === 0) return null;
  const open = openIdx !== null ? withFiles[openIdx] : null;

  return (
    <div className="mt-10 md:mt-12">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="mb-1.5 text-[0.62rem] font-bold tracking-[0.16em] text-ink-3 uppercase">
            {t.galleryTitle[lang]}
          </p>
          <p className="max-w-xl text-[0.82rem] leading-relaxed text-ink-2">
            {t.galleryLead[lang]}
          </p>
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            onClick={() => scrollBy(-1)}
            aria-label={t.slidePrev[lang]}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-chip text-ink-2 transition hover:bg-elevated-hover hover:text-ink"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label={t.slideNext[lang]}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-chip text-ink-2 transition hover:bg-elevated-hover hover:text-ink"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Trek geser */}
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:thin]"
      >
        {withFiles.map((c) => (
          <button
            key={c.title}
            onClick={() => setOpenIdx(withFiles.indexOf(c))}
            className="group w-[260px] shrink-0 snap-start overflow-hidden rounded-3xl bg-card text-left shadow-card transition-shadow duration-300 hover:shadow-lift sm:w-[300px]"
          >
            {/* Pratinjau */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-solid">
              {c.fileKind === "image" ? (
                <Image
                  src={c.file!}
                  alt={`${c.title} — ${c.issuer}`}
                  fill
                  sizes="300px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-elevated">
                  <FileText size={30} className="text-ink-3" />
                  <span className="rounded-full bg-chip px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.1em] text-ink-2 uppercase">
                    PDF
                  </span>
                </div>
              )}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[0.7rem] font-semibold text-white opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
                <ExternalLink size={12} />
                {t.viewFile[lang]}
              </span>
              {c.score && (
                <span className="absolute top-3 right-3 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[0.65rem] font-bold text-white">
                  {t.score[lang]} {c.score}
                </span>
              )}
            </div>
            {/* Meta */}
            <div className="p-4">
              <div className="text-[0.6rem] font-bold tracking-[0.14em] text-ink-3 uppercase">
                {c.issuer} · {c.date}
              </div>
              <div className="mt-1 truncate text-[0.85rem] font-bold text-ink">
                {c.title}
              </div>
              {c.verifyUrl && (
                <span className="mt-2 inline-flex items-center gap-1 text-[0.7rem] font-semibold text-emerald-400">
                  <BadgeCheck size={12} />
                  {t.verify[lang]}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-8">
            <motion.button
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenIdx(null)}
              aria-label={t.slidePrev[lang]}
              className="fixed inset-0 cursor-default bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label={`${open.title} — ${open.issuer}`}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-panel shadow-lift"
            >
              <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-4">
                <div className="min-w-0">
                  <div className="text-[0.6rem] font-bold tracking-[0.14em] text-ink-3 uppercase">
                    {open.issuer} · {open.date}
                    {open.score ? ` · ${t.score[lang]} ${open.score}` : ""}
                  </div>
                  <div className="truncate text-sm font-bold text-ink">{open.title}</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {open.verifyUrl && (
                    <a
                      href={open.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-chip px-3.5 py-2 text-[0.72rem] font-semibold text-ink transition hover:bg-elevated-hover"
                    >
                      <BadgeCheck size={13} />
                      {t.verify[lang]}
                    </a>
                  )}
                  <button
                    onClick={() => setOpenIdx(null)}
                    aria-label="Tutup"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-chip text-ink-2 transition hover:bg-elevated-hover hover:text-ink"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden bg-surface-solid">
                {open.fileKind === "image" ? (
                  <div className="relative h-[62vh] w-full">
                    <Image
                      src={open.file!}
                      alt={`${open.title} — ${open.issuer}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <iframe
                    src={open.file}
                    title={`${open.title} — ${open.issuer}`}
                    className="h-[62vh] w-full"
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
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
                {logo ? (
                  /* Logo penerbit — latar terang tetap agar logo brand selalu terbaca */
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 ring-1 ring-black/[0.06]">
                    <Image
                      src={logo}
                      alt={`${issuer} logo`}
                      width={44}
                      height={44}
                      className="h-full w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-elevated text-ink-2 transition-colors duration-300 group-hover:text-ink">
                    <ShieldCheck size={20} />
                  </div>
                )}
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

        {/* Slider berkas sertifikat */}
        <CertSlider />
      </div>
    </section>
  );
}
