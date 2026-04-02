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

const tagGradient: Record<string, string> = {
  BREAKING:    "linear-gradient(135deg, #FDE8E6 0%, #FBBCB5 100%)",
  UPDATE:      "linear-gradient(135deg, #FEF3CD 0%, #F9D97A 100%)",
  TOOLS:       "linear-gradient(135deg, #EDE9FE 0%, #C4B5FD 100%)",
  AI:          "linear-gradient(135deg, #DBEAFE 0%, #93C5FD 100%)",
  VIDEO:       "linear-gradient(135deg, #FCE7F3 0%, #F9A8D4 100%)",
  AUDIO:       "linear-gradient(135deg, #CCFBF1 0%, #5EEAD4 100%)",
  REGELGEVING: "linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%)",
};

function TagPill({ tag }: { tag: string }) {
  const color = tagColor[tag] ?? "#C83820";
  return (
    <span style={{
      display: "inline-block",
      border: `1px solid ${color}50`,
      color: color,
      fontFamily: "var(--font-display)",
      fontSize: "10px", fontWeight: "700",
      letterSpacing: "0.06em", textTransform: "uppercase",
      padding: "3px 10px", borderRadius: "100px",
      background: color + "10",
    }}>
      {tag}
    </span>
  );
}

function ArticleImage({ item, height }: { item: NewsItem; height: string }) {
  const color = tagColor[item.tag] ?? "#C83820";
  const gradient = tagGradient[item.tag] ?? `linear-gradient(135deg, #F5EDEB 0%, ${color}30 100%)`;

  if (item.image) {
    return (
      <div style={{
        width: "100%", height,
        borderRadius: "12px",
        overflow: "hidden",
        flexShrink: 0,
        background: gradient,
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
        />
      </div>
    );
  }

  return (
    <div style={{
      width: "100%", height,
      borderRadius: "12px",
      background: gradient,
      flexShrink: 0,
      display: "flex",
      alignItems: "flex-end",
      padding: "16px",
    }}>
      <span style={{
        fontFamily: "var(--font-display)",
        fontSize: "11px", fontWeight: "800",
        letterSpacing: "0.08em", textTransform: "uppercase",
        color: color,
        opacity: 0.5,
      }}>
        {item.source}
      </span>
    </div>
  );
}

function SmallCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url ?? "#"}
      target={item.url ? "_blank" : undefined}
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: "14px" }}
    >
      <ArticleImage item={item} height="200px" />
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <TagPill tag={item.tag} />
        </div>
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontSize: "17px", fontWeight: "700",
          color: "#1A0805",
          lineHeight: "1.3",
          letterSpacing: "-0.02em",
        }}>
          {item.title}
        </h3>
        <span style={{ fontSize: "12px", color: "#9B7060" }}>
          {new Date(item.date).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>
    </a>
  );
}

function LargeCard({ item }: { item: NewsItem }) {
  const color = tagColor[item.tag] ?? "#C83820";
  return (
    <a
      href={item.url ?? "#"}
      target={item.url ? "_blank" : undefined}
      rel="noopener noreferrer"
      style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", gap: "18px" }}
    >
      <ArticleImage item={item} height="clamp(320px, 42vw, 520px)" />
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          <TagPill tag={item.tag} />
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(22px, 2.2vw, 32px)", fontWeight: "800",
            color: "#1A0805",
            lineHeight: "1.15",
            letterSpacing: "-0.03em",
          }}>
            {item.title}
          </h2>
          <div style={{
            flexShrink: 0,
            width: "36px", height: "36px",
            borderRadius: "50%",
            border: `1px solid ${color}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ArrowUpRight size={16} color={color} />
          </div>
        </div>
        <span style={{ fontSize: "13px", color: "#9B7060" }}>
          {new Date(item.date).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" })}
        </span>
      </div>
    </a>
  );
}

export default function NewsGrid({ items }: { items: NewsItem[] }) {
  // Eerste item is featured, rest in groepen van 3: [large, small, small] afwisselend
  const all = items.filter(n => !n.featured);

  // Groepeer per 3
  const groups: NewsItem[][] = [];
  for (let i = 0; i < all.length; i += 3) {
    groups.push(all.slice(i, i + 3));
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
      {groups.map((group, gi) => {
        const isEven = gi % 2 === 0;
        const [a, b, c] = group;

        return (
          <div
            key={gi}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "auto",
              gap: "40px",
              alignItems: "start",
            }}
          >
            {isEven ? (
              // Links: 2 kleine; rechts: 1 groot
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
                  {a && <SmallCard item={a} />}
                  {b && <SmallCard item={b} />}
                </div>
                <div style={{ height: "100%" }}>
                  {c && <LargeCard item={c} />}
                </div>
              </>
            ) : (
              // Links: 1 groot; rechts: 2 kleine
              <>
                <div style={{ height: "100%" }}>
                  {a && <LargeCard item={a} />}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
                  {b && <SmallCard item={b} />}
                  {c && <SmallCard item={c} />}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
