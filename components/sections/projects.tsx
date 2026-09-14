"use client";
import { useScrollReveal } from "@/lib/useScrollReveal";

const PROJECTS = [
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

export default function Projects() {
  useScrollReveal();

  return (
    <section id="projects" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div className="proj-header reveal">
        <h2 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(2rem,4vw,3rem)",
          lineHeight: 1.1, letterSpacing: "-.02em",
          color: "var(--text)", maxWidth: "580px",
        }}>
          <span style={{ fontWeight: 900 }}>Showcasing</span>{" "}
          <span style={{ fontStyle: "italic", color: "var(--text2)" }}>digital</span><br />
          <span style={{ fontStyle: "italic", color: "var(--text2)" }}>experiences</span>{" "}
          <span style={{ fontWeight: 900 }}>that solve real</span><br />
          <span style={{ fontWeight: 900 }}>problems.</span>
        </h2>
        <a href="https://github.com/hilalmuhamad" target="_blank" rel="noreferrer"
          className="btn-outline">View All Work →</a>
      </div>

      {/* Grid */}
      <div className="proj-grid">
        {PROJECTS.map(({ emoji, label, title, tags, desc, link, role, date }) => (
          <div key={title} className="proj-card reveal"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-lg)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            {/* Thumbnail */}
            <div style={{
              height: "200px", background: "var(--bg2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "2.5rem", position: "relative",
              borderBottom: "1px solid var(--border)",
            }}>
              {emoji}
              <span style={{
                position: "absolute", top: ".8rem", left: ".8rem",
                fontSize: ".65rem", fontWeight: 600, color: "var(--text2)",
                background: "var(--surface)", padding: ".2rem .6rem",
                borderRadius: "4px", letterSpacing: ".06em",
              }}>↗ {label}</span>
              <div style={{
                position: "absolute", top: ".8rem", right: ".8rem",
                width: "32px", height: "32px", borderRadius: "50%",
                background: "var(--accent)", display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "var(--accent-inv)", fontSize: ".9rem",
                transition: "transform .2s",
              }} className="proj-arrow">↗</div>
            </div>

            {/* Body */}
            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem", marginBottom: ".9rem" }}>
                {tags.map((t) => <span key={t} className="stag">{t}</span>)}
              </div>
              <div style={{ fontSize: ".72rem", fontWeight: 600, color: "var(--text3)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: ".4rem" }}>
                {role} · {date}
              </div>
              <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: ".5rem", letterSpacing: "-.01em" }}>{title}</div>
              <p style={{ fontSize: ".83rem", color: "var(--text2)", lineHeight: 1.7, marginBottom: "1.1rem" }}>{desc}</p>
              <a href={link} target="_blank" rel="noreferrer" style={{
                fontSize: ".78rem", fontWeight: 600, color: "var(--text)",
                textDecoration: "none", display: "inline-flex",
                alignItems: "center", gap: ".4rem",
                borderBottom: "1.5px solid var(--border)", paddingBottom: ".1rem",
                transition: "border-color .2s, gap .2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--text)"; (e.currentTarget as HTMLAnchorElement).style.gap = ".7rem"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLAnchorElement).style.gap = ".4rem"; }}
              >View Case Study →</a>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .proj-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 3rem;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .proj-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .proj-card:hover .proj-arrow { transform: rotate(45deg); }
        @media (max-width: 1024px) {
          .proj-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .proj-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}