import { newsItems, type NewsItem } from "@/lib/data";
import { Clock, ArrowUpRight } from "lucide-react";

const tagColors: Record<string, string> = {
  BREAKING: "#E8392A",
  UPDATE: "#F97316",
  TOOLS: "#8B5CF6",
  AI: "#3B82F6",
  VIDEO: "#EC4899",
  AUDIO: "#14B8A6",
  REGELGEVING: "#F59E0B",
};

function NewsCard({ item }: { item: NewsItem }) {
  const tagColor = tagColors[item.tag] ?? "#666";

  return (
    <div
      className="card-hover"
      style={{
        background: "#1A1A1A",
        border: "1px solid #2E2E2E",
        borderRadius: "10px",
        padding: "20px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            background: tagColor + "20",
            color: tagColor,
            fontSize: "10px",
            fontWeight: "800",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: "4px",
            border: `1px solid ${tagColor}40`,
          }}
        >
          {item.tag}
        </span>
        <ArrowUpRight size={14} color="#444" />
      </div>

      <h3
        style={{
          fontSize: "14px",
          fontWeight: "700",
          color: "white",
          lineHeight: "1.4",
          letterSpacing: "-0.01em",
        }}
      >
        {item.title}
      </h3>

      <p
        style={{
          fontSize: "12px",
          color: "#777",
          lineHeight: "1.6",
          flex: 1,
        }}
      >
        {item.summary.slice(0, 120)}…
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Clock size={11} color="#555" />
          <span style={{ fontSize: "11px", color: "#555" }}>{item.readTime} min</span>
        </div>
        <span style={{ fontSize: "11px", color: "#444" }}>{item.source}</span>
      </div>
    </div>
  );
}

export default function NewsGrid() {
  const nonFeatured = newsItems.filter((n) => !n.featured);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <h2
          style={{
            fontSize: "16px",
            fontWeight: "800",
            color: "white",
            letterSpacing: "-0.01em",
          }}
        >
          Alle nieuws
        </h2>
        <span style={{ fontSize: "12px", color: "#555" }}>
          {nonFeatured.length} artikelen
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "12px",
        }}
      >
        {nonFeatured.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
