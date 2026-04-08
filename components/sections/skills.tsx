"use client";
import { useScrollReveal } from "@/lib/useScrollReveal";

const SKILLS = [
  { icon: "⚙️", name: "Back-End Development",   desc: "Building robust, scalable server-side applications with clean architecture and secure APIs.",             tags: ["Laravel", "Node.js", "Express.js", "JWT", "RBAC", "Socket.IO"] },
  { icon: "🎨", name: "Front-End Development",   desc: "Building fast, responsive, and scalable websites using the latest web technologies.",                    tags: ["React.js", "Next.js", "Flutter", "Tailwind CSS", "HTML/CSS"] },
  { icon: "📱", name: "Mobile App Development",  desc: "Creating seamless cross-platform mobile experiences for Android and iOS platforms.",                      tags: ["Flutter", "SQLite", "Background Service", "System Alert"] },
  { icon: "🐧", name: "DevOps & Infrastructure", desc: "Designing and deploying distributed systems with containerization and server security hardening.",         tags: ["Linux", "Podman", "Nginx", "Fail2Ban", "Suricata IDS/IPS"] },
  { icon: "🗄️", name: "Database Management",     desc: "Designing complex SQL/NoSQL schemas with optimization, replication, and data integrity.",                  tags: ["MySQL", "PostgreSQL", "MongoDB", "SQLite", "Replication"] },
  { icon: "🔐", name: "Security & Networking",   desc: "Implementing server security, firewall rules, IDS/IPS, WAF, and SSL end-to-end encryption.",              tags: ["Firewall", "VPN", "SSL/TLS", "Cloudflare WAF", "DDoS Protection"] },
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