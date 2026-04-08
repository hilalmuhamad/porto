import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";

export const metadata: Metadata = {
  title: "Hilal Muhamad – Full-Stack Developer",
  description:
    "Portfolio of Hilal Muhamad Abdul Gani. Full-Stack Developer & DevOps Enthusiast from Bandung, Indonesia.",
  keywords: [
    "Full-Stack Developer",
    "Laravel",
    "Next.js",
    "Flutter",
    "DevOps",
    "Bandung",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}