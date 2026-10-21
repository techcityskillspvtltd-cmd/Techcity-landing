import { FigureFrame, Mono } from "@/components/FigureFrame";

export function GapFigure({ className = "" }: { className?: string }) {
  const campus = ["Lecture", "Exam", "Marks"];
  const team = ["Design", "Review", "Ship"];

  return (
    <FigureFrame caption="Campus and the team" index="01" className={`max-w-md ${className}`}>
      <rect
        x="96"
        y="72"
        width="196"
        height="256"
        fill="var(--background)"
        stroke="currentColor"
        strokeOpacity="0.28"
      />
      <rect x="96" y="72" width="196" height="32" fill="var(--accent)" />
      <Mono x="112" y="88" size={11} fill="var(--on-accent)">
        CAMPUS
      </Mono>
      {campus.map((label, index) => (
        <Mono key={label} x="112" y={140 + index * 52} size={13} opacity={0.75}>
          {label}
        </Mono>
      ))}

      <rect
        x="348"
        y="72"
        width="196"
        height="256"
        fill="var(--background)"
        stroke="var(--accent-secondary)"
        strokeOpacity="0.7"
      />
      <rect x="348" y="72" width="196" height="32" fill="var(--accent-secondary)" />
      <Mono x="364" y="88" size={11} fill="var(--on-accent-secondary)">
        TEAM
      </Mono>
      {team.map((label, index) => (
        <Mono
          key={label}
          x="364"
          y={140 + index * 52}
          size={13}
          fill="var(--accent-secondary)"
        >
          {label}
        </Mono>
      ))}

      <line
        x1="292"
        y1="200"
        x2="348"
        y2="200"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeDasharray="3 4"
      />
      <Mono x="320" y="180" size={10} anchor="middle" opacity={0.45}>
        GAP
      </Mono>
    </FigureFrame>
  );
}

export function KeptLabFigure({ className = "" }: { className?: string }) {
  return (
    <FigureFrame caption="Work a team can open" index="01" className={`max-w-md ${className}`}>
      <rect
        x="72"
        y="64"
        width="220"
        height="272"
        fill="var(--background)"
        stroke="currentColor"
        strokeOpacity="0.28"
      />
      <Mono x="92" y="100" size={11} opacity={0.4}>
        EXAM
      </Mono>
      <Mono x="92" y="132" size={16} opacity={0.6}>
        Filed
      </Mono>
      {[0, 1, 2].map((row) => (
        <rect
          key={row}
          x="92"
          y={172 + row * 36}
          width={148 - row * 28}
          height="8"
          fill="currentColor"
          fillOpacity="0.14"
        />
      ))}

      <rect
        x="348"
        y="64"
        width="220"
        height="272"
        fill="var(--background)"
        stroke="var(--accent-secondary)"
        strokeOpacity="0.7"
      />
      <Mono x="368" y="100" size={11} fill="var(--accent-secondary)">
        PROJECT
      </Mono>
      <Mono x="368" y="132" size={16}>
        Kept
      </Mono>
      <rect x="368" y="176" width="140" height="28" fill="var(--accent-secondary)" />
      <Mono x="382" y="190" size={11} fill="var(--on-accent-secondary)">
        IN REVIEW
      </Mono>
      <Mono x="368" y="240" size={11} opacity={0.45}>
        Running
      </Mono>
    </FigureFrame>
  );
}

export function LateStackFigure({ className = "" }: { className?: string }) {
  return (
    <FigureFrame caption="What arrives late" index="02" className={`max-w-md ${className}`}>
      <rect
        x="72"
        y="56"
        width="220"
        height="288"
        fill="var(--background)"
        stroke="currentColor"
        strokeOpacity="0.28"
      />
      <Mono x="92" y="92" size={11} opacity={0.4}>
        SYLLABUS
      </Mono>
      <Mono x="92" y="124" size={16} opacity={0.7}>
        Last year
      </Mono>
      {["Ch 01", "Ch 02", "Ch 03"].map((chapter, index) => (
        <Mono key={chapter} x="92" y={176 + index * 40} size={12} opacity={0.4}>
          {chapter}
        </Mono>
      ))}

      <rect
        x="348"
        y="56"
        width="220"
        height="288"
        fill="var(--background)"
        stroke="var(--accent-secondary)"
        strokeOpacity="0.7"
      />
      <Mono x="368" y="92" size={11} fill="var(--accent-secondary)">
        HIRING
      </Mono>
      <Mono x="368" y="124" size={16}>
        This year
      </Mono>
      <rect x="368" y="168" width="160" height="32" fill="currentColor" fillOpacity="0.08" />
      <Mono x="380" y="184" size={11} opacity={0.45}>
        Legacy
      </Mono>
      <rect x="368" y="216" width="160" height="32" fill="var(--accent)" />
      <Mono x="380" y="232" size={11} fill="var(--on-accent)">
        Cloud
      </Mono>
      <rect x="368" y="264" width="160" height="32" fill="var(--accent)" />
      <Mono x="380" y="280" size={11} fill="var(--on-accent)">
        Gen AI
      </Mono>
    </FigureFrame>
  );
}

export function FirstWeekFigure({ className = "" }: { className?: string }) {
  const rows = [
    { label: "Read the code", live: false, width: 180 },
    { label: "Shadow a review", live: false, width: 140 },
    { label: "Open a change", live: true, width: 240 },
  ];

  return (
    <FigureFrame caption="The first week" index="03" className={`max-w-md ${className}`}>
      <rect
        x="72"
        y="56"
        width="496"
        height="288"
        fill="var(--background)"
        stroke="currentColor"
        strokeOpacity="0.28"
      />
      <rect x="72" y="56" width="496" height="40" fill="var(--accent)" />
      <Mono x="92" y="76" size={11} fill="var(--on-accent)">
        WEEK 01
      </Mono>

      {rows.map((row, index) => (
        <g key={row.label}>
          <rect
            x="108"
            y={128 + index * 60}
            width="400"
            height="32"
            fill="currentColor"
            fillOpacity="0.06"
          />
          <rect
            x="108"
            y={128 + index * 60}
            width={row.width}
            height="32"
            fill={row.live ? "var(--accent-secondary)" : "var(--accent)"}
            fillOpacity={row.live ? 0.95 : 0.4}
          />
          <Mono
            x="122"
            y={144 + index * 60}
            size={12}
            fill={row.live ? "var(--on-accent-secondary)" : "var(--on-accent)"}
          >
            {row.label}
          </Mono>
        </g>
      ))}
    </FigureFrame>
  );
}
