"use client";
import Image from "next/image";

const TAGS  = ["Full-Stack Dev", "Back-End", "Mobile App", "DevOps", "Linux Server"];
const STATS = [
  { num: "4+",   label: "Projects" },
  { num: "3.67", label: "GPA" },
  { num: "2+",   label: "Certs" },
];

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "6rem 5rem 3rem",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* BADGE */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: ".5rem",
        padding: ".4rem 1rem", borderRadius: "999px",
        background: "var(--tag-bg)",
        fontSize: ".75rem", fontWeight: 500, color: "var(--text2)",
        letterSpacing: ".02em", marginBottom: "2rem",
        width: "fit-content",
      }}>
        <span style={{
          width: "6px", height: "6px", borderRadius: "50%",
          background: "#22c55e", display: "block", flexShrink: 0,
        }} />
        Hi 👋, Let&apos;s Build Scalable Web Solutions
      </div>

      {/* MAIN: title + photo */}
      <div className="hero-main">
        <h1 className="hero-title">
          <span style={{ fontWeight: 900, display: "block" }}>Hi, I&apos;m Hilal</span>
          <span style={{ fontWeight: 400, color: "var(--text2)", display: "block" }}>
            Building modern, <em style={{ fontStyle: "italic" }}>high-</em>
          </span>
          <span style={{ display: "block" }}>
            <em style={{ fontStyle: "italic", color: "var(--text2)", fontWeight: 400 }}>performance,</em>
            <span style={{ fontWeight: 400, color: "var(--text2)" }}> websites</span>
          </span>
          <span style={{ fontWeight: 400, color: "var(--text2)", display: "block" }}>
            with a focus on <em style={{ fontStyle: "italic" }}>user</em>
          </span>
          <em style={{ fontStyle: "italic", color: "var(--text2)", fontWeight: 400, display: "block" }}>
            experience.
          </em>
        </h1>

        {/* Photo + desc */}
        <div className="hero-right">
          <div className="hero-photo-wrap">
            <Image
              src="/pas photo hilal.jpeg"
              alt="Hilal Muhamad Abdul Gani"
              fill
              style={{ objectFit: "cover", objectPosition: "top center" }}
              priority
            />
          </div>
          <p className="hero-desc">
            I&apos;m a full-stack developer who believes great web apps are built on
            clean architecture and real user needs.
          </p>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="hero-bottom">
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
          {TAGS.map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "center", flexShrink: 0 }}>
          {STATS.map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem", fontWeight: 700,
                color: "var(--text)", lineHeight: 1,
              }}>{num}</div>
              <div style={{
                fontSize: ".6rem", fontWeight: 600,
                color: "var(--text3)", letterSpacing: ".12em",
                textTransform: "uppercase", marginTop: ".35rem",
              }}>{label}</div>
            </div>
          ))}
        </div>
        <a href="/CV_Hilal.pdf" download className="btn-dark" style={{ flexShrink: 0 }}>
          Download CV ↓
        </a>
      </div>

      <style>{`
        .hero-main {
          display: grid;
          grid-template-columns: 1fr 260px;
          align-items: center;
          gap: 3rem;
          flex: 1;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.5rem, 7.5vw, 7.5rem);
          line-height: 1.0;
          letter-spacing: -.03em;
          color: var(--text);
        }
        .hero-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1.4rem;
        }
        .hero-photo-wrap {
          width: 220px;
          height: 290px;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 16px 48px rgba(0,0,0,0.12);
          border: 1px solid var(--border);
          flex-shrink: 0;
        }
        .hero-desc {
          font-size: .85rem;
          line-height: 1.75;
          color: var(--text2);
          text-align: right;
          max-width: 220px;
        }
        .hero-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          padding-top: 2rem;
          margin-top: 2.5rem;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
        }

        /* Tablet */
        @media (max-width: 1100px) {
          #hero { padding: 6rem 3rem 3rem !important; }
          .hero-title { font-size: clamp(3rem, 6vw, 5.5rem) !important; }
          .hero-main { grid-template-columns: 1fr 200px; gap: 2rem; }
          .hero-photo-wrap { width: 180px !important; height: 240px !important; }
          .hero-right { width: 180px; }
          .hero-desc { max-width: 180px; }
        }

        /* Mobile */
        @media (max-width: 768px) {
          #hero { padding: 5.5rem 1.5rem 2.5rem !important; }
          .hero-main { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .hero-right {
            flex-direction: row !important;
            align-items: flex-start !important;
            width: 100% !important;
            gap: 1.2rem !important;
          }
          .hero-photo-wrap { width: 110px !important; height: 145px !important; border-radius: 14px !important; }
          .hero-desc { text-align: left !important; max-width: none !important; align-self: center; }
          .hero-title { font-size: clamp(2.4rem, 8vw, 3.5rem) !important; }
        }

        /* Small mobile */
        @media (max-width: 480px) {
          #hero { padding: 5rem 1.2rem 2rem !important; }
          .hero-title { font-size: clamp(2rem, 9vw, 3rem) !important; }
          .hero-photo-wrap { width: 85px !important; height: 110px !important; }
          .hero-desc { display: none !important; }
        }
      `}</style>
    </section>
  );
}