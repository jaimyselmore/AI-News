import type { NewsItem } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

const tagColor: Record<string, string> = {
  BREAKING:    "#E53E2A",
  UPDATE:      "#D09828",
  TOOLS:       "#7C3AED",
  AI:          "#2563EB",
  VIDEO:       "#DB2777",
  AUDIO:       "#0D9488",
  REGELGEVING: "#C2820A",
};

// Neutrale warme placeholder-tinten per index — niet categorie-gebonden
const placeholderTints = [
  "linear-gradient(135deg, #EDE6E3 0%, #DDD2CC 100%)",
  "linear-gradient(135deg, #E8E3E0 0%, #D5CCC7 100%)",
  "linear-gradient(135deg, #EBE5E1 0%, #DACFC9 100%)",
  "linear-gradient(135deg, #E6E2DF 0%, #D3CBC5 100%)",
  "linear-gradient(135deg, #EDE8E4 0%, #DDD5CE 100%)",
  "linear-gradient(135deg, #E9E4E1 0%, #D8D0CA 100%)",
];

function TagPill({ tag }: { tag: string }) {
  const color = tagColor[tag] ?? "#C83820";
  return (
    <span style={{
      display: "inline-block",
      border: `1px solid ${color}45`,
      color: color,
      fontFamily: "var(--font-display)",
      fontSize: "9px", fontWeight: "700",
      letterSpacing: "0.07em", textTransform: "uppercase",
      padding: "3px 9px", borderRadius: "100px",
      background: color + "0D",
      whiteSpace: "nowrap",
    }}>
      {tag}
    </span>
  );
}

function Img({ item, height, idx }: { item: NewsItem; height: string; idx: number }) {
  const tint = placeholderTints[idx % placeholderTints.length];
  return (
    <div style={{
      width: "100%", height,
      borderRadius: "10px",
      overflow: "hidden",
      flexShrink: 0,
      background: tint,
    }}>
      {item.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      )}
    </div>
  );
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

// Kleine kaart: foto + tag + titel + datum
function SmallCard({ item, idx }: { item: NewsItem; idx: number }) {
  return (
    <a href={item.url ?? "#"} target={item.url ? "_blank" : undefined} rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: "12px" }}>
      <Img item={item} height="185px" idx={idx} />
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          <TagPill tag={item.tag} />
        </div>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "15px", fontWeight: "700",
          color: "#1A0805", lineHeight: "1.35",
          letterSpacing: "-0.02em",
        }}>
          {item.title}
        </h3>
        <span style={{ fontSize: "11px", color: "#9B7060" }}>{fmtDate(item.date)}</span>
      </div>
    </a>
  );
}

// Grote middenkaart: grote foto + tags + grote titel + datum
function LargeCard({ item, idx }: { item: NewsItem; idx: number }) {
  const color = tagColor[item.tag] ?? "#C83820";
  return (
    <a href={item.url ?? "#"} target={item.url ? "_blank" : undefined} rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: "16px" }}>
      <Img item={item} height="420px" idx={idx} />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
          <TagPill tag={item.tag} />
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(20px, 1.8vw, 28px)", fontWeight: "800",
            color: "#1A0805", lineHeight: "1.2",
            letterSpacing: "-0.03em",
          }}>
            {item.title}
          </h2>
          <div style={{
            flexShrink: 0, width: "32px", height: "32px",
            borderRadius: "50%",
            border: `1px solid ${color}35`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginTop: "2px",
          }}>
            <ArrowUpRight size={14} color={color} />
          </div>
        </div>
        <span style={{ fontSize: "12px", color: "#9B7060" }}>{fmtDate(item.date)}</span>
      </div>
    </a>
  );
}

// Mini rij: kleine thumbnail links, tag + titel + datum rechts
function MiniItem({ item, idx, last }: { item: NewsItem; idx: number; last: boolean }) {
  return (
    <a href={item.url ?? "#"} target={item.url ? "_blank" : undefined} rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{
        display: "flex", gap: "12px", alignItems: "flex-start",
        paddingBottom: last ? "0" : "16px",
        marginBottom: last ? "0" : "16px",
        borderBottom: last ? "none" : "1px solid #EAD0B8",
      }}>
        <div style={{
          width: "70px", height: "70px", flexShrink: 0,
          borderRadius: "8px", overflow: "hidden",
          background: placeholderTints[idx % placeholderTints.length],
        }}>
          {item.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: 1 }}>
          <TagPill tag={item.tag} />
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: "13px", fontWeight: "600",
            color: "#1A0805", lineHeight: "1.35",
            letterSpacing: "-0.01em",
          }}>
            {item.title}
          </p>
          <span style={{ fontSize: "11px", color: "#9B7060" }}>{fmtDate(item.date)}</span>
        </div>
      </div>
    </a>
  );
}

export default function NewsGrid({ items }: { items: NewsItem[] }) {
  const all = items.filter(n => !n.featured);

  // Per blok: 2 kleine (links) + 1 groot (midden) + 4 mini (rechts) = 7 items
  const blockSize = 7;
  const blocks: NewsItem[][] = [];
  for (let i = 0; i < all.length; i += blockSize) {
    blocks.push(all.slice(i, i + blockSize));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "72px" }}>
      {blocks.map((block, bi) => {
        const [s1, s2, large, m1, m2, m3, m4] = block;
        const base = bi * blockSize;

        return (
          <div key={bi} style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr 1fr",
            gap: "40px",
            alignItems: "start",
          }}>
            {/* Links: 2 kleine kaarten */}
            <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              {s1 && <SmallCard item={s1} idx={base} />}
              {s2 && <SmallCard item={s2} idx={base + 1} />}
            </div>

            {/* Midden: grote kaart */}
            <div>
              {large && <LargeCard item={large} idx={base + 2} />}
            </div>

            {/* Rechts: mini lijst */}
            <div>
              {[m1, m2, m3, m4].filter(Boolean).map((item, i, arr) => (
                <MiniItem key={item!.id} item={item!} idx={base + 3 + i} last={i === arr.length - 1} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
