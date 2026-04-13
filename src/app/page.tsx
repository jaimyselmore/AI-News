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
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    fetch("/api/news")
      .then(r => r.json())
      .then((data: NewsItem[]) => {
        if (Array.isArray(data) && data.length > 0) setLiveNews(data);
      })
      .catch(() => {});
  }, []);

  // Page fades in OVER the loading screen (globe stays big, no shrink)
  // Expand animation finishes at ~2360ms (1400ms delay + 960ms duration)
  useEffect(() => {
    const t = setTimeout(() => setPageVisible(true), 2400);
    return () => clearTimeout(t);
  }, []);

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <LoadingScreen />

      {/* ── Pagina fadet in OVER de loading screen (globe blijft groot, geen krimpen) ── */}
      <div style={{
        position: "relative",
        zIndex: 10000,
        opacity: pageVisible ? 1 : 0,
        transition: "opacity 0.85s cubic-bezier(0.4,0,0.2,1)",
        pointerEvents: pageVisible ? "all" : "none",
      }}>
        {/* ── Globe video: achtergrond ── */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
          <video
            autoPlay muted loop playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src="/globe-video.mp4" type="video/mp4" />
          </video>
        </div>

        <TopNav activeSection={activeSection} onSectionChange={handleSectionChange} />

        {/* ── Content ── */}
        <main style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          paddingTop: "88px",
          paddingBottom: "80px",
          paddingLeft: "48px",
          paddingRight: "48px",
          background: "#F5EDEB",
        }}>
          {activeSection === "nieuws" && <NewsGrid items={liveNews} />}
          {activeSection === "tips"   && <TipsSection />}
          {activeSection === "tools"  && <ToolsSection />}
        </main>

        {/* ── Ticker ── */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50 }}>
          <NewsTicker items={liveNews} />
        </div>
      </div>
    </>
  );
}
