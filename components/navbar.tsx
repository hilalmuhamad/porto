"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowUpRight } from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";
import { useLanguage, STR, type Lang } from "@/lib/LanguageProvider";
import { PROFILE } from "@/lib/portfolio";

/* ── Pemilih bahasa ID / EN ── */
function LangSwitch({ full = false }: { full?: boolean }) {
  const { lang, setLang } = useLanguage();
  const opts: Lang[] = ["id", "en"];
  return (
    <div
      role="group"
      aria-label="Language / Bahasa"
      className={`flex items-center gap-0.5 rounded-full bg-chip p-0.5 ${
        full ? "w-full" : ""
      }`}
    >
      {opts.map((o) => {
        const on = lang === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => setLang(o)}
            aria-pressed={on}
            className={`rounded-full text-[0.66rem] font-bold tracking-[0.06em] transition-colors duration-200 ${
              full ? "flex-1 py-2.5 text-[0.75rem]" : "px-2.5 py-1.5"
            } ${on ? "bg-invert text-on-invert" : "text-ink-2 hover:text-ink"}`}
          >
            {o.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { lang } = useLanguage();
  const NAV_LINKS = STR.nav.links[lang];
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  /* Bayangan & kerapatan pill mengikuti posisi scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Sorotan menu aktif — semua section yang punya tautan navigasi */
  useEffect(() => {
    const ids = ["hero", "about", "projects", "experience", "education", "skills", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* Kunci scroll + tutup dengan Esc saat menu mobile terbuka */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  const linkClass = (href: string) => {
    const isActive = active === href.replace("#", "");
    return `relative rounded-full px-3.5 py-2 text-[0.78rem] font-medium transition-colors duration-200 ${
      isActive ? "bg-chip text-ink" : "text-ink-2 hover:bg-chip hover:text-ink"
    }`;
  };

  return (
    <>
      <motion.nav
        aria-label="Primary"
        initial={reduce ? false : { opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: "-50%" }}
        className={`fixed left-1/2 z-[200] flex max-w-[96vw] items-center gap-1 rounded-full bg-overlay shadow-card p-1.5 pl-2 backdrop-blur-xl transition-[top,box-shadow] duration-300 ${
          scrolled ? "top-3 shadow-2xl shadow-black/25" : "top-4"
        }`}
      >
        {/* Logo + nama */}
        <a
          href="#hero"
          aria-label="Hilal Muhamad — Home"
          className="flex shrink-0 items-center gap-2.5 rounded-full pr-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60"
        >
          <span
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-invert text-[0.9rem] font-extrabold text-on-invert"
          >
            H
          </span>
          <span className="hidden text-[0.82rem] font-bold tracking-tight text-ink sm:block">
            Hilal
          </span>
        </a>

        <span aria-hidden className="mx-1 hidden h-4 w-px bg-line lg:block" />

        {/* Tautan desktop */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              aria-current={active === href.replace("#", "") ? "true" : undefined}
              className={linkClass(href)}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Aksi */}
        <div className="ml-1 flex shrink-0 items-center gap-1.5">
          <LangSwitch />

          <a
            href="#contact"
            onClick={close}
            className="hidden items-center gap-1.5 rounded-full bg-invert px-4 py-2 text-[0.75rem] font-bold text-on-invert transition-transform duration-200 hover:-translate-y-0.5 md:inline-flex"
          >
            {STR.nav.contact[lang]}
            <ArrowUpRight size={13} />
          </a>

          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "light" ? STR.nav.toDark[lang] : STR.nav.toLight[lang]}
            title={theme === "light" ? STR.nav.toDark[lang] : STR.nav.toLight[lang]}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-chip text-ink-2 transition-colors duration-200 hover:text-ink"
          >
            {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? STR.nav.closeMenu[lang] : STR.nav.openMenu[lang]}
            aria-expanded={open}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-chip text-ink-2 transition-colors duration-200 hover:text-ink lg:hidden"
          >
            {open ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Menu mobile ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              aria-label={STR.nav.closeMenu[lang]}
              className="fixed inset-0 z-[198] cursor-default bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-label={STR.nav.menuLabel[lang]}
              initial={reduce ? false : { opacity: 0, y: -14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[4.5rem] left-1/2 z-[199] w-[min(92vw,380px)] -translate-x-1/2 rounded-3xl bg-overlay shadow-card p-3 backdrop-blur-xl lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map(({ label, href }) => {
                  const isActive = active === href.replace("#", "");
                  return (
                    <a
                      key={href}
                      href={href}
                      onClick={close}
                      className={`flex items-center justify-between rounded-2xl px-4 py-3 text-[0.88rem] font-medium transition-colors duration-200 ${
                        isActive
                          ? "bg-chip text-ink"
                          : "text-ink-2 hover:bg-chip hover:text-ink"
                      }`}
                    >
                      {label}
                      <ArrowUpRight
                        size={14}
                        className={isActive ? "text-emerald-400" : "text-ink-4"}
                      />
                    </a>
                  );
                })}
              </div>

              <div className="my-3 h-px bg-line" />

              <div className="flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={close}
                  className="flex items-center justify-center gap-1.5 rounded-2xl bg-invert px-4 py-3 text-[0.8rem] font-bold text-on-invert"
                >
                  {STR.nav.contact[lang]}
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href={PROFILE.cvUrl}
                  download="CV_Hilal_Muhamad.pdf"
                  onClick={close}
                  className="rounded-2xl bg-chip px-4 py-3 text-center text-[0.8rem] font-semibold text-ink transition-colors duration-200 hover:bg-elevated-hover"
                >
                  {STR.nav.downloadCv[lang]}
                </a>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <LangSwitch full />
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={theme === "light" ? STR.nav.toDark[lang] : STR.nav.toLight[lang]}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-chip text-ink-2 transition-colors duration-200 hover:text-ink"
                >
                  {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
