"use client";
import { useState, useEffect } from "react";
import { useTheme } from "@/lib/ThemeProvider";

const NAV_LINKS = [
  { label: "About Me",   href: "#about" },
  { label: "Services",   href: "#skills" },
  { label: "Project",    href: "#projects" },
  { label: "Experience", href: "#experience" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen]   = useState(false);
  const [active, setActive] = useState("");

  /* Active section highlight on scroll */
  useEffect(() => {
    const handler = () => {
      const ids = ["about", "skills", "projects", "experience", "education", "contact"];
      let cur = "";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 150) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const close = () => { setOpen(false); document.body.style.overflow = ""; };
  const openMenu = () => { setOpen(true); document.body.style.overflow = "hidden"; };

  /* Shared link style */
  const linkStyle = (href: string): React.CSSProperties => {
    const id = href.replace("#", "");
    const isActive = active === id;
    return {
      fontSize: ".75rem", fontWeight: 500,
      color: isActive ? "var(--bg)" : "rgba(245,244,240,0.65)",
      textDecoration: "none",
      padding: ".45rem .9rem", borderRadius: "999px",
      letterSpacing: ".02em",
      background: isActive ? "rgba(245,244,240,0.18)" : "transparent",
      transition: "all .2s",
    };
  };

  return (
    <>
      {/* ── Desktop Nav ── */}
      <nav style={{
        position: "fixed", top: "1.2rem", left: "50%",
        transform: "translateX(-50%)", zIndex: 200,
        display: "flex", alignItems: "center",
        background: "var(--accent)",
        borderRadius: "999px",
        padding: ".45rem .45rem .45rem 1rem",
        boxShadow: "var(--shadow-lg)",
        whiteSpace: "nowrap",
      }}>
        {/* Logo */}
        <div style={{
          width: "30px", height: "30px", borderRadius: "50%",
          background: "var(--accent-inv)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Playfair Display',serif", fontSize: ".85rem", fontWeight: 700,
          color: "var(--accent)", flexShrink: 0, marginRight: ".8rem",
        }}>H</div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: ".1rem", alignItems: "center" }}
          className="nav-desktop-links">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} style={linkStyle(href)}
              onMouseEnter={(e) => { if (active !== href.replace("#","")) { (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(245,244,240,0.12)"; } }}
              onMouseLeave={(e) => { if (active !== href.replace("#","")) { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,244,240,0.65)"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; } }}
            >{label}</a>
          ))}
        </div>

        {/* CTA */}
        <a href="#contact" onClick={close} style={{
          background: "var(--bg)", color: "var(--text)",
          fontSize: ".75rem", fontWeight: 600,
          padding: ".5rem 1.1rem", borderRadius: "999px",
          marginLeft: ".3rem", textDecoration: "none",
          display: "flex", alignItems: "center", gap: ".4rem",
          transition: "opacity .2s", flexShrink: 0,
        }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = ".85")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
        >Let&apos;s Connect ↗</a>

        {/* Theme toggle */}
        <button onClick={toggle} title="Toggle theme" style={{
          width: "32px", height: "32px", borderRadius: "50%",
          background: "rgba(255,255,255,0.12)", border: "none",
          cursor: "pointer", display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: ".9rem",
          marginLeft: ".3rem", transition: "background .2s", flexShrink: 0,
        }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.22)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)")}
        >{theme === "light" ? "🌙" : "☀️"}</button>

        {/* Hamburger */}
        <button onClick={open ? close : openMenu} aria-label="Menu" style={{
          display: "none", width: "32px", height: "32px", borderRadius: "50%",
          background: "rgba(255,255,255,0.12)", border: "none",
          cursor: "pointer", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: "4px", marginLeft: ".3rem", flexShrink: 0,
        }} className="hamburger-btn">
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: "block", width: "14px", height: "1.5px",
              background: "var(--bg)", borderRadius: "2px",
              transition: "all .3s",
              transform: open
                ? i === 0 ? "translateY(5.5px) rotate(45deg)"
                : i === 2 ? "translateY(-5.5px) rotate(-45deg)" : "none"
                : "none",
              opacity: open && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* ── Mobile fullscreen menu ── */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 199,
          background: "var(--bg)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "2rem",
        }}>
          {[...NAV_LINKS, { label: "Let's Connect", href: "#contact" }].map(({ label, href }) => (
            <a key={href} href={href} onClick={close} style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "2.5rem", fontWeight: 700,
              color: "var(--text)", textDecoration: "none",
              letterSpacing: "-.02em", transition: "opacity .2s",
            }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = ".4")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >{label}</a>
          ))}
          {/* Theme toggle inside mobile menu */}
          <button onClick={toggle} style={{
            marginTop: "1rem", padding: ".6rem 1.4rem",
            borderRadius: "999px", border: "1.5px solid var(--border)",
            background: "transparent", color: "var(--text)",
            fontSize: ".85rem", fontWeight: 500, cursor: "pointer",
            fontFamily: "'Manrope',sans-serif",
          }}>{theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}</button>
        </div>
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}