"use client";
import { useScrollReveal } from "@/lib/useScrollReveal";

const EDU = [
  {
    icon: "🎓",
    name: "Universitas Logistik dan Bisnis Internasional (ULBI)",
    degree: "Diploma (D3) in Informatics Engineering · GPA: 3.72/4.00",
    meta: ["📍 Bandung, Indonesia", "📅 2023 – 2026", "● Awaiting Wisuda"],
    desc: "Relevant Coursework: Data Structures & Algorithms, OOP, Web & Mobile Development, Database Management Systems (SQL/NoSQL), Software Engineering. Final Project: Alumni Tracer Study & Job-Matching — OLAP-based analytics (star schema DWH) with React.js/TailAdmin + Laravel/MySQL for institutional monitoring of alumni employment alignment. PKM: Laravel web programming bootcamp facilitator at SMK Negeri 2 Cimahi (Public Relations liaison).",
    bold: "Tracer Study",
    featured: true,
  },
  {
    icon: "📡",
    name: "BNSP — Teknisi Muda Jaringan Komputer",
    degree: "National Professional Certification",
    meta: ["📅 Sep 2026", "✅ BNSP Certified"],
    desc: "Certified competence in computer networking — aligns with IT Support experience @ BLSDM Komdigi (VLAN, TCP/IP, site survey & hardening).",
  },
  {
    icon: "🏢",
    name: "SAP — Introduction to the ABAP Workbench",
    degree: "SAP Certified",
    meta: ["📅 July 2025", "✅ Certified"],
    desc: "Foundational ABAP Workbench for enterprise ERP development.",
  },
  {
    icon: "⚙️",
    name: "Dicoding — Back-End Development with JavaScript",
    degree: "Dicoding Certification",
    meta: ["📅 Sep 2024", "✅ Certified"],
    desc: "RESTful API architecture, server management & Back-End best practices with Node.js — applied in MediTech & Focus Talk.",
  },
  {
    icon: "☁️",
    name: "Dicoding — Cloud Practitioner Essentials",
    degree: "Dicoding Certification",
    meta: ["📅 June 2024", "✅ Certified"],
    desc: "Core cloud computing concepts, essential cloud services & deployment/security best practices.",
  },
];

export default function Education() {
  useScrollReveal();

  return (
    <section id="education" style={{ background: "var(--bg)" }}>
      <div className="sec-label">Education & Certs</div>

      <h2 className="reveal" style={{
        fontFamily: "'Playfair Display',serif",
        fontSize: "clamp(2rem,4vw,3rem)",
        lineHeight: 1.1, letterSpacing: "-.02em",
        color: "var(--text)", marginBottom: "3rem",
      }}>
        <span style={{ fontWeight: 900 }}>Academic</span>{" "}
        <span style={{ fontStyle: "italic", color: "var(--text2)" }}>Background</span>
      </h2>

      <div className="edu-grid">
        {EDU.map(({ icon, name, degree, meta, desc, bold, featured }) => (
          <div key={name} className={`edu-card reveal ${featured ? "edu-featured" : ""}`}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{icon}</div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: ".3rem", lineHeight: 1.3 }}>{name}</div>
            <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--text2)", marginBottom: ".8rem" }}>{degree}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "1rem" }}>
              {meta.map((m) => (
                <span key={m} style={{
                  fontSize: ".7rem", fontWeight: 500, color: "var(--text3)",
                  padding: ".2rem .6rem", background: "var(--tag-bg)", borderRadius: "4px",
                }}>{m}</span>
              ))}
            </div>
            <p style={{ fontSize: ".82rem", color: "var(--text2)", lineHeight: 1.75 }}>
              {bold
                ? desc.split(bold).map((part, i) =>
                    i === 0
                      ? <span key={i}>{part}<strong style={{ color: "var(--text)", fontWeight: 700 }}>{bold}</strong></span>
                      : <span key={i}>{part}</span>
                  )
                : desc}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .edu-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        .edu-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .edu-featured {
          grid-column: 1 / -1;
          background: var(--surface);
          border: 1.5px solid var(--border);
        }
        @media (max-width: 768px) {
          .edu-grid { grid-template-columns: 1fr; }
          .edu-featured { grid-column: auto; }
        }
      `}</style>
    </section>
  );
}
