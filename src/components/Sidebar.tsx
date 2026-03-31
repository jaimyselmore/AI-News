"use client";

import { Newspaper, Lightbulb, Wrench, Upload, Zap, ChevronRight } from "lucide-react";

type Section = "nieuws" | "tips" | "tools" | "upload";

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const navItems = [
  { id: "nieuws" as Section, label: "Nieuws",       sub: "Laatste AI updates",  icon: Newspaper, color: "#C83820" },
  { id: "tips"   as Section, label: "Tips & Tricks", sub: "Beginner tot pro",   icon: Lightbulb, color: "#D09828" },
  { id: "tools"  as Section, label: "Alle Tools",    sub: "Gebruik + aanraders", icon: Wrench,    color: "#7C3AED" },
  { id: "upload" as Section, label: "Upload",        sub: "Voeg content toe",    icon: Upload,    color: "#0D9488" },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside style={{
      width: "230px", minWidth: "230px",
      background: "#FFFFFF",
      borderRight: "1px solid #EAD0B8",
      height: "100vh",
      position: "sticky", top: 0,
      display: "flex", flexDirection: "column",
      fontFamily: "var(--font-body)",
    }}>

      {/* Brand */}
      <div style={{ padding: "28px 24px 24px", borderBottom: "1px solid #F5E8D8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px",
            background: "linear-gradient(135deg, #C83820, #E07045)",
            borderRadius: "10px",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(200,56,32,0.3)",
          }}>
            <Zap size={17} color="white" fill="white" />
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "18px", fontWeight: "800",
              color: "#1A0805", letterSpacing: "-0.03em",
              lineHeight: 1,
            }}>
              More<span style={{ color: "#C83820" }}>.</span>AI
            </div>
            <div style={{ fontSize: "10px", color: "#9B7060", fontWeight: "500", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              by Selmore
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "20px 14px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ fontSize: "10px", fontWeight: "700", color: "#9B7060", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 10px", marginBottom: "8px" }}>
          Navigatie
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className="nav-item"
              style={{
                width: "100%", border: "none", cursor: "pointer",
                padding: "10px 10px",
                display: "flex", alignItems: "center", gap: "12px",
                background: isActive ? item.color : "transparent",
                color: isActive ? "white" : "#5C3020",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{
                width: "32px", height: "32px",
                background: isActive ? "rgba(255,255,255,0.2)" : item.color + "18",
                borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon size={15} color={isActive ? "white" : item.color} strokeWidth={2} />
              </div>
              <div style={{ textAlign: "left", flex: 1 }}>
                <div style={{ fontSize: "13px", fontWeight: "700", fontFamily: "var(--font-display)" }}>
                  {item.label}
                </div>
                <div style={{ fontSize: "10px", opacity: isActive ? 0.75 : 0.6 }}>
                  {item.sub}
                </div>
              </div>
              {isActive && <ChevronRight size={13} color="white" />}
            </button>
          );
        })}
      </nav>

      {/* Live indicator */}
      <div style={{ padding: "16px 24px", borderTop: "1px solid #F5E8D8" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "4px" }}>
          <div className="pulse-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />
          <span style={{ fontSize: "11px", fontWeight: "600", color: "#5C3020" }}>Live bijgewerkt</span>
        </div>
        <div style={{ fontSize: "10px", color: "#9B7060" }}>Amsterdam · Selmore Agency</div>
      </div>
    </aside>
  );
}
