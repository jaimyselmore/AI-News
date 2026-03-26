"use client";

import { useState } from "react";
import { Upload, FileText, Wrench, Lightbulb, CheckCircle2 } from "lucide-react";

type UploadType = "nieuws" | "tool" | "tip";

const types = [
  { id: "nieuws" as UploadType, label: "Nieuws",       icon: FileText,  color: "#E8392A", bg: "#FEE2E2" },
  { id: "tool"   as UploadType, label: "Tool",          icon: Wrench,    color: "#7C3AED", bg: "#EDE9FE" },
  { id: "tip"    as UploadType, label: "Tip of Trick",  icon: Lightbulb, color: "#0D9488", bg: "#CCFBF1" },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#FFFFFF",
  border: "1.5px solid #EDE0D4",
  borderRadius: "10px",
  padding: "12px 14px",
  fontSize: "14px",
  color: "#1A0F0A",
  outline: "none",
  fontFamily: "var(--font-body)",
  transition: "border-color 0.15s",
};

export default function UploadSection() {
  const [type, setType] = useState<UploadType>("nieuws");
  const [submitted, setSubmitted] = useState(false);
  const activeType = types.find(t => t.id === type)!;

  if (submitted) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "18px", padding: "80px 32px", textAlign: "center" }}>
        <div style={{
          width: "68px", height: "68px",
          background: "#DCFCE7", border: "2px solid #86EFAC",
          borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 24px rgba(34,197,94,0.2)",
        }}>
          <CheckCircle2 size={30} color="#16A34A" />
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "800", color: "#1A0F0A" }}>Ingediend!</h2>
        <p style={{ fontSize: "14px", color: "#9B7B6B", maxWidth: "360px", lineHeight: "1.6" }}>
          Je bijdrage is ontvangen en wordt beoordeeld voordat het op de site verschijnt.
        </p>
        <button onClick={() => setSubmitted(false)} style={{
          background: "#E8392A", color: "white", border: "none",
          borderRadius: "100px", padding: "12px 28px",
          fontFamily: "var(--font-display)", fontSize: "14px", fontWeight: "700",
          cursor: "pointer", boxShadow: "0 4px 16px rgba(232,57,42,0.3)",
        }}>
          Nog iets toevoegen
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "620px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: "800", color: "#1A0F0A", letterSpacing: "-0.03em", marginBottom: "8px" }}>
          Upload eigen content
        </h2>
        <p style={{ fontSize: "14px", color: "#9B7B6B", lineHeight: "1.6" }}>
          Interessant AI nieuws gevonden, een handige tool ontdekt of een goede tip? Deel het met het team.
        </p>
      </div>

      {/* Type switcher */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
        {types.map(t => {
          const Icon = t.icon;
          const isActive = type === t.id;
          return (
            <button key={t.id} onClick={() => setType(t.id)} style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "7px",
              padding: "11px 8px",
              borderRadius: "12px",
              border: isActive ? `2px solid ${t.color}` : "2px solid #EDE0D4",
              background: isActive ? t.bg : "#FFFFFF",
              cursor: "pointer", transition: "all 0.2s",
            }}>
              <Icon size={14} color={isActive ? t.color : "#9B7B6B"} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: "13px", fontWeight: "700", color: isActive ? t.color : "#9B7B6B" }}>
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Title */}
        <div>
          <label style={{ fontSize: "11px", fontWeight: "700", color: "#9B7B6B", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>
            {type === "tool" ? "Naam van de tool" : "Titel"}
          </label>
          <input type="text" placeholder={type === "nieuws" ? "Bijv: OpenAI lanceert..." : type === "tool" ? "Bijv: Midjourney..." : "Bijv: Gebruik chain-of-thought voor..."}
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = activeType.color)}
            onBlur={e => (e.target.style.borderColor = "#EDE0D4")}
          />
        </div>

        {/* Content */}
        <div>
          <label style={{ fontSize: "11px", fontWeight: "700", color: "#9B7B6B", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>
            {type === "tool" ? "Beschrijving & use case" : "Inhoud / samenvatting"}
          </label>
          <textarea rows={5} placeholder="Schrijf hier je inhoud..."
            style={{ ...inputStyle, resize: "vertical", lineHeight: "1.65" }}
            onFocus={e => (e.target.style.borderColor = activeType.color)}
            onBlur={e => (e.target.style.borderColor = "#EDE0D4")}
          />
        </div>

        {type === "nieuws" && (
          <div>
            <label style={{ fontSize: "11px", fontWeight: "700", color: "#9B7B6B", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>
              Bron / URL
            </label>
            <input type="url" placeholder="https://..."
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = activeType.color)}
              onBlur={e => (e.target.style.borderColor = "#EDE0D4")}
            />
          </div>
        )}

        {type === "tip" && (
          <div>
            <label style={{ fontSize: "11px", fontWeight: "700", color: "#9B7B6B", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>
              Niveau
            </label>
            <select style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="beginner">Beginner</option>
              <option value="gevorderd">Gevorderd</option>
              <option value="pro">Pro</option>
            </select>
          </div>
        )}

        <div>
          <label style={{ fontSize: "11px", fontWeight: "700", color: "#9B7B6B", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: "7px" }}>
            Jouw naam (optioneel)
          </label>
          <input type="text" placeholder="Jouw naam"
            style={inputStyle}
            onFocus={e => (e.target.style.borderColor = activeType.color)}
            onBlur={e => (e.target.style.borderColor = "#EDE0D4")}
          />
        </div>

        <button onClick={() => setSubmitted(true)} style={{
          background: `linear-gradient(135deg, ${activeType.color}, ${type === "nieuws" ? "#F97316" : type === "tool" ? "#A855F7" : "#14B8A6"})`,
          color: "white", border: "none", borderRadius: "100px",
          padding: "15px 28px", fontSize: "14px", fontWeight: "700",
          fontFamily: "var(--font-display)",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          marginTop: "8px", transition: "opacity 0.2s, transform 0.2s",
          boxShadow: `0 6px 20px ${activeType.color}40`,
        }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }}
        >
          <Upload size={15} /> Indienen
        </button>
      </div>
    </div>
  );
}
