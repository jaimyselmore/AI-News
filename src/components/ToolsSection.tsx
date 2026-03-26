import { tools, categoryLabels, type Tool } from "@/lib/data";
import { ExternalLink, TrendingUp, CheckCircle2 } from "lucide-react";

const pricingColor: Record<string, string> = {
  gratis: "#22C55E",
  freemium: "#F97316",
  betaald: "#8B5CF6",
};

function ToolCard({ tool }: { tool: Tool }) {
  const isOurs = tool.category === "gebruiken-we";

  return (
    <div
      className={isOurs ? "card-hover" : "card-hover card-hover-orange"}
      style={{
        background: "#1A1A1A",
        border: `1px solid ${isOurs ? "#2E2E2E" : "#2E2E2E"}`,
        borderRadius: "10px",
        padding: "18px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        position: "relative",
      }}
    >
      {tool.trending && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            display: "flex",
            alignItems: "center",
            gap: "3px",
            background: "#F9731615",
            border: "1px solid #F9731640",
            borderRadius: "4px",
            padding: "2px 6px",
          }}
        >
          <TrendingUp size={9} color="#F97316" />
          <span style={{ fontSize: "9px", color: "#F97316", fontWeight: "700" }}>
            HOT
          </span>
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            background: isOurs ? "#E8392A20" : "#F9731615",
            border: `1px solid ${isOurs ? "#E8392A40" : "#F9731630"}`,
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "800",
            color: isOurs ? "#E8392A" : "#F97316",
          }}
        >
          {tool.name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "700",
              color: "white",
            }}
          >
            {tool.name}
          </div>
          <span
            style={{
              fontSize: "10px",
              color: pricingColor[tool.pricing],
              fontWeight: "600",
              textTransform: "capitalize",
            }}
          >
            {tool.pricing}
          </span>
        </div>
      </div>

      <p style={{ fontSize: "12px", color: "#777", lineHeight: "1.55", flex: 1 }}>
        {tool.description}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
        {tool.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "10px",
              color: "#555",
              background: "#222",
              border: "1px solid #2E2E2E",
              padding: "2px 7px",
              borderRadius: "4px",
              fontWeight: "500",
            }}
          >
            {tag}
          </span>
        ))}
        {tool.url && (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: "auto",
              color: "#555",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E8392A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function ToolsSection() {
  const categories = ["gebruiken-we", "aanrader", "nieuwe"] as const;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {categories.map((cat) => {
        const catTools = tools.filter((t) => t.category === cat);
        return (
          <div key={cat}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              {cat === "gebruiken-we" && (
                <CheckCircle2 size={16} color="#E8392A" />
              )}
              {cat === "aanrader" && <TrendingUp size={16} color="#F97316" />}
              {cat === "nieuwe" && (
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    background: "#8B5CF6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "8px", fontWeight: "800", color: "white" }}>N</span>
                </div>
              )}
              <h2
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "white",
                  letterSpacing: "-0.01em",
                }}
              >
                {categoryLabels[cat]}
              </h2>
              <span
                style={{
                  background: cat === "gebruiken-we" ? "#E8392A20" : cat === "aanrader" ? "#F9731620" : "#8B5CF620",
                  color: cat === "gebruiken-we" ? "#E8392A" : cat === "aanrader" ? "#F97316" : "#8B5CF6",
                  fontSize: "10px",
                  fontWeight: "700",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}
              >
                {catTools.length} tools
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "12px",
              }}
            >
              {catTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
