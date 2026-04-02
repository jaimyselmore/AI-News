import type { NewsItem } from "@/lib/data";
import { Clock, ArrowRight, Sparkles } from "lucide-react";

export default function FeaturedNews({ items }: { items: NewsItem[] }) {
  const featured = items.find(n => n.featured) ?? items[0];
  if (!featured) return null;

  return (
    <div style={{
      background: "#FFFFFF",
      border: "1px solid #EAD0B8",
      borderRadius: "24px",
      padding: "40px 44px",
      position: "relative",
      overflow: "hidden",
      marginBottom: "24px",
      boxShadow: "0 2px 8px rgba(100,40,15,0.06), 0 12px 40px rgba(100,40,15,0.08)",
    }}>
      {/* Subtiele gloed vanuit de hoek */}
      <div style={{
        position: "absolute",
        top: "-80px", right: "-80px",
        width: "280px", height: "280px",
        background: "radial-gradient(circle, rgba(200,56,32,0.07) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Tags */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        <span style={{
          background: "#C83820",
          color: "white",
          fontFamily: "var(--font-display)",
          fontSize: "10px", fontWeight: "800",
          letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "5px 12px", borderRadius: "100px",
        }}>
          {featured.tag}
        </span>
        <span style={{
          display: "flex", alignItems: "center", gap: "5px",
          background: "rgba(200,56,32,0.08)",
          color: "#C83820",
          fontSize: "11px", fontWeight: "600",
          padding: "5px 12px", borderRadius: "100px",
          border: "1px solid rgba(200,56,32,0.2)",
        }}>
          <Sparkles size={11} />
          Uitgelicht
        </span>
      </div>

      {/* Titel */}
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(22px, 2.8vw, 36px)",
        fontWeight: "800",
        color: "#1A0805",
        lineHeight: "1.12",
        letterSpacing: "-0.03em",
        marginBottom: "16px",
        maxWidth: "680px",
      }}>
        {featured.title}
      </h1>

      {/* Samenvatting */}
      <p style={{
        fontSize: "15px", lineHeight: "1.75",
        color: "#5C3020",
        marginBottom: "28px",
        maxWidth: "620px",
      }}>
        {featured.summary}
      </p>

      {/* Meta + CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Clock size={12} color="#C4A99A" />
          <span style={{ fontSize: "12px", color: "#9B7060" }}>{featured.readTime} min lezen</span>
        </div>
        <span style={{ fontSize: "12px", color: "#EAD0B8" }}>—</span>
        <span style={{ fontSize: "12px", color: "#9B7060", fontWeight: "500" }}>{featured.source}</span>
        {featured.url && (
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: "auto",
              display: "flex", alignItems: "center", gap: "8px",
              background: "#C83820",
              color: "white",
              borderRadius: "100px",
              padding: "12px 24px",
              fontFamily: "var(--font-display)",
              fontSize: "13px", fontWeight: "700",
              cursor: "pointer", textDecoration: "none",
              boxShadow: "0 4px 20px rgba(200,56,32,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,56,32,0.45)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,56,32,0.3)";
            }}
          >
            Lees artikel <ArrowRight size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
