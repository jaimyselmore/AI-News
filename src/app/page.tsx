"use client";

import { useState, useEffect } from "react";
import TopNav from "@/components/TopNav";
import NewsTicker from "@/components/NewsTicker";
import FeaturedNews from "@/components/FeaturedNews";
import NewsGrid from "@/components/NewsGrid";
import ToolsSection from "@/components/ToolsSection";
import TipsSection from "@/components/TipsSection";
import LoadingScreen from "@/components/LoadingScreen";
import UploadSection from "@/components/UploadSection";
import { newsItems, type NewsItem } from "@/lib/data";
import { ChevronDown } from "lucide-react";

type Section = "nieuws" | "tips" | "tools" | "upload";

const sectionMeta: Record<Section, { title: string; sub: string; accent: string }> = {
  nieuws: { title: "Nieuwste AI Updates",    sub: "Curated nieuws voor Selmore",                accent: "#C83820" },
  tips:   { title: "Tips & Tricks",          sub: "Van beginner tot pro — praktische workflows", accent: "#D09828" },
  tools:  { title: "AI Tools",               sub: "Wat wij gebruiken + de beste aanraders",      accent: "#7C3AED" },
  upload: { title: "Upload eigen content",   sub: "Deel nieuws, tools of tips met het team",     accent: "#0D9488" },
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("nieuws");
  const [liveNews, setLiveNews] = useState<NewsItem[]>(newsItems);
  const [scrolled, setScrolled] = useState(false);
  const meta = sectionMeta[activeSection];

  useEffect(() => {
    fetch("/api/news")
      .then(r => r.json())
      .then((data: NewsItem[]) => {
        if (Array.isArray(data) && data.length > 0) setLiveNews(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    setTimeout(() => {
      document.getElementById("content-section")?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  const scrollToContent = () => {
    document.getElementById("content-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <LoadingScreen />

      {/* ── Video: altijd vast op achtergrond ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <video
          autoPlay muted loop playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/globe-video.mp4" type="video/mp4" />
        </video>
        {/* Vignette zodat tekst leesbaar is */}
        <div style={{
          position: "absolute", inset: 0,
          background: [
            "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 30%, rgba(8,4,2,0.28) 100%)",
            "linear-gradient(to bottom, rgba(8,4,2,0.22) 0%, transparent 25%, transparent 62%, rgba(8,4,2,0.42) 100%)",
          ].join(", "),
        }} />
      </div>

      {/* ── TopNav ── */}
      <TopNav
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        scrolled={scrolled}
      />

      {/* ── Hero: 100vh, MORE.AI tekst ── */}
      <section style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 1,
        userSelect: "none",
      }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(82px, 15vw, 174px)",
          fontWeight: "800",
          color: "white",
          letterSpacing: "-0.055em",
          lineHeight: 0.87,
          textShadow: "0 2px 64px rgba(0,0,0,0.22)",
          textAlign: "center",
        }}>
          MORE<span style={{ color: "#C83820" }}>.</span>AI
        </h1>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(11px, 1.35vw, 15px)",
          color: "rgba(255,255,255,0.48)",
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          marginTop: "22px",
        }}>
          by Selmore · Amsterdam
        </p>

        {/* Scroll cue */}
        <button
          onClick={scrollToContent}
          style={{
            marginTop: "52px",
            background: "none", border: "none",
            cursor: "pointer",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "7px",
            opacity: scrolled ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <span style={{
            fontSize: "9px",
            color: "rgba(255,255,255,0.38)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Nieuws
          </span>
          <ChevronDown size={15} color="rgba(255,255,255,0.38)" className="bounce-down" />
        </button>
      </section>

      {/* ── Ticker: sticky onder de nav zodra je scrolt ── */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <NewsTicker items={liveNews} />
      </div>

      {/* ── Content: zweeft over de video ── */}
      <section
        id="content-section"
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          padding: "52px 48px 100px",
          /* Geen achtergrond — cards hebben hun eigen glas-effect */
        }}
      >
        {/* Sectie header */}
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <div style={{ width: "4px", height: "22px", background: meta.accent, borderRadius: "2px" }} />
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px", fontWeight: "800",
              color: "white",
              letterSpacing: "-0.03em",
              textShadow: "0 1px 14px rgba(0,0,0,0.25)",
            }}>
              {meta.title}
            </h2>
          </div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", paddingLeft: "14px" }}>
            {meta.sub}
          </p>
        </div>

        {activeSection === "nieuws" && <><FeaturedNews items={liveNews} /><NewsGrid items={liveNews} /></>}
        {activeSection === "tips"   && <TipsSection />}
        {activeSection === "tools"  && <ToolsSection />}
        {activeSection === "upload" && <UploadSection />}
      </section>
    </>
  );
}
