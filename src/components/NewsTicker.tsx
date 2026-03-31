"use client";
import type { NewsItem } from "@/lib/data";

export default function NewsTicker({ items }: { items: NewsItem[] }) {
  const tickerItems = items.map(n => `${n.tag}  ${n.title}`);
  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div style={{
      height: "38px", overflow: "hidden",
      display: "flex", alignItems: "center",
      background: "linear-gradient(90deg, #C83820, #E07045)",
      position: "relative",
    }}>
      <div style={{
        background: "rgba(0,0,0,0.15)",
        padding: "0 16px",
        height: "100%",
        display: "flex", alignItems: "center",
        minWidth: "max-content",
        backdropFilter: "blur(4px)",
      }}>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: "10px", fontWeight: "800",
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "white",
        }}>
          LIVE
        </span>
      </div>
      <div style={{ overflow: "hidden", flex: 1 }}>
        <div className="ticker-inner">
          {doubled.map((headline, i) => (
            <span key={i} style={{
              fontSize: "11px", fontWeight: "600",
              color: "white", padding: "0 28px",
              whiteSpace: "nowrap", letterSpacing: "0.01em",
              opacity: 0.95,
            }}>
              {headline}
              <span style={{ marginLeft: "28px", opacity: 0.5 }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
