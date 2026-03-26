import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "More AI — Selmore",
  description: "Curated AI nieuws, tools en tips voor Selmore creative agency Amsterdam.",
  openGraph: {
    title: "More AI — Selmore",
    description: "Curated AI nieuws, tools en tips voor Selmore creative agency Amsterdam.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
