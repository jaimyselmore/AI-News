import type { NewsItem } from "@/lib/data";
import { Clock, ArrowUpRight } from "lucide-react";

const tagStyle: Record<string, { bg: string; color: string }> = {
  BREAKING:    { bg: "#FEE2E2", color: "#B91C1C" },
  UPDATE:      { bg: "#FEF3C7", color: "#92400E" },
  TOOLS:       { bg: "#EDE9FE", color: "#5B21B6" },
  AI:          { bg: "#DBEAFE", color: "#1D4ED8" },
  VIDEO:       { bg: "#FCE7F3", color: "#9D174D" },
  AUDIO:       { bg: "#CCFBF1", color: "#0F766E" },
  REGELGEVING: { bg: "#FEF9C3", color: "#713F12" },
};

function NewsCard({ item, delay }: { item: NewsItem; delay: number }) {
  const t = tagStyle[item.tag] ?? { bg: "#F3F4F6", color: "#374151" };
  return (
    <a
      href={item.url ?? '#'}
      target={item.url ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="card fade-up"
      style={{
        animationDelay: `${delay}s`, opacity: 0,
        padding: "20px", display: "flex", flexDirection: "column", gap: "12px",
        textDecoration: "none", color: "inherit", cursor: "pointer",
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
        <ArrowUpRight size={15} color="#C4A99A" />
      </div>

      <h3 style={{
        fontFamily: "var(--font-display)",
        fontSize: "14px", fontWeight: "700",
        color: "#1A0F0A", lineHeight: "1.4",
        letterSpacing: "-0.01em",
      }}>
        {item.title}
      </h3>

      <p style={{ fontSize: "12px", color: "#9B7B6B", lineHeight: "1.65", flex: 1 }}>
        {item.summary.slice(0, 110)}…
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "8px", borderTop: "1px solid #F5EDE5" }}>
        <Clock size={11} color="#C4A99A" />
        <span style={{ fontSize: "11px", color: "#C4A99A" }}>{item.readTime} min</span>
        <span style={{ fontSize: "11px", color: "#C4A99A", marginLeft: "auto" }}>{item.source}</span>
      </div>
    </a>
  );
}

export default function NewsGrid({ items }: { items: NewsItem[] }) {
  const rest = items.filter(n => !n.featured);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "17px", fontWeight: "800", color: "#1A0F0A", letterSpacing: "-0.02em" }}>
          Alle nieuws
        </h2>
        <span style={{ fontSize: "12px", color: "#C4A99A", fontWeight: "500" }}>{rest.length} artikelen</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(255px, 1fr))", gap: "14px" }}>
        {rest.map((item, i) => <NewsCard key={item.id} item={item} delay={0.05 * (i + 1)} />)}
      </div>
    </div>
  );
}
