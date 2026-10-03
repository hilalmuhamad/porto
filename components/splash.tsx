"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ── SplashScreen: "Minimalist Code Typing" ──
   Mengetik `<Hilal Muhamad />` lalu jeda singkat, lalu seluruh layar
   memudar ke atas dan halaman utama muncul.
   - Sekali per sesi (sessionStorage) → tidak mengganggu navigasi/SEO.
   - Dilewati otomatis untuk prefers-reduced-motion.
   - Overlay murni klien; konten halaman tetap ter-render (SSR) di belakangnya. */
const CODE = "<Hilal Muhamad />";

export default function Splash() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) { setShow(false); return; }
    if (sessionStorage.getItem("splashShown") === "1") { setShow(false); return; }

    document.body.style.overflow = "hidden";
    const TYPE_MS = 55;
    let i = 0;
    const typer = setInterval(() => {
      i += 1;
      setTyped(CODE.slice(0, i));
      if (i >= CODE.length) {
        clearInterval(typer);
        setDone(true);
        /* jeda sejenak setelah selesai mengetik, lalu tutup */
        setTimeout(() => {
          sessionStorage.setItem("splashShown", "1");
          setShow(false);
        }, 900);
      }
    }, TYPE_MS);

    return () => clearInterval(typer);
  }, [reduce]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -48, filter: "blur(10px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden bg-panel"
        >
          {/* aurora redup */}
          <motion.div
            aria-hidden
            className="absolute h-[420px] w-[420px] rounded-full bg-[var(--orb-accent)] blur-[120px]"
            animate={{ scale: [0.92, 1.06, 0.95], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
              maskImage: "radial-gradient(ellipse 60% 55% at 50% 50%, black 20%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 50%, black 20%, transparent 75%)",
            }}
          />

          {/* jendela kode mini */}
          <div className="relative flex items-center gap-3 rounded-2xl border border-hairline bg-card px-5 py-4 shadow-card backdrop-blur-sm">
            <span aria-hidden className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </span>
            <span aria-hidden className="h-5 w-px bg-line" />
            <code
              className="text-sm font-semibold tracking-tight text-ink sm:text-base"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {typed.split("").map((ch, i) => (
                <span key={i} className={/[<>/]/.test(ch) ? "text-emerald-400" : "text-ink"}>
                  {ch}
                </span>
              ))}
              {/* kursor berkedip */}
              <motion.span
                aria-hidden
                className="ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-emerald-400"
                animate={{ opacity: done ? [1, 0, 1] : 1 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
              />
            </code>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: done ? 1 : 0.35 }}
            transition={{ duration: 0.4 }}
            className="relative mt-5 text-[0.62rem] font-bold tracking-[0.24em] text-ink-4 uppercase"
          >
            Portfolio
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
