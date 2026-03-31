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
import { ChevronDown, X } from "lucide-react";

type Section = "nieuws" | "tips" | "tools" | "upload";

const sectionMeta: Record<Section, { title: string; sub: string; accent: string }> = {
  nieuws: { title: "Nieuwste AI Updates",    sub: "Curated nieuws voor Selmore",                accent: "#C83820" },
  tips:   { title: "Tips & Tricks",          sub: "Van beginner tot pro — praktische workflows", accent: "#D09828" },
  tools:  { title: "AI Tools",               sub: "Wat wij gebruiken + de beste aanraders",      accent: "#7C3AED" },
  upload: { title: "Upload eigen content",   sub: "Deel nieuws, tools of tips met het team",     accent: "#0D9488" },
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [liveNews, setLiveNews] = useState<NewsItem[]>(newsItems);

  const panelOpen = activeSection !== null;
  const meta = activeSection ? sectionMeta[activeSection] : sectionMeta["nieuws"];

  useEffect(() => {
    fetch("/api/news")
      .then(r => r.json())
      .then((data: NewsItem[]) => {
        if (Array.isArray(data) && data.length > 0) setLiveNews(data);
      })
      .catch(() => {});
  }, []);

  const openSection = (section: Section) => setActiveSection(section);
  const closePanel  = () => setActiveSection(null);

  return (
    <>
      <LoadingScreen />

      {/* ── Vaste video achtergrond — altijd zichtbaar ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <video
          autoPlay muted loop playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/globe-video.mp4" type="video/mp4" />
        </video>
        {/* Vignette overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: [
            "radial-gradient(ellipse 72% 72% at 50% 50%, transparent 28%, rgba(8,4,2,0.52) 100%)",
            "linear-gradient(to bottom, rgba(8,4,2,0.38) 0%, transparent 22%, transparent 62%, rgba(8,4,2,0.68) 100%)",
          ].join(", "),
        }} />
      </div>

      {/* ── TopNav ── */}
      <TopNav
        activeSection={activeSection ?? "nieuws"}
        onSectionChange={openSection}
        panelOpen={panelOpen}
      />

      {/* ── Hero headline — vervaagt als panel open gaat ── */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        pointerEvents: panelOpen ? "none" : "all",
        opacity: panelOpen ? 0 : 1,
        transition: "opacity 0.38s ease",
        userSelect: "none",
      }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(82px, 15vw, 174px)",
          fontWeight: "800",
          color: "white",
          letterSpacing: "-0.055em",
          lineHeight: 0.87,
          textShadow: "0 2px 64px rgba(0,0,0,0.20)",
          textAlign: "center",
        }}>
          MORE<span style={{ color: "#C83820" }}>.</span>AI
        </h1>

        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "clamp(11px, 1.35vw, 15px)",
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          marginTop: "22px",
        }}>
          by Selmore · Amsterdam
        </p>

        {/* Scroll-cue knop */}
        <button
          onClick={() => openSection("nieuws")}
          style={{
            marginTop: "52px",
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <span style={{
            fontSize: "9px",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}>
            Nieuws
          </span>
          <ChevronDown size={15} color="rgba(255,255,255,0.4)" className="bounce-down" />
        </button>
      </div>

      {/* ── Content panel — schuift omhoog over de video ── */}
      <div style={{
        position: "fixed",
        top: "68px",
        left: 0, right: 0, bottom: 0,
        zIndex: 50,
        /* Glas-effect: video schijnt door */
        background: "rgba(253,248,243,0.91)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderTop: "1px solid rgba(234,208,184,0.4)",
        transform: panelOpen ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.52s cubic-bezier(0.22,1,0.36,1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}>

        {/* Ticker */}
        <NewsTicker items={liveNews} />

        {/* Scrollbare content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "40px 48px 100px" }}>

          {/* Header rij */}
          <div style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "30px",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <div style={{ width: "4px", height: "22px", background: meta.accent, borderRadius: "2px" }} />
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px", fontWeight: "800",
                  color: "#1A0F0A", letterSpacing: "-0.03em",
                }}>
                  {meta.title}
                </h2>
              </div>
              <p style={{ fontSize: "13px", color: "#9B7B6B", paddingLeft: "14px" }}>
                {meta.sub}
              </p>
            </div>

            {/* Sluit-knop */}
            <button
              onClick={closePanel}
              aria-label="Sluiten"
              style={{
                width: "40px", height: "40px",
                borderRadius: "50%",
                border: "1px solid #EAD0B8",
                background: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
                color: "#5C3020",
                flexShrink: 0,
                boxShadow: "0 1px 4px rgba(100,40,15,0.08)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#FFF0E4"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "white"; }}
            >
              <X size={15} strokeWidth={2.2} />
            </button>
          </div>

          {/* Secties */}
          {activeSection === "nieuws" && <><FeaturedNews items={liveNews} /><NewsGrid items={liveNews} /></>}
          {activeSection === "tips"   && <TipsSection />}
          {activeSection === "tools"  && <ToolsSection />}
          {activeSection === "upload" && <UploadSection />}
        </div>
      </div>
    </>
  );
}
