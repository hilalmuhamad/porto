"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  CircleAlert,
  Lightbulb,
  TrendingUp,
  ExternalLink,
  Images,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useLanguage, STR } from "@/lib/LanguageProvider";
import { PROJECTS, type Project } from "@/lib/portfolio";

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23.95-.26 1.98-.39 3-.39s2.05.13 3 .39c2.29-1.55 3.29-1.23 3.29-1.23.67 1.65.26 2.87.13 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58 4.77-1.59 8.21-6.09 8.21-11.39 0-6.63-5.37-12-12-12z" />
  </svg>
);

/* ── Galeri screenshot (dipakai kartu & dialog) ── */
function Gallery({
  images,
  title,
  fit = "contain",
  aspectClass = "aspect-[16/10]",
  large = false,
  interactive = true,
}: {
  images: string[];
  title: string;
  fit?: "cover" | "contain";
  aspectClass?: string;
  large?: boolean;
  interactive?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const contain = fit === "contain";
  const active = images[idx];
  const many = interactive && images.length > 1;

  const step = useCallback(
    (dir: number) => setIdx((i) => (i + dir + images.length) % images.length),
    [images.length]
  );

  return (
    <div className="relative">
      <div className={`relative ${aspectClass} w-full overflow-hidden bg-panel`}>
        {failed[idx] ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-4">
            <Images size={26} />
            <span className="text-[0.7rem] font-medium">Screenshot tidak ditemukan</span>
          </div>
        ) : (
          <Image
            src={active}
            alt={`${title} — screenshot ${idx + 1}`}
            fill
            sizes={large ? "(max-width: 1024px) 100vw, 900px" : "(max-width: 1024px) 100vw, 640px"}
            className={
              contain
                ? `object-contain object-center ${large ? "p-4" : "p-3"} transition-transform duration-700 group-hover:scale-[1.02]`
                : "object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            }
            onError={() => setFailed((f) => ({ ...f, [idx]: true }))}
          />
        )}
        <div
          aria-hidden
          className={
            contain
              ? "pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--overlay-soft)] via-transparent to-transparent"
              : "pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--overlay-strong)] via-transparent to-transparent"
          }
        />

        {/* penghitung gambar */}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-overlay px-2.5 py-1 text-[0.65rem] font-bold text-ink-2 backdrop-blur-md">
          <Images size={11} />
          {idx + 1}/{images.length}
        </span>

        {/* panah navigasi (hanya di dialog) */}
        {many && large && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); step(-1); }}
              aria-label="Screenshot sebelumnya"
              className="absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-overlay text-ink-2 shadow-soft backdrop-blur-md transition hover:text-ink"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); step(1); }}
              aria-label="Screenshot berikutnya"
              className="absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-overlay text-ink-2 shadow-soft backdrop-blur-md transition hover:text-ink"
            >
              <ChevronRight size={17} />
            </button>
          </>
        )}
      </div>

      {/* thumbnail */}
      {many && (
        <div className={`absolute right-3 bottom-3 left-3 flex gap-2 ${large ? "justify-center" : ""}`}>
          {images.map((img, i) => (
            <button
              key={img}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              aria-label={`Lihat screenshot ${i + 1}`}
              aria-current={i === idx}
              className={`relative shrink-0 overflow-hidden rounded-lg border bg-panel transition-all duration-200 ${
                large ? "h-12 w-20" : "h-10 w-14"
              } ${
                i === idx
                  ? "border-emerald-400 opacity-100"
                  : "border-transparent opacity-55 hover:opacity-90"
              }`}
            >
              <Image
                src={img}
                alt=""
                fill
                sizes="80px"
                className={contain ? "object-contain object-center p-0.5" : "object-cover object-top"}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Baris kasus: Masalah / Solusi / Hasil ── */
function CaseRow({
  icon,
  label,
  text,
  accent,
  large,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
  accent?: boolean;
  large?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
          accent
            ? "bg-emerald-500/[0.14] text-emerald-400"
            : "bg-elevated text-ink-2"
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div
          className={`text-[0.62rem] font-bold tracking-[0.14em] uppercase ${
            accent ? "text-emerald-400" : "text-ink-3"
          }`}
        >
          {label}
        </div>
        <p className={`mt-0.5 leading-relaxed text-ink-2 ${large ? "text-sm md:text-[0.9rem]" : "text-[0.82rem]"}`}>
          {text}
        </p>
      </div>
    </div>
  );
}

function TechTags({ tags, large }: { tags: string[]; large?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className={`rounded-full bg-chip font-medium text-ink-2 ${
            large ? "px-3 py-1.5 text-[0.74rem]" : "px-3 py-1 text-[0.7rem]"
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );
}

/* ── Kartu ringkas (klik → dialog) ── */
function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (p: Project) => void;
}) {
  const reduce = useReducedMotion();
  const { lang } = useLanguage();
  const t = STR.projects;
  const { label, title, tags, desc, link, role, date, images, imageFit } = project;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-card shadow-card backdrop-blur-sm transition-shadow duration-300 hover:shadow-lift"
    >
      {/* Tombol buka dialog (galeri + judul ringkas) */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`${t.detail[lang]}: ${title}`}
        className="flex flex-1 flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
      >
        {images && images.length > 0 ? (
          <Gallery images={images} title={title} fit={imageFit} interactive={false} />
        ) : (
          <div className="relative flex aspect-[16/10] items-center justify-center bg-elevated text-4xl">
            <span aria-hidden>{project.emoji}</span>
            <span className="absolute top-3 left-3 rounded-full bg-overlay px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.08em] text-ink-2 uppercase backdrop-blur-md">
              {label[lang]}
            </span>
          </div>
        )}

        <div className="flex w-full flex-1 flex-col p-6 md:p-7">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-chip px-2.5 py-1 text-[0.65rem] font-semibold text-ink-2">
              <CalendarDays size={11} />
              {date}
            </span>
            <span className="text-[0.65rem] font-bold tracking-[0.1em] text-ink-3 uppercase">
              {role}
            </span>
          </div>

          <h3 className="text-lg font-bold tracking-tight text-ink">{title}</h3>
          <p className="mt-2 line-clamp-3 text-[0.83rem] leading-relaxed text-ink-3">{desc[lang]}</p>

          <div className="mt-5">
            <TechTags tags={tags} />
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-ink-2 transition-colors group-hover:text-emerald-400">
            {t.detail[lang]}
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </span>
        </div>
      </button>

      {/* Aksi cepat */}
      <div className="flex flex-wrap items-center gap-3 border-t border-hairline px-6 py-4 md:px-7">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-chip px-4 py-2 text-[0.73rem] font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-elevated-hover"
        >
          <GithubIcon />
          GitHub
        </a>
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-chip px-4 py-2 text-[0.73rem] font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-elevated-hover"
          >
            <ExternalLink size={14} />
            Live Demo
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full bg-chip px-4 py-2 text-[0.73rem] font-medium text-ink-4">
            <ExternalLink size={14} />
            {t.liveSoon[lang]}
          </span>
        )}
      </div>
    </motion.article>
  );
}

/* ── Dialog detail proyek ── */
function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { lang } = useLanguage();
  const t = STR.projects;

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[250] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6">
          {/* backdrop */}
          <motion.button
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-label={t.close[lang]}
            className="fixed inset-0 cursor-default bg-black/70 backdrop-blur-sm"
          />

          {/* panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={`${t.dialogLabel[lang]}: ${project.title}`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative my-auto w-full max-w-4xl overflow-hidden rounded-3xl bg-panel shadow-lift"
          >
            {/* tutup */}
            <button
              onClick={onClose}
              aria-label={t.close[lang]}
              className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-overlay text-ink-2 shadow-soft backdrop-blur-md transition hover:text-ink"
            >
              <X size={16} />
            </button>

            {/* galeri besar */}
            {project.images && project.images.length > 0 ? (
              <Gallery
                images={project.images}
                title={project.title}
                fit={project.imageFit}
                aspectClass="aspect-[16/9]"
                large
              />
            ) : (
              <div className="relative flex aspect-[16/6] items-center justify-center bg-elevated text-5xl">
                <span aria-hidden>{project.emoji}</span>
              </div>
            )}

            {/* isi */}
            <div className="max-h-[60vh] overflow-y-auto p-6 md:p-8">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-chip px-2.5 py-1 text-[0.65rem] font-bold tracking-[0.08em] text-ink-2 uppercase">
                  {project.label[lang]}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-chip px-2.5 py-1 text-[0.65rem] font-semibold text-ink-2">
                  <CalendarDays size={11} />
                  {project.date}
                </span>
              </div>

              <h3
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl font-black tracking-tight text-ink md:text-3xl"
              >
                {project.title}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-ink-2">{project.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-2 md:text-[0.92rem]">
                {project.desc[lang]}
              </p>

              {(project.problem || project.solution || project.result) && (
                <div className="mt-6 flex flex-col gap-4 border-t border-hairline pt-6">
                  {project.problem && (
                    <CaseRow large icon={<CircleAlert size={13} />} label={t.problem[lang]} text={project.problem[lang]} />
                  )}
                  {project.solution && (
                    <CaseRow large icon={<Lightbulb size={13} />} label={t.solution[lang]} text={project.solution[lang]} />
                  )}
                  {project.result && (
                    <CaseRow large accent icon={<TrendingUp size={13} />} label={t.result[lang]} text={project.result[lang]} />
                  )}
                </div>
              )}

              <div className="mt-6 border-t border-hairline pt-6">
                <div className="mb-3 text-[0.62rem] font-bold tracking-[0.14em] text-ink-3 uppercase">
                  {t.techUsed[lang]}
                </div>
                <TechTags tags={project.tags} large />
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-invert px-5 py-2.5 text-[0.78rem] font-semibold text-on-invert transition duration-200 hover:-translate-y-0.5 hover:bg-invert-hover"
                >
                  <GithubIcon />
                  GitHub
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-chip px-5 py-2.5 text-[0.78rem] font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-elevated-hover"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  useScrollReveal();
  const { lang } = useLanguage();
  const t = STR.projects;
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="reveal mb-10 md:mb-12">
          <p className="mb-2 text-xs font-bold tracking-[0.22em] text-ink-3 uppercase">
            {t.eyebrow[lang]}
          </p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="max-w-3xl text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl"
          >
            {t.titleA[lang]}{" "}
            <span className="font-bold text-ink-2 italic">{t.titleB[lang]}</span>{" "}
            {t.titleC[lang]}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-2 md:text-base">
            {t.lead[lang]}
          </p>
        </div>

        {/* Grid — 2 kartu per baris di desktop */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} onOpen={setSelected} />
          ))}
        </div>
      </div>

      {/* Dialog detail proyek */}
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
