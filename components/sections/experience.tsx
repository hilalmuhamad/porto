"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Wifi, Smartphone, Tv, CalendarDays } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import { useScrollReveal } from "@/lib/useScrollReveal";

type TimelineItem = {
  company: string;
  short: string;
  role: { id: string; en: string };
  date: { id: string; en: string };
  narrative: { id: string; en: string };
  tags: string[];
  Icon: typeof Wifi;
  latest?: boolean;
};

/* Urutan kronologis terbalik (terbaru dulu) — data sama, UI vertical tabs */
const TIMELINE: TimelineItem[] = [
  {
    company: "Maqdis Academy",
    short: "Maqdis",
    role: { id: "Mobile Developer Intern", en: "Mobile Developer Intern" },
    date: { id: "Juni 2026 – September 2026", en: "June 2026 – September 2026" },
    narrative: {
      id: "Berfokus pada pengembangan modul antarmuka utama aplikasi seluler pendidikan menggunakan framework Flutter. Membangun berbagai fitur kompleks, termasuk sistem pencarian tajwid, direktori program pelatihan, hingga pemutar audio khusus yang mendukung Background Playback secara native. Pekerjaan juga mencakup integrasi REST API untuk mendukung fitur E-Course, memfasilitasi pelacakan progres kelas privat, unggahan data hafalan, serta penerapan sistem local storage (caching) agar aplikasi tetap stabil dan dapat memutar audio meskipun dalam keadaan offline. Seluruh alur data dan integrasi API diuji secara menyeluruh menggunakan Postman dan mobile debugging tools guna memastikan konsistensi data dan kelancaran fitur notifikasi pengingat ibadah.",
      en: "Focused on developing the main interface modules of an educational mobile application using the Flutter framework. Built several complex features, including a tajwid search system, a training program directory, and a custom audio player supporting native Background Playback. The work also covered REST API integration for the E-Course feature, private class progress tracking, memorization (hafalan) data uploads, and a local storage (caching) system so the app stays stable and keeps playing audio while offline. All data flows and API integrations were thoroughly tested using Postman and mobile debugging tools to ensure data consistency and smooth prayer reminder notifications.",
    },
    tags: ["Flutter", "REST API", "Background Playback", "Local Storage", "Postman"],
    Icon: Smartphone,
    latest: true,
  },
  {
    company: "BLSDM Komdigi Bandung",
    short: "Komdigi",
    role: { id: "Information Technology Support Intern", en: "Information Technology Support Intern" },
    date: { id: "Maret 2026 – Juni 2026", en: "March 2026 – June 2026" },
    narrative: {
      id: "Bertanggung jawab penuh dalam manajemen dan optimalisasi infrastruktur jaringan kantor. Merancang dan mengimplementasikan topologi jaringan hierarkis menggunakan perangkat enterprise-grade seperti access point Ruijie dan Linksys beserta managed access switches. Aktif melakukan pemetaan jangkauan sinyal dan diagnostik jaringan menggunakan perangkat lunak seperti NetSpot, WiFi Analyzer, Speedtest, dan PingPlotter untuk memastikan konektivitas nirkabel yang stabil dengan latensi rendah. Untuk meminimalisasi risiko error pada tahap produksi, menggunakan Cisco Packet Tracer dan GNS3 dalam menyimulasikan segmentasi VLAN serta konfigurasi switch sebelum konfigurasi tersebut diterapkan ke lingkungan kerja nyata.",
      en: "Fully responsible for managing and optimizing the office network infrastructure. Designed and implemented a hierarchical network topology using enterprise-grade devices such as Ruijie and Linksys access points alongside managed access switches. Actively performed signal coverage mapping and network diagnostics using tools such as NetSpot, WiFi Analyzer, Speedtest, and PingPlotter to ensure stable wireless connectivity with low latency. To minimize production-stage errors, used Cisco Packet Tracer and GNS3 to simulate VLAN segmentation and switch configuration before applying them to the live environment.",
    },
    tags: ["Ruijie / Linksys", "NetSpot", "PingPlotter", "Cisco Packet Tracer", "VLAN"],
    Icon: Wifi,
  },
  {
    company: "I Channel TV Bandung",
    short: "I Channel",
    role: { id: "Assistant Producer Intern", en: "Assistant Producer Intern" },
    date: { id: "April 2022 – Juni 2022", en: "April 2022 – June 2022" },
    narrative: {
      id: "Bertugas mengelola alur kerja produksi televisi harian secara terstruktur bersama tim Senior Producer. Fokus utama pekerjaan adalah memastikan ketepatan jadwal produksi dan memastikan seluruh proses mematuhi standar kualitas penyiaran yang ketat. Melalui peran ini, kemampuan komunikasi strategis diasah dengan mengoordinasikan berbagai fungsi lintas divisi — mulai dari tim kreatif, teknis, hingga para talent — untuk menjamin seluruh proyek penyiaran dieksekusi dengan lancar sesuai tenggat waktu yang ditetapkan.",
      en: "Managed the daily television production workflow in a structured manner alongside the Senior Producer team. The main focus was ensuring production schedule accuracy and that every process complied with strict broadcast quality standards. Through this role, strategic communication skills were sharpened by coordinating cross-divisional functions — from creative and technical teams to on-air talent — to ensure every broadcast project was executed smoothly within the set deadlines.",
    },
    tags: ["TV Production", "Scheduling", "Cross-team Coordination"],
    Icon: Tv,
  },
];

