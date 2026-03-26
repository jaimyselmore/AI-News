import { newsItems } from "@/lib/data";
import { Clock, ArrowRight, Sparkles } from "lucide-react";

export default function FeaturedNews() {
  const featured = newsItems.find(n => n.featured) ?? newsItems[0];

  return (
    <div className="fade-up delay-1" style={{
      background: "linear-gradient(135deg, #FFF5EE 0%, #FDE8D8 60%, #FCDDC8 100%)",
      border: "1px solid #F5C4A8",
      borderRadius: "20px",
      padding: "36px 40px",
      position: "relative",
      overflow: "hidden",
      marginBottom: "28px",
    }}>
      {/* Decorative circle */}
      <div style={{
        position: "absolute", top: "-80px", right: "-80px",
        width: "280px", height: "280px",
        background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-40px", left: "30%",
        width: "160px", height: "160px",
        background: "radial-gradient(circle, rgba(232,57,42,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      {/* Tags */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px", flexWrap: "wrap" }}>
        <span style={{
          background: "#E8392A", color: "white",
          fontFamily: "var(--font-display)",
          fontSize: "10px", fontWeight: "800",
          letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "5px 12px", borderRadius: "100px",
        }}>
          {featured.tag}
        </span>
        <span style={{
          display: "flex", alignItems: "center", gap: "5px",
          background: "rgba(249,115,22,0.12)",
          color: "#C2440F",
          fontSize: "11px", fontWeight: "600",
          padding: "5px 12px", borderRadius: "100px",
          border: "1px solid rgba(249,115,22,0.25)",
        }}>
          <Sparkles size={11} />
          Uitgelicht
        </span>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(22px, 2.8vw, 34px)",
        fontWeight: "800",
        color: "#1A0F0A",
        lineHeight: "1.15",
        letterSpacing: "-0.03em",
        marginBottom: "14px",
        maxWidth: "620px",
      }}>
        {featured.title}
      </h1>

      {/* Summary */}
      <p style={{
        fontSize: "15px", lineHeight: "1.7",
        color: "#5C4033", marginBottom: "24px", maxWidth: "580px",
      }}>
        {featured.summary}
      </p>

      {/* Meta + CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Clock size={13} color="#9B7B6B" />
          <span style={{ fontSize: "12px", color: "#9B7B6B" }}>{featured.readTime} min lezen</span>
        </div>
        <span style={{ fontSize: "12px", color: "#9B7B6B" }}>—</span>
        <span style={{ fontSize: "12px", color: "#9B7B6B", fontWeight: "500" }}>{featured.source}</span>
        <button style={{
          marginLeft: "auto",
          display: "flex", alignItems: "center", gap: "8px",
          background: "#E8392A", color: "white",
          border: "none", borderRadius: "100px",
          padding: "11px 22px",
          fontFamily: "var(--font-display)",
          fontSize: "13px", fontWeight: "700",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(232,57,42,0.35)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,57,42,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(232,57,42,0.35)"; }}
        >
          Lees artikel <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
