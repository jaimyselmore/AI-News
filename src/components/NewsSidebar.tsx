import type { NewsItem } from "@/lib/data";
import { TrendingUp, Clock, BarChart2 } from "lucide-react";

const tagColors: Record<string, string> = {
  BREAKING: "#E8392A", UPDATE: "#F97316", TOOLS: "#7C3AED",
  AI: "#2563EB", VIDEO: "#EC4899", AUDIO: "#0D9488", REGELGEVING: "#F59E0B",
};

export default function NewsSidebar({ items }: { items: NewsItem[] }) {
  const recent = items.slice(0, 6);

  // Dynamische week-stats op basis van live data
  const thisWeek = items.filter(i => {
    const diff = Date.now() - new Date(i.date).getTime();
    return diff < 7 * 24 * 60 * 60 * 1000;
  });
  const toolCount = thisWeek.filter(i => i.category === 'tools').length;
  const tipCount  = thisWeek.filter(i => i.category === 'tips').length;

  return (
    <div style={{
      width: "270px", minWidth: "270px",
      borderLeft: "1px solid #EDE0D4",
      padding: "28px 20px",
      background: "#FFFFFF",
      overflowY: "auto",
      height: "calc(100vh - 38px)",
    }}>
      {/* Trending */}
      <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "18px" }}>
        <TrendingUp size={14} color="#E8392A" />
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "12px", fontWeight: "800", color: "#1A0F0A", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Trending
        </h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {recent.map((item, i) => (
          <a
            key={item.id}
            href={item.url ?? '#'}
            target={item.url ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              padding: "13px 0",
              borderBottom: i < recent.length - 1 ? "1px solid #F5EDE5" : "none",
              cursor: "pointer", transition: "opacity 0.15s", textDecoration: "none",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.65")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "20px", fontWeight: "800",
                color: "#F5EDE5", lineHeight: "1", minWidth: "26px",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p style={{ fontSize: "12px", fontWeight: "600", color: "#1A0F0A", lineHeight: "1.4", marginBottom: "6px" }}>
                  {item.title}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Clock size={10} color="#C4A99A" />
                  <span style={{ fontSize: "10px", color: "#C4A99A" }}>{item.readTime} min</span>
                  <span style={{
                    fontSize: "9px", fontWeight: "800",
                    color: tagColors[item.tag] ?? "#888",
                    textTransform: "uppercase", letterSpacing: "0.06em",
                  }}>{item.tag}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Week stats — dynamisch */}
      <div style={{
        marginTop: "24px",
        background: "linear-gradient(135deg, #FFF5EE, #FDE8D8)",
        border: "1px solid #F5C4A8",
        borderRadius: "14px",
        padding: "18px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "14px" }}>
          <BarChart2 size={13} color="#E8392A" />
          <span style={{ fontFamily: "var(--font-display)", fontSize: "11px", fontWeight: "800", color: "#1A0F0A", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Deze week
          </span>
        </div>
        {[
          { label: "Artikelen",    value: String(thisWeek.length || items.length), color: "#E8392A" },
          { label: "Nieuwe tools", value: String(toolCount),                        color: "#7C3AED" },
          { label: "Tips",         value: String(tipCount),                         color: "#0D9488" },
        ].map(s => (
          <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", color: "#9B7B6B" }}>{s.label}</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "800", color: s.color, lineHeight: 1 }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
