"use client";
import {
  MonitorSmartphone,
  Server,
  Database,
  Network,
  Wrench,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage, STR } from "@/lib/LanguageProvider";
import { useScrollReveal } from "@/lib/useScrollReveal";

/* Nama teknologi tidak diterjemahkan — hanya judul & catatan kategori
   yang mengikuti toggle bahasa (lihat STR.tech). */
const CATEGORIES = [
  {
    Icon: MonitorSmartphone,
    items: [
      "React.js",
      "Flutter",
      "BLoC Architecture",
      "Clean Architecture",
      "Tailwind CSS",
    ],
  },
  {
    Icon: Server,
    items: [
      "PHP (Laravel)",
      "JavaScript / Node.js (Express.js)",
      "Python (FastAPI)",
      "Golang (Fiber)",
      "SQL",
    ],
  },
  {
    Icon: Database,
    items: [
      "PostgreSQL (DWH / OLAP, Master-Slave Replication)",
      "MySQL",
      "MongoDB",
      "SQLite",
    ],
  },
  {
    Icon: Network,
    items: [
      "TCP/IP",
      "VLAN Segmentation",
      "Nginx Load Balancer",
      "Podman Containerization",
      "System Hardening",
      "Cloudflare WAF",
      "Tailscale VPN",
    ],
  },
  {
    Icon: Wrench,
    items: [
      "Git / GitHub",
      "Postman",
      "Figma",
      "VS Code",
      "Cisco Packet Tracer",
      "GNS3",
      "NetSpot",
      "WiFi Analyzer",
    ],
  },
];

export default function TechSkills() {
  const { lang } = useLanguage();
  const t = STR.tech;
  const reduce = useReducedMotion();
  useScrollReveal();

  return (
    <section id="skills" className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="reveal mb-10 md:mb-12">
          <p className="mb-2 text-xs font-bold tracking-[0.22em] text-ink-3 uppercase">
            {t.eyebrow[lang]}
          </p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl"
          >
            {t.titleA[lang]}{" "}
            <span className="font-bold text-ink-2 italic">{t.titleB[lang]}</span>
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-2 md:text-base">
            {t.lead[lang]}
          </p>
        </div>

        {/* Grid kategori */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map(({ Icon, items }, i) => (
            <motion.article
              key={items[0]}
              initial={reduce ? false : { opacity: 0, y: 26 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: "easeOut" }}
              className="group flex flex-col rounded-3xl bg-card shadow-card p-6 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lift md:p-7"
            >
              <div className="mb-5 flex items-start gap-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-elevated text-ink-2 transition-colors duration-300 group-hover:bg-elevated-hover group-hover:text-ink">
                  <Icon size={19} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold tracking-tight text-ink">
                    {t.categories[lang][i]}
                  </h3>
                  <p className="mt-0.5 text-[0.72rem] leading-snug text-ink-3">
                    {t.notes[lang][i]}
                  </p>
                </div>
              </div>

              {/* Badge / pill */}
              <ul className="mt-auto flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li key={skill}>
                    <span className="inline-block cursor-default rounded-full bg-chip px-3 py-1.5 text-[0.72rem] font-medium text-ink-2 transition-all duration-200 hover:scale-[1.06] hover:bg-emerald-500/[0.12] hover:text-ink">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
