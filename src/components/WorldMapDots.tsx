// Rough, low-res continent silhouette (48 cols x 22 rows) used purely as decorative
// texture — not a geographically precise map. Ranges are inclusive [start, end] columns.
const LAND_ROWS: Record<number, [number, number][]> = {
  1: [[16, 20]],
  2: [[2, 16], [24, 27], [28, 46]],
  3: [[2, 18], [20, 30], [30, 46]],
  4: [[2, 19], [19, 31], [31, 45]],
  5: [[3, 19], [19, 32], [32, 46]],
  6: [[3, 19], [19, 30], [32, 46]],
  7: [[4, 18], [18, 30], [30, 46]],
  8: [[8, 16], [17, 31], [33, 46]],
  9: [[10, 16], [17, 32], [34, 46]],
  10: [[12, 18], [17, 31], [36, 45]],
  11: [[12, 20], [18, 32], [37, 46]],
  12: [[13, 21], [19, 33], [39, 45]],
  13: [[14, 21], [20, 33], [38, 46]],
  14: [[14, 19], [21, 30], [37, 46]],
  15: [[14, 18], [22, 25], [37, 44]],
  16: [[14, 17], [40, 44]],
  17: [[14, 16]],
};

const COLS = 48;
const ROWS = 22;

/** Dotted world-map silhouette used as decorative backdrop texture. */
export function WorldMapDots({ className }: { className?: string }) {
  const dots: { x: number; y: number }[] = [];
  for (let row = 0; row < ROWS; row++) {
    const ranges = LAND_ROWS[row];
    if (!ranges) continue;
    for (const [start, end] of ranges) {
      for (let col = start; col <= end; col += 2) {
        dots.push({ x: col, y: row });
      }
    }
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${COLS} ${ROWS}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="0.55" fill="currentColor" />
      ))}
    </svg>
  );
}
