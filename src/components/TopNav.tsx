"use client";

import { useState } from "react";
import { X, Newspaper, Lightbulb, Wrench, Upload } from "lucide-react";

type Section = "nieuws" | "tips" | "tools" | "upload";

interface TopNavProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
  scrolled: boolean;
}

const navItems = [
  { id: "nieuws" as Section, label: "Nieuws",        icon: Newspaper, color: "#FF9070" },
  { id: "tips"   as Section, label: "Tips & Tricks", icon: Lightbulb, color: "#FFD070" },
  { id: "tools"  as Section, label: "Alle Tools",    icon: Wrench,    color: "#C4A8FF" },
  { id: "upload" as Section, label: "Upload",        icon: Upload,    color: "#60E8D0" },
];

export default function TopNav({ activeSection, onSectionChange, scrolled }: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (section: Section) => {
    onSectionChange(section);
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById("content-section")?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  return (
    <>
      {/* ── Top bar ── */}
      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        background: scrolled ? "rgba(255,255,255,0.10)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.12)" : "none",
        transition: "background 0.35s ease, backdrop-filter 0.35s ease",
      }}>
        {/* Globe + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
          <div style={{
            width: "34px", height: "34px",
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            boxShadow: "0 0 0 1.5px rgba(255,255,255,0.25), 0 4px 16px rgba(0,0,0,0.18)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/globe.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            fontWeight: "800",
            color: "white",
            letterSpacing: "-0.04em",
            textShadow: "0 1px 12px rgba(0,0,0,0.25)",
          }}>
            MORE<span style={{ color: "#FF6B4A" }}>.</span>AI
          </span>
        </div>

        {/* Hamburger — minimale knop */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "10px",
            width: "42px", height: "42px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            color: "white",
            flexDirection: "column",
            gap: "5px",
            padding: "12px",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.20)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
        >
          {/* 3 lijntjes */}
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block",
              width: "16px", height: "1.5px",
              background: "white",
              borderRadius: "2px",
              transformOrigin: "center",
              transition: "transform 0.2s ease, opacity 0.2s ease",
              ...(menuOpen && i === 0 ? { transform: "translateY(6.5px) rotate(45deg)" } : {}),
              ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
              ...(menuOpen && i === 2 ? { transform: "translateY(-6.5px) rotate(-45deg)" } : {}),
            }} />
          ))}
        </button>
      </nav>

      {/* ── Zwevende glazen menu kaart (img9 stijl) ── */}
      <div style={{
        position: "fixed",
        top: "76px",
        right: "28px",
        zIndex: 101,
        width: "260px",
        background: "rgba(255,255,255,0.14)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.20)",
        borderRadius: "22px",
        padding: "10px 0 16px",
        transformOrigin: "top right",
        transform: menuOpen ? "scale(1)" : "scale(0.88)",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "all" : "none",
        transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease",
        boxShadow: "0 12px 48px rgba(0,0,0,0.18), 0 0 0 0.5px rgba(255,255,255,0.08) inset",
      }}>
        {/* X sluit knop */}
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 14px 4px" }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "none",
              borderRadius: "50%",
              width: "30px", height: "30px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              color: "white",
            }}
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Nav items */}
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
                gap: "16px",
                width: "100%",
                padding: "12px 22px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                opacity: isActive ? 1 : 0.72,
                transition: "opacity 0.18s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = isActive ? "1" : "0.72")}
            >
              <Icon
                size={22}
                color={isActive ? item.color : "white"}
                strokeWidth={1.8}
                style={{ flexShrink: 0 }}
              />
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "17px",
                fontWeight: "700",
                color: isActive ? item.color : "white",
                letterSpacing: "-0.02em",
                textShadow: isActive ? `0 0 20px ${item.color}88` : "none",
                transition: "color 0.18s ease",
              }}>
                {item.label}
              </span>
              {isActive && (
                <div style={{
                  marginLeft: "auto",
                  width: "6px", height: "6px",
                  borderRadius: "50%",
                  background: item.color,
                  flexShrink: 0,
                  boxShadow: `0 0 8px ${item.color}`,
                }} />
              )}
            </button>
          );
        })}

        {/* Live indicator */}
        <div style={{
          margin: "10px 22px 0",
          paddingTop: "12px",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          display: "flex",
          alignItems: "center",
          gap: "7px",
        }}>
          <div className="pulse-dot" style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ADE80" }} />
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em" }}>
            Live · Amsterdam
          </span>
        </div>
      </div>

      {/* Tap-buiten-sluiten */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 99 }}
        />
      )}
    </>
  );
}
