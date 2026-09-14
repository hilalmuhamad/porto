"use client";
import { useScrollReveal } from "@/lib/useScrollReveal";

const INFO = [
  { k: "Status",     v: "● Open to Full-time (Oct 2026)", green: true },
  { k: "University", v: "ULBI Bandung" },
  { k: "Program",    v: "D3 Teknik Informatika" },
  { k: "GPA",        v: "3.72 / 4.00" },
  { k: "Location",   v: "Bandung, Jawa Barat" },
  { k: "Languages",  v: "Indonesian (Native), English (Professional)" },
  { k: "Contact",    v: "hilalabdulgani@gmail.com" },
];

const TRAITS = ["Problem Solver", "Team Player", "Fast Learner", "Detail Oriented", "Open Source Enthusiast"];

export default function About() {
  useScrollReveal();

  return (
    <section id="about" style={{ background: "var(--bg)" }}>
      <div className="sec-label">About Me</div>

      <div className="about-grid">
        {/* Left: bio */}
        <div className="reveal">
          <h2 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(2rem,4vw,3.2rem)",
            lineHeight: 1.15, letterSpacing: "-.02em", color: "var(--text)",
          }}>
            <span style={{ fontWeight: 900 }}>A web developer</span><br />
            <span style={{ fontWeight: 400, color: "var(--text2)" }}>who&nbsp;</span>
            <span style={{ fontStyle: "italic", fontWeight: 700, color: "var(--text2)" }}>blends strategy</span><br />
            <span style={{ fontStyle: "italic", color: "var(--text2)" }}>with empathy.</span>
          </h2>

          <p style={{
            fontSize: ".92rem", lineHeight: 1.85,
            color: "var(--text2)", marginTop: "1.5rem",
          }}>
            Saya adalah{" "}
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>mahasiswa D3 Teknik Informatika ULBI</strong>{" "}
            tingkat akhir (IPK{" "}
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>3.72/4.00</strong>, lulus Sep 2026 — menunggu wisuda) dengan spesialisasi{" "}
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>Full-Stack Web & Mobile</strong>.
            <br /><br />
            Terbukti membangun RESTful API, auth system (JWT/RBAC/OAuth), dan arsitektur <strong style={{ color: "var(--text)", fontWeight: 600 }}>Data Warehouse OLAP (Star Schema, ETL, HTAP)</strong> serta{" "}
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>distributed backend</strong> (Golang + Nginx Load Balancer + PostgreSQL Replication) untuk program distribusi pangan nasional. Saat ini sebagai{" "}
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>Mobile Developer Intern @ Maqdis Academy</strong> — slicing Figma ke Flutter (BLoC + Clean Architecture) dengan offline caching & background audio playback.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginTop: "1.5rem" }}>
            {TRAITS.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>

        {/* Right: info card */}
        <div className="reveal">
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "16px", padding: "1.5rem",
          }}>
            {INFO.map(({ k, v, green }, i) => (
              <div key={k} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", gap: "1rem",
                padding: ".9rem 0",
                borderBottom: i < INFO.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <span style={{
                  fontSize: ".72rem", fontWeight: 600, color: "var(--text3)",
                  letterSpacing: ".1em", textTransform: "uppercase", flexShrink: 0,
                }}>{k}</span>
                <span style={{
                  fontSize: ".85rem", fontWeight: 500,
                  color: green ? "#22c55e" : "var(--text)",
                  textAlign: "right",
                }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: start;
          margin-top: 2rem;
        }
        @media (max-width: 1024px) {
          .about-grid { grid-template-columns: 1fr; gap: 3rem; }
        }
      `}</style>
    </section>
  );
}