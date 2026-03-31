"use client";
import { useEffect, useState } from "react";

type Phase = "hidden" | "enter" | "expand" | "fade" | "done";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    // Tiny globe verschijnt meteen
    const t0 = setTimeout(() => setPhase("enter"),  60);
    // Na 1s: bol explodeert naar vol scherm
    const t1 = setTimeout(() => setPhase("expand"), 1000);
    // Na 2s: overlay vervaagt
    const t2 = setTimeout(() => setPhase("fade"),   2000);
    // Na 2.7s: component weg
    const t3 = setTimeout(() => setPhase("done"),   2700);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  const globeScale = phase === "hidden" ? 0 : phase === "enter" ? 0.13 : 1.45;
  const globeTransition =
    phase === "enter"  ? "transform 0.4s ease-out, opacity 0.3s ease-out" :
    phase === "expand" ? "transform 0.95s cubic-bezier(0.22, 1.45, 0.36, 1)" :
    "none";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "radial-gradient(ellipse 100% 100% at 50% 50%, #FDE8D8 0%, #FAF0E4 55%, #F0E0CC 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: phase === "fade" ? 0 : 1,
      transition: phase === "fade" ? "opacity 0.7s ease-out" : "none",
      pointerEvents: phase === "fade" ? "none" : "all",
    }}>
      <div style={{
        width: 500, height: 500,
        flexShrink: 0,
        transform: `scale(${globeScale})`,
        opacity: phase === "hidden" ? 0 : 1,
        transition: globeTransition,
      }}>
        <GlobeSVG />
      </div>
    </div>
  );
}

