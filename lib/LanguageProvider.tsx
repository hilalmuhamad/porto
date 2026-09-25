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
        { label: "Pengalaman", href: "#experience" },
        { label: "Proyek", href: "#projects" },
        { label: "Desain", href: "#design" },
        { label: "Edukasi", href: "#education" },
      ],
      en: [
        { label: "About", href: "#about" },
        { label: "Experience", href: "#experience" },
        { label: "Projects", href: "#projects" },
        { label: "Design", href: "#design" },
        { label: "Education", href: "#education" },
      ],
    } as Record<Lang, { label: string; href: string }[]>,
    contact: { id: "Kontak", en: "Contact" } as Record<Lang, string>,
    downloadCv: { id: "Unduh CV ↓", en: "Download CV ↓" } as Record<Lang, string>,
    toDark: { id: "Mode gelap", en: "Dark mode" } as Record<Lang, string>,
    toLight: { id: "Mode terang", en: "Light mode" } as Record<Lang, string>,
    menuLabel: { id: "Menu navigasi", en: "Navigation menu" } as Record<Lang, string>,
    openMenu: { id: "Buka menu", en: "Open menu" } as Record<Lang, string>,
    closeMenu: { id: "Tutup menu", en: "Close menu" } as Record<Lang, string>,
  },
  hero: {
    badge: {
      id: "Tersedia untuk full-time roles",
      en: "Available for full-time roles",
    } as Record<Lang, string>,
    bio: {
      id: "Lulusan D3 Teknik Informatika Universitas Logistik dan Bisnis Internasional (Poltekpos) yang berpengalaman merancang solusi full-stack, mobile, dan infrastruktur jaringan skala produksi. Berbekal penguasaan Laravel, React, FastAPI, dan Flutter, saya adalah pembelajar adaptif yang siap membangun aplikasi scalable dan berdampak nyata di industri yang dinamis.",
      en: "A D3 Informatics Engineering graduate from Universitas Logistik dan Bisnis Internasional (Poltekpos) experienced in designing production-scale full-stack, mobile, and network infrastructure solutions. Armed with Laravel, React, FastAPI, and Flutter, I am an adaptive learner ready to build scalable applications with real impact in dynamic industries.",
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
    intro: {
      id: "Saya mengubah kebutuhan operasional menjadi sistem yang berjalan stabil dan siap dipakai.",
      en: "I turn operational needs into systems that run reliably and are ready to use.",
    } as Record<Lang, string>,
    highlight: {
      id: "Pengalaman industri saya mencakup peran sebagai Mobile Developer Intern di Maqdis Academy, di mana saya mengembangkan modul antarmuka Flutter dengan integrasi REST API, background audio playback, dan local storage agar aplikasi tetap stabil saat offline. Sebelumnya, sebagai IT Support Intern di BLSDM Komdigi Bandung, saya merancang topologi jaringan hierarkis dengan perangkat Ruijie dan Linksys, serta menyimulasikan segmentasi VLAN lewat Cisco Packet Tracer dan GNS3 sebelum diterapkan ke produksi. Pada skala proyek yang lebih kompleks, saya telah merancang Data Warehouse OLAP untuk sistem Tracer Study kampus dan menyusun backend terdistribusi menggunakan Golang, Nginx Load Balancer, serta arsitektur PostgreSQL Master-Slave.",
      en: "My industry experience includes a role as a Mobile Developer Intern at Maqdis Academy, where I developed Flutter interface modules with REST API integration, background audio playback, and local storage so the app stays stable offline. Earlier, as an IT Support Intern at BLSDM Komdigi Bandung, I designed a hierarchical network topology with Ruijie and Linksys devices, and simulated VLAN segmentation through Cisco Packet Tracer and GNS3 before production rollout. On more complex projects, I designed an OLAP Data Warehouse for the campus Tracer Study system and assembled a distributed backend using Golang, Nginx Load Balancer, and a PostgreSQL Master-Slave architecture.",
    } as Record<Lang, string>,
    focus: {
      id: "Fokus saya jelas: kualitas kode, sistem yang teruji, dan hasil kerja yang bisa dipertanggungjawabkan — dari tahap awal pengembangan hingga proses serah terima.",
      en: "My focus is clear: code quality, tested systems, and work that can be accounted for — from early development through the handover process.",
    } as Record<Lang, string>,
    collab: {
      id: "Di luar sisi teknis, saya terbiasa bekerja secara kolaboratif lintas fungsi. Hal ini saya wujudkan melalui peran sebagai Staf Public Relations HIMATIF yang menghubungkan kampus dengan mitra perusahaan, serta menjadi mentor bootcamp Laravel pada program Pengabdian Masyarakat di SMKN 2 Cimahi.",
      en: "Beyond the technical side, I am used to working collaboratively across functions. I put this into practice through a role as Public Relations staff at HIMATIF, connecting the campus with corporate partners, and as a Laravel bootcamp mentor in the community service program at SMKN 2 Cimahi.",
    } as Record<Lang, string>,
    jobs: {
      id: [
        { role: "Mobile Developer Intern", company: "Maqdis Academy", date: "Jun 2026 – Sep 2026" },
        { role: "IT Support Intern", company: "BLSDM Komdigi Bandung", date: "Mar 2026 – Jun 2026" },
        { role: "Assistant Producer Intern", company: "I Channel TV Bandung", date: "Apr 2022 – Jun 2022" },
      ],
      en: [
        { role: "Mobile Developer Intern", company: "Maqdis Academy", date: "Jun 2026 – Sep 2026" },
        { role: "IT Support Intern", company: "BLSDM Komdigi Bandung", date: "Mar 2026 – Jun 2026" },
        { role: "Assistant Producer Intern", company: "I Channel TV Bandung", date: "Apr 2022 – Jun 2022" },
      ],
    } as Record<Lang, { role: string; company: string; date: string }[]>,
    titleA: { id: "Merancang, membangun,", en: "Designing, building," } as Record<Lang, string>,
    titleB: { id: "menjaga tetap berjalan.", en: "keeping it running." } as Record<Lang, string>,
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
  projects: {
    eyebrow: { id: "Proyek Pilihan", en: "Selected Projects" } as Record<Lang, string>,
    titleA: { id: "Setiap proyek dimulai dari", en: "Every project starts from" } as Record<Lang, string>,
    titleB: { id: "masalah nyata,", en: "a real problem," } as Record<Lang, string>,
    titleC: { id: "bukan sekadar daftar fitur.", en: "not just a feature list." } as Record<Lang, string>,
    lead: {
      id: "Empat proyek berikut mewakili cara saya bekerja: memahami masalahnya lebih dulu, memilih arsitektur yang tepat, lalu membuktikan hasilnya lewat angka. Setiap kartu memuat konteks masalah, solusi teknis, dan hasil terukur agar mudah dinilai.",
      en: "The four projects below reflect how I work: understand the problem first, choose the right architecture, then prove the outcome with numbers. Each card carries the problem, the technical solution, and a measurable result so it is easy to assess.",
    } as Record<Lang, string>,
    problem: { id: "Masalah", en: "Problem" } as Record<Lang, string>,
    solution: { id: "Solusi", en: "Solution" } as Record<Lang, string>,
    result: { id: "Hasil", en: "Result" } as Record<Lang, string>,
    liveSoon: { id: "Live Demo — segera", en: "Live Demo — soon" } as Record<Lang, string>,
    detail: { id: "Lihat Detail", en: "View Details" } as Record<Lang, string>,
    close: { id: "Tutup", en: "Close" } as Record<Lang, string>,
    techUsed: { id: "Teknologi yang dipakai", en: "Tech stack used" } as Record<Lang, string>,
    dialogLabel: { id: "Detail proyek", en: "Project details" } as Record<Lang, string>,
    prev: { id: "Screenshot sebelumnya", en: "Previous screenshot" } as Record<Lang, string>,
    next: { id: "Screenshot berikutnya", en: "Next screenshot" } as Record<Lang, string>,
  },
  education: {
    eyebrow: { id: "Pendidikan & Sertifikasi", en: "Education & Certifications" } as Record<Lang, string>,
    titleA: { id: "Bekal akademik,", en: "Academic foundation," } as Record<Lang, string>,
    titleB: { id: "diperkuat sertifikasi.", en: "backed by certifications." } as Record<Lang, string>,
    lead: {
      id: "Pendidikan vokasi yang menekankan praktik langsung, ditambah sertifikasi resmi untuk memvalidasi keahlian teknis di luar kelas.",
      en: "A vocational education focused on hands-on practice, plus official certifications that validate technical skills beyond the classroom.",
    } as Record<Lang, string>,
    gpa: { id: "IPK", en: "GPA" } as Record<Lang, string>,
    status: { id: "Menunggu wisuda", en: "Awaiting graduation" } as Record<Lang, string>,
    coursework: { id: "Mata kuliah relevan", en: "Relevant coursework" } as Record<Lang, string>,
    finalProject: { id: "Tugas akhir", en: "Final project" } as Record<Lang, string>,
    community: { id: "Pengabdian masyarakat", en: "Community service" } as Record<Lang, string>,
    certsTitle: { id: "Sertifikasi resmi", en: "Official certifications" } as Record<Lang, string>,
    uniName: "Universitas Logistik dan Bisnis Internasional (Poltekpos)",
    uniDegree: { id: "Diploma (D3) Teknik Informatika", en: "Diploma (D3) in Informatics Engineering" } as Record<Lang, string>,
    uniLocation: { id: "Bandung, Indonesia", en: "Bandung, Indonesia" } as Record<Lang, string>,
    uniPeriod: "2023 – 2026",
    courseworkText: {
      id: "Struktur Data & Algoritma, Pemrograman Berorientasi Objek, Pengembangan Web & Mobile, Sistem Basis Data (SQL/NoSQL), Rekayasa Perangkat Lunak.",
      en: "Data Structures & Algorithms, Object-Oriented Programming, Web & Mobile Development, Database Management Systems (SQL/NoSQL), Software Engineering.",
    } as Record<Lang, string>,
    finalProjectText: {
      id: "Tracer Study & Job-Matching Alumni — analitik OLAP (star schema data warehouse) dengan React.js/TailAdmin dan Laravel/PostgreSQL untuk memantau keselarasan kerja alumni.",
      en: "Alumni Tracer Study & Job-Matching — OLAP analytics (star schema data warehouse) with React.js/TailAdmin and Laravel/PostgreSQL to monitor alumni employment alignment.",
    } as Record<Lang, string>,
    communityText: {
      id: "Fasilitator bootcamp pemrograman web Laravel di SMK Negeri 2 Cimahi, sekaligus liaison Public Relations.",
      en: "Facilitator of a Laravel web programming bootcamp at SMK Negeri 2 Cimahi, also serving as the Public Relations liaison.",
    } as Record<Lang, string>,
    certs: [
      {
        issuer: "BNSP", title: "Teknisi Muda Jaringan Komputer", date: "Sep 2026", logo: "/bnsp-logo.webp",
        desc: {
          id: "Kompetensi jaringan komputer — selaras dengan pengalaman IT Support di BLSDM Komdigi (VLAN, TCP/IP, site survey).",
          en: "Computer networking competence — aligned with IT Support experience at BLSDM Komdigi (VLAN, TCP/IP, site survey).",
        },
      },
      {
        issuer: "SAP", title: "Introduction to the ABAP Workbench", date: "Jul 2025", logo: "/sap-logo.webp",
        file: "/sertifikat-sap.jpeg", fileKind: "image",
        desc: {
          id: "Dasar ABAP Workbench untuk pengembangan ERP perusahaan.",
          en: "Foundational ABAP Workbench for enterprise ERP development.",
        },
      },
      {
        issuer: "Dicoding", title: "Back-End Development with JavaScript", date: "Sep 2024", logo: "/dicoding-logo.png",
        file: "/sertifikat-javascript.jpg", fileKind: "image",
        desc: {
          id: "Arsitektur RESTful API, manajemen server, dan praktik terbaik back-end dengan Node.js.",
          en: "RESTful API architecture, server management, and back-end best practices with Node.js.",
        },
      },
      {
        issuer: "Dicoding", title: "Cloud Practitioner Essentials", date: "Jun 2024", logo: "/dicoding-logo.png",
        file: "/sertifikat-aws.jpg", fileKind: "image",
        desc: {
          id: "Konsep dasar cloud computing, layanan cloud utama, serta praktik keamanan dan deployment.",
          en: "Core cloud computing concepts, essential cloud services, plus deployment and security best practices.",
        },
      },
      {
        issuer: "Google · Coursera", title: "Foundations of Cybersecurity", date: "Apr 2026",
        file: "/coursera-cybersecurity.pdf", fileKind: "pdf",
        verifyUrl: "https://coursera.org/verify/7FPGV1DU7UJ8", score: "94.98%",
        desc: {
          id: "Fondasi keamanan siber (~9 jam): konsep keamanan, alat, dan praktik proteksi sistem.",
          en: "Cybersecurity foundations (~9 hours): security concepts, tools, and system protection practices.",
        },
      },
      {
        issuer: "SMK Pasundan 3 Bandung", title: "Best Visual Effect",
        file: "/sertifikat-best-visual-effect.jpeg", fileKind: "image",
        desc: {
          id: "Penghargaan Best Visual Effect dari SMK Pasundan 3 Bandung.",
          en: "Best Visual Effect award from SMK Pasundan 3 Bandung.",
        },
      },
      {
        issuer: "LKMM 2 HIMATIF", title: "Pemateri LKMM 2",
        file: "/sertifikat-pematerian.jpeg", fileKind: "image",
        desc: {
          id: "Sertifikat pemateri pada Latihan Kepemimpinan Manajemen Mahasiswa (LKMM) 2 HIMATIF.",
          en: "Speaker certificate at the HIMATIF Student Management Leadership Training (LKMM) 2.",
        },
      },
      {
        issuer: "HIMATIF Universitas Logistik dan Bisnis Internasional (Poltekpos)", title: "Sertifikat HIMATIF",
        file: "/sertifikat-tambahan.jpeg", fileKind: "image",
        desc: {
          id: "Sertifikat organisasi kemahasiswaan Teknik Informatika.",
          en: "Informatics student association organizational certificate.",
        },
      },
    ] as { issuer: string; title: string; date?: string; logo?: string; file?: string; fileKind?: "image" | "pdf"; verifyUrl?: string; score?: string; desc: Record<Lang, string> }[],
    galleryTitle: { id: "Berkas Sertifikat", en: "Certificate Files" } as Record<Lang, string>,
    galleryLead: {
      id: "Geser menyamping untuk melihat berkas asli tiap sertifikat, atau buka untuk tampilan penuh.",
      en: "Scroll sideways to view each original certificate file, or open it for full view.",
    } as Record<Lang, string>,
    viewFile: { id: "Lihat Berkas", en: "View File" } as Record<Lang, string>,
    verify: { id: "Verifikasi", en: "Verify" } as Record<Lang, string>,
    score: { id: "Nilai", en: "Score" } as Record<Lang, string>,
    slidePrev: { id: "Geser sebelumnya", en: "Previous slide" } as Record<Lang, string>,
    slideNext: { id: "Geser berikutnya", en: "Next slide" } as Record<Lang, string>,
    autoplay: { id: "Putar otomatis", en: "Autoplay" } as Record<Lang, string>,
    pauseAuto: { id: "Jeda putar otomatis", en: "Pause autoplay" } as Record<Lang, string>,
  },
  contact: {
    eyebrow: { id: "Kontak", en: "Contact" } as Record<Lang, string>,
    titleA: { id: "Mari membangun", en: "Let's build" } as Record<Lang, string>,
    titleB: { id: "sesuatu yang berguna.", en: "something useful." } as Record<Lang, string>,
    lead: {
      id: "Terbuka untuk posisi full-time, magang lanjutan, maupun proyek lepas. Saya biasa merespons dalam 24 jam pada hari kerja.",
      en: "Open to full-time roles, extended internships, and freelance projects. I usually respond within 24 hours on business days.",
    } as Record<Lang, string>,
    available: { id: "Terbuka untuk peluang", en: "Open to opportunities" } as Record<Lang, string>,
    response: { id: "Respons <24 jam", en: "Response <24h" } as Record<Lang, string>,
    formTitle: { id: "Kirim pesan", en: "Send a message" } as Record<Lang, string>,
    name: { id: "Nama", en: "Name" } as Record<Lang, string>,
    email: { id: "Email", en: "Email" } as Record<Lang, string>,
    subject: { id: "Subjek", en: "Subject" } as Record<Lang, string>,
    message: { id: "Pesan", en: "Message" } as Record<Lang, string>,
    namePh: { id: "Nama kamu", en: "Your name" } as Record<Lang, string>,
    emailPh: { id: "nama@email.com", en: "you@email.com" } as Record<Lang, string>,
    subjectPh: { id: "Peluang kerja / kolaborasi", en: "Job opportunity / collaboration" } as Record<Lang, string>,
    messagePh: { id: "Halo Hilal, saya tertarik untuk...", en: "Hi Hilal, I'm interested in..." } as Record<Lang, string>,
    send: { id: "Kirim pesan", en: "Send message" } as Record<Lang, string>,
    sent: { id: "Terbuka di aplikasi email", en: "Opened in mail app" } as Record<Lang, string>,
    errorRequired: { id: "Lengkapi kolom wajib", en: "Fill the required fields" } as Record<Lang, string>,
    formNote: {
      id: "Pesan akan membuka aplikasi email kamu secara otomatis.",
      en: "The message will open your email app automatically.",
    } as Record<Lang, string>,
    footerRights: { id: "Seluruh hak cipta.", en: "All rights reserved." } as Record<Lang, string>,
    builtWith: { id: "Dibangun dengan Next.js", en: "Built with Next.js" } as Record<Lang, string>,
  },
  design: {
    eyebrow: { id: "Portofolio Desain", en: "Design Portfolio" } as Record<Lang, string>,
    titleA: { id: "Visual yang", en: "Visuals that" } as Record<Lang, string>,
    titleB: { id: "bercerita.", en: "tell stories." } as Record<Lang, string>,
    lead: {
      id: "Karya desain dari peran saya sebagai Head of Media Design K-Radio ULBI — poster acara, konten media sosial, dan materi promosi kampus. Klik untuk melihat penuh.",
      en: "Design works from my role as Head of Media Design at K-Radio ULBI — event posters, social media content, and campus promotional materials. Click to view full.",
    } as Record<Lang, string>,
    viewFull: { id: "Lihat penuh", en: "View full" } as Record<Lang, string>,
  },
  tech: {
    eyebrow: { id: "Keahlian Teknis", en: "Technical Skills" } as Record<Lang, string>,
    titleA: { id: "Alat yang saya pakai", en: "The tools I use" } as Record<Lang, string>,
    titleB: { id: "untuk membangun sistem.", en: "to build systems." } as Record<Lang, string>,
    lead: {
      id: "Dikelompokkan berdasarkan peran, bukan tingkat penguasaan — setiap teknologi di bawah ini pernah dipakai di proyek nyata atau magang.",
      en: "Grouped by role, not proficiency level — every technology below has been used in a real project or internship.",
    },
    categories: {
      id: [
        "Frontend & Mobile",
        "Backend & Bahasa Pemrograman",
        "Basis Data & Sistem Data",
        "Jaringan, Infrastruktur & DevOps",
        "Perkakas Developer & Diagnostik Jaringan",
      ],
      en: [
        "Frontend & Mobile",
        "Backend & Programming Languages",
        "Databases & Data Systems",
        "Networking, Infrastructure & DevOps",
        "Developer & Network Diagnostic Tools",
      ],
    } as Record<Lang, string[]>,
    notes: {
      id: [
        "Antarmuka web dan aplikasi mobile",
        "API, layanan, dan logika sisi server",
        "Penyimpanan, analitik, dan ketersediaan data",
        "Konektivitas, deployment, dan pengerasan sistem",
        "Alat kerja harian dan simulasi jaringan",
      ],
      en: [
        "Web interfaces and mobile apps",
        "APIs, services, and server-side logic",
        "Storage, analytics, and data availability",
        "Connectivity, deployment, and system hardening",
        "Daily tooling and network simulation",
      ],
    } as Record<Lang, string[]>,
  },
} as const;
