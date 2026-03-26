"use client";

import { useState } from "react";
import {
  Newspaper,
  Lightbulb,
  Wrench,
  Upload,
  Zap,
  ChevronRight,
} from "lucide-react";

type Section = "nieuws" | "tips" | "tools" | "upload";

interface SidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const navItems = [
  {
    id: "nieuws" as Section,
    label: "Nieuws",
    sublabel: "Laatste updates",
    icon: Newspaper,
  },
  {
    id: "tips" as Section,
    label: "Tips & Tricks",
    sublabel: "Niveaus: beginner → pro",
    icon: Lightbulb,
  },
  {
    id: "tools" as Section,
    label: "Alle Tools",
    sublabel: "Wij gebruiken + aanraders",
    icon: Wrench,
  },
  {
    id: "upload" as Section,
    label: "Upload Eigen",
    sublabel: "Voeg content toe",
    icon: Upload,
  },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside
      style={{
        width: "220px",
        minWidth: "220px",
        background: "#1A1A1A",
        borderRight: "1px solid #2E2E2E",
        height: "100vh",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px 20px 20px",
          borderBottom: "1px solid #2E2E2E",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              background: "#E8392A",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={16} color="white" fill="white" />
          </div>
          <div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "800",
                letterSpacing: "-0.02em",
                color: "white",
              }}
            >
              AI NEWS
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#888",
                fontWeight: "600",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Selmore
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        <div
          style={{
            fontSize: "10px",
            fontWeight: "700",
            color: "#555",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "8px",
            paddingLeft: "8px",
          }}
        >
          Navigatie
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 8px",
                borderRadius: "8px",
                border: "none",
                background: isActive ? "#E8392A15" : "transparent",
                cursor: "pointer",
                transition: "background 0.15s",
                marginBottom: "2px",
                position: "relative",
              }}
            >
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "3px",
                    height: "60%",
                    background: "#E8392A",
                    borderRadius: "0 2px 2px 0",
                  }}
                />
              )}
              <Icon
                size={16}
                color={isActive ? "#E8392A" : "#666"}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <div style={{ textAlign: "left", flex: 1 }}>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: isActive ? "700" : "500",
                    color: isActive ? "white" : "#aaa",
                  }}
                >
                  {item.label}
                </div>
                <div style={{ fontSize: "10px", color: "#555" }}>
                  {item.sublabel}
                </div>
              </div>
              {isActive && (
                <ChevronRight size={12} color="#E8392A" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid #2E2E2E",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "4px",
          }}
        >
          <div
            className="pulse-dot"
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#22C55E",
            }}
          />
          <span style={{ fontSize: "11px", color: "#555", fontWeight: "600" }}>
            LIVE — automatisch bijgewerkt
          </span>
        </div>
        <div style={{ fontSize: "10px", color: "#444" }}>
          Selmore Creative Agency · Amsterdam
        </div>
      </div>
    </aside>
  );
}
