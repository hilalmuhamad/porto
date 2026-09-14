"use client";
import { useScrollReveal } from "@/lib/useScrollReveal";

const SKILLS = [
  { icon: "⚙️", name: "Back-End Development",   desc: "RESTful APIs with clean architecture, JWT/RBAC auth & real-time capabilities. Production-grade error handling.",             tags: ["Laravel", "Node.js", "Express.js", "Golang (Fiber)", "Python/FastAPI", "JWT", "RBAC"] },
  { icon: "🎨", name: "Front-End Development",   desc: "Responsive, high-performance web apps — from TailAdmin dashboards to institutional KPI analytics.",                    tags: ["React.js", "Next.js", "TailAdmin", "Tailwind CSS", "TypeScript"] },
  { icon: "📱", name: "Mobile (Flutter)",  desc: "Production Flutter with BLoC + Clean Architecture, offline cache (Sqflite/SharedPreferences) & background services.",                      tags: ["Flutter", "BLoC", "Clean Arch", "Sqflite", "Background Service", "OAuth"] },
  { icon: "🐧", name: "DevOps & Infra", desc: "Distributed microservices with horizontal scaling, Podman & Nginx Load Balancer. Near-zero RPO validated by load testing.",         tags: ["Podman", "Nginx LB", "Linux", "Tailscale VPN", "CI/CD"] },
  { icon: "🗄️", name: "Data & OLAP",     desc: "HTAP + Star Schema DWH, automated ETL, partitioning & BRIN. Roll-up / Slice / Dice / Drill-down for KPI dashboards.",                  tags: ["PostgreSQL", "MySQL", "MongoDB", "OLAP", "ETL", "BRIN", "Replication"] },
  { icon: "🔐", name: "Security & Network",   desc: "Multi-layer hardening verified by Nmap pentest: WAF, IDS/IPS, VLAN, hardening — 0% packet loss, 0 exposed ports.",              tags: ["Cloudflare WAF", "Suricata IDS/IPS", "Fail2Ban", "VLAN", "SSL/TLS"] },
];

export default function Skills() {
  useScrollReveal();

  return (
    <section id="skills" style={{ background: "var(--bg2)" }}>
      <div className="sec-label">Services</div>

      {/* Header */}
      <div className="skills-header reveal">
        <h2 style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(2rem,4vw,3rem)",
          lineHeight: 1.1, letterSpacing: "-.02em", color: "var(--text)",
        }}>
          <span style={{ fontWeight: 900 }}>Comprehensive</span>{" "}
          <span style={{ fontStyle: "italic", color: "var(--text2)" }}>design &</span><br />
          <span style={{ fontStyle: "italic", color: "var(--text2)" }}>development</span>{" "}
          <span style={{ fontWeight: 900 }}>solutions.</span>
        </h2>
        <p style={{
          fontSize: ".9rem", color: "var(--text2)", lineHeight: 1.7,
          textAlign: "right", maxWidth: "320px", marginLeft: "auto",
        }}>
          Helping build scalable, secure, and modern digital products through impactful engineering and robust development.
        </p>
      </div>

      {/* Grid */}
      <div className="skills-grid">
        {SKILLS.map(({ icon, name, desc, tags }) => (
          <div key={name} className="skill-card reveal"
            onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "var(--surface)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "var(--bg2)")}
          >
            <div style={{
              width: "42px", height: "42px", borderRadius: "10px",
              background: "var(--tag-bg)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.1rem", marginBottom: "1.3rem",
            }}>{icon}</div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: ".6rem" }}>{name}</div>
            <p style={{ fontSize: ".82rem", color: "var(--text2)", lineHeight: 1.65, marginBottom: "1rem" }}>{desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".35rem" }}>
              {tags.map((t) => <span key={t} className="stag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .skills-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: end;
          margin-bottom: 3.5rem;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
        }
        .skill-card {
          background: var(--bg2);
          padding: 2rem 1.8rem;
          transition: background 0.2s;
        }
        @media (max-width: 1024px) {
          .skills-header { grid-template-columns: 1fr; gap: 1.5rem; }
          .skills-header p { text-align: left; margin-left: 0; }
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}