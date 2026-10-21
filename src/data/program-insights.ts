export type InsightMetric = {
  label: string;
  value: string;
  change: number | null;
};

export type InsightLine = {
  label: string;
  color: string;
  values: number[];
};

export type InsightPanelData = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  grain?: "day" | "month";
  scale: "shared" | "independent";
  metrics: InsightMetric[];
  dates: string[];
  lines: InsightLine[];
};

function formatCount(value: number) {
  return value.toLocaleString("en-US");
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const shortMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatDayMonth(isoDate: string) {
  const [, month, day] = isoDate.slice(0, 10).split("-");
  return `${day}.${month}`;
}

export function formatMonth(isoDate: string, style: "long" | "short" = "short") {
  const month = Number(isoDate.slice(5, 7)) - 1;
  return style === "long" ? monthNames[month] : shortMonthNames[month];
}

export function formatInsightDate(
  isoDate: string,
  grain: "day" | "month" = "day",
  style: "long" | "short" = "short",
) {
  return grain === "month" ? formatMonth(isoDate, style) : formatDayMonth(isoDate);
}

function addDays(isoDate: string, days: number) {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function utcDay(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay();
}

function dateRange(start: string, end: string, step: number) {
  const dates: string[] = [];
  let cursor = start;
  while (cursor <= end) {
    dates.push(cursor);
    cursor = addDays(cursor, step);
  }
  if (dates[dates.length - 1] !== end) dates.push(end);
  return dates;
}

function mulberry32(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function walk(
  dates: string[],
  start: number,
  end: number,
  seed: number,
  kind: "steady" | "lumpy" | "steppy",
) {
  const random = mulberry32(seed);
  const weights = dates.slice(1).map((date) => {
    const weekend = utcDay(date) === 0 || utcDay(date) === 6;
    const roll = random();
    if (kind === "lumpy") {
      if (weekend) return 0.08 + roll * 0.22;
      if (roll > 0.86) return 1.7 + roll;
      return 0.32 + roll * 1.2;
    }
    if (kind === "steppy") {
      if (roll > 0.78) return 2.2 + roll * 1.8;
      return 0.12 + roll * 0.38;
    }
    if (weekend) return 0.2 + roll * 0.25;
    return 0.7 + roll * 0.55;
  });
  const weightTotal = weights.reduce((total, weight) => total + weight, 0);
  const span = end - start;
  let cursor = start;
  const values = [start];
  weights.forEach((weight, index) => {
    if (index === weights.length - 1) {
      values.push(end);
      return;
    }
    cursor += (span * weight) / weightTotal;
    values.push(Math.round(cursor));
  });
  return values;
}

function wave(dates: string[], low: number, high: number, seed: number) {
  const random = mulberry32(seed);
  return dates.map((date, index) => {
    const t = index / (dates.length - 1);
    const trend = low + (high - low) * (0.28 + 0.72 * t);
    const weekend = utcDay(date) === 0 || utcDay(date) === 6;
    const roll = random();
    const swing = (roll - 0.42) * trend * 0.62;
    const value = weekend ? trend * (0.18 + roll * 0.28) : trend + swing;
    return Math.max(1, Math.round(value));
  });
}
function changeBetween(values: number[]) {
  const previous = values[values.length - 2];
  const current = values[values.length - 1];
  if (!previous) return null;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

const termDates = dateRange("2026-07-21", "2026-08-19", 1);
const facultyDates = dateRange("2026-06-01", "2026-10-12", 7);

const students = walk(termDates, 4380, 12640, 11, "steady");
const hours = wave(termDates, 180, 920, 29);
const classes = wave(termDates, 4, 28, 47);

const faculty = walk(facultyDates, 5, 40, 3, "steppy");
const colleges = walk(facultyDates, 2, 30, 8, "steppy");
const sessions = wave(facultyDates, 420, 3100, 15);
const workshops = wave(facultyDates, 40, 620, 21);

export const termPanel: InsightPanelData = {
  id: "term",
  title: "This term",
  startDate: termDates[0],
  endDate: termDates[termDates.length - 1],
  scale: "independent",
  metrics: [
    { label: "Students", value: formatCount(12640), change: changeBetween(students) },
    { label: "Hours", value: "18,640h", change: 5.7 },
    { label: "Classes", value: formatCount(640), change: 6.4 },
  ],
  dates: termDates,
  lines: [
    { label: "Students", color: "var(--accent)", values: students },
    { label: "Hours", color: "var(--accent-secondary)", values: hours },
    { label: "Classes", color: "color-mix(in srgb, var(--foreground) 72%, var(--accent))", values: classes },
  ],
};

/** Featured trainers, counted by primary teaching domain. */
export const facultySubjects = [
  { subject: "Software engineering", count: 3 },
  { subject: "Artificial intelligence", count: 2 },
  { subject: "Data and analytics", count: 2 },
] as const;

export const facultyPanel: InsightPanelData = {
  id: "faculty",
  title: "Faculty",
  startDate: facultyDates[0],
  endDate: facultyDates[facultyDates.length - 1],
  grain: "month",
  scale: "independent",
  metrics: [
    { label: "Faculty", value: "40+", change: changeBetween(faculty) },
    { label: "Sessions", value: "12,000+", change: 8.6 },
    { label: "Workshops", value: "150+", change: 11.2 },
    { label: "Colleges", value: "30+", change: changeBetween(colleges) },
  ],
  dates: facultyDates,
  lines: [
    { label: "Faculty", color: "var(--accent)", values: faculty },
    { label: "Colleges", color: "var(--accent-secondary)", values: colleges },
    { label: "Sessions", color: "var(--foreground)", values: sessions },
    {
      label: "Workshops",
      color: "color-mix(in srgb, var(--accent) 45%, var(--accent-secondary))",
      values: workshops,
    },
  ],
};
