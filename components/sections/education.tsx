"use client";
import { useScrollReveal } from "@/lib/useScrollReveal";

const EDU = [
  {
    icon: "🎓",
    name: "Universitas Logistik dan Bisnis Internasional",
    degree: "D3 Teknik Informatika · GPA 3.67 / 4.00",
    meta: ["📍 Bandung", "📅 2023 – Sep 2026"],
    desc: 'Final Project: FocusTalk — Android app mitigasi prokrastinasi digital menggunakan Heuristic Rule-Based algorithm.',
    bold: "FocusTalk",
  },
  {
    icon: "📜",
    name: "Dicoding – Back-End Development",
    degree: "Back-End Development with JavaScript",
    meta: ["📅 Sep 2024", "✅ Certified"],
    desc: "Mempelajari arsitektur RESTful API, manajemen server, dan best practices pengembangan back-end menggunakan JavaScript dan Node.js.",
  },
  {
    icon: "☁️",
    name: "Dicoding – Cloud Practitioner",
    degree: "Cloud Practitioner Essentials",
    meta: ["📅 Jun 2024", "✅ Certified"],
    desc: "Memahami konsep dasar cloud computing, layanan cloud utama, dan best practices dalam keamanan dan deployment cloud.",
  },
  {
    icon: "💻",
    name: "PKM – Laravel Bootcamp",
    degree: "Fasilitator Web Programming · SMK Negeri 2 Cimahi",
    meta: ["📍 Cimahi", "🎤 Public Speaker"],
    desc: "Memfasilitasi bootcamp pemrograman web Laravel di SMK Negeri 2 Cimahi sebagai bagian dari program PKM, membimbing siswa membangun aplikasi web fungsional.",
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
        {EDU.map(({ icon, name, degree, meta, desc, bold }) => (
          <div key={name} className="edu-card reveal"
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
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: ".3rem" }}>{name}</div>
            <div style={{ fontSize: ".82rem", fontWeight: 500, color: "var(--text2)", marginBottom: ".8rem" }}>{degree}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "1rem" }}>
              {meta.map((m) => (
                <span key={m} style={{
                  fontSize: ".7rem", fontWeight: 500, color: "var(--text3)",
                  padding: ".2rem .6rem", background: "var(--tag-bg)", borderRadius: "4px",
                }}>{m}</span>
              ))}
            </div>
            <p style={{ fontSize: ".82rem", color: "var(--text2)", lineHeight: 1.7 }}>
              {bold
                ? desc.split(bold).map((part, i) =>
                    i === 0
                      ? <span key={i}>{part}<strong style={{ color: "var(--text)", fontWeight: 600 }}>{bold}</strong></span>
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
        @media (max-width: 768px) {
          .edu-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}