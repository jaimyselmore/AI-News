"use client";

import { useState } from "react";
import { X, Newspaper, Lightbulb, Wrench } from "lucide-react";

type Section = "nieuws" | "tips" | "tools" | "upload";

interface TopNavProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const navItems = [
  { id: "nieuws" as Section, label: "Nieuws",        icon: Newspaper, accent: "#C83820" },
  { id: "tips"   as Section, label: "Tips & Tricks", icon: Lightbulb, accent: "#D09828" },
  { id: "tools"  as Section, label: "Alle Tools",    icon: Wrench,    accent: "#7C3AED" },
];

export default function TopNav({ activeSection, onSectionChange }: TopNavProps) {
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
        background: "rgba(245,237,235,0.94)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(180,150,140,0.15)",
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
            color: "#1A0805",
            letterSpacing: "-0.04em",
          }}>
            MORE<span style={{ color: "#C83820" }}>.</span>AI
          </span>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
          style={{
            background: "rgba(200,56,32,0.10)",
            border: "1px solid rgba(200,56,32,0.20)",
            borderRadius: "10px",
            width: "42px", height: "42px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            flexDirection: "column",
            gap: "5px",
            padding: "12px",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(200,56,32,0.18)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(200,56,32,0.10)")}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block",
              width: "16px", height: "1.5px",
              background: "#1A0805",
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

      {/* ── Menu kaart — matcht header stijl ── */}
      <div style={{
        position: "fixed",
        top: "76px",
        right: "28px",
        zIndex: 101,
        width: "240px",
        background: "rgba(245,237,235,0.97)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(180,150,140,0.18)",
        borderRadius: "20px",
        padding: "8px 0 12px",
        transformOrigin: "top right",
        transform: menuOpen ? "scale(1)" : "scale(0.88)",
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "all" : "none",
        transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.22s ease",
        boxShadow: "0 8px 32px rgba(100,40,20,0.12), 0 1px 0 rgba(255,255,255,0.8) inset",
      }}>
        {/* X sluit knop */}
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "4px 12px 4px" }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              background: "rgba(200,56,32,0.08)",
              border: "1px solid rgba(200,56,32,0.15)",
              borderRadius: "50%",
              width: "28px", height: "28px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              color: "#1A0805",
            }}
          >
            <X size={13} strokeWidth={2.5} />
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
                gap: "14px",
                width: "100%",
                padding: "11px 20px",
                background: isActive ? `${item.accent}10` : "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = "rgba(200,56,32,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = isActive ? `${item.accent}10` : "none"; }}
            >
              <Icon
                size={20}
                color={isActive ? item.accent : "#9B7060"}
                strokeWidth={1.8}
                style={{ flexShrink: 0 }}
              />
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "16px",
                fontWeight: "700",
                color: isActive ? item.accent : "#1A0805",
                letterSpacing: "-0.02em",
                transition: "color 0.15s ease",
              }}>
                {item.label}
              </span>
              {isActive && (
                <div style={{
                  marginLeft: "auto",
                  width: "6px", height: "6px",
                  borderRadius: "50%",
                  background: item.accent,
                  flexShrink: 0,
                }} />
              )}
            </button>
          );
        })}
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
