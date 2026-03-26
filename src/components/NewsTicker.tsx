"use client";

import { newsItems } from "@/lib/data";

export default function NewsTicker() {
  const headlines = newsItems.map((n) => `${n.tag}  ${n.title}`);
  const doubled = [...headlines, ...headlines];

  return (
    <div
      style={{
        background: "#E8392A",
        borderBottom: "1px solid #2E2E2E",
        overflow: "hidden",
        height: "36px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#111",
          padding: "0 14px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          minWidth: "max-content",
          borderRight: "2px solid #E8392A",
        }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: "800",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#E8392A",
          }}
        >
          LIVE
        </span>
      </div>
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div className="ticker-inner" style={{ display: "flex", gap: "0" }}>
          {doubled.map((headline, i) => (
            <span
              key={i}
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "white",
                padding: "0 32px",
                whiteSpace: "nowrap",
                letterSpacing: "0.01em",
              }}
            >
              {headline}
              <span style={{ marginLeft: "32px", opacity: 0.4 }}>—</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
