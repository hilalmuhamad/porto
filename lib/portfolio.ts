/* ── Single source of truth.
   Semua angka statistik dihitung dari data ini — tambah/kurangi item di sini,
   seluruh tampilan (Hero, Stats grid) ikut berubah otomatis. ── */

/* Teks yang punya versi Indonesia & Inggris */
export type Localized = { id: string; en: string };

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
  label: Localized;
  title: string;
  tags: string[];
  desc: Localized;
  link: string;
  role: string;
  date: string;
  highlight?: boolean;
  /* Struktur kasus untuk pembaca HRD: masalah → solusi → hasil */
  problem?: Localized;
  solution?: Localized;
  result?: Localized;
  /* Galeri screenshot (path di /public, sudah URL-encoded) */
  images?: string[];
  /* "cover" = penuhi bingkai, "contain" = tampil utuh tanpa terpotong (default) */
  imageFit?: "cover" | "contain";
  demo?: string;
};

/* Proyek yang ditampilkan sebagai kartu */
export const PROJECTS: Project[] = [
  {
    emoji: "📊", label: { id: "Unggulan · Tugas Akhir — ULBI", en: "Featured · Final Project — ULBI" },
    title: "Tracer Study Data Warehouse & OLAP Analytics",
    tags: ["Laravel", "PostgreSQL", "Star Schema", "ETL", "OLAP", "React / TailAdmin"],
    desc: {
      id: "Menyelesaikan pelaporan institusi yang lambat: desain HTAP menjaga OLTP tetap cepat saat analitik berat berjalan. ETL otomatis (integritas 100%, 0 orphan records), partisi per tahun angkatan + indeks BRIN, dan OLAP penuh — Roll-up, Slice, Dice, Drill-down untuk KPI employability (alignment, waiting period).",
      en: "Solves slow institutional reporting: HTAP design keeps OLTP fast during heavy analytics. Automated ETL (100% integrity, 0 orphan records), yearly partitioning + BRIN indexes, and full OLAP — Roll-up, Slice, Dice, Drill-down for employability KPIs (alignment, waiting period).",
    },
    link: "https://github.com/hilalmuhamad/tugas_akhir.git",
    role: "Fullstack Developer · Star Schema DWH", date: "2025 – 2026",
    highlight: true,
    problem: {
      id: "Pelaporan data alumni lambat: query analitik berat menekan database operasional kampus.",
      en: "Alumni reporting was slow: heavy analytical queries pressed the campus operational database.",
    },
    solution: {
      id: "Memisahkan OLTP dan analytical DWH (HTAP) — Star Schema, ETL otomatis, partisi per tahun angkatan, indeks BRIN, plus OLAP Roll-up/Slice/Dice/Drill-down.",
      en: "Separated OLTP from the analytical DWH (HTAP) — Star Schema, automated ETL, partitioning by cohort year, BRIN indexes, plus full OLAP Roll-up/Slice/Dice/Drill-down.",
    },
    result: {
      id: "0% degradasi performa OLTP, 100% integritas relasional (0 orphan records), dashboard KPI employability siap pakai.",
      en: "0% OLTP performance degradation, 100% relational integrity (0 orphan records), employability KPI dashboard ready to use.",
    },
    images: [
      "/Screenshot%202026-08-18%20064319.png",
      "/Screenshot%202026-08-18%20194739.png",
      "/Screenshot%202026-08-18%20194756.png",
      "/Screenshot%202026-08-18%20194811.png",
      "/Screenshot%202026-08-18%20192012.png",
    ],
  },
  {
    emoji: "🐛", label: { id: "Backend & Infra — Skala Produksi", en: "Backend & Infra — Production Scale" },
    title: "Maggot Cycle – Distributed Backend for Waste Reporting",
    tags: ["Golang (Fiber)", "Podman", "Nginx LB", "PostgreSQL Replication", "Cloudflare WAF"],
    desc: {
      id: "Menangani laporan berkonkurensi tinggi dari ratusan dapur mitra B2B. Dua layanan Go di balik Nginx LB + replikasi Master-Slave (RPO mendekati nol, RTO <1 jam). Hardening berlapis (JWT, WAF, Suricata, Fail2Ban, Tailscale) — diuji beban: 0% error, 0 port terekspos (verifikasi Nmap).",
      en: "Handles high-concurrency reports from hundreds of B2B kitchens. Dual Go services behind Nginx LB + Master-Slave replication (RPO near-zero, RTO <1h). Multi-layer hardening (JWT, WAF, Suricata, Fail2Ban, Tailscale) — load-tested: 0% error, 0 exposed ports (Nmap verified).",
    },
    link: "https://github.com/bpmthm/maggot-cycle",
    role: "Backend / Infra Engineer", date: "Jan 2026",
    problem: {
      id: "Laporan sampah organik dari ratusan dapur mitra B2B harus tetap masuk saat trafik memuncak.",
      en: "Organic waste reports from hundreds of B2B partner kitchens had to keep flowing during peak traffic.",
    },
    solution: {
      id: "Dua instance Golang (Fiber) di balik Nginx Load Balancer, Podman containerization, PostgreSQL Master-Slave replication, dan hardening berlapis (JWT, WAF, Suricata, Fail2Ban, Tailscale).",
      en: "Two Golang (Fiber) instances behind an Nginx Load Balancer, Podman containerization, PostgreSQL Master-Slave replication, and layered hardening (JWT, WAF, Suricata, Fail2Ban, Tailscale).",
    },
    result: {
      id: "Load test 0% error, RPO mendekati nol & RTO <1 jam, 0 port internal terekspos (verifikasi Nmap).",
      en: "Load test 0% error, near-zero RPO & RTO <1 hour, 0 internal ports exposed (Nmap verified).",
    },
  },
  {
    emoji: "📱", label: { id: "Mobile · Flutter — BLoC / Clean Arch", en: "Mobile · Flutter — BLoC / Clean Arch" },
    title: "Focus Talk – Smart Intervention & Micro-Learning",
    tags: ["Flutter", "FastAPI / Python", "UsageStatsManager", "WindowManager"],
    desc: {
      id: "Melawan prokrastinasi digital langsung di perangkat. Engine heuristik mendeteksi aplikasi distraksi (Instagram, TikTok) lalu menampilkan kuis micro-learning (WindowManager) sebagai soft-gate — dengan backend FastAPI untuk skor & gamifikasi leaderboard.",
      en: "Fights digital procrastination on-device. Heuristic engine detects distraction apps (Instagram, TikTok) and overlays a non-blocking English micro-quiz (WindowManager) as a soft-gate — with FastAPI backend for scores & leaderboard gamification.",
    },
    link: "https://github.com/rdwnsyh/focustalk_app.git",
    role: "Mobile Developer", date: "Nov 2025 – Feb 2026",
    problem: {
      id: "Prokrastinasi digital mahasiswa sulit dicegah karena aplikasi distraksi dibuka tanpa hambatan.",
      en: "Students' digital procrastination is hard to prevent because distraction apps open without any friction.",
    },
    solution: {
      id: "Engine heuristik berbasis UsageStatsManager mendeteksi aplikasi distraksi, lalu overlay kuis micro-learning (System Alert Window) sebagai soft-gate, dengan backend FastAPI untuk skor & leaderboard.",
      en: "A UsageStatsManager-based heuristic engine detects distraction apps, then overlays a micro-learning quiz (System Alert Window) as a soft-gate, with a FastAPI backend for scores & leaderboard.",
    },
    result: {
      id: "Intervensi real-time di perangkat + lapisan gamifikasi yang menjaga konsistensi belajar pengguna.",
      en: "Real-time on-device intervention plus a gamification layer that keeps users' learning consistent.",
    },
    images: [
      "/home%20ui.jpeg",
      "/home%20ui2.jpeg",
      "/home%20ui3.jpeg",
      "/stats%203.jpeg",
    ],
    imageFit: "contain",
  },
  {
    emoji: "🏥", label: { id: "Full-Stack — Health Tech", en: "Full-Stack — Health Tech" },
    title: "MediTech – Integrated Digital Health Management",
    tags: ["Node.js", "Express.js", "MongoDB", "React.js", "Flutter", "JWT / RBAC"],
    desc: {
      id: "Ekosistem telemedicine yang aman dan real-time: dashboard admin React.js + aplikasi pasien Flutter. Autentikasi JWT + RBAC untuk data medis sensitif, siap untuk konsultasi chat Socket.IO dalam skala besar.",
      en: "Secure, real-time telemedicine ecosystem: React.js admin dashboard + Flutter patient app. JWT authentication + RBAC for sensitive medical data, ready for Socket.IO chat consultation at scale.",
    },
    link: "https://github.com/hilalmuhamad/app-klinik-kita.git",
    role: "Fullstack Developer", date: "Jun – Aug 2025",
    problem: {
      id: "Data medis sensitif perlu dikelola dari dua sisi sekaligus: admin rumah sakit dan pasien.",
      en: "Sensitive medical data had to be managed from two sides at once: hospital admin and patients.",
    },
    solution: {
      id: "Satu backend Node.js/Express + MongoDB melayani dashboard admin React.js dan aplikasi pasien Flutter, diamankan JWT authentication dan Role-Based Access Control.",
      en: "A single Node.js/Express + MongoDB backend serving a React.js admin dashboard and a Flutter patient app, secured with JWT authentication and Role-Based Access Control.",
    },
    result: {
      id: "Dua platform dari satu sumber data, siap dikembangkan ke konsultasi chat real-time via Socket.IO.",
      en: "Two platforms from one data source, ready to extend into real-time chat consultation via Socket.IO.",
    },
    images: [
      "/meditech-1.jpeg",
      "/meditech-2.jpeg",
      "/meditech-3.jpeg",
    ],
    imageFit: "contain",
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

export const STATS = {
  internshipCount: internships.length,                        // → 3
  serviceCount: SERVICE_HIGHLIGHTS.length,                    // → 2
  techCount: CORE_TECHS.length,                               // → 9
  displayedProjects: PROJECTS.length,                         // → 4
  totalCompleted: PROJECTS.length + ARCHIVED_PROJECTS.length, // → 6
  gpa: PROFILE.gpa,
  gpaScale: PROFILE.gpaScale,
} as const;
