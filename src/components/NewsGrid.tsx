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
      className="card fade-up"
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
          background: color + "18",
          color: color,
          border: `1px solid ${color}40`,
          fontFamily: "var(--font-display)",
          fontSize: "10px", fontWeight: "800",
          letterSpacing: "0.06em", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: "100px",
        }}>
          {item.tag}
        </span>
        <ArrowUpRight size={14} color="#C4A99A" />
      </div>

      {/* Titel */}
      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: "14px", fontWeight: "700",
        color: "#1A0805",
        lineHeight: "1.4",
        letterSpacing: "-0.01em",
      }}>
        {item.title}
      </h3>

      {/* Samenvatting */}
      <p style={{
        fontSize: "12px",
        color: "#9B7060",
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
        borderTop: "1px solid #F5E8D8",
      }}>
        <Clock size={10} color="#C4A99A" />
        <span style={{ fontSize: "11px", color: "#C4A99A" }}>{item.readTime} min</span>
        <span style={{ fontSize: "11px", color: "#C4A99A", marginLeft: "auto", fontWeight: "500" }}>
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
          color: "#1A0805",
          letterSpacing: "-0.02em",
        }}>
          Alle nieuws
        </h2>
        <span style={{ fontSize: "12px", color: "#9B7060", fontWeight: "500" }}>
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
