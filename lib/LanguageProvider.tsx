"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "id" | "en";

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "id",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    const initial: Lang = saved === "en" || saved === "id" ? saved : "id";
    setLangState(initial);
    document.documentElement.setAttribute("lang", initial);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.setAttribute("lang", l);
  };

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export const useLanguage = () => useContext(LangCtx);

/* ── Kamus navbar + hero (section lain menyusul per fase) ── */
export const STR = {
  nav: {
    links: {
      id: [
        { label: "Tentang", href: "#about" },
        { label: "Proyek", href: "#projects" },
        { label: "Pengalaman", href: "#experience" },
        { label: "Edukasi", href: "#education" },
      ],
      en: [
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Experience", href: "#experience" },
        { label: "Education", href: "#education" },
      ],
    } as Record<Lang, { label: string; href: string }[]>,
    contact: { id: "Kontak", en: "Contact" } as Record<Lang, string>,
    downloadCv: { id: "Unduh CV ↓", en: "Download CV ↓" } as Record<Lang, string>,
    toDark: { id: "Mode gelap", en: "Dark mode" } as Record<Lang, string>,
    toLight: { id: "Mode terang", en: "Light mode" } as Record<Lang, string>,
    menuLabel: { id: "Menu navigasi", en: "Navigation menu" } as Record<Lang, string>,
  },
  hero: {
    badge: {
      id: "Tersedia untuk full-time roles",
      en: "Available for full-time roles",
    } as Record<Lang, string>,
    bio: {
      id: "Fresh graduate D3 Teknik Informatika yang membangun aplikasi web modern dan backend yang andal — dari REST API dan OLAP data warehouse hingga analisis dan optimasi jaringan IT untuk konektivitas yang stabil dan aman.",
      en: "Fresh graduate in Informatics Engineering building modern web apps and reliable backends — from REST APIs and OLAP data warehouses to IT network analysis and optimization for stable, secure connectivity.",
    } as Record<Lang, string>,
    tagline: {
      id: "A web developer who blends strategy with empathy.",
      en: "A web developer who blends strategy with empathy.",
    } as Record<Lang, string>,
    viewProjects: { id: "Lihat Proyek", en: "View Projects" } as Record<Lang, string>,
    downloadCv: { id: "Unduh CV", en: "Download CV" } as Record<Lang, string>,
    explore: { id: "Jelajahi profil:", en: "Explore profile:" } as Record<Lang, string>,
    inlineStats: {
      id: [
        { num: "", label: "Proyek Produksi" },
        { num: "", label: "IPK / 4.00" },
        { num: "", label: "Magang 2026" },
      ],
      en: [
        { num: "", label: "Production Projects" },
        { num: "", label: "GPA / 4.00" },
        { num: "", label: "Internships 2026" },
      ],
    } as Record<Lang, { num: string; label: string }[]>,
  },
  stats: {
    labels: {
      id: [
        "Magang Industri",
        "Proyek & Pengabdian",
        "Kumpulan Teknologi",
        "Total Project yang Telah Diselesaikan",
      ],
      en: [
        "Industrial Internships",
        "Projects & Community Service",
        "Technology Stack",
        "Total Completed Projects",
      ],
    } as Record<Lang, string[]>,
  },
  about: {
    eyebrow: { id: "Tentang Saya", en: "About Me" } as Record<Lang, string>,
    titleA: { id: "Masih belajar,", en: "Still learning," } as Record<Lang, string>,
    titleB: { id: "sudah mengirim ke produksi.", en: "already shipping to production." } as Record<Lang, string>,
    card1Title: { id: "Latar Belakang & Fokus", en: "Background & Focus" } as Record<Lang, string>,
    card1Body: {
      id: "Saya menempuh D3 Teknik Informatika, jalur vokasi yang menempatkan saya lebih banyak di depan terminal daripada di balik teori. Dari sana saya belajar membangun aplikasi web full-stack dengan Laravel, React.js, dan PostgreSQL — termasuk menyambungkan otentikasi kampus (CAS SSO) dan REST API agar data berpindah dengan aman. Yang saya kejar bukan sekadar aplikasi yang jalan di laptop sendiri, tetapi yang bertahan saat dipakai orang lain: arsitektur backend yang jelas, keamanan yang dipikirkan sejak awal, dan rilis yang siap diuji di lingkungan nyata. Masih banyak yang perlu saya pelajari, dan justru itu alasan saya ingin tumbuh bersama tim yang menantang cara kerja saya.",
      en: "I am taking a D3 in Informatics Engineering — a vocational track that kept me in front of a terminal more than behind theory. There I learned to build full-stack web applications with Laravel, React.js, and PostgreSQL, including wiring up campus authentication (CAS SSO) and REST APIs so data moves safely. What I chase is not an app that merely runs on my own laptop, but one that holds up when other people rely on it: a clear backend architecture, security considered from the start, and releases ready to be tested in real environments. There is still plenty for me to learn, and that is exactly why I want to grow with a team that challenges how I work.",
    } as Record<Lang, string>,
    card2Title: { id: "Pengalaman & Kolaborasi", en: "Experience & Collaboration" } as Record<Lang, string>,
    card2Points: {
      id: [
        "Mobile Developer Intern — Maqdis Academy: Merapikan arsitektur aplikasi ke Flutter dengan BLoC dan Clean Architecture, sehingga aplikasi lebih stabil dipakai pengguna sebenarnya.",
        "IT Support Intern — BLSDM Komdigi Bandung: Merancang topologi jaringan hierarkis dan menguji segmentasi VLAN lewat GNS3/Packet Tracer sebelum diterapkan; latensi turun dari ~140 ms ke 17–19 ms.",
        "Proyek kolaboratif: Menyusun distributed backend microservices (Maggot Cycle) dengan Nginx Load Balancer dan PostgreSQL Master-Slave, serta merancang Data Warehouse OLAP untuk sistem Tracer Study kampus.",
        "Kepemimpinan & pengabdian: Project Officer kunjungan industri PT Computrade bersama 24 panitia untuk 76 peserta, staf Public Relations HIMATIF, dan mentor bootcamp Laravel program PKM di SMKN 2 Cimahi.",
      ],
      en: [
        "Mobile Developer Intern — Maqdis Academy: Reorganized the app architecture in Flutter with BLoC and Clean Architecture, making it more stable for real users.",
        "IT Support Intern — BLSDM Komdigi Bandung: Designed a hierarchical network topology and validated VLAN segmentation in GNS3/Packet Tracer before rollout; latency dropped from ~140 ms to 17–19 ms.",
        "Collaborative projects: Assembled a distributed microservices backend (Maggot Cycle) with Nginx Load Balancer and PostgreSQL Master-Slave, and designed an OLAP Data Warehouse for the campus Tracer Study system.",
        "Leadership & service: Project Officer for the PT Computrade industrial visit with 24 committee members for 76 participants, Public Relations staff at HIMATIF, and Laravel bootcamp mentor for the community service program at SMKN 2 Cimahi.",
      ],
    } as Record<Lang, string[]>,
    card3Title: { id: "Pendidikan & Kualifikasi", en: "Education & Qualifications" } as Record<Lang, string>,
    card3Points: {
      id: [
        "D3 Teknik Informatika — Universitas Logistik dan Bisnis Internasional (IPK: 3.72/4.00)",
        "BNSP — Teknisi Muda Jaringan Komputer",
        "SAP — Introduction to the ABAP Workbench",
        "Dicoding — Cloud Practitioner Essentials (AWS) & Back-End Development with JavaScript",
      ],
      en: [
        "D3 Informatics Engineering — Universitas Logistik dan Bisnis Internasional (GPA: 3.72/4.00)",
        "BNSP — Junior Computer Network Technician",
        "SAP — Introduction to the ABAP Workbench",
        "Dicoding — Cloud Practitioner Essentials (AWS) & Back-End Development with JavaScript",
      ],
    } as Record<Lang, string[]>,
  },
} as const;
