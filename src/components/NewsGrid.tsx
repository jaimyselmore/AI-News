import type { NewsItem } from "@/lib/data";
import { Clock, ArrowUpRight } from "lucide-react";

const tagColor: Record<string, string> = {
  BREAKING:    "#E53E2A",
  UPDATE:      "#D09828",
  TOOLS:       "#7C3AED",
  AI:          "#2563EB",
  VIDEO:       "#DB2777",
  AUDIO:       "#0D9488",
  REGELGEVING: "#C2820A",
};

function NewsCard({ item, delay }: { item: NewsItem; delay: number }) {
  const color = tagColor[item.tag] ?? "#C83820";
  return (
    <a
      href={item.url ?? "#"}
      target={item.url ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="glass-card fade-up"
      style={{
        animationDelay: `${delay}s`,
        opacity: 0,
        padding: "22px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {/* Tag + arrow */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{
          background: color + "28",
          color: "white",
          border: `1px solid ${color}55`,
          fontFamily: "var(--font-display)",
          fontSize: "10px", fontWeight: "800",
          letterSpacing: "0.06em", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: "100px",
        }}>
          {item.tag}
        </span>
        <ArrowUpRight size={14} color="rgba(255,255,255,0.35)" />
      </div>

      {/* Titel */}
      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: "14px", fontWeight: "700",
        color: "white",
        lineHeight: "1.4",
        letterSpacing: "-0.01em",
        textShadow: "0 1px 8px rgba(0,0,0,0.15)",
      }}>
        {item.title}
      </h3>

      {/* Samenvatting */}
      <p style={{
        fontSize: "12px",
        color: "rgba(255,255,255,0.55)",
        lineHeight: "1.7",
        flex: 1,
      }}>
        {item.summary.slice(0, 115)}…
      </p>

      {/* Footer */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        paddingTop: "10px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}>
        <Clock size={10} color="rgba(255,255,255,0.3)" />
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{item.readTime} min</span>
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginLeft: "auto", fontWeight: "500" }}>
          {item.source}
        </span>
      </div>
    </a>
  );
}

export default function NewsGrid({ items }: { items: NewsItem[] }) {
  const rest = items.filter(n => !n.featured);
  return (
    <div>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "18px",
      }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "16px", fontWeight: "700",
          color: "white",
          letterSpacing: "-0.02em",
          textShadow: "0 1px 10px rgba(0,0,0,0.2)",
        }}>
          Alle nieuws
        </h2>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", fontWeight: "500" }}>
          {rest.length} artikelen
        </span>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(285px, 1fr))",
        gap: "14px",
      }}>
        {rest.map((item, i) => (
          <NewsCard key={item.id} item={item} delay={0.04 * (i + 1)} />
        ))}
      </div>
    </div>
  );
}
