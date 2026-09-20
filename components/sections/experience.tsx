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
      id: "Bertindak sebagai Mobile Developer Intern, bertanggung jawab merestrukturisasi dan membangun fitur aplikasi seluler agar memiliki performa tinggi, responsif, dan stabil di lingkungan produksi. Dalam pengembangannya menggunakan Flutter, melakukan slicing UI dari desain Figma dan merombak arsitektur manajemen state dari setState ke BLoC dengan penerapan Clean Architecture. Turut mengintegrasikan sistem otentikasi berlapis via Google OAuth, fitur background audio playback untuk hafalan Quran, penanganan error/interceptor API, serta sistem penyimpanan lokal berbasis Sqflite dan SharedPreferences. Langkah ini berhasil menghilangkan widget rebuild yang redundan, memperhalus transisi antarhalaman, dan memastikan aplikasi tetap tangguh berjalan saat koneksi internet lemah atau offline.",
      en: "As a Mobile Developer Intern, responsible for restructuring and building mobile app features for high performance, responsiveness, and production stability. Built with Flutter, sliced UI from Figma designs, and overhauled state management from setState to BLoC with Clean Architecture. Also integrated layered authentication via Google OAuth, background audio playback for Quran memorization, API error-handling/interceptors, and local storage with Sqflite and SharedPreferences. This eliminated redundant widget rebuilds, smoothed screen transitions, and kept the app resilient on weak or offline connections.",
    },
    tags: ["Flutter", "BLoC", "Clean Architecture", "OAuth", "Sqflite"],
    Icon: Smartphone,
    latest: true,
  },
  {
    company: "BLSDM Komdigi Bandung",
    role: { id: "Information Technology Support Intern", en: "Information Technology Support Intern" },
      date: { id: "Maret 2026 - Juni 2026", en: "March 2026 - June 2026" },
    narrative: {
      id: "Sebagai Information Technology Support Intern, bertanggung jawab menganalisis, merancang, dan mengoptimalkan infrastruktur jaringan kantor untuk menjamin konektivitas yang stabil, aman, dan siap diekspansi. Menggunakan perangkat simulasi Packet Tracer dan GNS3, merancang topologi jaringan hierarkis, mengoptimalkan segmentasi VLAN, serta melakukan wireless site survey dan channel switching untuk mengatasi masalah handoff delay dan interferensi pada Access Point. Berkolaborasi dengan tim IT, berhasil memangkas latensi jaringan secara signifikan dari ~140 ms menjadi 17–19 ms, meningkatkan throughput hingga lebih dari 150 Mbps dengan 0% packet loss, serta mengeliminasi risiko kesalahan konfigurasi sebelum diterapkan di lingkungan operasional nyata.",
      en: "As an Information Technology Support Intern, responsible for analyzing, designing, and optimizing office network infrastructure for stable, secure, expandable connectivity. Using Packet Tracer and GNS3 simulation tools, designed a hierarchical network topology, optimized VLAN segmentation, and performed wireless site surveys plus channel switching to resolve Access Point handoff delays and interference. Collaborating with the IT team, successfully cut network latency significantly from ~140 ms to 17–19 ms, raised throughput to over 150 Mbps with 0% packet loss, and eliminated configuration error risks before production rollout.",
    },
    tags: ["TCP/IP", "VLAN", "GNS3", "Wireless Survey", "Network Topology"],
    Icon: Wifi,
  },
  {
    company: "I Channel TV Bandung",
    role: { id: "Assistant Producer Intern", en: "Assistant Producer Intern" },
      date: { id: "April 2022 - Juni 2022", en: "April 2022 - June 2022" },
    narrative: {
      id: "Mengemban peran sebagai Assistant Producer Intern, berfokus pada pengelolaan dan pengawasan alur kerja (workflow) produksi siaran televisi harian agar berjalan sesuai jadwal yang terstruktur dan memenuhi standar kualitas penyiaran. Dalam tugas harian, memfasilitasi komunikasi lintas fungsi (cross-functional communication) antara tim kreatif, teknis, dan talent, guna mengoordinasikan eksekusi lini masa proyek siaran tanpa kendala. Pengalaman ini terbukti mengasah kemampuan project management, kepemimpinan operasional, serta komunikasi strategis yang sangat mendukung eksekusi proyek-proyek teknis secara disiplin dan terorganisasi.",
      en: "As an Assistant Producer Intern, focused on managing and supervising daily television broadcast production workflows to run on a structured schedule meeting broadcast quality standards. Facilitated cross-functional communication across creative, technical, and talent teams to coordinate seamless project timeline execution. This experience honed project management, operational leadership, and strategic communication skills that strongly support disciplined, organized execution of technical projects.",
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
          <p className="mb-2 text-xs font-bold tracking-[0.22em] text-zinc-500 uppercase">
            {lang === "id" ? "Jejak Karier" : "Career Path"}
          </p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl font-black tracking-tight text-zinc-100 sm:text-4xl md:text-5xl"
          >
            {lang === "id" ? "Teruji di " : "Tested in "}
            <span className="font-bold text-zinc-400 italic">
              {lang === "id" ? "lingkungan nyata." : "real environments."}
            </span>
          </h2>
        </div>

        {/* Jalur tracking vertikal */}
        <div ref={timelineRef} className="relative">
          <div
            aria-hidden
            className="absolute top-2 bottom-8 left-[23px] w-px bg-zinc-800 md:left-[27px]"
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
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-sm transition-colors duration-300 md:h-14 md:w-14 ${
                      latest
                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 shadow-[0_0_28px_-6px_rgba(52,211,153,0.5)]"
                        : "border-zinc-700 bg-zinc-900 text-zinc-300"
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
                <article className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-zinc-600 hover:shadow-2xl hover:shadow-black/40 md:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 px-3 py-1 text-[0.7rem] font-semibold text-zinc-300">
                      <CalendarDays size={12} />
                      {date[lang]}
                    </span>
                    {latest && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[0.7rem] font-bold text-emerald-400">
                        {lang === "id" ? "● Terbaru" : "● Latest"}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold tracking-tight text-zinc-100 md:text-xl">
                    {company}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-zinc-400">
                    {role[lang]}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {narrative[lang]}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-zinc-800/80 pt-5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-zinc-800/80 bg-zinc-900 px-3 py-1 text-[0.7rem] font-medium text-zinc-400"
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
