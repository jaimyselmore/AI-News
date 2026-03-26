import { tips, levelColors, type TipItem } from "@/lib/data";
import { BookOpen, Zap, Star } from "lucide-react";

const levelLabels: Record<string, string> = {
  beginner: "Beginner",
  gevorderd: "Gevorderd",
  pro: "Pro",
};

const levelIcons = {
  beginner: BookOpen,
  gevorderd: Zap,
  pro: Star,
};

function TipCard({ tip }: { tip: TipItem }) {
  const color = levelColors[tip.level];
  const Icon = levelIcons[tip.level];

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
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              background: color + "20",
              border: `1px solid ${color}40`,
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={13} color={color} />
          </div>
          <span
            style={{
              fontSize: "10px",
              fontWeight: "800",
              color,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {levelLabels[tip.level]}
          </span>
        </div>
        {tip.tool && (
          <span
            style={{
              fontSize: "10px",
              fontWeight: "600",
              color: "#555",
              background: "#222",
              border: "1px solid #2E2E2E",
              padding: "3px 8px",
              borderRadius: "4px",
            }}
          >
            {tip.tool}
          </span>
        )}
      </div>

      <h3
        style={{
          fontSize: "14px",
          fontWeight: "700",
          color: "white",
          lineHeight: "1.4",
        }}
      >
        {tip.title}
      </h3>

      <p
        style={{
          fontSize: "12px",
          color: "#888",
          lineHeight: "1.65",
        }}
      >
        {tip.content}
      </p>

      <div
        style={{
          fontSize: "11px",
          color: "#444",
          borderTop: "1px solid #222",
          paddingTop: "10px",
          marginTop: "auto",
        }}
      >
        {new Date(tip.date).toLocaleDateString("nl-NL", {
          day: "numeric",
          month: "long",
        })}
      </div>
    </div>
  );
}

export default function TipsSection() {
  const levels = ["beginner", "gevorderd", "pro"] as const;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {levels.map((level) => {
        const levelTips = tips.filter((t) => t.level === level);
        if (levelTips.length === 0) return null;
        const color = levelColors[level];
        const Icon = levelIcons[level];

        return (
          <div key={level}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <Icon size={16} color={color} />
              <h2
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "white",
                  letterSpacing: "-0.01em",
                }}
              >
                {levelLabels[level]}
              </h2>
              <span
                style={{
                  background: color + "20",
                  color,
                  fontSize: "10px",
                  fontWeight: "700",
                  padding: "2px 8px",
                  borderRadius: "4px",
                }}
              >
                {levelTips.length} tips
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "12px",
              }}
            >
              {levelTips.map((tip) => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
