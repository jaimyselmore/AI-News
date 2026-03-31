"use client";

import { useState } from "react";
import { Menu, X, Newspaper, Lightbulb, Wrench, Upload } from "lucide-react";

type Section = "nieuws" | "tips" | "tools" | "upload";

interface TopNavProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  scrolled: boolean;
}

const navItems = [
  { id: "nieuws" as Section, label: "Nieuws",       icon: Newspaper, color: "#C83820" },
  { id: "tips"   as Section, label: "Tips & Tricks", icon: Lightbulb, color: "#D09828" },
  { id: "tools"  as Section, label: "Alle Tools",    icon: Wrench,    color: "#7C3AED" },
  { id: "upload" as Section, label: "Upload",        icon: Upload,    color: "#0D9488" },
];

export default function TopNav({ activeSection, onSectionChange, scrolled }: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (section: Section) => {
    onSectionChange(section);
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById("content-section")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <>
      {/* Top bar */}
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 36px",
        background: scrolled ? "rgba(253,248,243,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(234,208,184,0.5)" : "none",
        transition: "background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease",
      }}>

        {/* Globe + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "36px", height: "36px",
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: scrolled
              ? "0 0 0 2px rgba(200,56,32,0.25), 0 2px 12px rgba(0,0,0,0.12)"
              : "0 0 0 2px rgba(255,255,255,0.25), 0 4px 16px rgba(0,0,0,0.25)",
            transition: "box-shadow 0.35s ease",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/globe.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{
            fontFamily: "var(--font-display)",
            fontSize: "19px",
            fontWeight: "800",
            color: scrolled ? "#1A0805" : "white",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            transition: "color 0.35s ease",
            textShadow: scrolled ? "none" : "0 2px 12px rgba(0,0,0,0.3)",
          }}>
            MORE<span style={{ color: "#C83820" }}>.</span>AI
          </div>
        </div>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
          style={{
            background: menuOpen
              ? "rgba(200,56,32,0.18)"
              : scrolled ? "rgba(26,8,5,0.06)" : "rgba(255,255,255,0.14)",
            border: `1px solid ${scrolled ? "rgba(234,208,184,0.7)" : "rgba(255,255,255,0.22)"}`,
            borderRadius: "10px",
            width: "46px", height: "46px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            color: scrolled ? "#1A0805" : "white",
            transition: "all 0.2s ease",
          }}
        >
          {menuOpen
            ? <X size={18} strokeWidth={2.2} />
            : <Menu size={18} strokeWidth={2.2} />
          }
        </button>
      </nav>

      {/* Dim overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 98,
          background: "rgba(10,5,3,0.55)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Slide-in drawer */}
      <div style={{
        position: "fixed",
        top: 0, right: 0, bottom: 0,
        width: "300px",
        zIndex: 101,
        background: "#FDF8F3",
        borderLeft: "1px solid #EAD0B8",
        transform: menuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
        display: "flex",
        flexDirection: "column",
        padding: "88px 28px 36px",
      }}>

        <div style={{
          fontSize: "10px",
          fontWeight: "700",
          color: "#9B7060",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "20px",
          paddingLeft: "4px",
        }}>
          Navigatie
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 16px",
                borderRadius: "12px",
                border: "none",
                background: isActive ? item.color : "transparent",
                color: isActive ? "white" : "#1A0805",
                cursor: "pointer",
                marginBottom: "4px",
                textAlign: "left",
                transition: "all 0.2s ease",
                width: "100%",
                fontFamily: "var(--font-body)",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "#F5EDE4"; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{
                width: "36px", height: "36px",
                background: isActive ? "rgba(255,255,255,0.2)" : item.color + "14",
                borderRadius: "9px",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon size={15} color={isActive ? "white" : item.color} strokeWidth={2} />
              </div>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "14px",
                fontWeight: "700",
              }}>
                {item.label}
              </span>
            </button>
          );
        })}

        <div style={{ marginTop: "auto", paddingTop: "24px", borderTop: "1px solid #F5E8D8" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "4px" }}>
            <div className="pulse-dot" style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C55E", flexShrink: 0 }} />
            <span style={{ fontSize: "11px", fontWeight: "600", color: "#5C3020" }}>Live bijgewerkt</span>
          </div>
          <div style={{ fontSize: "10px", color: "#9B7060" }}>Amsterdam · Selmore Agency</div>
        </div>
      </div>
    </>
  );
}
