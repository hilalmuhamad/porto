"use client";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/* Bilah kemajuan baca di paling atas halaman — indikator halus
   seberapa jauh pengunjung menelusuri portofolio. */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, originX: 0 }}
      className="fixed top-0 left-0 z-[210] h-[2px] w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500/40"
    />
  );
}
