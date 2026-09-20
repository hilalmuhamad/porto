/* ── Single source of truth.
   Semua angka statistik dihitung dari data ini — tambah/kurangi item di sini,
   seluruh tampilan (Hero, Stats grid) ikut berubah otomatis. ── */

export const PROFILE = {
  name: "Hilal Muhamad",
  fullName: "Hilal Muhamad Abdul Gani",
  shortCardName: "Hilal Muhamad A. G.",
  gpa: "3.72",
  gpaScale: "4.00",
  email: "hilalabdulgani@gmail.com",
  github: "https://github.com/hilalmuhamad",
  linkedin: "https://www.linkedin.com/in/hilal-muhamad/",
  cvUrl: "/CV_Hilal_Muhamad.pdf",
} as const;

export type Project = {
  emoji: string;
  label: string;
  title: string;
  tags: string[];
  desc: string;
  link: string;
  role: string;
  date: string;
  highlight?: boolean;
};

/* Proyek yang ditampilkan sebagai kartu */
export const PROJECTS: Project[] = [
  {
    emoji: "📊", label: "Featured · Final Project — ULBI",
    title: "Tracer Study Data Warehouse & OLAP Analytics",
    tags: ["Laravel", "PostgreSQL", "Star Schema", "ETL", "OLAP", "React / TailAdmin"],
    desc: "Solves slow institutional reporting: HTAP design keeps OLTP fast during heavy analytics. Automated ETL (100% integrity, 0 orphan records), yearly partitioning + BRIN indexes, and full OLAP — Roll-up, Slice, Dice, Drill-down for employability KPIs (alignment, waiting period).",
    link: "https://github.com/hilalmuhamad/tugas_akhir.git",
    role: "Fullstack Developer · Star Schema DWH", date: "2025 – 2026",
    highlight: true,
  },
  {
    emoji: "🐛", label: "Backend & Infra — Production Scale",
    title: "Maggot Cycle – Distributed Backend for Waste Reporting",
    tags: ["Golang (Fiber)", "Podman", "Nginx LB", "PostgreSQL Replication", "Cloudflare WAF"],
    desc: "Handles high-concurrency reports from hundreds of B2B kitchens. Dual Go services behind Nginx LB + Master-Slave replication (RPO near-zero, RTO <1h). Multi-layer hardening (JWT, WAF, Suricata, Fail2Ban, Tailscale) — load-tested: 0% error, 0 exposed ports (Nmap verified).",
    link: "https://github.com/bpmthm/maggot-cycle",
    role: "Backend / Infra Engineer", date: "Jan 2026",
  },
  {
    emoji: "📱", label: "Mobile · Flutter — BLoC / Clean Arch",
    title: "Focus Talk – Smart Intervention & Micro-Learning",
    tags: ["Flutter", "FastAPI / Python", "UsageStatsManager", "WindowManager"],
    desc: "Fights digital procrastination on-device. Heuristic engine detects distraction apps (Instagram, TikTok) and overlays a non-blocking English micro-quiz (WindowManager) as a soft-gate — with FastAPI backend for scores & leaderboard gamification.",
    link: "https://github.com/rdwnsyh/focustalk_app.git",
    role: "Mobile Developer", date: "Nov 2025 – Feb 2026",
  },
  {
    emoji: "🏥", label: "Full-Stack — Health Tech",
    title: "MediTech – Integrated Digital Health Management",
    tags: ["Node.js", "Express.js", "MongoDB", "React.js", "Flutter", "JWT / RBAC"],
    desc: "Secure, real-time telemedicine ecosystem: React.js admin dashboard + Flutter patient app. JWT authentication + RBAC for sensitive medical data, ready for Socket.IO chat consultation at scale.",
    link: "https://github.com/hilalmuhamad/app-klinik-kita.git",
    role: "Fullstack Developer", date: "Jun – Aug 2025",
  },
];

/* Proyek selesai lain yang tidak ditampilkan sebagai kartu
   (tetap dihitung di statistik total) */
export const ARCHIVED_PROJECTS: Pick<Project, "title" | "date">[] = [
  { title: "GBLA Stadium Ticketing Platform", date: "Nov 2024 – Feb 2025" },
  { title: "Portfolio Website — Next.js", date: "2026" },
];

