"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import NewsTicker from "@/components/NewsTicker";
import FeaturedNews from "@/components/FeaturedNews";
import NewsGrid from "@/components/NewsGrid";
import NewsSidebar from "@/components/NewsSidebar";
import ToolsSection from "@/components/ToolsSection";
import TipsSection from "@/components/TipsSection";
import UploadSection from "@/components/UploadSection";

type Section = "nieuws" | "tips" | "tools" | "upload";

const sectionTitles: Record<Section, { title: string; sub: string }> = {
  nieuws: { title: "Nieuwste AI Updates", sub: "Curated nieuws voor creative agencies" },
  tips: { title: "Tips & Tricks", sub: "Van beginner tot pro — praktische AI-workflows" },
  tools: { title: "AI Tools", sub: "Wat wij gebruiken + de beste aanraders" },
  upload: { title: "Upload Eigen Content", sub: "Deel nieuws, tools of tips met het team" },
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("nieuws");

  const { title, sub } = sectionTitles[activeSection];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#111111" }}>
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Ticker */}
        <NewsTicker />

        {/* Content area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* Main content */}
          <main
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "28px 32px",
            }}
          >
            {/* Page header */}
            <div style={{ marginBottom: "24px" }}>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "white",
                  letterSpacing: "-0.025em",
                  marginBottom: "4px",
                }}
              >
                {title}
              </h1>
              <p style={{ fontSize: "13px", color: "#555" }}>{sub}</p>
            </div>

            {activeSection === "nieuws" && (
              <div className="fade-in">
                <FeaturedNews />
                <NewsGrid />
              </div>
            )}

            {activeSection === "tips" && (
              <div className="fade-in">
                <TipsSection />
              </div>
            )}

            {activeSection === "tools" && (
              <div className="fade-in">
                <ToolsSection />
              </div>
            )}

            {activeSection === "upload" && (
              <div className="fade-in">
                <UploadSection />
              </div>
            )}
          </main>

          {/* Right sidebar — alleen op nieuws */}
          {activeSection === "nieuws" && <NewsSidebar />}
        </div>
      </div>
    </div>
  );
}
