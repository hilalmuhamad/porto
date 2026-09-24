import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { LanguageProvider } from "@/lib/LanguageProvider";
import Splash from "@/components/splash";
import ScrollProgress from "@/components/scroll-progress";

export const metadata: Metadata = {
  title: "Hilal Muhamad Abdul Gani – Full-Stack & Mobile Developer | Flutter · Laravel · React",
  description:
    "Fresh Graduate D3 Teknik Informatika Universitas Logistik dan Bisnis Internasional (Poltekpos) (GPA 3.72) — Full-Stack & Mobile Developer (Flutter BLoC/Clean Arch, Laravel, React.js, Golang, PostgreSQL OLAP/DWH). Magang Mobile Developer @ Maqdis Academy & IT Support @ Komdigi Bandung. Available full-time Oct 2026.",
  keywords: [
    "Hilal Muhamad",
    "Full-Stack Developer",
    "Mobile Developer",
    "Flutter",
    "Laravel",
    "React.js",
    "Golang",
    "PostgreSQL OLAP",
    "Bandung",
    "Fresh Graduate",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <ScrollProgress />
            <Splash />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}