import { tools, categoryLabels, type Tool } from "@/lib/data";
import { ExternalLink, TrendingUp, CheckCircle2, Sparkles } from "lucide-react";

const pricingStyle: Record<string, { bg: string; color: string; label: string }> = {
  gratis:   { bg: "#DCFCE7", color: "#15803D", label: "Gratis" },
  freemium: { bg: "#FEF3C7", color: "#92400E", label: "Freemium" },
  betaald:  { bg: "#EDE9FE", color: "#5B21B6", label: "Betaald" },
};

const catStyle: Record<string, { accent: string; icon: typeof CheckCircle2 }> = {
  "gebruiken-we": { accent: "#E8392A", icon: CheckCircle2 },
  "aanrader":     { accent: "#F97316", icon: TrendingUp },
  "nieuwe":       { accent: "#7C3AED", icon: Sparkles },
};

function ToolCard({ tool, accent }: { tool: Tool; accent: string }) {
  const p = pricingStyle[tool.pricing];
  return (
    <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px", position: "relative" }}>
      {tool.trending && (
        <div style={{
          position: "absolute", top: "14px", right: "14px",
          background: "#FEF3C7", color: "#92400E",
          fontSize: "9px", fontWeight: "800",
          padding: "3px 8px", borderRadius: "100px",
          border: "1px solid #FDE68A",
          fontFamily: "var(--font-display)",
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>
          HOT
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          width: "42px", height: "42px",
          background: accent + "15",
          border: `1.5px solid ${accent}30`,
          borderRadius: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontSize: "13px", fontWeight: "800",
          color: accent, flexShrink: 0,
        }}>
          {tool.name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "15px", fontWeight: "700", color: "#1A0F0A", letterSpacing: "-0.01em" }}>
            {tool.name}
          </div>
          <span style={{ background: p.bg, color: p.color, fontSize: "10px", fontWeight: "600", padding: "2px 8px", borderRadius: "100px" }}>
            {p.label}
          </span>
        </div>
      </div>

      <p style={{ fontSize: "12px", color: "#9B7B6B", lineHeight: "1.6", flex: 1 }}>{tool.description}</p>

      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", paddingTop: "8px", borderTop: "1px solid #F5EDE5" }}>
        {tool.tags.slice(0, 3).map(tag => (
          <span key={tag} style={{ fontSize: "10px", color: "#9B7B6B", background: "#FDF8F3", border: "1px solid #EDE0D4", padding: "2px 8px", borderRadius: "100px" }}>
            {tag}
          </span>
        ))}
        {tool.url && (
          <a href={tool.url} target="_blank" rel="noopener noreferrer" style={{ marginLeft: "auto", color: "#C4A99A", transition: "color 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.color = accent)}
            onMouseLeave={e => (e.currentTarget.style.color = "#C4A99A")}
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
    <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
      {categories.map(cat => {
        const catTools = tools.filter(t => t.category === cat);
        const { accent, icon: Icon } = catStyle[cat];
        return (
          <div key={cat} className="fade-up" style={{ opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "28px", height: "28px", background: accent + "15", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={14} color={accent} />
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "800", color: "#1A0F0A", letterSpacing: "-0.02em" }}>
                {categoryLabels[cat]}
              </h2>
              <span style={{ background: accent + "15", color: accent, fontSize: "10px", fontWeight: "700", padding: "3px 10px", borderRadius: "100px" }}>
                {catTools.length} tools
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "14px" }}>
              {catTools.map(tool => <ToolCard key={tool.id} tool={tool} accent={accent} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
