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
    titleA: { id: "Insinyur di balik", en: "The engineer behind" } as Record<Lang, string>,
    titleB: { id: "kode yang andal.", en: "reliable code." } as Record<Lang, string>,
    card1Title: { id: "Latar Belakang & Pendekatan Teknis", en: "Background & Technical Approach" } as Record<Lang, string>,
    card1Body: {
      id: "Saya adalah Mahasiswa Program Studi Teknik Informatika D3 dengan pengalaman praktis dalam membangun dan menerapkan aplikasi web full-stack menggunakan Laravel, React.js, dan PostgreSQL. Saya berpengalaman dalam mengintegrasikan sistem otentikasi perusahaan (CAS SSO) dan REST API untuk alur kerja data yang aman dan skalabel. Saya memiliki kemampuan yang telah teruji dalam merancang arsitektur backend, menerapkan keamanan sistem, dan menghasilkan aplikasi yang siap diproduksi di lingkungan operasional nyata. Fokus utama saya adalah pada pengembangan diri sebagai pengembang web sambil berkontribusi pada solusi perangkat lunak yang andal dan efisien.",
      en: "I am an Informatics Engineering (D3) student with hands-on experience building and deploying full-stack web applications using Laravel, React.js, and PostgreSQL. I have experience integrating enterprise authentication systems (CAS SSO) and REST APIs for secure, scalable data workflows. My proven strengths include designing backend architectures, enforcing system security, and shipping production-ready applications in real operational environments. My main focus is growing as a web developer while contributing to reliable, efficient software solutions.",
    } as Record<Lang, string>,
    card2Title: { id: "Pengalaman & Kolaborasi", en: "Experience & Collaboration" } as Record<Lang, string>,
    card2Points: {
      id: [
        "Mobile Developer Intern: Merestrukturisasi arsitektur aplikasi (BLoC & Clean Architecture) di Maqdis Academy untuk meningkatkan stabilitas sistem produksi.",
        "IT Support Intern: Merancang topologi jaringan hierarkis dan mengoptimalkan segmentasi VLAN di BLSDM Komdigi, memangkas latensi dari 140 ms menjadi 17–19 ms.",
        "Kepemimpinan & Sosial: Menjadi Project Officer Kunjungan Industri (memimpin 24 panitia) dan memfasilitasi bootcamp pemrograman web Laravel untuk siswa SMK dalam program Pengabdian Masyarakat.",
      ],
      en: [
        "Mobile Developer Intern: Restructured the app architecture (BLoC & Clean Architecture) at Maqdis Academy to improve production system stability.",
        "IT Support Intern: Designed a hierarchical network topology and optimized VLAN segmentation at BLSDM Komdigi, cutting latency from 140 ms to 17–19 ms.",
        "Leadership & Community: Served as Project Officer for the Industrial Visit (leading 24 committee members) and facilitated a Laravel web programming bootcamp for vocational students in a community service program.",
      ],
    } as Record<Lang, string[]>,
    card3Title: { id: "Pendidikan & Sertifikasi", en: "Education & Certifications" } as Record<Lang, string>,
    card3Points: {
      id: [
        "D3 Teknik Informatika — Universitas Logistik dan Bisnis Internasional (IPK: 3.72/4.00)",
        "BNSP — Teknisi Muda Jaringan Komputer",
        "SAP — Introduction to the ABAP Workbench",
        "Dicoding — Cloud Practitioner Essentials",
      ],
      en: [
        "D3 Informatics Engineering — Universitas Logistik dan Bisnis Internasional (GPA: 3.72/4.00)",
        "BNSP — Junior Computer Network Technician",
        "SAP — Introduction to the ABAP Workbench",
        "Dicoding — Cloud Practitioner Essentials",
      ],
    } as Record<Lang, string[]>,
  },
} as const;
