"use client";
import { useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { EXPERIENCES } from "@/lib/portfolio";

export default function Experience() {
  const [active, setActive] = useState(0);
  useScrollReveal();

  const exp = EXPERIENCES[active];

  return (
    <section id="experience" style={{ background: "var(--bg2)" }}>
      <div className="sec-label">Career Path</div>

      <h2 className="reveal" style={{
        fontFamily: "'Playfair Display',serif",
        fontSize: "clamp(2rem,4vw,3rem)",
        lineHeight: 1.1, letterSpacing: "-.02em", color: "var(--text)",
        marginBottom: ".6rem",
      }}>
        <span style={{ fontWeight: 900 }}>Professional</span>{" "}
        <span style={{ fontStyle: "italic", color: "var(--text2)" }}>Experience</span>
      </h2>
      <p className="reveal" style={{
        fontSize: ".9rem", color: "var(--text2)", lineHeight: 1.7,
        marginBottom: "3rem", maxWidth: "500px",
      }}>
        A timeline of my professional journey and the organizations I&apos;ve had the privilege to contribute to.
      </p>

      <div className="exp-grid">
        {/* Left: company list */}
        <div className="exp-left">
          {EXPERIENCES.map((e, i) => (
            <div key={e.company} onClick={() => setActive(i)}
              style={{
                padding: "1.5rem 0",
                borderBottom: i < EXPERIENCES.length - 1 ? "1px solid var(--border)" : "none",
                cursor: "pointer",
                opacity: active === i ? 1 : 0.35,
                transition: "opacity .2s",
              }}
              onMouseEnter={(el) => { if (active !== i) (el.currentTarget as HTMLDivElement).style.opacity = ".6"; }}
              onMouseLeave={(el) => { if (active !== i) (el.currentTarget as HTMLDivElement).style.opacity = ".35"; }}
            >
              <div style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.1rem", fontWeight: 700,
                color: active === i ? "var(--text)" : "var(--text2)",
                marginBottom: ".25rem", transition: "color .2s",
              }}>{e.company}</div>
              <div style={{
                fontSize: ".72rem", fontWeight: 500,
                color: "var(--text3)", letterSpacing: ".06em",
              }}>{e.date}</div>
            </div>
          ))}
        </div>

        {/* Right: detail panel */}
        <div className="exp-right">
          <div style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "1.6rem", fontWeight: 700, color: "var(--text)",
            letterSpacing: "-.02em", marginBottom: "1rem", lineHeight: 1.2,
          }}>{exp.role}</div>

          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".7rem", marginBottom: "1.5rem" }}>
            {exp.bullets.map((b) => (
              <li key={b} style={{
                fontSize: ".88rem", color: "var(--text2)", lineHeight: 1.7,
                paddingLeft: "1.2rem", position: "relative",
              }}>
                <span style={{ position: "absolute", left: 0, color: "var(--text3)", fontSize: ".75rem", top: ".2rem" }}>→</span>
                {b}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
            {exp.tags.map((t) => <span key={t} className="stag">{t}</span>)}
          </div>
        </div>
      </div>

      <style>{`
        .exp-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 0;
        }
        .exp-left {
          border-right: 1px solid var(--border);
          padding-right: 3rem;
        }
        .exp-right {
          padding-left: 3rem;
          padding-top: 1.5rem;
        }
        @media (max-width: 1024px) {
          .exp-grid { grid-template-columns: 1fr; }
          .exp-left {
            border-right: none;
            border-bottom: 1px solid var(--border);
            padding-right: 0;
            padding-bottom: 1.5rem;
            margin-bottom: 2rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0;
            overflow-x: auto;
          }
          .exp-left > div {
            padding: 1rem 1.5rem 1rem 0 !important;
            border-bottom: none !important;
            border-right: 1px solid var(--border);
            white-space: nowrap;
          }
          .exp-left > div:last-child { border-right: none; }
          .exp-right { padding-left: 0; }
        }
        @media (max-width: 480px) {
          .exp-right > div:first-child { font-size: 1.3rem !important; }
        }
      `}</style>
    </section>
  );
}