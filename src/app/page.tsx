"use client";

import { useState, useEffect } from "react";
import TopNav from "@/components/TopNav";
import NewsTicker from "@/components/NewsTicker";
import NewsGrid from "@/components/NewsGrid";
import ToolsSection from "@/components/ToolsSection";
import TipsSection from "@/components/TipsSection";
import LoadingScreen from "@/components/LoadingScreen";
import { newsItems, type NewsItem } from "@/lib/data";

type Section = "nieuws" | "tips" | "tools" | "upload";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("nieuws");
  const [liveNews, setLiveNews] = useState<NewsItem[]>(newsItems);

  useEffect(() => {
    fetch("/api/news")
      .then(r => r.json())
      .then((data: NewsItem[]) => {
        if (Array.isArray(data) && data.length > 0) setLiveNews(data);
      })
      .catch(() => {});
  }, []);

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <LoadingScreen />

      <TopNav activeSection={activeSection} onSectionChange={handleSectionChange} />

      {/* ── Content: direct na nav ── */}
      <main style={{
        minHeight: "100vh",
        paddingTop: "80px",
        paddingBottom: "80px",
        paddingLeft: "48px",
        paddingRight: "48px",
        background: "#F5EDEB",
      }}>
        {activeSection === "nieuws" && <NewsGrid items={liveNews} />}
        {activeSection === "tips"   && <TipsSection />}
        {activeSection === "tools"  && <ToolsSection />}
      </main>

      {/* ── Ticker: altijd zichtbaar onderaan ── */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50 }}>
        <NewsTicker items={liveNews} />
      </div>
    </>
  );
}
