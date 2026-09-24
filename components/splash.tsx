"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const NAME = "Hilal Muhamad";

/* Splash screen modern:
   - logo & nama muncul berurutan (huruf demi huruf)
   - penghitung persen + garis progres
   - memudar naik saat selesai, sekali per sesi
   - dilewati otomatis untuk prefers-reduced-motion */
export default function Splash() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (reduce) { setShow(false); return; }
    if (sessionStorage.getItem("splashShown") === "1") { setShow(false); return; }

    document.body.style.overflow = "hidden";
    const start = performance.now();
    const DURATION = 1750;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t = setTimeout(() => {
      sessionStorage.setItem("splashShown", "1");
      setShow(false);
    }, DURATION + 120);

    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [reduce]);

  useEffect(() => {
    if (!show) document.body.style.overflow = "";
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden bg-panel"
        >
          {/* aurora latar */}
          <motion.div
            aria-hidden
            className="absolute h-[460px] w-[460px] rounded-full bg-[var(--orb-accent)] blur-[120px]"
            animate={{ scale: [0.9, 1.08, 0.95], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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

          {/* logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 14, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-elevated text-2xl font-extrabold text-ink shadow-[0_0_50px_-12px_rgba(52,211,153,0.45)]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            H
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-2xl border border-emerald-500/30"
              animate={{ scale: [1, 1.35], opacity: [0.55, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.div>

          {/* nama — huruf demi huruf */}
          <div className="relative mt-6 flex overflow-hidden">
            {NAME.split("").map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                initial={{ opacity: 0, y: "70%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.22 + i * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-sm font-semibold tracking-[0.22em] text-ink-2 uppercase"
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </div>

          {/* garis progres + persen */}
          <div className="relative mt-7 flex w-56 flex-col items-center gap-3">
            <div className="h-px w-full overflow-hidden bg-line">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.75, ease: "easeInOut" }}
                style={{ originX: 0 }}
                className="h-full w-full bg-gradient-to-r from-emerald-500/40 via-emerald-400 to-emerald-500/40"
              />
            </div>
            <div className="flex w-full items-center justify-between text-[0.62rem] font-bold tracking-[0.18em] text-ink-4 uppercase">
              <span>Portfolio</span>
              <span className="tabular-nums text-ink-2">{pct}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
