"use client";
import Image from "next/image";
import { Code2, Users, Award } from "lucide-react";
import { useLanguage, STR } from "@/lib/LanguageProvider";
import { useScrollReveal } from "@/lib/useScrollReveal";

function CardIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300">
      {children}
    </div>
  );
}

export default function About() {
  const { lang } = useLanguage();
  const t = STR.about;
  useScrollReveal();

  return (
    <section id="about" className="px-4 py-20 sm:px-6 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header ringkas */}
        <div className="reveal mb-10">
          <p className="mb-2 text-xs font-bold tracking-[0.22em] text-zinc-500 uppercase">
            {t.eyebrow[lang]}
          </p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl font-black tracking-tight text-zinc-100 sm:text-4xl md:text-5xl"
          >
            {t.titleA[lang]}{" "}
            <span className="font-bold text-zinc-400 italic">{t.titleB[lang]}</span>
          </h2>
        </div>

        {/* Bento: narasi lebar + foto portrait, 2 kartu di bawah */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {/* Kartu 1 — lebar */}
          <article className="reveal rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-zinc-600 md:col-span-2 md:p-10">
            <CardIcon>
              <Code2 size={20} />
            </CardIcon>
            <h3 className="mb-4 text-xl font-bold tracking-tight text-zinc-100 md:text-2xl">
              {t.card1Title[lang]}
            </h3>
            <p className="max-w-4xl text-sm leading-relaxed text-zinc-400 md:text-base">
              {t.card1Body[lang]}
            </p>
          </article>

          {/* Kartu foto — portrait tinggi */}
          <article className="reveal group relative min-h-[440px] overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-zinc-600 md:row-span-2 md:min-h-full">
            <Image
              src="/pas photo hilal.jpeg"
              alt="Hilal Muhamad Abdul Gani"
              fill
              style={{ objectFit: "cover", objectPosition: "top center" }}
              sizes="(max-width: 768px) 100vw, 400px"
              className="transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/25 to-transparent"
            />
            <div className="absolute right-5 bottom-5 left-5 flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-bold text-zinc-100">
                  Hilal Muhamad A. G.
                </div>
                <div className="text-[0.7rem] text-zinc-400">
                  D3 Informatics · ULBI
                </div>
              </div>
              <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[0.7rem] font-bold text-emerald-400">
                3.72 IPK
              </span>
            </div>
          </article>

          {/* Kartu 2 — pengalaman */}
          <article className="reveal rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-zinc-600">
            <CardIcon>
              <Users size={20} />
            </CardIcon>
            <h3 className="mb-4 text-xl font-bold tracking-tight text-zinc-100">
              {t.card2Title[lang]}
            </h3>
            <ul className="flex flex-col gap-3.5">
              {t.card2Points[lang].map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                  <span aria-hidden className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Kartu 3 — pendidikan */}
          <article className="reveal rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-zinc-600">
            <CardIcon>
              <Award size={20} />
            </CardIcon>
            <h3 className="mb-4 text-xl font-bold tracking-tight text-zinc-100">
              {t.card3Title[lang]}
            </h3>
            <ul className="flex flex-col gap-3.5">
              {t.card3Points[lang].map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                  <span aria-hidden className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
