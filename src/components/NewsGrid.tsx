import type { NewsItem } from "@/lib/data";
import { Clock, ArrowUpRight } from "lucide-react";

const tagStyle: Record<string, { bg: string; color: string }> = {
  BREAKING:    { bg: "#FDECEA", color: "#9B1C10" },
  UPDATE:      { bg: "#FEF3C7", color: "#92400E" },
  TOOLS:       { bg: "#EDE9FE", color: "#5B21B6" },
  AI:          { bg: "#DBEAFE", color: "#1D4ED8" },
  VIDEO:       { bg: "#FCE7F3", color: "#9D174D" },
  AUDIO:       { bg: "#CCFBF1", color: "#0F766E" },
  REGELGEVING: { bg: "#FEF9C3", color: "#713F12" },
};

function NewsCard({ item, delay }: { item: NewsItem; delay: number }) {
  const t = tagStyle[item.tag] ?? { bg: "#F3F0EB", color: "#5C3020" };
  return (
    <a
      href={item.url ?? "#"}
      target={item.url ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="card fade-up"
      style={{
        animationDelay: `${delay}s`, opacity: 0,
        padding: "22px 24px",
        display: "flex", flexDirection: "column", gap: "12px",
        textDecoration: "none", color: "inherit",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{
          background: t.bg, color: t.color,
          fontFamily: "var(--font-display)",
          fontSize: "10px", fontWeight: "800",
          letterSpacing: "0.06em", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: "100px",
        }}>
          {item.tag}
        </span>
        <ArrowUpRight size={15} color="#9B7060" />
      </div>

      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: "14px", fontWeight: "700",
        color: "#1A0805", lineHeight: "1.45",
        letterSpacing: "-0.01em",
      }}>
        {item.title}
      </h3>

      <p style={{ fontSize: "12px", color: "#9B7060", lineHeight: "1.7", flex: 1 }}>
        {item.summary.slice(0, 120)}…
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "10px", borderTop: "1px solid #F5E8D8" }}>
        <Clock size={11} color="#9B7060" />
        <span style={{ fontSize: "11px", color: "#9B7060" }}>{item.readTime} min</span>
        <span style={{ fontSize: "11px", color: "#9B7060", marginLeft: "auto", fontWeight: "500" }}>{item.source}</span>
      </div>
    </a>
  );
}

export default function NewsGrid({ items }: { items: NewsItem[] }) {
  const rest = items.filter(n => !n.featured);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "17px", fontWeight: "800",
          color: "#1A0805", letterSpacing: "-0.02em",
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
        gap: "16px",
      }}>
        {rest.map((item, i) => (
          <NewsCard key={item.id} item={item} delay={0.04 * (i + 1)} />
        ))}
      </div>
    </div>
  );
}
