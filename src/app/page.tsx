"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import NewsTicker from "@/components/NewsTicker";
import FeaturedNews from "@/components/FeaturedNews";
import NewsGrid from "@/components/NewsGrid";
import ToolsSection from "@/components/ToolsSection";
import TipsSection from "@/components/TipsSection";
import LoadingScreen from "@/components/LoadingScreen";
import UploadSection from "@/components/UploadSection";
import { newsItems, type NewsItem } from "@/lib/data";

type Section = "nieuws" | "tips" | "tools" | "upload";

const sectionMeta: Record<Section, { title: string; sub: string; accent: string }> = {
  nieuws: { title: "Nieuwste AI Updates",    sub: "Curated nieuws voor Selmore",                accent: "#C83820" },
  tips:   { title: "Tips & Tricks",          sub: "Van beginner tot pro — praktische workflows", accent: "#D09828" },
  tools:  { title: "AI Tools",               sub: "Wat wij gebruiken + de beste aanraders",      accent: "#7C3AED" },
  upload: { title: "Upload eigen content",   sub: "Deel nieuws, tools of tips met het team",     accent: "#0D9488" },
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("nieuws");
  const [liveNews, setLiveNews] = useState<NewsItem[]>(newsItems); // statische fallback
  const meta = sectionMeta[activeSection];

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then((data: NewsItem[]) => {
        if (Array.isArray(data) && data.length > 0) setLiveNews(data);
      })
      .catch(() => {}); // bij fout: statische data blijft staan
  }, []);

  return (
    <>
    <LoadingScreen />
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#FDF8F3" }}>
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        <NewsTicker items={liveNews} />

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <main style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
            <div style={{ marginBottom: "28px" }} className="fade-up">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <div style={{ width: "4px", height: "22px", background: meta.accent, borderRadius: "2px" }} />
                <h1 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px", fontWeight: "800",
                  color: "#1A0F0A", letterSpacing: "-0.03em",
                }}>
                  {meta.title}
                </h1>
              </div>
              <p style={{ fontSize: "13px", color: "#9B7B6B", paddingLeft: "14px" }}>{meta.sub}</p>
            </div>

            {activeSection === "nieuws" && <><FeaturedNews items={liveNews} /><NewsGrid items={liveNews} /></>}
            {activeSection === "tips"   && <TipsSection />}
            {activeSection === "tools"  && <ToolsSection />}
            {activeSection === "upload" && <UploadSection />}
          </main>
        </div>
      </div>
    </div>
    </>
  );
}
