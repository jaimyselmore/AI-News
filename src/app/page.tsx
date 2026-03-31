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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToContent = () => {
    document.getElementById("content-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <LoadingScreen />
      <TopNav activeSection={activeSection} onSectionChange={setActiveSection} scrolled={scrolled} />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}>

        {/* Video achtergrond */}
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="/globe-video.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay — donkert randen, verlicht midden */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: [
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(10,5,3,0.08) 0%, rgba(10,5,3,0.0) 40%, rgba(10,5,3,0.62) 100%)",
            "linear-gradient(to bottom, rgba(10,5,3,0.42) 0%, rgba(10,5,3,0.0) 30%, rgba(10,5,3,0.0) 60%, rgba(10,5,3,0.75) 100%)",
          ].join(", "),
          zIndex: 1,
        }} />

        {/* Headline */}
        <div style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          userSelect: "none",
        }}>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(80px, 15vw, 172px)",
            fontWeight: "800",
            color: "white",
            letterSpacing: "-0.055em",
            lineHeight: 0.88,
            textShadow: "0 2px 60px rgba(0,0,0,0.22)",
          }}>
            MORE<span style={{ color: "#C83820" }}>.</span>AI
          </h1>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(11px, 1.4vw, 15px)",
            color: "rgba(255,255,255,0.55)",
            fontWeight: "400",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginTop: "22px",
          }}>
            by Selmore · Amsterdam
          </p>
        </div>

        {/* Scroll cue */}
        <button
          onClick={scrollToContent}
          aria-label="Scroll naar nieuws"
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "none",
            cursor: "pointer",
            opacity: scrolled ? 0 : 1,
            transition: "opacity 0.3s ease",
            pointerEvents: scrolled ? "none" : "all",
          }}
        >
          <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
            Nieuws
          </span>
          <ChevronDown size={15} color="rgba(255,255,255,0.4)" className="bounce-down" />
        </button>
      </section>

      {/* ─── TICKER ───────────────────────────────────────────── */}
      <NewsTicker items={liveNews} />

      {/* ─── CONTENT ──────────────────────────────────────────── */}
      <section id="content-section" style={{
        minHeight: "100vh",
        background: "#FDF8F3",
        padding: "52px 48px 80px",
      }}>
        <div style={{ marginBottom: "32px" }} className="fade-up">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <div style={{ width: "4px", height: "22px", background: meta.accent, borderRadius: "2px" }} />
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: "800",
              color: "#1A0F0A",
              letterSpacing: "-0.03em",
            }}>
              {meta.title}
            </h2>
          </div>
          <p style={{ fontSize: "13px", color: "#9B7B6B", paddingLeft: "14px" }}>
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
