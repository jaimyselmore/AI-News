"use client";
import { useEffect, useState } from "react";

type Phase = "hidden" | "enter" | "expand" | "fade" | "done";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    const t0 = setTimeout(() => setPhase("enter"),   80);
    const t1 = setTimeout(() => setPhase("expand"), 1400);
    const t2 = setTimeout(() => setPhase("fade"),   2300);
    const t3 = setTimeout(() => setPhase("done"),   2850);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  // Clip-path sizes per phase
  const clipSize =
    phase === "hidden" ? "0px" :
    phase === "enter"  ? "185px" :
    "120vmax";

  const clipTransition =
    phase === "enter"  ? "clip-path 0.5s cubic-bezier(0.34,1.56,0.64,1)" :
    phase === "expand" ? "clip-path 0.92s cubic-bezier(0.16,1,0.3,1)" :
    "none";

  const showSpinner = phase === "enter";

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      /* Warm peach — matches the glow tones of the globe video */
      background: "#F0D4BE",
      overflow: "hidden",
      opacity: phase === "fade" ? 0 : 1,
      transition: phase === "fade" ? "opacity 0.52s cubic-bezier(0.4,0,0.2,1)" : "none",
      pointerEvents: phase === "fade" ? "none" : "all",
    }}>

      {/* ── Globe video expanding from circle ── */}
      <div style={{
        position: "absolute",
        inset: 0,
        clipPath: `circle(${clipSize} at 50% 50%)`,
        transition: clipTransition,
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/globe-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Spinner rings — only during "enter" ── */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "370px", height: "370px",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        opacity: showSpinner ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}>
        <div
          className="loader-spin-outer"
          style={{
            position: "absolute",
            inset: "-18px",
            borderRadius: "50%",
            border: "3px solid rgba(200,56,32,0.09)",
            borderTop: "3px solid #C83820",
            borderRight: "3px solid #E07045",
          }}
        />
        <div
          className="loader-spin-inner"
          style={{
            position: "absolute",
            inset: "-9px",
            borderRadius: "50%",
            border: "1.5px solid rgba(224,112,69,0.07)",
            borderBottom: "1.5px solid #E07045",
          }}
        />
      </div>

      {/* ── Brand text below globe ── */}
      <div style={{
        position: "absolute",
        top: "calc(50% + 215px)",
        left: "50%",
        transform: "translateX(-50%)",
        textAlign: "center",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        opacity: showSpinner ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontSize: "20px",
          fontWeight: "800",
          color: "#1A0805",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}>
          MORE<span style={{ color: "#C83820" }}>.</span>AI
        </div>
        <div style={{
          fontSize: "10px",
          color: "#9B7060",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginTop: "7px",
        }}>
          by Selmore
        </div>
      </div>

    </div>
  );
}
