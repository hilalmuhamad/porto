"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, MessageCircle, Send, ArrowUpRight, Check } from "lucide-react";
import { useLanguage, STR } from "@/lib/LanguageProvider";
import { PROFILE } from "@/lib/portfolio";

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23.95-.26 1.98-.39 3-.39s2.05.13 3 .39c2.29-1.55 3.29-1.23 3.29-1.23.67 1.65.26 2.87.13 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58 4.77-1.59 8.21-6.09 8.21-11.39 0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.76-1.75 1.76zm15.5 12.27h-3v-5.6c0-3.37-4-3.11-4 0v5.6h-3v-11h3v1.77c1.4-2.59 7-2.78 7 2.48v6.75z" />
  </svg>
);

const WHATSAPP = "https://wa.me/6281563955598";

const inputClass =
  "w-full rounded-xl border border-hairline bg-surface-solid px-4 py-3 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-ink-4 focus:border-line-strong";

export default function Contact() {
  const { lang } = useLanguage();
  const t = STR.contact;
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
      return;
    }
    const subject = form.subject || (lang === "id" ? "Kontak dari Portofolio" : "Portfolio Contact");
    const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `${t.name[lang]}: ${form.name}\n${t.email[lang]}: ${form.email}\n\n${form.message}`
    )}`;
    window.open(mailto);
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 4000);
  };

  const links = [
    { label: "Email", val: PROFILE.email, href: `mailto:${PROFILE.email}`, Icon: () => <Mail size={17} /> },
    { label: "LinkedIn", val: "linkedin.com/in/hilal-muhamad", href: PROFILE.linkedin, Icon: () => <LinkedinIcon /> },
    { label: "GitHub", val: "github.com/hilalmuhamad", href: PROFILE.github, Icon: () => <GithubIcon /> },
    { label: "WhatsApp", val: "0815-6395-5598", href: WHATSAPP, Icon: () => <MessageCircle size={17} /> },
  ];

  return (
    <>
      <section id="contact" className="px-4 py-20 sm:px-6 md:py-24">
        <div className="mx-auto w-full max-w-6xl">
          {/* Header */}
          <div className="reveal mb-10 md:mb-12">
            <p className="mb-2 text-xs font-bold tracking-[0.22em] text-ink-3 uppercase">
              {t.eyebrow[lang]}
            </p>
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl font-black tracking-tight text-ink sm:text-4xl md:text-5xl"
            >
              {t.titleA[lang]}{" "}
              <span className="font-bold text-ink-2 italic">{t.titleB[lang]}</span>
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-2 md:text-base">
              {t.lead[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5 lg:gap-6">
            {/* Kiri — status & tautan */}
            <div className="reveal flex flex-col gap-4 lg:col-span-2">
              <div className="flex items-center gap-3 rounded-3xl bg-emerald-500/[0.08] px-5 py-4">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <div>
                  <div className="text-[0.8rem] font-bold text-ink">{t.available[lang]}</div>
                  <div className="text-[0.7rem] text-ink-2">{t.response[lang]}</div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                {links.map(({ label, val, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl bg-card shadow-soft px-4 py-3.5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-elevated text-ink-2 transition-colors duration-200 group-hover:text-ink">
                      <Icon />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[0.62rem] font-bold tracking-[0.14em] text-ink-3 uppercase">
                        {label}
                      </span>
                      <span className="mt-0.5 block truncate text-[0.85rem] font-medium text-ink">
                        {val}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-ink-4 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:text-ink"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Kanan — formulir */}
            <div className="reveal lg:col-span-3">
              <div className="rounded-3xl bg-card shadow-card p-6 backdrop-blur-sm md:p-8">
                <h3 className="text-base font-bold tracking-tight text-ink">
                  {t.formTitle[lang]}
                </h3>

                <div className="mt-6 flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="text-[0.62rem] font-bold tracking-[0.14em] text-ink-3 uppercase">
                        {t.name[lang]} *
                      </span>
                      <input
                        name="name"
                        type="text"
                        placeholder={t.namePh[lang]}
                        value={form.name}
                        onChange={handleChange}
                        className={`${inputClass} ${status === "error" && !form.name ? "border-red-500/70" : ""}`}
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className="text-[0.62rem] font-bold tracking-[0.14em] text-ink-3 uppercase">
                        {t.email[lang]} *
                      </span>
                      <input
                        name="email"
                        type="email"
                        placeholder={t.emailPh[lang]}
                        value={form.email}
                        onChange={handleChange}
                        className={`${inputClass} ${status === "error" && !form.email ? "border-red-500/70" : ""}`}
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className="text-[0.62rem] font-bold tracking-[0.14em] text-ink-3 uppercase">
                      {t.subject[lang]}
                    </span>
                    <input
                      name="subject"
                      type="text"
                      placeholder={t.subjectPh[lang]}
                      value={form.subject}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-[0.62rem] font-bold tracking-[0.14em] text-ink-3 uppercase">
                      {t.message[lang]} *
                    </span>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder={t.messagePh[lang]}
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} min-h-[130px] resize-y ${status === "error" && !form.message ? "border-red-500/70" : ""}`}
                    />
                  </label>

                  <div className="flex flex-wrap items-center gap-4">
                    <motion.button
                      type="button"
                      onClick={handleSend}
                      whileHover={reduce ? undefined : { y: -2 }}
                      whileTap={reduce ? undefined : { scale: 0.97 }}
                      className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-[0.78rem] font-semibold transition-colors duration-200 ${
                        status === "error"
                          ? "bg-red-500/90 text-white"
                          : status === "sent"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-invert text-on-invert"
                      }`}
                    >
                      {status === "sent" ? (
                        <>
                          <Check size={15} />
                          {t.sent[lang]}
                        </>
                      ) : status === "error" ? (
                        t.errorRequired[lang]
                      ) : (
                        <>
                          {t.send[lang]}
                          <Send size={15} />
                        </>
                      )}
                    </motion.button>
                    <p className="text-[0.68rem] leading-relaxed text-ink-4">{t.formNote[lang]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-hairline px-4 py-8 sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4">
          <div
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-sm font-bold tracking-tight text-ink"
          >
            {PROFILE.fullName}
          </div>

          <div className="text-[0.7rem] text-ink-3">
            © {new Date().getFullYear()} {PROFILE.name} · {t.builtWith[lang]}
          </div>

          <div className="flex items-center gap-5">
            {[
              { label: "LinkedIn", href: PROFILE.linkedin },
              { label: "GitHub", href: PROFILE.github },
              { label: "Email", href: `mailto:${PROFILE.email}` },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-[0.72rem] font-medium text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
