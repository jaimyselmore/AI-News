"use client";
import type { NewsItem } from "@/lib/data";

export default function NewsTicker({ items }: { items: NewsItem[] }) {
  const tickerItems = items.map(n => `${n.tag}  ${n.title}`);
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div style={{
      height: "38px", overflow: "hidden",
      display: "flex", alignItems: "center",
      background: "rgba(245,226,232,0.96)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(180,160,130,0.18)",
    }}>
      {/* LIVE label */}
      <div style={{
        padding: "0 16px",
        height: "100%",
        display: "flex", alignItems: "center", gap: "7px",
        minWidth: "max-content",
        borderRight: "1px solid rgba(180,160,130,0.18)",
        flexShrink: 0,
      }}>
        <div style={{
          width: "6px", height: "6px",
          borderRadius: "50%",
          background: "#C83820",
          flexShrink: 0,
          boxShadow: "0 0 6px rgba(200,56,32,0.6)",
          animation: "pulse 2s ease-in-out infinite",
        }} />
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "9px", fontWeight: "800",
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "#C83820",
        }}>
          LIVE
        </span>
      </div>

      {/* Scrollende headlines */}
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div className="ticker-inner">
          {doubled.map((headline, i) => (
            <span key={i} style={{
              fontSize: "11px", fontWeight: "500",
              color: "#5C3020",
              padding: "0 28px",
              whiteSpace: "nowrap", letterSpacing: "0.01em",
            }}>
              {headline}
              <span style={{ marginLeft: "28px", opacity: 0.3, color: "#C83820" }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
