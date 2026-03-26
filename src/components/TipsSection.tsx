import { tips, type TipItem } from "@/lib/data";
import { BookOpen, Zap, Star } from "lucide-react";

const levelConfig = {
  beginner:  { label: "Beginner",  color: "#0D9488", bg: "#CCFBF1", icon: BookOpen },
  gevorderd: { label: "Gevorderd", color: "#F97316", bg: "#FFEDD5", icon: Zap },
  pro:       { label: "Pro",       color: "#7C3AED", bg: "#EDE9FE", icon: Star },
};

function TipCard({ tip }: { tip: TipItem }) {
  const cfg = levelConfig[tip.level];
  const Icon = cfg.icon;
  return (
    <div className="card" style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "30px", height: "30px",
            background: cfg.bg, borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={14} color={cfg.color} />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "10px", fontWeight: "800", color: cfg.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {cfg.label}
          </span>
        </div>
        {tip.tool && (
          <span style={{ fontSize: "10px", fontWeight: "600", color: "#9B7B6B", background: "#FDF8F3", border: "1px solid #EDE0D4", padding: "3px 10px", borderRadius: "100px" }}>
            {tip.tool}
          </span>
        )}
      </div>

      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "700", color: "#1A0F0A", lineHeight: "1.4", letterSpacing: "-0.01em" }}>
        {tip.title}
      </h3>

      <p style={{ fontSize: "13px", color: "#9B7B6B", lineHeight: "1.7" }}>{tip.content}</p>

      <div style={{ fontSize: "11px", color: "#C4A99A", paddingTop: "10px", borderTop: "1px solid #F5EDE5" }}>
        {new Date(tip.date).toLocaleDateString("nl-NL", { day: "numeric", month: "long" })}
      </div>
    </div>
  );
}

export default function TipsSection() {
  const levels = ["beginner", "gevorderd", "pro"] as const;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
      {levels.map(level => {
        const levelTips = tips.filter(t => t.level === level);
        if (!levelTips.length) return null;
        const cfg = levelConfig[level];
        const Icon = cfg.icon;
        return (
          <div key={level} className="fade-up" style={{ opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "28px", height: "28px", background: cfg.bg, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={14} color={cfg.color} />
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: "800", color: "#1A0F0A", letterSpacing: "-0.02em" }}>
                {cfg.label}
              </h2>
              <span style={{ background: cfg.bg, color: cfg.color, fontSize: "10px", fontWeight: "700", padding: "3px 10px", borderRadius: "100px" }}>
                {levelTips.length} tips
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px" }}>
              {levelTips.map(tip => <TipCard key={tip.id} tip={tip} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
