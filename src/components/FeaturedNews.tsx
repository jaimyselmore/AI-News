import { newsItems } from "@/lib/data";
import { Clock, ExternalLink } from "lucide-react";

export default function FeaturedNews() {
  const featured = newsItems.find((n) => n.featured) ?? newsItems[0];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1A1A1A 0%, #1E1210 100%)",
        border: "1px solid #2E2E2E",
        borderRadius: "12px",
        padding: "32px",
        position: "relative",
        overflow: "hidden",
        marginBottom: "24px",
      }}
    >
      {/* Accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #E8392A, #F97316)",
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "-60px",
          right: "-60px",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, #E8392A15 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
        <span
          style={{
            background: "#E8392A",
            color: "white",
            fontSize: "10px",
            fontWeight: "800",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
          }}
        >
          {featured.tag}
        </span>
        <span
          style={{
            background: "#E8392A20",
            color: "#F97316",
            fontSize: "10px",
            fontWeight: "700",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "4px 10px",
            borderRadius: "4px",
            border: "1px solid #F9731630",
          }}
        >
          UITGELICHT
        </span>
      </div>

      <h1
        style={{
          fontSize: "clamp(20px, 2.5vw, 30px)",
          fontWeight: "800",
          lineHeight: "1.2",
          letterSpacing: "-0.02em",
          color: "white",
          marginBottom: "12px",
          maxWidth: "600px",
        }}
      >
        {featured.title}
      </h1>

      <p
        style={{
          fontSize: "15px",
          lineHeight: "1.65",
          color: "#aaa",
          marginBottom: "20px",
          maxWidth: "580px",
        }}
      >
        {featured.summary}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Clock size={13} color="#555" />
          <span style={{ fontSize: "12px", color: "#555" }}>
            {featured.readTime} min lezen
          </span>
        </div>
        <span style={{ fontSize: "12px", color: "#555" }}>
          {featured.source}
        </span>
        <span style={{ fontSize: "12px", color: "#555" }}>
          {new Date(featured.date).toLocaleDateString("nl-NL", {
            day: "numeric",
            month: "long",
          })}
        </span>

        <button
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "#E8392A",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 18px",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#c42d20")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#E8392A")
          }
        >
          Lees meer
          <ExternalLink size={13} />
        </button>
      </div>
    </div>
  );
}
