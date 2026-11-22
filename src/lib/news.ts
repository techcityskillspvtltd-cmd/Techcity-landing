/**
 * Newsroom items for /company/news, made from real records: every program in
 * src/lib/projects.ts becomes a dated campus item (dated by its start, or by
 * its finish once completed). Headlines are written from those fields only;
 * nothing here adds outcomes or quotes.
 */
import { colleges } from "@/lib/partners";
import { partnerStories } from "@/lib/partner-stories";
import { projects, type Project } from "@/lib/projects";

export type NewsItem = {
  id: string;
  /** YYYY-MM */
  month: string;
  category: "Campus";
  /** Starting, Under way or Completed. */
  stage: string;
  headline: string;
  dek: string;
  college: string;
  /** Short college name, for the picture when there's no logo. */
  short: string;
  city: string;
  logo?: string;
  tracks: string[];
  href: string;
};

const SHORT: Record<string, string> = {
  "Echelon Institute of Technology": "Echelon",
  "Inmantec Institutions": "Inmantec",
  "St. Andrews Institute of Technology and Management": "St. Andrews",
  "KCNIT Group of Institutions": "KCNIT",
  "School of Management Sciences": "SMS Lucknow",
  "MMU Ambala": "MMU Ambala",
};

const MONTH: Record<string, string> = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};
const MONTH_NAME = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-08" → "August 2026". */
export const monthLabel = (ym: string) => `${MONTH_NAME[Number(ym.slice(5, 7)) - 1]} ${ym.slice(0, 4)}`;

/** "Aug–Dec 2025" or "Aug 2025–May 2026" → the last month, as YYYY-MM. */
function endMonth(dates: string) {
  const end = dates.split("–").pop()!.trim().split(" ");
  const year = dates.trim().split(" ").pop()!;
  return `${end[1] ?? year}-${MONTH[end[0]]}`;
}

/** "Aptitude, Java DSA, MERN, and AI/ML" reads fine mid-sentence; lower-case only plain words. */
const inSentence = (title: string) => title.replace(/^Artificial intelligence/, "artificial intelligence");

function toItem(p: Project, i: number): NewsItem {
  const short = SHORT[p.college] ?? p.college;
  const month = p.status === "completed" ? endMonth(p.dates) : p.start;
  const headline =
    p.status === "completed"
      ? `${short} completes ${inSentence(p.title)}`
      : p.status === "ongoing"
        ? `${p.title} under way at ${short}`
        : `${short} to begin ${p.title} in ${monthLabel(p.start)}`;
  const story = partnerStories.find((s) => s.name === p.college);
  return {
    id: `${p.start}-${i}`,
    month,
    category: "Campus",
    stage: p.status === "completed" ? "Completed" : p.status === "ongoing" ? "Under way" : "Starting",
    headline,
    dek: `${p.tracks.join(", ")}, taught inside the timetable at ${p.college}, ${p.city}. Runs ${p.dates}.`,
    college: p.college,
    short,
    city: p.city,
    logo: colleges.find((c) => c.name === p.college)?.src,
    tracks: p.tracks,
    href: story ? `/company/testimonials/${story.slug}` : "/projects",
  };
}

/** Every item, newest first. */
export const news: NewsItem[] = projects.map(toItem).sort((a, b) => b.month.localeCompare(a.month));
