"use client";
import Image from "next/image";
import {
  GraduationCap,
  MapPin,
  CalendarDays,
  BadgeCheck,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
  Pause,
  Play,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
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

type Cert = {
  issuer: string;
  title: string;
  date?: string;
  logo?: string;
  desc: { id: string; en: string };
  file?: string;
  fileKind?: "image" | "pdf";
  verifyUrl?: string;
  score?: string;
};

/* ── Kartu sertifikat (dipakai di marquee infinite scroll) ── */
function CertCard({
  cert,
  hidden,
  onPreview,
}: {
  cert: Cert;
  hidden?: boolean;
  onPreview: (() => void) | null;
}) {
  const { lang } = useLanguage();
  const t = STR.education;
  const { issuer, title, date, logo, desc, file, fileKind, verifyUrl, score } = cert;

  return (
    <article
      aria-hidden={hidden || undefined}
      className="group flex w-[300px] shrink-0 flex-col overflow-hidden rounded-3xl bg-card shadow-card backdrop-blur-sm transition-shadow duration-300 hover:shadow-lift sm:w-[330px]"
    >
      {/* Pratinjau berkas (jika ada) */}
      {file ? (
        <button
          onClick={onPreview ?? undefined}
          disabled={!onPreview}
          tabIndex={hidden ? -1 : undefined}
          className="group/file relative block aspect-[16/9] w-full overflow-hidden bg-surface-solid text-left"
          aria-label={`${t.viewFile[lang]}: ${title}`}
        >
          {fileKind === "image" ? (
            <Image
              src={file}
              alt={`${title} — ${issuer}`}
              fill
              sizes="330px"
              className="object-contain p-2 transition-transform duration-500 group-hover/file:scale-[1.03]"
            />
          ) : (
            /* Thumbnail PDF asli (halaman pertama) — non-interaktif */
            <iframe
              src={`${file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              title=""
              aria-hidden
              tabIndex={-1}
              loading="lazy"
              scrolling="no"
              className="pointer-events-none h-full w-full scale-[1.02] border-0"
            />
          )}
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[0.7rem] font-semibold text-white opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover/file:opacity-100">
            <ExternalLink size={12} />
            {t.viewFile[lang]}
          </span>
          {score && (
            <span className="absolute top-3 right-3 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[0.65rem] font-bold text-white">
              {t.score[lang]} {score}
            </span>
          )}
        </button>
      ) : (
        <div aria-hidden className="h-2 w-full bg-gradient-to-r from-transparent via-[var(--line-strong)] to-transparent opacity-60" />
      )}

      <div className="flex flex-1 flex-col p-6">
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
              {date ? (
                <>
                  <span className="text-[0.62rem] font-semibold text-ink-4">·</span>
                  <span className="inline-flex items-center gap-1 text-[0.62rem] font-semibold text-ink-4">
                    <CalendarDays size={10} />
                    {date}
                  </span>
                </>
              ) : null}
            </div>
            <h3 className="mt-1 text-[0.95rem] font-bold leading-snug tracking-tight text-ink">
              {title}
            </h3>
          </div>
        </div>
        <p className="mt-4 text-[0.82rem] leading-relaxed text-ink-2">{desc[lang]}</p>

        {(verifyUrl || score) && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-hairline pt-4">
            {verifyUrl && (
              <a
                href={verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={hidden ? -1 : undefined}
                className="inline-flex items-center gap-1.5 rounded-full bg-chip px-3 py-1.5 text-[0.7rem] font-semibold text-ink transition hover:bg-elevated-hover"
              >
                <BadgeCheck size={13} />
                {t.verify[lang]}
              </a>
            )}
            {score && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/[0.12] px-3 py-1.5 text-[0.7rem] font-bold text-emerald-400">
                {t.score[lang]} {score}
              </span>
            )}
          </div>
        )}
      </div>
    </article>
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

  /* Sertifikat yang punya berkas — untuk navigasi lightbox */
  const withFiles = t.certs
    .map((c, i) => ({ ...c, i }))
    .filter((c) => c.file);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const open = openIdx !== null ? withFiles[openIdx] : null;

  const openByTitle = (title: string) => {
    const idx = withFiles.findIndex((c) => c.title === title);
    if (idx >= 0) setOpenIdx(idx);
  };

  /* ── Carousel terkendali: panah, dots, play/pause, autoplay ── */
  const trackRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [holding, setHolding] = useState(false);
  const [cur, setCur] = useState(0);
  const idxRef = useRef(0);
  const n = t.certs.length;

  const stepOf = () => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    return (first?.offsetWidth ?? 320) + 20; // lebar kartu + gap-5
  };

  const goTo = (idx: number) => {
    const el = trackRef.current;
    if (!el || n === 0) return;
    const norm = ((idx % n) + n) % n;
    const step = stepOf();
    const half = n * step;
    let pos = el.scrollLeft;
    if (pos >= half - 1) {
      el.scrollTo({ left: pos - half, behavior: "auto" });
      pos -= half;
    }
    el.scrollTo({ left: norm * step, behavior: reduce ? "auto" : "smooth" });
    idxRef.current = norm;
    setCur(norm);
  };

  const stepMove = (dir: number) => {
    const next = (((idxRef.current + dir) % n) + n) % n;
    idxRef.current = next;
    goTo(next);
  };

  const onTrackScroll = () => {
    const el = trackRef.current;
    if (!el || n === 0) return;
    const step = stepOf();
    const half = n * step;
    let pos = el.scrollLeft;
    if (pos >= half) {
      el.scrollTo({ left: pos - half, behavior: "auto" });
      pos -= half;
    }
    const i = ((Math.round(pos / step) % n) + n) % n;
    if (i !== idxRef.current) {
      idxRef.current = i;
      setCur(i);
    }
  };

  useEffect(() => {
    if (!playing || holding || reduce || openIdx !== null || n === 0) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      stepMove(1);
    }, 3500);
    return () => clearInterval(id);
  });

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

          {/* Label sertifikasi + kontrol carousel */}
          <div className="flex flex-wrap items-end justify-between gap-3 lg:col-span-3">
            <p className="text-[0.62rem] font-bold tracking-[0.16em] text-ink-3 uppercase">
              {t.certsTitle[lang]}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => stepMove(-1)}
                aria-label={t.slidePrev[lang]}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-chip text-ink-2 transition hover:bg-elevated-hover hover:text-ink"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? t.pauseAuto[lang] : t.autoplay[lang]}
                aria-pressed={playing}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-chip text-ink-2 transition hover:bg-elevated-hover hover:text-ink"
              >
                {playing ? <Pause size={15} /> : <Play size={15} />}
              </button>
              <button
                type="button"
                onClick={() => stepMove(1)}
                aria-label={t.slideNext[lang]}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-chip text-ink-2 transition hover:bg-elevated-hover hover:text-ink"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Carousel sertifikat — satu baris, terkendali penuh */}
        <div
          className="marquee-mask -mx-4 overflow-hidden px-4 pb-2 sm:-mx-6 sm:px-6"
          onMouseEnter={() => setHolding(true)}
          onMouseLeave={() => setHolding(false)}
          onFocus={() => setHolding(true)}
          onBlur={() => setHolding(false)}
        >
          <div
            ref={trackRef}
            onScroll={onTrackScroll}
            className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {[...t.certs, ...t.certs].map((cert, dup) => (
              <CertCard
                key={`${cert.title}-${dup}`}
                cert={cert}
                hidden={dup >= t.certs.length}
                onPreview={
                  cert.file ? () => openByTitle(cert.title) : null
                }
              />
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            {t.certs.map((c, i) => (
              <button
                key={c.title}
                type="button"
                onClick={() => {
                  idxRef.current = i;
                  goTo(i);
                }}
                aria-label={c.title}
                aria-current={i === cur}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === cur ? 22 : 8,
                  background: i === cur ? "#34d399" : "var(--dot-idle)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox berkas — satu untuk seluruh bagian */}
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
                    {open.issuer}{open.date ? ` · ${open.date}` : ""}
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
                      className="inline-flex items-center gap-1.5 rounded-full bg-chip px-3 py-1.5 text-[0.7rem] font-semibold text-ink transition hover:bg-elevated-hover"
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
              {/* Panah samping kiri-kanan */}
              {withFiles.length > 1 && (
                <>
                  <button
                    onClick={() => setOpenIdx((v) => (v === null ? v : (v - 1 + withFiles.length) % withFiles.length))}
                    aria-label={t.slidePrev[lang]}
                    className="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setOpenIdx((v) => (v === null ? v : (v + 1) % withFiles.length))}
                    aria-label={t.slideNext[lang]}
                    className="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
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
    </section>
  );
}