function GlobeSVG() {
  return (
    <svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
    >
      <defs>
        {/* Bol gradient — warm cream centrum, diep rood aan de randen */}
        <radialGradient id="sphereGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%"   stopColor="#FFF5E8" />
          <stop offset="22%"  stopColor="#F5A07A" />
          <stop offset="52%"  stopColor="#CC4428" />
          <stop offset="80%"  stopColor="#801018" />
          <stop offset="100%" stopColor="#4A080C" />
        </radialGradient>

        {/* Halo glow rondom de bol */}
        <radialGradient id="haloGrad" cx="50%" cy="50%" r="50%">
          <stop offset="58%"  stopColor="#FF9060" stopOpacity="0" />
          <stop offset="78%"  stopColor="#FF7040" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF5020" stopOpacity="0" />
        </radialGradient>

        {/* Glow filter voor netzlijnen en stippen */}
        <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Grotere glow voor de ringen */}
        <filter id="ringGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Clip tot de bol */}
        <clipPath id="globeClip">
          <circle cx="250" cy="250" r="168" />
        </clipPath>
      </defs>

      {/* Omgevingsglow achtergrond */}
      <circle cx="250" cy="250" r="240" fill="url(#haloGrad)" />

      {/* De bol zelf */}
      <circle cx="250" cy="250" r="168" fill="url(#sphereGrad)" />

      {/* Continenten — donker maroon, geclipped aan bol */}
      <g clipPath="url(#globeClip)" fill="#5A0A0E" opacity="0.88">
        {/* Noord-Amerika */}
        <path d="M124 118 C142 104, 172 100, 192 110 C212 122, 208 150, 196 170 C183 190, 162 196, 142 188 C120 178, 108 148, 124 118" />
        {/* Zuid-Amerika */}
        <path d="M146 205 C162 194, 184 200, 190 216 C198 238, 192 274, 178 298 C165 320, 145 325, 133 313 C120 294, 120 240, 146 205" />
        {/* Europa */}
        <path d="M240 106 C256 98, 276 100, 282 114 C289 130, 278 150, 263 156 C248 162, 234 155, 230 140 C226 124, 230 112, 240 106" />
        {/* Afrika */}
        <path d="M245 162 C266 154, 296 162, 306 184 C318 208, 312 248, 300 274 C286 298, 262 306, 245 298 C227 288, 220 256, 222 228 C222 200, 227 170, 245 162" />
        {/* Azië */}
        <path d="M290 100 C322 90, 370 96, 388 118 C405 142, 394 175, 372 190 C348 204, 312 200, 292 184 C270 166, 268 138, 290 100" />
        {/* Japan eilanden */}
        <path d="M368 142 C380 135, 396 140, 400 152 C404 165, 395 180, 382 184 C368 188, 356 180, 354 168 C352 156, 356 148, 368 142" />
        {/* Australië */}
        <path d="M324 240 C345 230, 370 236, 378 254 C387 274, 378 302, 362 312 C344 322, 318 316, 308 298 C296 278, 300 250, 324 240" />
      </g>

      {/* Breedtegraad/meridiaan raster — subtiel */}
      <g clipPath="url(#globeClip)" stroke="#E08050" strokeWidth="0.6" fill="none" opacity="0.22">
        <ellipse cx="250" cy="250" rx="168" ry="55" />
        <ellipse cx="250" cy="250" rx="148" ry="32" />
        <ellipse cx="250" cy="250" rx="168" ry="95" />
        <line x1="250" y1="82" x2="250" y2="418" />
        <line x1="128" y1="148" x2="372" y2="352" />
        <line x1="128" y1="352" x2="372" y2="148" />
      </g>

      {/* Netwerk verbindingslijnen — goud */}
      <g filter="url(#lineGlow)" stroke="#FFD060" strokeWidth="0.9" fill="none" opacity="0.55">
        <line x1="162" y1="148" x2="268" y2="114" />
        <line x1="268" y1="114" x2="346" y2="128" />
        <line x1="162" y1="148" x2="170" y2="224" />
        <line x1="170" y1="224" x2="268" y2="218" />
        <line x1="268" y1="218" x2="356" y2="204" />
        <line x1="356" y1="204" x2="364" y2="258" />
        <line x1="346" y1="128" x2="364" y2="178" />
        <line x1="170" y1="224" x2="162" y2="292" />
        <line x1="268" y1="218" x2="344" y2="280" />
      </g>

      {/* Glow stippen op knooppunten */}
      <g filter="url(#lineGlow)">
        <circle cx="162" cy="148" r="4"   fill="#FFE080" />
        <circle cx="268" cy="114" r="5"   fill="#FFD060" />
        <circle cx="346" cy="128" r="4"   fill="#FFE080" />
        <circle cx="170" cy="224" r="3.5" fill="#FFD060" />
        <circle cx="268" cy="218" r="4.5" fill="#FFE080" />
        <circle cx="356" cy="204" r="4"   fill="#FFD060" />
        <circle cx="364" cy="258" r="3.5" fill="#FFE080" />
        <circle cx="162" cy="292" r="3.5" fill="#FFD060" />
        <circle cx="344" cy="280" r="3"   fill="#FFE080" />
      </g>

      {/* Orbitale ringen — pulseren via CSS klasse */}
      <g filter="url(#ringGlow)">
        <ellipse
          className="orbit-ring-1"
          cx="250" cy="250" rx="200" ry="65"
          stroke="#FFB850" strokeWidth="1.8" fill="none"
          transform="rotate(-22, 250, 250)"
        />
        <ellipse
          className="orbit-ring-2"
          cx="250" cy="250" rx="208" ry="52"
          stroke="#FFD080" strokeWidth="1.2" fill="none"
          transform="rotate(18, 250, 250)"
        />
        <ellipse
          className="orbit-ring-3"
          cx="250" cy="250" rx="194" ry="76"
          stroke="#FFA840" strokeWidth="1.4" fill="none"
          transform="rotate(-55, 250, 250)"
        />
      </g>

      {/* Lichtbron highlight linksboven */}
      <circle cx="188" cy="172" r="78" fill="white" opacity="0.11" />

      {/* Sparkle deeltjes buiten de bol */}
      <g filter="url(#lineGlow)">
        <circle className="sparkle"   cx="70"  cy="152" r="2"   fill="#FFE080" />
        <circle className="sparkle-2" cx="86"  cy="278" r="1.5" fill="#FFD060" />
        <circle className="sparkle-3" cx="92"  cy="340" r="1.8" fill="#FFE080" />
        <circle className="sparkle"   cx="52"  cy="218" r="1.2" fill="#FFD060" />
        <circle className="sparkle-2" cx="428" cy="162" r="2"   fill="#FFE080" />
        <circle className="sparkle-3" cx="442" cy="252" r="1.5" fill="#FFD060" />
        <circle className="sparkle"   cx="422" cy="322" r="1.8" fill="#FFE080" />
        <circle className="sparkle-2" cx="462" cy="198" r="1.2" fill="#FFD060" />
        <circle className="sparkle-3" cx="225" cy="42"  r="1.5" fill="#FFE080" />
        <circle className="sparkle"   cx="298" cy="38"  r="1.8" fill="#FFD060" />
        <circle className="sparkle-2" cx="178" cy="440" r="1.5" fill="#FFE080" />
        <circle className="sparkle-3" cx="322" cy="450" r="1.2" fill="#FFD060" />
      </g>
    </svg>
  );
}
