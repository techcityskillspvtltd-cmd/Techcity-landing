"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import {
  facultyPanel,
  facultySubjects,
  formatInsightDate,
  termPanel,
  type InsightLine,
  type InsightPanelData,
} from "@/data/program-insights";

const plot = { top: 16, right: 8, bottom: 36, left: 8, width: 800, height: 240 };

function TrendUp() {
  return (
    <svg className="size-3.5" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1.5 9.5 5.2 5.8l2.2 2.2L12.5 2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      <path
        d="M8.2 2.5H12.5V6.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

function TrendDown() {
  return (
    <svg className="size-3.5" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1.5 4.5 5.2 8.2l2.2-2.2L12.5 11.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
      <path
        d="M8.2 11.5H12.5V7.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

function Metric({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-24 flex-col justify-between gap-2 p-4 sm:p-5">
      {children}
    </div>
  );
}

function MetricLabel({ children }: { children: React.ReactNode }) {
  return (
    <dt className="flex items-start justify-between gap-2 text-sm/4 text-foreground/55">
      {children}
    </dt>
  );
}

function MetricChange({ value }: { value: number | null }) {
  if (value === null) return null;

  const percent = Math.round(value * 10) / 10;
  const Icon = percent > 0 ? TrendUp : TrendDown;

  return (
    <span
      className={`flex shrink-0 items-center gap-0.5 text-xs/4 tabular-nums ${
        percent > 0 ? "text-accent-secondary" : ""
      } ${percent < 0 ? "text-red-400" : ""}`}
    >
      {percent !== 0 ? (
        <>
          <Icon />
          <span className="sr-only">{percent > 0 ? "Up by " : "Down by "}</span>
        </>
      ) : null}
      {Math.abs(percent).toLocaleString("en-US")}%
      <span className="sr-only"> compared to the previous period</span>
    </span>
  );
}

function MetricValue({ children }: { children: React.ReactNode }) {
  return (
    <dd className="text-xl leading-none font-semibold tabular-nums tracking-tight">
      {children}
    </dd>
  );
}

function linePath(points: Array<[number, number]>) {
  return points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
}

function chartGeometry(panel: InsightPanelData) {
  const innerW = plot.width - plot.left - plot.right;
  const innerH = plot.height - plot.top - plot.bottom;
  const count = panel.dates.length;
  const sharedValues = panel.lines.flatMap((line) => line.values);
  const sharedMin = Math.min(...sharedValues);
  const sharedMax = Math.max(...sharedValues);

  function place(values: number[]) {
    const min = panel.scale === "shared" ? sharedMin : Math.min(...values);
    const max = panel.scale === "shared" ? sharedMax : Math.max(...values);
    const pad = (max - min) * 0.12 || 1;
    const yMin = min - pad;
    const yMax = max + pad;
    return values.map((value, index) => {
      const x = plot.left + (count === 1 ? 0 : (index / (count - 1)) * innerW);
      const y = plot.top + (1 - (value - yMin) / (yMax - yMin)) * innerH;
      return [x, y] as [number, number];
    });
  }

  return {
    lines: panel.lines.map((line) => place(line.values)),
    innerH,
  };
}

function tickIndexes(dates: string[], grain?: "day" | "month") {
  if (grain === "month") {
    const seen = new Set<string>();
    return dates.flatMap((date, index) => {
      const key = date.slice(0, 7);
      if (seen.has(key)) return [];
      seen.add(key);
      return [index];
    });
  }
  if (dates.length <= 6) return dates.map((_, index) => index);
  const indexes = new Set<number>([0, dates.length - 1]);
  for (let step = 1; step < 4; step += 1) {
    indexes.add(Math.round((step * (dates.length - 1)) / 4));
  }
  return [...indexes].sort((a, b) => a - b);
}

function InsightsChart({ panel }: { panel: InsightPanelData }) {
  const [active, setActive] = useState<number | null>(null);
  const geometry = chartGeometry(panel);
  const marker = active === null ? null : geometry.lines[0]?.[active];

  function selectFromPointer(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const viewX = ((event.clientX - bounds.left) / bounds.width) * plot.width;
    const axis = geometry.lines[0] ?? [];
    let nearest = 0;
    let best = Number.POSITIVE_INFINITY;
    axis.forEach(([x], index) => {
      const distance = Math.abs(x - viewX);
      if (distance < best) {
        best = distance;
        nearest = index;
      }
    });
    setActive(nearest);
  }

  const xPct = marker ? (marker[0] / plot.width) * 100 : 0;
  const tooltipShift =
    xPct < 16 ? "translateX(0)" : xPct > 84 ? "translateX(-100%)" : "translateX(-50%)";

  const gridLines = [0, 1, 2, 3].map((step) => {
    const y = plot.top + (geometry.innerH * step) / 3;
    return y;
  });

  return (
    <div className="border-t border-foreground/10">
      <div
        className="relative aspect-[2/1] cursor-crosshair md:aspect-[3/1]"
        onPointerMove={selectFromPointer}
        onPointerLeave={() => setActive(null)}
      >
        <svg
          viewBox={`0 0 ${plot.width} ${plot.height}`}
          className="absolute inset-0 h-full w-full text-foreground"
          role="img"
          aria-label={`${panel.title} from ${formatInsightDate(panel.startDate, panel.grain, "long")} to ${formatInsightDate(panel.endDate, panel.grain, "long")}. ${panel.lines.map((line) => line.label).join(", ")}.`}
        >
          {gridLines.map((y) => (
            <line
              key={y}
              x1={plot.left}
              x2={plot.width - plot.right}
              y1={y}
              y2={y}
              stroke="currentColor"
              strokeOpacity="0.12"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {geometry.lines.map((points, index) => (
            <path
              key={panel.lines[index].label}
              d={linePath(points)}
              fill="none"
              stroke={panel.lines[index].color}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {marker && active !== null ? (
            <g>
              <line
                x1={marker[0]}
                x2={marker[0]}
                y1={plot.top}
                y2={plot.height - plot.bottom}
                stroke="currentColor"
                strokeOpacity="0.28"
                vectorEffect="non-scaling-stroke"
              />
              {geometry.lines.map((points, index) => (
                <circle
                  key={panel.lines[index].label}
                  cx={points[active][0]}
                  cy={points[active][1]}
                  r="3.5"
                  fill="var(--background)"
                  stroke={panel.lines[index].color}
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>
          ) : null}
          {tickIndexes(panel.dates, panel.grain).map((index) => {
            const x = geometry.lines[0][index][0];
            const anchor =
              index === 0
                ? "start"
                : index === panel.dates.length - 1
                  ? "end"
                  : "middle";
            return (
              <text
                key={panel.dates[index]}
                x={x}
                y={plot.height - 12}
                fill="currentColor"
                fillOpacity="0.4"
                fontFamily="var(--font-geist-mono), ui-monospace, monospace"
                fontSize="11"
                textAnchor={anchor}
              >
                {formatInsightDate(panel.dates[index], panel.grain)}
              </text>
            );
          })}
        </svg>

        {active !== null && marker ? (
          <div
            className="pointer-events-none absolute top-3 z-10 min-w-40 max-w-[min(16rem,calc(100%-1.5rem))] border border-foreground/15 bg-background px-3 py-2 max-lg:min-w-0"
            style={{ left: `${xPct}%`, transform: tooltipShift }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45">
              {formatInsightDate(panel.dates[active], panel.grain, "long")}
            </p>
            {panel.lines.map((line: InsightLine) => (
              <p
                key={line.label}
                className="mt-1.5 flex items-center justify-between gap-4 text-xs"
              >
                <span className="flex items-center gap-1.5 text-foreground/70">
                  <span className="size-1.5" style={{ background: line.color }} />
                  {line.label}
                </span>
                <span className="tabular-nums text-foreground">
                  {line.values[active].toLocaleString("en-US")}
                </span>
              </p>
            ))}
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-foreground/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45 sm:px-5">
        {panel.lines.map((line) => (
          <span key={line.label} className="inline-flex items-center gap-2">
            <span className="h-px w-4" style={{ background: line.color }} />
            {line.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function InsightsPanel({ panel }: { panel: InsightPanelData }) {
  const range = `${formatInsightDate(panel.startDate, panel.grain, "long")} – ${formatInsightDate(panel.endDate, panel.grain, "long")}`;

  return (
    <div className="border border-foreground/10">
      <h3 className="border-b border-foreground/10 px-4 py-5 text-[1.45rem] font-normal leading-tight tracking-tight text-foreground sm:px-5 sm:text-[1.7rem] sm:leading-none">
        {panel.title}
        <sup className="mt-2 ml-0 block max-w-full font-mono text-[10px] font-normal leading-5 tracking-[0.14em] whitespace-normal text-foreground/45 sm:ml-2 sm:mt-0 sm:inline sm:text-[11px]">
          {`(${range})`}
        </sup>
      </h3>

      <dl
        className={
          panel.metrics.length <= 1
            ? "grid grid-cols-1"
            : panel.metrics.length === 3
              ? "grid grid-cols-1 sm:grid-cols-3"
              : "grid grid-cols-2 md:grid-cols-4"
        }
      >
        {panel.metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={
              panel.metrics.length <= 1
                ? ""
                : panel.metrics.length === 3
                  ? index < panel.metrics.length - 1
                    ? "sm:border-r sm:border-foreground/10 max-sm:border-b max-sm:border-foreground/10"
                    : ""
                  : `${index % 2 === 0 ? "max-md:border-r max-md:border-foreground/10" : ""} ${index < 2 ? "max-md:border-b max-md:border-foreground/10" : ""} ${index < panel.metrics.length - 1 ? "md:border-r md:border-foreground/10" : ""}`
            }
          >
            <Metric>
              <MetricLabel>
                {metric.label}
                <MetricChange value={metric.change} />
              </MetricLabel>
              <MetricValue>{metric.value}</MetricValue>
            </Metric>
          </div>
        ))}
      </dl>

      <InsightsChart panel={panel} />
    </div>
  );
}

export function FacultySubjects() {
  const total = facultySubjects.reduce((sum, item) => sum + item.count, 0);
  const max = Math.max(...facultySubjects.map((item) => item.count));

  return (
    <div className="border border-foreground/10">
      <h3 className="border-b border-foreground/10 px-4 py-5 text-[1.45rem] font-normal leading-tight tracking-tight text-foreground sm:px-5 sm:text-[1.7rem] sm:leading-none">
        Subjects
        <sup className="ml-2 font-mono text-[11px] font-normal tracking-[0.14em] text-foreground/45">
          {`${total.toLocaleString("en-US")} featured`}
        </sup>
      </h3>
      <ul>
        {facultySubjects.map((item, index) => {
          const share = Math.round((item.count / total) * 100);
          const width = (item.count / max) * 100;
          return (
            <li
              key={item.subject}
              className={`px-4 py-4 sm:px-5 sm:py-5 ${
                index < facultySubjects.length - 1 ? "border-b border-foreground/10" : ""
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[15px] tracking-tight text-foreground">
                  {item.subject}
                </span>
                <span className="shrink-0 font-mono text-[11px] tabular-nums tracking-[0.08em] text-foreground/55">
                  {item.count.toLocaleString("en-US")}
                  <span className="ml-2 text-foreground/35">{share}%</span>
                </span>
              </div>
              <div className="mt-3 h-3 bg-foreground/[0.08]">
                <div
                  className={`h-full ${index === 0 ? "bg-accent-secondary" : "bg-accent"}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function FacultyInsights({ index = "03" }: { index?: string }) {
  return (
    <section id="faculty-insights" className="scroll-mt-28 border-t border-foreground/10">
      <div className="fade-up mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
        <SectionHeading
          index={index}
          label="Insights"
          title="Faculty in the programs, June to October."
        />
        <p className="mt-5 max-w-xl text-[15px] leading-7 text-foreground/65">
          Faculty starts at 5 and is 40+ now.
        </p>

        <div className="mt-12">
          <InsightsPanel panel={facultyPanel} />
        </div>
      </div>
    </section>
  );
}

export default function ProgramInsights() {
  return (
    <section id="insights" className="scroll-mt-28 border-t border-foreground/10">
      <div className="fade-up mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-[4.5rem]">
        <SectionHeading
          index="06"
          label="This term"
          title="Students, hours, and classes."
        />
        <p className="mt-5 max-w-xl text-[15px] leading-7 text-foreground/65">
          Students rise steadily. Hours and classes move with the weeks that
          actually ran.
        </p>

        <div className="mt-12">
          <InsightsPanel panel={termPanel} />
        </div>
      </div>
    </section>
  );
}
