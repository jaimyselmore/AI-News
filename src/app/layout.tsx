import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MORE.AI",
  description: "Curated AI nieuws, tools en tips voor Selmore creative agency Amsterdam.",
  icons: {
    icon: [{ url: "/globe-favicon.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/globe-favicon.png",
    apple: "/globe-favicon.png",
  },
  openGraph: {
    title: "MORE.AI",
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
