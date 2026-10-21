import { FigureFrame, Mono } from "@/components/FigureFrame";

export function ShowcaseFigure({ className = "" }: { className?: string }) {
  const boards = [
    {
      x: 72,
      y: 56,
      label: "UPCOMING",
      title: "MERN lab",
      status: "Queued",
      accent: "var(--accent)",
      onAccent: "var(--on-accent)",
      bars: [0.72, 0.48, 0.58],
    },
    {
      x: 220,
      y: 88,
      label: "ONGOING",
      title: "AI / ML track",
      status: "In lab",
      accent: "var(--accent-secondary)",
      onAccent: "var(--on-accent-secondary)",
      bars: [0.9, 0.62, 0.4],
    },
    {
      x: 368,
      y: 120,
      label: "SHIPPED",
      title: "Power BI",
      status: "Reviewed",
      accent: "currentColor",
      onAccent: "var(--background)",
      bars: [0.55, 0.78, 0.34],
    },
  ];

  return (
    <FigureFrame caption="Campus projects" index="03" className={className}>
      {boards.map((board) => (
        <g key={board.label}>
          <rect
            x={board.x}
            y={board.y}
            width="188"
            height="236"
            fill="var(--background)"
            stroke={board.accent === "currentColor" ? "currentColor" : board.accent}
            strokeOpacity={board.accent === "currentColor" ? 0.28 : 0.75}
          />
          <rect
            x={board.x}
            y={board.y}
            width="188"
            height="30"
            fill={board.accent === "currentColor" ? "currentColor" : board.accent}
            fillOpacity={board.accent === "currentColor" ? 0.16 : 1}
          />
          <Mono
            x={board.x + 14}
            y={board.y + 15}
            size={10}
            fill={
              board.accent === "currentColor" ? "currentColor" : board.onAccent
            }
            opacity={board.accent === "currentColor" ? 0.7 : 1}
          >
            {board.label}
          </Mono>
          <Mono x={board.x + 14} y={board.y + 68} size={15} opacity={0.88}>
            {board.title}
          </Mono>
          <Mono x={board.x + 14} y={board.y + 98} size={11} opacity={0.42}>
            {board.status}
          </Mono>
          {board.bars.map((width, index) => (
            <rect
              key={index}
              x={board.x + 14}
              y={board.y + 128 + index * 28}
              width={148 * width}
              height="8"
              fill={board.accent === "currentColor" ? "currentColor" : board.accent}
              fillOpacity={board.accent === "currentColor" ? 0.18 : 0.55}
            />
          ))}
          <circle
            cx={board.x + 164}
            cy={board.y + 208}
            r="6"
            fill={board.accent === "currentColor" ? "currentColor" : board.accent}
            fillOpacity={board.accent === "currentColor" ? 0.35 : 0.9}
          />
        </g>
      ))}
    </FigureFrame>
  );
}

export function CareersFigure({ className = "" }: { className?: string }) {
  const steps = [
    { y: 86, label: "01  CAMPUS", detail: "Lab work ready" },
    { y: 178, label: "02  PARTNER", detail: "Role from industry" },
    { y: 270, label: "03  APPLY", detail: "One place to send" },
  ];

  return (
    <FigureFrame caption="Path to a role" index="04" className={className}>
      <line
        x1="148"
        y1="108"
        x2="148"
        y2="292"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeDasharray="4 5"
      />

      {steps.map((step, index) => (
        <g key={step.label}>
          <circle
            cx="148"
            cy={step.y + 22}
            r="10"
            fill={index === 2 ? "var(--accent)" : "var(--background)"}
            stroke={index === 2 ? "var(--accent)" : "currentColor"}
            strokeOpacity={index === 2 ? 1 : 0.35}
          />
          {index === 2 ? (
            <circle cx="148" cy={step.y + 22} r="3.5" fill="var(--on-accent)" />
          ) : (
            <circle
              cx="148"
              cy={step.y + 22}
              r="3.5"
              fill="currentColor"
              fillOpacity="0.45"
            />
          )}
          <rect
            x="188"
            y={step.y}
            width="320"
            height="64"
            fill="var(--background)"
            stroke={index === 2 ? "var(--accent)" : "currentColor"}
            strokeOpacity={index === 2 ? 0.8 : 0.24}
          />
          <Mono
            x="208"
            y={step.y + 22}
            size={11}
            fill={index === 2 ? "var(--accent)" : "currentColor"}
            opacity={index === 2 ? 1 : 0.55}
          >
            {step.label}
          </Mono>
          <Mono x="208" y={step.y + 44} size={14} opacity={0.85}>
            {step.detail}
          </Mono>
        </g>
      ))}

      <rect
        x="456"
        y="86"
        width="112"
        height="28"
        fill="var(--accent-secondary)"
      />
      <Mono x="512" y="100" size={10} fill="var(--on-accent-secondary)" anchor="middle">
        OPEN
      </Mono>
    </FigureFrame>
  );
}
