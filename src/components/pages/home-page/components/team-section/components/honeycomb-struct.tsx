import React from "react";

export type TeamMember = {
  id: string | number;
  name?: string;
  imageUrl?: string | null; // if null -> render special label hex
  label?: string; // for special hex text like "Mandat 2024/2025"
};

type Props = {
  members: TeamMember[];
  /** number of hex in the "full" row (like the example: 4) */
  columns?: number;
  /** side length (s) of hexagon in px; full width = 2*s */
  side?: number;
};

// Flat-top hex geometry helpers
const hexWidth = (s: number) => 2 * s;
const hexHeight = (s: number) => Math.sqrt(3) * s;

// Build rows with alternating lengths: columns, columns-1, columns, columns-1, ...
function buildRows<T>(items: T[], columns: number) {
  const rows: T[][] = [];
  let i = 0;
  let remaining = items.slice();
  let rowIndex = 0;
  while (remaining.length > 0) {
    const full = rowIndex % 2 === 0; // even rows are "full"
    const len = full ? columns : Math.max(1, columns - 1);
    const take = Math.min(len, remaining.length);
    rows.push(remaining.slice(0, take));
    remaining = remaining.slice(take);
    rowIndex++;
  }
  return rows;
}

export default function TeamHoneycomb({
  members,
  columns = 4,
  side = 60,
}: Props) {
  const w = hexWidth(side);
  const h = hexHeight(side);
  const gap = Math.round(side * 0.06); // small gap so seam appears

  const rows = buildRows(members, columns);

  return (
    <div className="w-full flex flex-col items-center">
      {/* container keeps honeycomb centered */}
      <div
        className="inline-block"
        style={{
          // allow the honeycomb to size depending on columns
          padding: 12,
        }}
      >
        <div className="flex flex-col items-center">
          {rows.map((row, rowIdx) => {
            const isOffset = rowIdx % 2 === 1; // offset alternate rows
            return (
              <div
                key={rowIdx}
                className="flex justify-center"
                style={{
                  gap: `${gap}px`,
                  marginLeft: isOffset ? `${w / 2}px` : undefined,
                }}
              >
                {row.map((member) => (
                  <HexCell
                    key={(member as any).id}
                    side={side}
                    name={(member as any).name}
                    imageUrl={(member as any).imageUrl}
                    label={(member as any).label}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function HexCell({
  side,
  imageUrl,
  name,
  label,
}: {
  side: number;
  imageUrl?: string | null;
  name?: string;
  label?: string;
}) {
  const w = hexWidth(side);
  const h = hexHeight(side);
  const seam = Math.max(6, Math.round(side * 0.06)); // white seam between hexes

  // hex clip path (flat-top hex) - percentage polygon
  const clip = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

  return (
    <div
      style={{
        width: w,
        height: h,
        padding: seam,
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "content-box",
      }}
    >
      {/* inner face: white frame + content clipped to hex */}
      <div
        style={{
          width: `calc(100% - ${seam * 2}px)`,
          height: `calc(100% - ${seam * 2}px)`,
          clipPath: clip,
          WebkitClipPath: clip,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 0 0 rgba(0,0,0,0)",
        }}
      >
        {imageUrl ? (
          <div
            title={name}
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: 8,
              boxSizing: "border-box",
              color: "white",
              fontWeight: 700,
              fontSize: Math.max(12, Math.round(side * 0.22)),
              background: "linear-gradient(180deg,#2ec0d8,#0e6a93)",
            }}
          >
            {label || name || ""}
          </div>
        )}
      </div>
    </div>
  );
}
