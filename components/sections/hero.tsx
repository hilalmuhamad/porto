"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Mail, ArrowRight, Download, Globe } from "lucide-react";
import { useLanguage, STR } from "@/lib/LanguageProvider";
import { PROFILE, CORE_TECHS } from "@/lib/portfolio";

const ROLES = [
  "Web Developer",
  "IT Support",
  "Backend Developer",
  "Fullstack Developer",
];

const CV_FILENAME = "CV_Hilal_Muhamad.pdf";

/* LinkedIn tidak tersedia sebagai ikon brand di lucide-react
   (sudah diverifikasi: export-nya undefined) — gunakan SVG inline
   seperlunya. Globe, Mail, ArrowRight, Download murni lucide-react. */
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.76-1.75 1.76zm15.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.77c1.4-2.59 7-2.78 7 2.48v6.75z" />
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23.95-.26 1.98-.39 3-.39s2.05.13 3 .39c2.29-1.55 3.29-1.23 3.29-1.23.67 1.65.26 2.87.13 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58 4.77-1.59 8.21-6.09 8.21-11.39 0-6.63-5.37-12-12-12z" />
  </svg>
);

/* Tombol magnetik: tertarik halus ke arah kursor (ala Linear) */
function Magnetic({ children }: { children: React.ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  return (
    <motion.span
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.18);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};



export default function Hero() {
  const { lang } = useLanguage();
  const t = STR.hero;
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  /* Spotlight section: glow mengikuti kursor (spring physics) */
  const mx = useMotionValue(-600);
  const my = useMotionValue(-600);
  const sx = useSpring(mx, { stiffness: 120, damping: 22 });
  const sy = useSpring(my, { stiffness: 120, damping: 22 });
  const glow = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, var(--glow), transparent 65%)`;

  /* Parallax orb kiri-atas: bergeser melawan arah kursor */
  const orbX = useTransform(sx, (v) => (v - 700) * -0.04);
  const orbY = useTransform(sy, (v) => (v - 400) * -0.04);

  /* Role berganti otomatis satu per satu */
  const [roleIdx, setRoleIdx] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2500);
    return () => clearTimeout(id);
  }, [roleIdx, reduce]);

  const socials = [
    { label: "Website", href: "#hero", Icon: (p: { size?: number }) => <Globe size={p.size ?? 18} /> },
    { label: "GitHub", href: PROFILE.github, Icon: GithubIcon },
    { label: "LinkedIn", href: PROFILE.linkedin, Icon: LinkedinIcon },
    { label: "Email", href: `mailto:${PROFILE.email}`, Icon: (p: { size?: number }) => <Mail size={p.size ?? 18} /> },
  ];

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={(e) => {
        const r = sectionRef.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 pb-12 sm:px-10 md:pt-28 lg:px-16"
    >
      {/* ── Latar: grid statis + glow kursor + aurora orbs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 75% 60% at 50% 38%, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 38%, black 30%, transparent 75%)",
          }}
        />
        {!reduce && (
          <>
            <motion.div className="absolute inset-0" style={{ background: glow }} />
            {/* Gradien interaktif kiri-atas: parallax mengikuti kursor */}
            <motion.div
              className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-[var(--orb-accent)] via-[var(--orb)] to-transparent blur-[110px]"
              style={{ x: orbX, y: orbY }}
            />
            <motion.div
              className="absolute -top-32 left-[8%] h-[420px] w-[420px] rounded-full bg-orb blur-[110px]"
              animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[5%] bottom-[5%] h-[380px] w-[380px] rounded-full bg-[var(--orb-accent-soft)] blur-[110px]"
              animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
              transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      {/* Konten langsung di atas background — tanpa kartu */}
      <motion.div
        variants={reduce ? undefined : container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="relative w-full max-w-6xl"
      >
        <div className="relative">
          {/* 1. Status Badge */}
          <motion.div variants={reduce ? undefined : item} className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-elevated px-4 py-1.5 text-xs font-medium text-ink-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            {t.badge[lang]}
          </motion.div>

          {/* 2. Heading & Nama — font Playfair dipertahankan */}
          <motion.p variants={reduce ? undefined : item} className="mb-2 text-sm font-semibold tracking-[0.18em] text-ink-3 uppercase">
            Hi, I&apos;m
          </motion.p>
          <motion.h1
            variants={reduce ? undefined : item}
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-5xl leading-[1.02] tracking-tight text-ink sm:text-7xl md:text-8xl"
          >
            <span className="font-black">Hilal</span>{" "}
            <span className="font-bold italic text-ink">Muhamad</span>
          </motion.h1>

          {/* 3. Role berganti satu per satu + titik navigasi */}
          <motion.div variants={reduce ? undefined : item} className="mt-5 flex items-center gap-3">
            <div className="inline-flex h-10 min-w-[190px] items-center justify-center overflow-hidden rounded-full bg-chip px-4 sm:min-w-[210px]">
              {reduce ? (
                <span className="text-sm font-semibold whitespace-nowrap text-ink">
                  {ROLES[roleIdx]}
                </span>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROLES[roleIdx]}
                    initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-sm font-semibold whitespace-nowrap text-ink"
                  >
                    {ROLES[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              )}
            </div>
            <div className="flex items-center gap-1.5" role="tablist" aria-label="Roles">
              {ROLES.map((role, i) => (
                <button
                  key={role}
                  role="tab"
                  aria-selected={i === roleIdx}
                  aria-label={role}
                  onClick={() => setRoleIdx(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === roleIdx ? "22px" : "7px",
                    height: "7px",
                    background: i === roleIdx ? "#34d399" : "var(--dot-idle)",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* 4. Short Bio / Value Proposition */}
          <motion.p variants={reduce ? undefined : item} className="mt-6 max-w-2xl text-sm leading-relaxed text-ink-2 md:text-base">
            {t.bio[lang]}
          </motion.p>

          {/* 5. CTA — magnetik */}
          <motion.div variants={reduce ? undefined : item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-invert px-6 py-3 text-sm font-semibold text-on-invert transition-[background-color,translate] duration-200 hover:-translate-y-0.5 hover:bg-invert-hover"
              >
                {t.viewProjects[lang]}
                <ArrowRight size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={PROFILE.cvUrl}
                download={CV_FILENAME}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-chip px-6 py-3 text-sm font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-elevated-hover"
              >
                {t.downloadCv[lang]}
                <Download size={16} />
              </a>
            </Magnetic>
          </motion.div>

          {/* 6. Social & Email */}
          <motion.div variants={reduce ? undefined : item} className="mt-8 flex items-center gap-3 border-t border-hairline pt-6">
            {socials.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("#") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                whileHover={reduce ? undefined : { y: -3 }}
                whileTap={reduce ? undefined : { scale: 0.92 }}
                className="rounded-full bg-chip p-2.5 text-ink-2 transition-colors duration-200 hover:bg-elevated-hover hover:text-ink"
              >
                <Icon size={18} />
              </motion.a>
            ))}
            <span className="ml-1 hidden text-xs text-ink-3 sm:block">
              {PROFILE.email}
            </span>
          </motion.div>

          {/* 7. Tech stack */}
          <motion.div variants={reduce ? undefined : item} className="mt-8 border-t border-hairline pt-6">
            <div className="flex flex-wrap gap-2">
              {CORE_TECHS.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-chip px-3 py-1 text-[0.7rem] font-medium text-ink-2 transition-colors duration-200 hover:bg-elevated-hover hover:text-ink"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