export type Experience = {
  company: string;
  date: string;
  role: string;
  kind: "internship" | "organizational";
  bullets: string[];
  tags: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    company: "Maqdis Academy", date: "Jun – Sep 2026",
    role: "Mobile Developer Intern", kind: "internship",
    bullets: [
      "Refactored state management dari setState ke BLoC + Clean Architecture — eliminate redundant rebuilds, smoother transitions, improved stability.",
      "Sliced UI Hafalan (Quran memorization) dari Figma + implement background audio playback (tetap jalan saat app minimize/locked).",
      "Integrated multi-layer auth (Google OAuth, deep linking, multi-tier session persistence) dengan error boundaries & fallback states.",
      "Built modular responsive components + API interceptor & local caching (Sqflite, SharedPreferences) — resilient saat offline/poor network.",
    ],
    tags: ["Flutter", "BLoC", "Clean Architecture", "OAuth", "Sqflite"],
  },
  {
    company: "BLSDM Komdigi Bandung", date: "Mar – Jun 2026",
    role: "IT Support Intern", kind: "internship",
    bullets: [
      "Wireless site survey sistematis: speed testing, channel scanning, interference analysis & channel switching — resolve AP handoff delay (co-channel interference) → latency ~140ms → 17–19ms, throughput >150 Mbps, 0% packet loss.",
      "Designed hierarchical office network topology untuk scalable access switches per lantai — expansion tanpa service disruption.",
      "Optimized VLAN segmentation via Packet Tracer/GNS3 simulations prior to deployment — minimize config errors & rollout risk.",
    ],
    tags: ["TCP/IP", "VLAN", "GNS3", "Wireless Survey", "Network Topology"],
  },
  {
    company: "I Channel TV Bandung", date: "Apr – Jun 2022",
    role: "Assistant Producer Intern", kind: "internship",
    bullets: [
      "Managed daily TV production workflows alongside Senior Producer — structured scheduling & broadcasting QA adherence.",
      "Coordinated cross-functional creative/technical/talent teams — seamless execution of timelines.",
    ],
    tags: ["TV Production", "Scheduling", "Cross-team Coordination"],
  },
  {
    company: "HIMATIF ULBI", date: "Mar 2025 – Present",
    role: "Staff Public Relations (Organizational)", kind: "organizational",
    bullets: [
      "Initiated “Safari Himpunan” comparative study dengan asosiasi eksternal; liaison sponsor korporat & partnership negotiation.",
      "Delivered sponsorship prospecting training ke 10–30 anggota — framework identifikasi & approach sponsor.",
    ],
    tags: ["Public Relations", "Partnership", "Leadership"],
  },
  {
    company: "K-Radio ULBI", date: "Mar 2025 – Present",
    role: "Head of Media Design Division (Organizational)", kind: "organizational",
    bullets: [
      "Led creative team — consistent visual identity across social platforms; increased engagement via compelling graphics.",
    ],
    tags: ["Creative Leadership", "Visual Design", "Social Media"],
  },
];

/* Sorotan "Proyek & Pengabdian": 1 flagship + 1 pengabdian masyarakat */
export const SERVICE_HIGHLIGHTS = [
  { title: "Tracer Study — Final Project (ULBI)" },
  { title: "PKM — Laravel Bootcamp @ SMKN 2 Cimahi" },
];

/* 9 teknologi inti (sesuai CV) */
export const CORE_TECHS = [
  "Flutter", "Laravel", "React.js", "Node.js", "Express.js",
  "PostgreSQL", "MongoDB", "Golang", "Git",
];

/* ── Statistik dinamis ── */
const internships = EXPERIENCES.filter((e) => e.kind === "internship");
const magang2026 = internships.filter((e) => e.date.includes("2026"));

export const STATS = {
  internshipCount: internships.length,                       // → 3
  magang2026Count: magang2026.length,                         // → 2
  serviceCount: SERVICE_HIGHLIGHTS.length,                    // → 2
  techCount: CORE_TECHS.length,                               // → 9
  displayedProjects: PROJECTS.length,                         // → 4
  totalCompleted: PROJECTS.length + ARCHIVED_PROJECTS.length, // → 6
  gpa: PROFILE.gpa,
  gpaScale: PROFILE.gpaScale,
} as const;
