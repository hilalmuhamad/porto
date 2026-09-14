"use client";
import Image from "next/image";

const TAGS = ["Flutter", "Laravel", "React.js", "Node.js", "PostgreSQL", "Golang"];
const STATS = [
  { num: "4+", label: "Production Projects" },
  { num: "3.72", label: "GPA / 4.00" },
  { num: "2", label: "Internships 2026" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
        padding: 0,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ——— Background Decor ——— */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
      }}>
        {/* subtle grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
          opacity: 0.35,
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 75%)",
        }} />
        {/* gradient orb behind photo */}
        <div style={{
          position: "absolute", right: "8%", top: "12%",
          width: "560px", height: "560px", borderRadius: "50%",
          background: "radial-gradient(circle at 30% 30%, var(--border) 0%, transparent 65%)",
          opacity: 0.9, filter: "blur(1px)",
        }} />
        <div style={{
          position: "absolute", right: "18%", top: "18%",
          width: "420px", height: "420px", borderRadius: "50%",
          background: "var(--bg2)",
          border: "1px solid var(--border)",
          opacity: 0.7,
        }} />
      </div>

      <div className="hero-inner">
        {/* LEFT — Content */}
        <div className="hero-left">
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span>Available for Full-time · Fresh Graduate — Oct 2026</span>
            <span className="hero-badge-sep">·</span>
            <span style={{ color: "var(--text)", fontWeight: 600 }}>Bandung, ID</span>
          </div>

          <h1 className="hero-h1">
            {/* Hanya nama lengkap — Playfair sama persis About */}
            <span className="hero-role">
              <span style={{ fontWeight: 900 }}>Hi, I&apos;m Hilal</span><br />
              <span style={{ fontWeight: 400, color: "var(--text2)" }}>Muhamad </span>
              <span style={{ fontStyle: "italic", fontWeight: 700, color: "var(--text2)" }}>Abdul Gani</span>
            </span>
          </h1>

          <p className="hero-value">
            Fresh graduate <strong>D3 Teknik Informatika — ULBI (GPA 3.72/4.00)</strong> focused on
            shipping <strong>reliable, scalable products</strong>: KPI dashboards powered by OLAP,
            <strong> Flutter apps with BLoC & Clean Architecture</strong> that stay smooth offline,
            and <strong>distributed Go backends</strong> proven under high-concurrency load.
            Finishing internships at <strong>Maqdis Academy & Komdigi</strong> — available full-time <strong>Oct 2026</strong>.
          </p>

          {/* CTA */}
          <div className="hero-cta">
            <a href="/CV_Hilal Muhamad Abdul Gani.pdf" download className="btn-dark hero-cta-primary">
              Download CV <span aria-hidden>↓</span>
            </a>
            <a href="#projects" className="btn-outline">
              View Projects <span aria-hidden>→</span>
            </a>
            <div className="hero-social">
              <a href="https://linkedin.com/in/hilal-muhamad" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hero-icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.76-1.75 1.76zm15.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.77c1.4-2.59 7-2.78 7 2.48v6.75z"/></svg>
              </a>
              <a href="https://github.com/hilalmuhamad" target="_blank" rel="noreferrer" aria-label="GitHub" className="hero-icon-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23.95-.26 1.98-.39 3-.39s2.05.13 3 .39c2.29-1.55 3.29-1.23 3.29-1.23.67 1.65.26 2.87.13 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58 4.77-1.59 8.21-6.09 8.21-11.39 0-6.63-5.37-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          {/* Trust / Stats + Tags */}
          <div className="hero-trust">
            <div className="hero-stats">
              {STATS.map(({ num, label }) => (
                <div key={label} className="hero-stat">
                  <div className="hero-stat-num">{num}</div>
                  <div className="hero-stat-label">{label}</div>
                </div>
              ))}
            </div>
            <div className="hero-tags">
              {TAGS.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        </div>

        {/* RIGHT — Photo */}
        <div className="hero-visual">
          <div className="hero-photo-card">
            <div className="hero-photo-frame">
              <Image
                src="/pas photo hilal.jpeg"
                alt="Hilal Muhamad Abdul Gani — Full-Stack & Mobile Developer"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                priority
                sizes="(max-width: 900px) 100vw, 380px"
              />
            </div>

            {/* Floating: availability */}
            <div className="hero-float hero-float-top">
              <span className="hero-float-dot" />
              <span style={{ fontSize: ".72rem", fontWeight: 600, color: "var(--text)", letterSpacing: ".02em" }}>
                Open to Work
              </span>
              <span style={{ fontSize: ".68rem", color: "var(--text2)" }}>Response &lt;24h</span>
            </div>

            {/* Floating: role card */}
            <div className="hero-float hero-float-bottom">
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "var(--accent)", color: "var(--accent-inv)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: ".85rem", flexShrink: 0 }}>H</div>
              <div>
                <div style={{ fontSize: ".8rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.1 }}>Hilal Muhamad A. G.</div>
                <div style={{ fontSize: ".7rem", color: "var(--text2)", marginTop: ".15rem" }}>D3 Informatics · ULBI Bandung</div>
              </div>
              <span style={{ marginLeft: "auto", fontSize: ".7rem", fontWeight: 700, color: "#22c55e", background: "rgba(34,197,94,.12)", padding: ".25rem .55rem", borderRadius: "999px", border: "1px solid rgba(34,197,94,.2)" }}>3.72 GPA</span>
            </div>
          </div>

          <div className="hero-visual-caption">
            Final-year · 2 Internships 2026 (Maqdis Academy & Komdigi Bandung) · Jakarta/Bandung ready
          </div>
        </div>
      </div>

      <style>{`
        .hero-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 7.2rem 3rem 3rem;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
          align-items: center;
        }
        .hero-left { display: flex; flex-direction: column; gap: 1.4rem; min-width: 0; }

        .hero-badge {
          display: inline-flex; align-items: center; gap: .6rem;
          padding: .5rem .95rem; border-radius: 999px;
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          font-size: .72rem; font-weight: 500; color: var(--text2);
          letter-spacing: .02em; width: fit-content; max-width: 100%;
          flex-wrap: wrap;
        }
        .hero-badge-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #22c55e;
          box-shadow: 0 0 0 6px rgba(34,197,94,.14);
          flex-shrink: 0; animation: pulseDot 2s infinite;
        }
        .hero-badge-sep { opacity: .35; }
        @keyframes pulseDot { 0%{box-shadow:0 0 0 0 rgba(34,197,94,.35)} 70%{box-shadow:0 0 0 7px rgba(34,197,94,0)} 100%{box-shadow:0 0 0 0 rgba(34,197,94,0)} }

        .hero-h1 { display: flex; flex-direction: column; gap: .45rem; line-height: 1; }
        .hero-name {
          font-family: 'Manrope', sans-serif;
          font-size: .82rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--text3);
        }
        .hero-name-accent { color: var(--text); font-weight: 800; letter-spacing: -.01em; text-transform: none; font-family: 'Playfair Display', serif; font-size: 1.05rem; }
        /* ——— SAMA PERSIS dengan About ——— */
        .hero-role {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4.2vw, 3.4rem);
          line-height: 1.15;
          letter-spacing: -.02em;
          color: var(--text);
        }
        .hero-value {
          font-size: .95rem; line-height: 1.75; color: var(--text2);
          max-width: 560px; margin-top: .2rem;
        }
        .hero-value strong { color: var(--text); font-weight: 700; }

        .hero-cta { display: flex; flex-wrap: wrap; gap: .75rem; align-items: center; margin-top: .4rem; }
        .hero-cta-primary { padding: .9rem 1.5rem; font-size: .82rem; box-shadow: var(--shadow); }
        .hero-social { display: flex; gap: .5rem; margin-left: .25rem; }
        .hero-icon-btn {
          width: 38px; height: 38px; border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          background: var(--surface); border: 1px solid var(--border);
          color: var(--text2); transition: all .2s; text-decoration: none;
        }
        .hero-icon-btn:hover { border-color: var(--text); color: var(--text); transform: translateY(-2px); box-shadow: var(--shadow); }

        .hero-trust {
          display: flex; flex-direction: column; gap: 1.1rem;
          padding-top: 1.4rem; margin-top: .2rem;
          border-top: 1px solid var(--border);
        }
        .hero-stats { display: flex; gap: 2rem; align-items: flex-start; flex-wrap: wrap; }
        .hero-stat { min-width: 0; }
        .hero-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.9rem; font-weight: 800; color: var(--text); line-height: 1; letter-spacing: -.02em;
        }
        .hero-stat-label {
          font-size: .62rem; font-weight: 700; color: var(--text3);
          letter-spacing: .11em; text-transform: uppercase; margin-top: .35rem; line-height: 1.2;
        }
        .hero-tags { display: flex; flex-wrap: wrap; gap: .45rem; }

        /* ——— Visual ——— */
        .hero-visual { display: flex; flex-direction: column; align-items: center; gap: 1rem; min-width: 0; }
        .hero-photo-card {
          position: relative;
          width: 100%; max-width: 380px;
          padding: 14px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 28px;
          box-shadow: var(--shadow-lg);
          transform: rotate(-0.6deg);
        }
        .hero-photo-frame {
          position: relative;
          width: 100%; aspect-ratio: 4 / 5;
          border-radius: 18px; overflow: hidden;
          background: var(--bg2);
          border: 1px solid var(--border);
        }
        .hero-float {
          position: absolute; display: flex; align-items: center; gap: .6rem;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px; padding: .65rem .85rem;
          box-shadow: 0 10px 30px rgba(0,0,0,.11);
        }
        .hero-float-top {
          top: -14px; left: -14px;
          padding: .55rem .75rem; border-radius: 999px; gap: .5rem;
        }
        .hero-float-dot {
          width: 7px; height: 7px; border-radius: 50%; background: #22c55e;
          box-shadow: 0 0 0 5px rgba(34,197,94,.15);
        }
        .hero-float-bottom {
          bottom: 18px; left: 18px; right: 18px;
          border-radius: 16px; padding: .7rem .85rem;
        }
        .hero-visual-caption {
          font-size: .68rem; font-weight: 600; color: var(--text3);
          letter-spacing: .06em; text-transform: uppercase; text-align: center;
          line-height: 1.5; max-width: 360px;
        }

        /* ——— Responsive ——— */
        @media (max-width: 1100px) {
          .hero-inner { padding: 7rem 2rem 2.5rem; gap: 2.5rem; grid-template-columns: 1.05fr .95fr; }
          .hero-photo-card { max-width: 340px; }
        }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; gap: 2.2rem; padding: 6rem 1.5rem 2.5rem; }
          .hero-visual { order: -1; }
          .hero-photo-card { max-width: 380px; transform: none; }
          .hero-role { font-size: clamp(2.1rem, 7vw, 2.9rem) !important; }
          .hero-value { font-size: .9rem; }
        }
        @media (max-width: 480px) {
          .hero-inner { padding: 5.5rem 1.1rem 2rem; gap: 1.6rem; }
          .hero-badge { font-size: .68rem; padding: .45rem .8rem; }
          .hero-role { font-size: clamp(1.9rem, 8vw, 2.35rem) !important; }
          .hero-value { font-size: .86rem; line-height: 1.7; }
          .hero-stats { gap: 1.4rem; }
          .hero-stat-num { font-size: 1.55rem; }
          .hero-photo-card { padding: 10px; border-radius: 20px; }
          .hero-photo-frame { border-radius: 14px; }
          .hero-float-bottom { left: 12px; right: 12px; bottom: 12px; padding: .6rem .7rem; }
          .hero-visual-caption { font-size: .62rem; }
        }
      `}</style>
    </section>
  );
}
