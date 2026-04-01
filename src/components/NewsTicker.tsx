"use client";
import type { NewsItem } from "@/lib/data";

export default function NewsTicker({ items }: { items: NewsItem[] }) {
  const tickerItems = items.map(n => `${n.tag}  ${n.title}`);
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div style={{
      height: "36px", overflow: "hidden",
      display: "flex", alignItems: "center",
      background: "linear-gradient(90deg, rgba(200,56,32,0.78), rgba(224,112,69,0.78))",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderTop: "1px solid rgba(255,255,255,0.12)",
      borderBottom: "1px solid rgba(180,40,15,0.2)",
      position: "relative",
    }}>
      <div style={{
        padding: "0 16px",
        height: "100%",
        display: "flex", alignItems: "center",
        minWidth: "max-content",
        borderRight: "1px solid rgba(255,255,255,0.12)",
      }}>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "9px", fontWeight: "800",
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "#C83820",
        }}>
          LIVE
        </span>
      </div>
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div className="ticker-inner">
          {doubled.map((headline, i) => (
            <span key={i} style={{
              fontSize: "11px", fontWeight: "500",
              color: "rgba(255,255,255,0.75)", padding: "0 28px",
              whiteSpace: "nowrap", letterSpacing: "0.01em",
            }}>
              {headline}
              <span style={{ marginLeft: "28px", opacity: 0.35 }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
