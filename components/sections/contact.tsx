"use client";
import { useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";

const LINKS = [
  { icon: "✉️", label: "Email",    val: "hilalabdulgani@gmail.com",    href: "mailto:hilalabdulgani@gmail.com" },
  { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/hilal-muhamad", href: "https://linkedin.com/in/hilal-muhamad" },
  { icon: "🐙", label: "GitHub",   val: "github.com/hilalmuhamad",      href: "https://github.com/hilalmuhamad" },
  { icon: "📱", label: "WhatsApp", val: "081563955598",                  href: "https://wa.me/6281563955598" },
];

const inputStyle: React.CSSProperties = {
  background: "var(--surface)", border: "1.5px solid var(--border)",
  borderRadius: "10px", padding: ".85rem 1rem", color: "var(--text)",
  fontFamily: "'Manrope',sans-serif", fontSize: ".85rem",
  outline: "none", width: "100%", transition: "border-color .2s",
};

export default function Contact() {
  useScrollReveal();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [hovered, setHovered] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) { setStatus("error"); setTimeout(() => setStatus("idle"), 2500); return; }
    const mailto = `mailto:hilalabdulgani@gmail.com?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto);
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <>
      <section id="contact" style={{ background: "var(--bg2)" }}>
        <div className="sec-label">Get In Touch</div>

        <h2 className="reveal" style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "clamp(2.5rem,5vw,4.5rem)",
          lineHeight: 1.0, letterSpacing: "-.03em",
          color: "var(--text)", marginBottom: "3.5rem",
        }}>
          <span style={{ fontWeight: 900 }}>Let&apos;s build</span><br />
          <span style={{ fontStyle: "italic", color: "var(--text2)" }}>something</span><br />
          <span style={{ fontWeight: 900 }}>great</span>{" "}
          <span style={{ fontStyle: "italic", color: "var(--text2)" }}>together.</span>
        </h2>

        <div className="contact-grid">
          {/* Left: info + links */}
          <div className="reveal">
            <p style={{ fontSize: ".9rem", color: "var(--text2)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Saya <strong style={{ color: "var(--text)", fontWeight: 600 }}>Fresh Graduate D3 Teknik Informatika (3.72/4.00)</strong>, tersedia <strong style={{ color: "var(--text)", fontWeight: 600 }}>full-time mulai Oktober 2026</strong> untuk posisi{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>Full-Stack / Mobile (Flutter) / Back-End Developer</strong>.
              Open to on-site Bandung / Jabodetabek & remote. Response &lt;24 jam.
            </p>

            {/* Available badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: ".6rem",
              padding: ".5rem 1rem", background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.25)", borderRadius: "999px",
              marginBottom: "1.8rem",
            }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", display: "block" }} />
              <span style={{ fontSize: ".75rem", fontWeight: 500, color: "#22c55e", letterSpacing: ".06em" }}>
                Currently available · Response within 24h
              </span>
            </div>

            {/* Contact links */}
            <div style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}>
              {LINKS.map(({ icon, label, val, href }) => (
                <a key={label} href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  onMouseEnter={() => setHovered(label)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: ".9rem 1.1rem",
                    background: hovered === label ? "rgba(0,0,0,0.02)" : "var(--surface)",
                    border: `1.5px solid ${hovered === label ? "var(--text)" : "var(--border)"}`,
                    borderRadius: "12px", textDecoration: "none",
                    transform: hovered === label ? "translateX(5px)" : "translateX(0)",
                    transition: "all .2s",
                  }}
                >
                  <span style={{ fontSize: "1.1rem", width: "32px", textAlign: "center", flexShrink: 0 }}>{icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: ".62rem", fontWeight: 600, color: "var(--text3)", letterSpacing: ".1em", textTransform: "uppercase" }}>{label}</div>
                    <div style={{ fontSize: ".85rem", fontWeight: 500, color: "var(--text)", marginTop: ".1rem" }}>{val}</div>
                  </div>
                  <span style={{
                    color: hovered === label ? "var(--text)" : "var(--text3)",
                    fontSize: ".9rem", transition: "all .2s",
                    transform: hovered === label ? "rotate(-45deg)" : "none",
                    flexShrink: 0,
                  }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="reveal">
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Name + Email */}
              <div className="form-row">
                <div style={{ display: "flex", flexDirection: "column", gap: ".45rem" }}>
                  <label style={{ fontSize: ".68rem", fontWeight: 600, color: "var(--text3)", letterSpacing: ".1em", textTransform: "uppercase" }}>Name *</label>
                  <input name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange}
                    style={{ ...inputStyle, borderColor: status === "error" && !form.name ? "#ef4444" : "var(--border)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: ".45rem" }}>
                  <label style={{ fontSize: ".68rem", fontWeight: 600, color: "var(--text3)", letterSpacing: ".1em", textTransform: "uppercase" }}>Email *</label>
                  <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange}
                    style={{ ...inputStyle, borderColor: status === "error" && !form.email ? "#ef4444" : "var(--border)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>
              </div>

              {/* Subject */}
              <div style={{ display: "flex", flexDirection: "column", gap: ".45rem" }}>
                <label style={{ fontSize: ".68rem", fontWeight: 600, color: "var(--text3)", letterSpacing: ".1em", textTransform: "uppercase" }}>Subject</label>
                <input name="subject" type="text" placeholder="Internship Opportunity / Collaboration" value={form.subject} onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              {/* Message */}
              <div style={{ display: "flex", flexDirection: "column", gap: ".45rem" }}>
                <label style={{ fontSize: ".68rem", fontWeight: 600, color: "var(--text3)", letterSpacing: ".1em", textTransform: "uppercase" }}>Message *</label>
                <textarea name="message" placeholder="Halo Hilal, saya tertarik untuk..." rows={5} value={form.message} onChange={handleChange}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "130px", borderColor: status === "error" && !form.message ? "#ef4444" : "var(--border)" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--text)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              {/* Submit */}
              <button onClick={handleSend} className="btn-dark" style={{
                alignSelf: "flex-start",
                background: status === "error" ? "#ef4444" : status === "sent" ? "var(--tag-bg)" : "var(--accent)",
                color: status === "sent" ? "var(--text)" : undefined,
              }}>
                {status === "sent" ? "✓ Opened in Mail!" : status === "error" ? "Fill required fields!" : "Send Message ↗"}
              </button>

              <p style={{ fontSize: ".65rem", color: "var(--text3)", letterSpacing: ".04em" }}>
                * Pesan akan membuka aplikasi email kamu secara otomatis.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5rem;
            align-items: start;
          }
          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          @media (max-width: 1024px) {
            .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
          }
          @media (max-width: 480px) {
            .form-row { grid-template-columns: 1fr; }
          }
        `}</style>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        padding: "2rem 5rem",
        borderTop: "1px solid var(--border)",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "1rem",
        background: "var(--bg)",
      }}>
        <div style={{
          fontFamily: "'Playfair Display',serif",
          fontSize: "1rem", fontWeight: 700, color: "var(--text)",
          letterSpacing: "-.01em",
        }}>Hilal Muhamad</div>

        <div style={{ fontSize: ".72rem", color: "var(--text3)", letterSpacing: ".04em" }}>
          © 2026 Hilal Muhamad Abdul Gani · Built with Next.js
        </div>

        <div style={{ display: "flex", gap: "1.5rem" }}>
          {[
            { label: "LinkedIn", href: "https://linkedin.com/in/hilal-muhamad" },
            { label: "GitHub",   href: "https://github.com/hilalmuhamad" },
            { label: "Email",    href: "mailto:hilalabdulgani@gmail.com" },
          ].map(({ label, href }) => (
            <a key={label} href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={{
                fontSize: ".75rem", fontWeight: 500, color: "var(--text2)",
                textDecoration: "none", transition: "color .2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text2)")}
            >{label}</a>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            footer { padding: 1.5rem 1.5rem !important; flex-direction: column; align-items: flex-start; }
          }
          @media (max-width: 480px) {
            footer div:last-child { display: none; }
          }
        `}</style>
      </footer>
    </>
  );
}