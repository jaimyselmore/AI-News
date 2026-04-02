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
  const [blurOpacity, setBlurOpacity] = useState(0);
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
    const onScroll = () => {
      const vh = window.innerHeight;
      // Blur begint op 65% van hero hoogte, volledig vaag op 100%
      const progress = Math.min(Math.max((window.scrollY - vh * 0.65) / (vh * 0.35), 0), 1);
      setBlurOpacity(progress);
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    setTimeout(() => {
      document.getElementById("content-section")?.scrollIntoView({ behavior: "smooth" });
    }, 60);
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
        <div style={{
          position: "absolute", inset: 0,
          background: [
            "radial-gradient(ellipse 75% 75% at 50% 50%, transparent 30%, rgba(6,3,1,0.22) 100%)",
            "linear-gradient(to bottom, rgba(6,3,1,0.18) 0%, transparent 28%, transparent 65%, rgba(6,3,1,0.35) 100%)",
          ].join(", "),
        }} />
      </div>

      {/* ── Blur laag: wordt zichtbaar zodra je de hero uit scrolt ── */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 3,
        backdropFilter: "blur(54px) saturate(1.25)",
        WebkitBackdropFilter: "blur(54px) saturate(1.25)",
        opacity: blurOpacity,
        transition: "opacity 0.12s linear",
        pointerEvents: "none",
      }} />

      {/* ── TopNav ── */}
      <TopNav
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* ── Hero: sticky zodat content eroverheen scrolt ── */}
      <section style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 1,
        userSelect: "none",
        overflow: "hidden",
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
        <button
          onClick={() => document.getElementById("content-section")?.scrollIntoView({ behavior: "smooth" })}
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
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.38)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Nieuws
          </span>
          <ChevronDown size={15} color="rgba(255,255,255,0.38)" className="bounce-down" />
        </button>

      </section>

      {/* ── Ticker: vaste balk onderaan, matcht nav-stijl ── */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0, right: 0,
        zIndex: 5,
        opacity: blurOpacity,
        transform: `translateY(${(1 - blurOpacity) * 14}px)`,
        transition: "opacity 0.18s linear, transform 0.18s linear",
        pointerEvents: blurOpacity < 0.1 ? "none" : "all",
      }}>
        <NewsTicker items={liveNews} />
      </div>

      {/* ── Content: vaste warme achtergrond ── */}
      <section
        id="content-section"
        style={{
          position: "relative",
          zIndex: 4,
          minHeight: "100vh",
          padding: "52px 48px 120px",
          background: "#F6F1E7",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <div style={{ width: "4px", height: "22px", background: meta.accent, borderRadius: "2px" }} />
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px", fontWeight: "800",
              color: "#1A0805",
              letterSpacing: "-0.03em",
            }}>
              {meta.title}
            </h2>
          </div>
          <p style={{ fontSize: "13px", color: "#9B7060", paddingLeft: "14px" }}>
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