/* Judul: muncul kata demi kata */
const titleContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const titleWord = {
  hidden: { opacity: 0, y: "60%", filter: "blur(8px)" },
  show: {
    opacity: 1, y: "0%", filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Experience() {
  const { lang } = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const item = TIMELINE[active];

  useScrollReveal();

  const headA = lang === "id" ? "Belajar dari" : "Learning from";
  const headB = lang === "id" ? "sistem yang berjalan." : "systems already running.";

  return (
    <section id="experience" className="relative overflow-hidden px-4 py-20 sm:px-6 md:py-24">
      {/* Splash latar: aurora + grid saat section masuk */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.9 }}
          whileInView={reduce ? undefined : { opacity: 0.55, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-500/[0.12] blur-[120px]"
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 55% at 50% 0%, black 25%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 0%, black 25%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-5xl">
        {/* Header — judul muncul kata demi kata */}
        <div className="mb-10 md:mb-12">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="mb-3 inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-ink-3 uppercase"
          >
            <span className="h-px w-6 bg-emerald-400" />
            {lang === "id" ? "Pengalaman" : "Experience"}
          </motion.p>

          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl"
          >
            <motion.span
              variants={reduce ? undefined : titleContainer}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={{ once: true, amount: 0.6 }}
              className="inline-flex flex-wrap gap-x-3"
            >
              {headA.split(" ").map((w, i) => (
                <span key={`${w}-${i}`} className="inline-block overflow-hidden py-0.5">
                  <motion.span variants={reduce ? undefined : titleWord} className="inline-block">
                    {w}
                  </motion.span>
                </span>
              ))}
              <span className="inline-block overflow-hidden py-0.5">
                <motion.span variants={reduce ? undefined : titleWord} className="inline-block font-bold text-ink-2 italic">
                  {headB}
                </motion.span>
              </span>
            </motion.span>
          </h2>
        </div>

        {/* ── Vertical Tabs ── */}
        <div className="grid gap-6 md:grid-cols-[250px_1fr] md:gap-8">
          {/* Tab list: horizontal scroll di mobile, vertikal di desktop */}
          <div
            role="tablist"
            aria-label={lang === "id" ? "Daftar perusahaan" : "Company list"}
            className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:gap-1.5 md:overflow-visible md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TIMELINE.map(({ company, short, Icon, latest }, i) => {
              const selected = i === active;
              return (
                <button
                  key={company}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={`relative flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 md:w-full ${
                    selected ? "text-ink" : "text-ink-3 hover:bg-chip hover:text-ink-2"
                  }`}
                >
                  {/* indikator aktif fluid */}
                  {selected && !reduce && (
                    <motion.span
                      layoutId="exp-tab-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      className="absolute inset-0 rounded-2xl border border-hairline bg-card shadow-card"
                    />
                  )}
                  {selected && reduce && (
                    <span className="absolute inset-0 rounded-2xl border border-hairline bg-card shadow-card" />
                  )}
                  <span
                    className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                      selected ? "bg-emerald-500/[0.14] text-emerald-300" : "bg-elevated text-ink-3"
                    }`}
                  >
                    <Icon size={17} />
                    {latest && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                    )}
                  </span>
                  <span className="relative min-w-0">
                    <span className="block truncate text-sm font-bold">
                      {short}
                    </span>
                    <span className="block truncate text-[0.68rem] font-medium opacity-70">
                      {company}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel konten */}
          <div className="relative min-h-[380px] overflow-hidden rounded-3xl bg-card shadow-card backdrop-blur-sm md:min-h-[420px]">
            <span
              aria-hidden
              className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[var(--line-strong)] to-transparent"
            />
            <AnimatePresence mode="wait">
              <motion.article
                key={`${active}-${lang}`}
                role="tabpanel"
                initial={reduce ? false : { opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -18 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-8 md:p-10"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-chip px-3 py-1 text-[0.7rem] font-semibold text-ink-2">
                    <CalendarDays size={12} />
                    {item.date[lang]}
                  </span>
                  {item.latest && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/[0.14] px-3 py-1 text-[0.7rem] font-bold text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      {lang === "id" ? "Terbaru" : "Latest"}
                    </span>
                  )}
                  <span className="ml-auto hidden text-[0.72rem] font-bold tracking-[0.14em] text-ink-4 tabular-nums sm:block">
                    0{active + 1} / 0{TIMELINE.length}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-ink md:text-2xl">
                  {item.company}
                </h3>
                <p className="mt-1.5 text-sm font-semibold text-emerald-400 md:text-[0.95rem]">
                  {item.role[lang]}
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-2 md:leading-loose">
                  {item.narrative[lang]}
                </p>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-5">
                  {item.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                      className="rounded-full bg-chip px-3 py-1 text-[0.7rem] font-medium text-ink-2 transition-colors duration-200 hover:bg-emerald-500/[0.12] hover:text-ink"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
