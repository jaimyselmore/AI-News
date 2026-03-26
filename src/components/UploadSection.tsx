"use client";

import { useState } from "react";
import { Upload, FileText, Wrench, Lightbulb, CheckCircle2 } from "lucide-react";

type UploadType = "nieuws" | "tool" | "tip";

export default function UploadSection() {
  const [type, setType] = useState<UploadType>("nieuws");
  const [submitted, setSubmitted] = useState(false);

  const types = [
    { id: "nieuws" as UploadType, label: "Nieuws", icon: FileText, color: "#E8392A" },
    { id: "tool" as UploadType, label: "Tool", icon: Wrench, color: "#F97316" },
    { id: "tip" as UploadType, label: "Tip of Trick", icon: Lightbulb, color: "#8B5CF6" },
  ];

  if (submitted) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "80px 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            background: "#22C55E20",
            border: "1px solid #22C55E40",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CheckCircle2 size={28} color="#22C55E" />
        </div>
        <h2 style={{ fontSize: "20px", fontWeight: "800", color: "white" }}>
          Ingediend!
        </h2>
        <p style={{ fontSize: "14px", color: "#777", maxWidth: "360px" }}>
          Je bijdrage is ontvangen en wordt beoordeeld voordat het op de site verschijnt.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          style={{
            background: "#E8392A",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Nog iets toevoegen
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "640px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "800",
            color: "white",
            letterSpacing: "-0.02em",
            marginBottom: "8px",
          }}
        >
          Upload eigen content
        </h2>
        <p style={{ fontSize: "14px", color: "#666", lineHeight: "1.6" }}>
          Heb je interessant AI nieuws, een handige tool ontdekt of een goede tip? Voeg het toe.
        </p>
      </div>

      {/* Type selector */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          background: "#1A1A1A",
          border: "1px solid #2E2E2E",
          borderRadius: "10px",
          padding: "6px",
        }}
      >
        {types.map((t) => {
          const Icon = t.icon;
          const isActive = type === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "10px",
                borderRadius: "7px",
                border: "none",
                background: isActive ? t.color + "20" : "transparent",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
            >
              <Icon size={14} color={isActive ? t.color : "#555"} />
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: isActive ? t.color : "#555",
                }}
              >
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Form */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <label
            style={{
              fontSize: "11px",
              fontWeight: "700",
              color: "#666",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "6px",
            }}
          >
            {type === "tool" ? "Naam van de tool" : "Titel"}
          </label>
          <input
            type="text"
            placeholder={
              type === "nieuws"
                ? "Bijv: OpenAI lanceert nieuw model..."
                : type === "tool"
                ? "Bijv: Midjourney, RunwayML..."
                : "Bijv: Gebruik chain-of-thought prompting voor..."
            }
            style={{
              width: "100%",
              background: "#1A1A1A",
              border: "1px solid #2E2E2E",
              borderRadius: "8px",
              padding: "12px 14px",
              fontSize: "14px",
              color: "white",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#E8392A")}
            onBlur={(e) => (e.target.style.borderColor = "#2E2E2E")}
          />
        </div>

        <div>
          <label
            style={{
              fontSize: "11px",
              fontWeight: "700",
              color: "#666",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "6px",
            }}
          >
            {type === "tool" ? "Beschrijving & use case" : "Inhoud / samenvatting"}
          </label>
          <textarea
            rows={5}
            placeholder={
              type === "nieuws"
                ? "Korte samenvatting van het nieuws..."
                : type === "tool"
                ? "Wat doet het, wat kost het, waarom is het handig voor ons?"
                : "Beschrijf de tip stap voor stap..."
            }
            style={{
              width: "100%",
              background: "#1A1A1A",
              border: "1px solid #2E2E2E",
              borderRadius: "8px",
              padding: "12px 14px",
              fontSize: "14px",
              color: "white",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              lineHeight: "1.6",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#E8392A")}
            onBlur={(e) => (e.target.style.borderColor = "#2E2E2E")}
          />
        </div>

        {type === "nieuws" && (
          <div>
            <label
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#666",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Bron / URL
            </label>
            <input
              type="url"
              placeholder="https://..."
              style={{
                width: "100%",
                background: "#1A1A1A",
                border: "1px solid #2E2E2E",
                borderRadius: "8px",
                padding: "12px 14px",
                fontSize: "14px",
                color: "white",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#E8392A")}
              onBlur={(e) => (e.target.style.borderColor = "#2E2E2E")}
            />
          </div>
        )}

        {type === "tip" && (
          <div>
            <label
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#666",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Niveau
            </label>
            <select
              style={{
                width: "100%",
                background: "#1A1A1A",
                border: "1px solid #2E2E2E",
                borderRadius: "8px",
                padding: "12px 14px",
                fontSize: "14px",
                color: "white",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="beginner">Beginner</option>
              <option value="gevorderd">Gevorderd</option>
              <option value="pro">Pro</option>
            </select>
          </div>
        )}

        <div>
          <label
            style={{
              fontSize: "11px",
              fontWeight: "700",
              color: "#666",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Jouw naam (optioneel)
          </label>
          <input
            type="text"
            placeholder="Bijv: Jaimy"
            style={{
              width: "100%",
              background: "#1A1A1A",
              border: "1px solid #2E2E2E",
              borderRadius: "8px",
              padding: "12px 14px",
              fontSize: "14px",
              color: "white",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#E8392A")}
            onBlur={(e) => (e.target.style.borderColor = "#2E2E2E")}
          />
        </div>

        <button
          onClick={() => setSubmitted(true)}
          style={{
            background: "linear-gradient(135deg, #E8392A, #F97316)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "14px 24px",
            fontSize: "14px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "8px",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <Upload size={15} />
          Indienen
        </button>
      </div>
    </div>
  );
}
