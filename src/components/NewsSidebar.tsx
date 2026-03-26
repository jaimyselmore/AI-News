import { newsItems } from "@/lib/data";
import { TrendingUp, Clock } from "lucide-react";

export default function NewsSidebar() {
  const recent = newsItems.slice(0, 6);

  return (
    <div
      style={{
        width: "280px",
        minWidth: "280px",
        borderLeft: "1px solid #2E2E2E",
        padding: "24px 20px",
        height: "fit-content",
        position: "sticky",
        top: "37px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
        }}
      >
        <TrendingUp size={15} color="#E8392A" />
        <h3
          style={{
            fontSize: "12px",
            fontWeight: "800",
            color: "white",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          Nieuws AI
        </h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        {recent.map((item, index) => (
          <div
            key={item.id}
            style={{
              padding: "14px 0",
              borderBottom: index < recent.length - 1 ? "1px solid #1E1E1E" : "none",
              cursor: "pointer",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: "#2E2E2E",
                  lineHeight: "1",
                  minWidth: "24px",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#ccc",
                    lineHeight: "1.4",
                    marginBottom: "6px",
                  }}
                >
                  {item.title}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Clock size={10} color="#444" />
                  <span style={{ fontSize: "10px", color: "#444" }}>
                    {item.readTime} min
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: item.tag === "BREAKING" ? "#E8392A" : "#F97316",
                      fontWeight: "700",
                    }}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats box */}
      <div
        style={{
          marginTop: "24px",
          background: "#1A1A1A",
          border: "1px solid #2E2E2E",
          borderRadius: "10px",
          padding: "16px",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            fontWeight: "700",
            color: "#555",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Deze week
        </div>
        {[
          { label: "Nieuwsartikelen", value: "24", color: "#E8392A" },
          { label: "Nieuwe tools", value: "8", color: "#F97316" },
          { label: "Tips gepubliceerd", value: "6", color: "#8B5CF6" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#666" }}>{stat.label}</span>
            <span style={{ fontSize: "16px", fontWeight: "800", color: stat.color }}>
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
