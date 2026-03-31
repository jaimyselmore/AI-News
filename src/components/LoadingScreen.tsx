"use client";
import { useEffect, useState } from "react";

type Phase = "hidden" | "enter" | "expand" | "fade" | "done";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    const t0 = setTimeout(() => setPhase("enter"),  80);
    const t1 = setTimeout(() => setPhase("expand"), 1200);
    const t2 = setTimeout(() => setPhase("fade"),   2300);
    const t3 = setTimeout(() => setPhase("done"),   3100);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  const scale =
    phase === "hidden" ? 0 :
    phase === "enter"  ? 0.14 :
    2.2;

  const isExpanding = phase === "expand" || phase === "fade";

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "#0A0503",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "0px",
      opacity: phase === "fade" ? 0 : 1,
      transition: phase === "fade" ? "opacity 0.75s cubic-bezier(0.4,0,0.2,1)" : "none",
      pointerEvents: phase === "fade" ? "none" : "all",
    }}>

      {/* Globe container */}
      <div style={{
        position: "relative",
        width: 520,
        height: 520,
        flexShrink: 0,
        transform: `scale(${scale})`,
        opacity: phase === "hidden" ? 0 : 1,
        transition:
          phase === "expand"
            ? "transform 1.1s cubic-bezier(0.16, 1.4, 0.3, 1), opacity 0.3s ease"
            : phase === "enter"
            ? "transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease"
            : "opacity 0.25s ease",
      }}>

        {/* Outer spinner ring */}
        <div
          className="loader-spin-outer"
          style={{
            position: "absolute",
            inset: -18,
            borderRadius: "50%",
            border: "3px solid rgba(200,56,32,0.08)",
            borderTop: "3px solid #C83820",
            borderRight: "3px solid #E07045",
            opacity: isExpanding ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Inner spinner ring */}
        <div
          className="loader-spin-inner"
          style={{
            position: "absolute",
            inset: -9,
            borderRadius: "50%",
            border: "1.5px solid rgba(224,112,69,0.07)",
            borderBottom: "1.5px solid #E07045",
            borderLeft: "1.5px solid rgba(200,56,32,0.5)",
            opacity: isExpanding ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Globe image */}
        <div style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: isExpanding
            ? "none"
            : "0 0 60px rgba(200,56,32,0.28), 0 0 120px rgba(224,112,69,0.12), inset 0 0 30px rgba(0,0,0,0.2)",
          transition: "box-shadow 0.4s ease",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/globe.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        </div>
      </div>

      {/* Brand text — fades out when expanding */}
      <div style={{
        position: "absolute",
        bottom: "15%",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        opacity: isExpanding ? 0 : phase === "enter" ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "22px",
          fontWeight: "800",
          color: "rgba(255,255,255,0.9)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}>
          MORE<span style={{ color: "#C83820" }}>.</span>AI
        </div>
        <div style={{
          fontSize: "10px",
          color: "rgba(255,255,255,0.3)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginTop: "8px",
        }}>
          by Selmore
        </div>
      </div>

    </div>
  );
}
