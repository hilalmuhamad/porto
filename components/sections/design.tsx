"use client";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2, Pause, Play } from "lucide-react";
import { useLanguage, STR } from "@/lib/LanguageProvider";
import { useScrollReveal } from "@/lib/useScrollReveal";

const DESIGNS = [
  "/desain-1.png",
  "/desain-2.jpeg",
  "/desain-3.jpeg",
  "/desain-4.jpeg",
  "/desain-5.jpeg",
  "/desain-6.jpeg",
  "/desain-7.jpeg",
];

export default function Design() {
  const { lang } = useLanguage();
  const t = STR.design;
  const reduce = useReducedMotion();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const open = openIdx !== null ? DESIGNS[openIdx] : null;
  useScrollReveal();

  /* ── Carousel satu baris: panah, dots, play/pause, autoplay ── */
  const trackRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [holding, setHolding] = useState(false);
  const [cur, setCur] = useState(0);
  const idxRef = useRef(0);
  const n = DESIGNS.length;
  const te = STR.education;

  const stepOf = () => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    return (first?.offsetWidth ?? 280) + 20; // lebar kartu + gap-5
  };

  const goTo = (idx: number) => {
    const el = trackRef.current;
    if (!el || n === 0) return;
    const norm = ((idx % n) + n) % n;
    const step = stepOf();
    const half = n * step;
    const pos = el.scrollLeft;
    if (pos >= half - 1) {
      el.scrollTo({ left: pos - half, behavior: "auto" });
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
    if (!playing || holding || reduce || openIdx !== null) return;
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
      if (e.key === "ArrowRight") setOpenIdx((v) => (v === null ? v : (v + 1) % DESIGNS.length));
      if (e.key === "ArrowLeft") setOpenIdx((v) => (v === null ? v : (v - 1 + DESIGNS.length) % DESIGNS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIdx]);

  return (
    <section id="design" className="px-4 py-20 sm:px-6 md:py-24">
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

        {/* Kontrol galeri */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <span className="text-xs font-bold tracking-[0.12em] text-ink-3 tabular-nums">
            {cur + 1} / {n}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => stepMove(-1)}
              aria-label={te.slidePrev[lang]}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-chip text-ink-2 transition hover:bg-elevated-hover hover:text-ink"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? te.pauseAuto[lang] : te.autoplay[lang]}
              aria-pressed={playing}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-chip text-ink-2 transition hover:bg-elevated-hover hover:text-ink"
            >
              {playing ? <Pause size={15} /> : <Play size={15} />}
            </button>
            <button
              type="button"
              onClick={() => stepMove(1)}
              aria-label={te.slideNext[lang]}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-chip text-ink-2 transition hover:bg-elevated-hover hover:text-ink"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Trek geser satu baris */}
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
            {[...DESIGNS, ...DESIGNS].map((src, dup) => {
              const i = dup % n;
              const hide = dup >= n;
              return (
                <motion.button
                  key={`${src}-${dup}`}
                  type="button"
                  onClick={() => setOpenIdx(i)}
                  aria-hidden={hide || undefined}
                  tabIndex={hide ? -1 : undefined}
                  aria-label={`${t.viewFull[lang]} ${i + 1}`}
                  initial={reduce ? false : { opacity: 0, y: 26 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="group relative block w-[240px] shrink-0 overflow-hidden rounded-3xl bg-card shadow-card transition-shadow duration-300 hover:shadow-lift sm:w-[280px]"
                >
                  <Image
                    src={src}
                    alt={`Desain ${i + 1} — Hilal Muhamad`}
                    width={800}
                    height={1000}
                    sizes="280px"
                    className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-[0.7rem] font-semibold text-white opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100">
                    <Maximize2 size={12} />
                    {t.viewFull[lang]}
                  </span>
                </motion.button>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            {DESIGNS.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => {
                  idxRef.current = i;
                  goTo(i);
                }}
                aria-label={`Desain ${i + 1}`}
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
              aria-label="Tutup"
              className="fixed inset-0 cursor-default bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label={`Desain ${openIdx! + 1}`}
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex max-h-[88vh] w-auto max-w-3xl flex-col overflow-hidden rounded-3xl bg-panel shadow-lift"
            >
              <div className="relative h-[70vh] w-[min(88vw,560px)]">
                <Image
                  src={open}
                  alt={`Desain ${openIdx! + 1} — Hilal Muhamad`}
                  fill
                  sizes="(max-width: 768px) 88vw, 560px"
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-hairline px-5 py-3.5">
                <span className="text-[0.72rem] font-bold tracking-[0.12em] text-ink-2 tabular-nums">
                  {openIdx! + 1} / {DESIGNS.length}
                </span>
                <button
                  onClick={() => setOpenIdx(null)}
                  aria-label="Tutup"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-chip text-ink-2 transition hover:bg-elevated-hover hover:text-ink"
                >
                  <X size={16} />
                </button>
              </div>
              {/* Panah tengah kiri-kanan */}
              <button
                onClick={() => setOpenIdx((v) => (v === null ? v : (v - 1 + DESIGNS.length) % DESIGNS.length))}
                aria-label="Sebelumnya"
                className="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setOpenIdx((v) => (v === null ? v : (v + 1) % DESIGNS.length))}
                aria-label="Berikutnya"
                className="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75"
              >
                <ChevronRight size={18} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
