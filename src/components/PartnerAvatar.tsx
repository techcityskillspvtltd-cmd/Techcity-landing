const PATTERNS = [
  [0b010, 0b111, 0b111, 0b111, 0b010],
  [0b111, 0b101, 0b111, 0b101, 0b111],
  [0b101, 0b111, 0b010, 0b111, 0b101],
  [0b111, 0b010, 0b111, 0b010, 0b111],
  [0b110, 0b111, 0b010, 0b111, 0b110],
  [0b010, 0b111, 0b101, 0b111, 0b010],
  [0b111, 0b111, 0b010, 0b111, 0b111],
  [0b100, 0b110, 0b111, 0b110, 0b100],
  [0b101, 0b101, 0b111, 0b101, 0b101],
  [0b111, 0b001, 0b111, 0b100, 0b111],
  [0b011, 0b111, 0b110, 0b111, 0b011],
  [0b111, 0b110, 0b010, 0b110, 0b111],
];

function hashName(name: string) {
  let hash = 2166136261;
  for (let index = 0; index < name.length; index++) {
    hash = Math.imul(hash ^ name.charCodeAt(index), 16777619);
  }
  return hash >>> 0;
}

export default function PartnerAvatar({
  name,
  logo,
  logoSurface = "light",
}: {
  name: string;
  logo?: string;
  logoSurface?: "light" | "dark";
}) {
  if (logo) {
    return (
      <span
        className={`grid h-14 w-[4.5rem] shrink-0 place-items-center overflow-hidden border border-foreground/10 px-1.5 py-1.5 min-[420px]:h-16 min-[420px]:w-28 min-[420px]:px-2 min-[420px]:py-2 ${
          logoSurface === "dark" ? "bg-neutral-950" : "bg-white"
        }`}
      >
        <img
          src={logo}
          alt=""
          className="h-full w-full min-h-0 min-w-0 object-contain"
        />
      </span>
    );
  }

  const hash = hashName(name);
  const secondary = (hash & 1) === 1;
  const rows = PATTERNS[(hash >>> 4) % PATTERNS.length];
  const fill = secondary ? "var(--accent-secondary)" : "var(--accent)";
  const squares = [];

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 3; col++) {
      if (((rows[row] >> col) & 1) === 0) continue;
      const quiet = ((hash >>> (8 + row * 3 + col)) & 1) === 1;
      for (const x of col === 2 ? [2] : [col, 4 - col]) {
        squares.push(
          <rect
            key={`${row}-${x}`}
            x={x + 0.12}
            y={row + 0.12}
            width={0.76}
            height={0.76}
            fill={fill}
            fillOpacity={quiet ? 0.38 : 1}
          />,
        );
      }
    }
  }

  return (
    <span className="grid h-14 w-[4.5rem] shrink-0 place-items-center min-[420px]:h-16 min-[420px]:w-28" aria-hidden="true">
      <span
        className={`grid size-16 overflow-hidden border ${
          secondary
            ? "border-accent-secondary/25 bg-accent-secondary/10"
            : "border-accent/25 bg-accent/10"
        }`}
      >
        <svg viewBox="0 0 5 5" className="size-full">
          {squares}
        </svg>
      </span>
    </span>
  );
}
