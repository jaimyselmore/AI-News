"use client";
import { useEffect, useState } from "react";

type Phase = "hidden" | "enter" | "expand" | "fade" | "done";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    // Kleine bol verschijnt
    const t0 = setTimeout(() => setPhase("enter"),  60);
    // Bol explodeert naar vol scherm
    const t1 = setTimeout(() => setPhase("expand"), 1100);
    // Overlay vervaagt
    const t2 = setTimeout(() => setPhase("fade"),   2100);
    // Component verwijderd
    const t3 = setTimeout(() => setPhase("done"),   2800);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  const scale =
    phase === "hidden" ? 0 :
    phase === "enter"  ? 0.17 :
    1.65;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "radial-gradient(ellipse 120% 120% at 50% 50%, #FDE8D8 0%, #FAF0E4 52%, #EFE0CC 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: phase === "fade" ? 0 : 1,
      transition: phase === "fade" ? "opacity 0.7s ease-out" : "none",
      pointerEvents: phase === "fade" ? "none" : "all",
    }}>

      <div style={{
        position: "relative",
        width: 580,
        height: 580,
        flexShrink: 0,
        transform: `scale(${scale})`,
        opacity: phase === "hidden" ? 0 : 1,
        transition:
          phase === "expand"
            ? "transform 1s cubic-bezier(0.22, 1.45, 0.36, 1)"
            : "transform 0.4s ease-out, opacity 0.35s ease-out",
      }}>

        {/* Buitenste spinner — rood/oranje, met de klok mee */}
        <div
          className="loader-spin-outer"
          style={{
            position: "absolute",
            inset: -16,
            borderRadius: "50%",
            border: "3.5px solid rgba(232, 57, 42, 0.12)",
            borderTop: "3.5px solid #E8392A",
            borderRight: "3.5px solid #F97316",
          }}
        />

        {/* Binnenste spinner — oranje, tegen de klok in */}
        <div
          className="loader-spin-inner"
          style={{
            position: "absolute",
            inset: -7,
            borderRadius: "50%",
            border: "2px solid rgba(249, 115, 22, 0.10)",
            borderBottom: "2px solid #F97316",
            borderLeft: "2px solid rgba(232, 57, 42, 0.6)",
          }}
        />

        {/* Globe afbeelding — cirkelvormig geclipt */}
        <div style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 0 50px rgba(232, 57, 42, 0.22), 0 0 100px rgba(249, 115, 22, 0.12)",
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
    </div>
  );
}
