"use client";
import { useEffect, useState } from "react";

type Phase = "hidden" | "enter" | "expand" | "done";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    const t0 = setTimeout(() => setPhase("enter"),   80);
    const t1 = setTimeout(() => setPhase("expand"), 1400);
    // Stay fully visible until the page has faded in on top
    const t2 = setTimeout(() => setPhase("done"),   3400);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  const scale =
    phase === "hidden" ? 0 :
    phase === "enter"  ? 0.115 :
    2.2;

  const transition =
    phase === "enter"
      ? "transform 0.48s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease"
      : phase === "expand"
      ? "transform 0.96s cubic-bezier(0.16,1,0.3,1)"
      : "none";

  const showExtras = phase === "enter";

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "#F5EDEB",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      opacity: 1,
      pointerEvents: "all",
    }}>

      {/* ── Wereldbol cirkel ── */}
      <div style={{
        width: "2800px",
        height: "2800px",
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
        transform: `scale(${scale})`,
        opacity: phase === "hidden" ? 0 : 1,
        transition,
        transformOrigin: "center center",
      }}>
        <video
          autoPlay muted loop playsInline
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        >
          <source src="/globe-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Spinner ringen ── */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "340px", height: "340px",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        opacity: showExtras ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}>
        <div className="loader-spin-outer" style={{
          position: "absolute", inset: "-16px",
          borderRadius: "50%",
          border: "2.5px solid rgba(200,56,32,0.09)",
          borderTop: "2.5px solid #C83820",
          borderRight: "2.5px solid #E07045",
        }} />
        <div className="loader-spin-inner" style={{
          position: "absolute", inset: "-8px",
          borderRadius: "50%",
          border: "1.5px solid rgba(224,112,69,0.07)",
          borderBottom: "1.5px solid #E07045",
        }} />
      </div>

      {/* ── Brand text ── */}
      <div style={{
        position: "absolute",
        top: "calc(50% + 208px)", left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center", whiteSpace: "nowrap",
        pointerEvents: "none",
        opacity: showExtras ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}>
        <div style={{
          fontFamily: "var(--font-brand)",
          fontSize: "20px", fontWeight: "800",
          color: "#1A0805", letterSpacing: "-0.04em", lineHeight: 1,
        }}>
          MORE<span style={{ color: "#C83820" }}>.</span>AI
        </div>
        <div style={{
          fontSize: "10px", color: "#9B7060",
          letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "7px",
        }}>
          by Selmore
        </div>
      </div>
    </div>
  );
}
