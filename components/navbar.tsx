"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/lib/ThemeProvider";

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education",  href: "#education" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active link — lebih akurat daripada offsetTop
  useEffect(() => {
    const ids = ["about", "projects", "experience", "education", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  // lock scroll + esc to close
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const close = () => setOpen(false);

  const linkStyle = (href: string): React.CSSProperties => {
    const isActive = active === href.replace("#", "");
    return {
      fontSize: ".78rem", fontWeight: isActive ? 600 : 500,
      color: isActive ? "var(--bg)" : "rgba(245,244,240,0.68)",
      textDecoration: "none",
      padding: ".42rem .85rem", borderRadius: "999px",
      letterSpacing: ".01em",
      background: isActive ? "rgba(245,244,240,0.18)" : "transparent",
      transition: "all .18s",
      border: isActive ? "1px solid rgba(245,244,240,0.12)" : "1px solid transparent",
    };
  };

  return (
    <>
      <nav
        aria-label="Primary"
        style={{
          position: "fixed",
          top: scrolled ? ".85rem" : "1.15rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          gap: ".35rem",
          background: "var(--accent)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "999px",
          padding: ".38rem .38rem .38rem .6rem",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.14), 0 1px 0 rgba(255,255,255,0.06) inset" : "var(--shadow-lg)",
          whiteSpace: "nowrap",
          transition: "top .25s, box-shadow .25s, background .25s",
          maxWidth: "96vw",
        }}
      >
        {/* Logo + Name */}
        <a href="#" aria-label="Home" style={{ display: "flex", alignItems: "center", gap: ".6rem", textDecoration: "none", flexShrink: 0 }}>
          <div style={{
            width: "32px", height: "32px", borderRadius: "50%",
            background: "var(--accent-inv)", color: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Playfair Display',serif", fontSize: ".9rem", fontWeight: 800,
            letterSpacing: "-.02em",
          }}>H</div>
          <span className="nav-name" style={{
            fontFamily: "'Manrope',sans-serif", fontSize: ".82rem", fontWeight: 700,
            color: "var(--bg)", letterSpacing: "-.01em", paddingRight: ".35rem",
          }}>Hilal</span>
        </a>

        <span aria-hidden style={{ width: "1px", height: "18px", background: "rgba(245,244,240,0.12)", flexShrink: 0 }} className="nav-sep" />

        {/* Desktop links */}
        <div className="nav-desktop-links" style={{ display: "flex", gap: ".15rem", alignItems: "center" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} style={linkStyle(href)}
              onMouseEnter={(e) => { if (active !== href.replace("#","")) { (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(245,244,240,0.10)"; } }}
              onMouseLeave={(e) => { if (active !== href.replace("#","")) { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,244,240,0.68)"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; } }}
            >{label}</a>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: ".35rem", flexShrink: 0, marginLeft: ".15rem" }}>
          <a href="#contact" onClick={close} className="nav-cta" style={{
            background: "var(--bg)", color: "var(--text)",
            fontSize: ".76rem", fontWeight: 700,
            padding: ".5rem 1rem", borderRadius: "999px",
            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ".35rem",
            letterSpacing: ".01em", transition: "transform .18s, opacity .18s",
            border: "1px solid var(--border)",
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLAnchorElement).style.opacity = ".92"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            Contact <span aria-hidden style={{ fontSize: ".7rem" }}>↗</span>
          </a>

          {/* Theme toggle — icon, bukan emoji */}
          <button onClick={toggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} title="Toggle theme" style={{
            width: "34px", height: "34px", borderRadius: "50%",
            background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.08)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--bg)", flexShrink: 0, transition: "background .18s, transform .18s",
          }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.18)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.10)")}
          >
            {theme === "light" ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
            )}
          </button>

          {/* Hamburger — hanya mobile */}
          <button onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} style={{
            display: "none", width: "34px", height: "34px", borderRadius: "50%",
            background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.08)",
            cursor: "pointer", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: "4px", flexShrink: 0,
          }} className="hamburger-btn">
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block", width: "14px", height: "1.7px",
                background: "var(--bg)", borderRadius: "2px",
                transition: "all .26s cubic-bezier(.4,0,.2,1)",
                transform: open
                  ? i === 0 ? "translateY(5.7px) rotate(45deg)"
                    : i === 2 ? "translateY(-5.7px) rotate(-45deg)" : "scaleX(0)"
                  : "none",
                opacity: open && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu — sheet, bukan fullscreen brutal */}
      {open && (
        <>
          <button aria-label="Close menu backdrop" onClick={close} style={{
            position: "fixed", inset: 0, zIndex: 198,
            background: "rgba(0,0,0,0.22)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            border: "none", cursor: "pointer",
          }} />
          <div role="dialog" aria-modal="true" aria-label="Navigation menu" style={{
            position: "fixed", top: "4.2rem", left: "50%", transform: "translateX(-50%)",
            zIndex: 199, width: "min(92vw, 380px)",
            background: "var(--surface)", border: "1px solid var(--border)",
            borderRadius: "20px", boxShadow: "var(--shadow-lg)",
            padding: "1rem", display: "flex", flexDirection: "column", gap: ".35rem",
          }}>
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = active === href.replace("#", "");
              return (
                <a key={href} href={href} onClick={close} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: ".85rem 1rem", borderRadius: "12px",
                  background: isActive ? "var(--bg2)" : "transparent",
                  border: `1px solid ${isActive ? "var(--border)" : "transparent"}`,
                  color: isActive ? "var(--text)" : "var(--text2)",
                  textDecoration: "none", fontSize: ".92rem", fontWeight: isActive ? 600 : 500,
                  letterSpacing: "-.01em", transition: "background .15s",
                }}>
                  {label}
                  <span style={{ fontSize: ".8rem", opacity: isActive ? 1 : .35 }}>→</span>
                </a>
              );
            })}
            <div style={{ height: "1px", background: "var(--border)", margin: ".4rem 0" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".6rem" }}>
              <a href="#contact" onClick={close} style={{
                textAlign: "center", padding: ".75rem 1rem", borderRadius: "12px",
                background: "var(--accent)", color: "var(--accent-inv)",
                textDecoration: "none", fontSize: ".82rem", fontWeight: 700,
              }}>Contact ↗</a>
              <a href="/CV_Hilal Muhamad Abdul Gani.pdf" download onClick={close} style={{
                textAlign: "center", padding: ".75rem 1rem", borderRadius: "12px",
                background: "transparent", color: "var(--text)", border: "1.5px solid var(--border)",
                textDecoration: "none", fontSize: ".82rem", fontWeight: 600,
              }}>Download CV ↓</a>
            </div>
            <button onClick={toggle} style={{
              marginTop: ".2rem", width: "100%", padding: ".65rem 1rem",
              borderRadius: "12px", border: "1px solid var(--border)",
              background: "var(--bg2)", color: "var(--text2)",
              fontSize: ".78rem", fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem",
            }}>
              {theme === "light" ? (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg> Dark mode</>
              ) : (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg> Light mode</>
              )}
            </button>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 860px) {
          .nav-desktop-links, .nav-sep, .nav-name { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (max-width: 480px) {
          nav { padding: .38rem .38rem .38rem .45rem !important; }
          .nav-cta { padding: .48rem .85rem !important; font-size: .74rem !important; }
        }
      `}</style>
    </>
  );
}
