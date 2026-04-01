import type { NewsItem } from "@/lib/data";
import { Clock, ArrowRight, Sparkles } from "lucide-react";

export default function FeaturedNews({ items }: { items: NewsItem[] }) {
  const featured = items.find(n => n.featured) ?? items[0];
  if (!featured) return null;

  return (
    <div style={{
      background: "rgba(255,255,255,0.11)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.18)",
      borderRadius: "24px",
      padding: "40px 44px",
      position: "relative",
      overflow: "hidden",
      marginBottom: "24px",
    }}>
      {/* Subtiele gloed vanuit de hoek */}
      <div style={{
        position: "absolute",
        top: "-80px", right: "-80px",
        width: "280px", height: "280px",
        background: "radial-gradient(circle, rgba(200,56,32,0.18) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Tags */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        <span style={{
          background: "rgba(200,56,32,0.85)",
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
          background: "rgba(255,255,255,0.10)",
          color: "rgba(255,255,255,0.75)",
          fontSize: "11px", fontWeight: "600",
          padding: "5px 12px", borderRadius: "100px",
          border: "1px solid rgba(255,255,255,0.18)",
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
        color: "white",
        lineHeight: "1.12",
        letterSpacing: "-0.03em",
        marginBottom: "16px",
        maxWidth: "680px",
        textShadow: "0 2px 20px rgba(0,0,0,0.2)",
      }}>
        {featured.title}
      </h1>

      {/* Samenvatting */}
      <p style={{
        fontSize: "15px", lineHeight: "1.75",
        color: "rgba(255,255,255,0.65)",
        marginBottom: "28px",
        maxWidth: "620px",
      }}>
        {featured.summary}
      </p>

      {/* Meta + CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Clock size={12} color="rgba(255,255,255,0.45)" />
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>{featured.readTime} min lezen</span>
        </div>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>—</span>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", fontWeight: "500" }}>{featured.source}</span>
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
              boxShadow: "0 4px 20px rgba(200,56,32,0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,56,32,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,56,32,0.4)";
            }}
          >
            Lees artikel <ArrowRight size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
