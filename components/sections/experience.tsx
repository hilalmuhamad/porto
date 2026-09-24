"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Wifi, Smartphone, Tv, CalendarDays } from "lucide-react";
import { useLanguage } from "@/lib/LanguageProvider";
import { useScrollReveal } from "@/lib/useScrollReveal";

type TimelineItem = {
  company: string;
  role: { id: string; en: string };
  date: { id: string; en: string };
  narrative: { id: string; en: string };
  tags: string[];
  Icon: typeof Wifi;
  latest?: boolean;
};

/* Urutan kronologis terbalik (terbaru dulu) */
const TIMELINE: TimelineItem[] = [
  {
    company: "Maqdis Academy",
    role: { id: "Mobile Developer Intern", en: "Mobile Developer Intern" },
      date: { id: "Juni 2026 - September 2026", en: "June 2026 - September 2026" },
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
    role: { id: "Information Technology Support Intern", en: "Information Technology Support Intern" },
      date: { id: "Maret 2026 - Juni 2026", en: "March 2026 - June 2026" },
    narrative: {
      id: "Bertanggung jawab penuh dalam manajemen dan optimalisasi infrastruktur jaringan kantor. Merancang dan mengimplementasikan topologi jaringan hierarkis menggunakan perangkat enterprise-grade seperti access point Ruijie dan Linksys beserta managed access switches. Aktif melakukan pemetaan jangkauan sinyal dan diagnostik jaringan menggunakan perangkat lunak seperti NetSpot, WiFi Analyzer, Speedtest, dan PingPlotter untuk memastikan konektivitas nirkabel yang stabil dengan latensi rendah. Untuk meminimalisasi risiko error pada tahap produksi, menggunakan Cisco Packet Tracer dan GNS3 dalam menyimulasikan segmentasi VLAN serta konfigurasi switch sebelum konfigurasi tersebut diterapkan ke lingkungan kerja nyata.",
      en: "Fully responsible for managing and optimizing the office network infrastructure. Designed and implemented a hierarchical network topology using enterprise-grade devices such as Ruijie and Linksys access points alongside managed access switches. Actively performed signal coverage mapping and network diagnostics using tools such as NetSpot, WiFi Analyzer, Speedtest, and PingPlotter to ensure stable wireless connectivity with low latency. To minimize production-stage errors, used Cisco Packet Tracer and GNS3 to simulate VLAN segmentation and switch configuration before applying them to the live environment.",
    },
    tags: ["Ruijie / Linksys", "NetSpot", "PingPlotter", "Cisco Packet Tracer", "VLAN"],
    Icon: Wifi,
  },
  {
    company: "I Channel TV Bandung",
    role: { id: "Assistant Producer Intern", en: "Assistant Producer Intern" },
      date: { id: "April 2022 - Juni 2022", en: "April 2022 - June 2022" },
    narrative: {
      id: "Bertugas mengelola alur kerja produksi televisi harian secara terstruktur bersama tim Senior Producer. Fokus utama pekerjaan adalah memastikan ketepatan jadwal produksi dan memastikan seluruh proses mematuhi standar kualitas penyiaran yang ketat. Melalui peran ini, kemampuan komunikasi strategis diasah dengan mengoordinasikan berbagai fungsi lintas divisi — mulai dari tim kreatif, teknis, hingga para talent — untuk menjamin seluruh proyek penyiaran dieksekusi dengan lancar sesuai tenggat waktu yang ditetapkan.",
      en: "Managed the daily television production workflow in a structured manner alongside the Senior Producer team. The main focus was ensuring production schedule accuracy and that every process complied with strict broadcast quality standards. Through this role, strategic communication skills were sharpened by coordinating cross-divisional functions — from creative and technical teams to on-air talent — to ensure every broadcast project was executed smoothly within the set deadlines.",
    },
    tags: ["TV Production", "Scheduling", "Cross-team Coordination"],
    Icon: Tv,
  },
];

export default function Experience() {
  const { lang } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 22%"],
  });
  const timelineProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useScrollReveal();

  return (
    <section id="experience" className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="reveal mb-12 md:mb-14">
          <p className="mb-2 text-xs font-bold tracking-[0.22em] text-ink-3 uppercase">
            {lang === "id" ? "Pengalaman" : "Experience"}
          </p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl"
          >
            {lang === "id" ? "Belajar dari " : "Learning from "}
            <span className="font-bold text-ink-2 italic">
              {lang === "id" ? "sistem yang berjalan." : "systems already running."}
            </span>
          </h2>
        </div>

        {/* Jalur tracking vertikal */}
        <div ref={timelineRef} className="relative">
          <div
            aria-hidden
            className="absolute top-2 bottom-8 left-[23px] w-px bg-line md:left-[27px]"
          >
            <motion.div
              className="absolute inset-x-0 top-0 origin-top bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.55)]"
              style={{ height: "100%", scaleY: timelineProgress }}
            />
          </div>

          <div className="flex flex-col gap-10 md:gap-12">
            {TIMELINE.map(({ company, role, date, narrative, tags, Icon, latest }) => (
              <div key={company} className="reveal relative pl-16 md:pl-20">
                {/* node checkpoint */}
                <div className="absolute top-1 left-0">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl backdrop-blur-sm transition-colors duration-300 md:h-14 md:w-14 ${
                      latest
                        ? "bg-emerald-500/[0.14] text-emerald-300 shadow-[0_0_30px_-6px_rgba(52,211,153,0.45)]"
                        : "bg-elevated text-ink-2 shadow-soft"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  {latest && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                    </span>
                  )}
                </div>

                {/* kartu */}
                <article className="rounded-3xl bg-card shadow-card p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-lift md:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-chip px-3 py-1 text-[0.7rem] font-semibold text-ink-2">
                      <CalendarDays size={12} />
                      {date[lang]}
                    </span>
                    {latest && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/[0.14] px-3 py-1 text-[0.7rem] font-bold text-emerald-400">
                        {lang === "id" ? "● Terbaru" : "● Latest"}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-ink md:text-xl">
                    {company}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-ink-2">
                    {role[lang]}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-ink-2">
                    {narrative[lang]}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-hairline pt-5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-chip px-3 py-1 text-[0.7rem] font-medium text-ink-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
