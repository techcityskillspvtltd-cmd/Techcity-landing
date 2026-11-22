/**
 * Partner stories: the cards at the top of /company/testimonials and the
 * pages at /company/testimonials/[slug].
 *
 * College stories are assembled from real records: the programs we ran there
 * (src/lib/projects.ts, from techcityskills.com) and the sourced college facts
 * (src/lib/partners.ts). Industry stories use only the public facts in
 * partners.ts. No quotes or outcomes are written here: add approved partner
 * quotes to `quote` when they come in.
 */
import { colleges, industry, type College, type Industry } from "@/lib/partners";
import { projects, type Project } from "@/lib/projects";

export type StoryTone = "navy" | "amber" | "violet" | "teal" | "rose" | "indigo";

export type PartnerStory = {
  slug: string;
  kind: "college" | "industry";
  name: string;
  logo: string;
  tone: StoryTone;
  /** Big words on the card: the tracks taught, or what the partner does. */
  poster: string[];
  headline: string;
  summary: string;
  facts: { label: string; value: string }[];
  /** Approved quote from the partner, when there is one. */
  quote?: { text: string; name: string; role: string };
  college?: College;
  partner?: Industry;
  programs: Project[];
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const unique = <T,>(xs: T[]) => [...new Set(xs)];

/** "Aug–Dec 2025" or "Aug 2025–May 2026" → "Aug 2025". */
const firstMonth = (dates: string) => {
  const start = dates.split("–")[0].trim();
  return start.includes(" ") ? start : `${start} ${dates.trim().split(" ").pop()}`;
};

const STATUS: Record<Project["status"], string> = { ongoing: "Under way", completed: "Completed", upcoming: "Starting" };
export const programStatus = (p: Project) => STATUS[p.status];

/** College stories, one per partner college we have run programs at. */
const collegeStory = (c: College, tone: StoryTone, short: string): PartnerStory => {
  const runs = projects.filter((p) => p.college === c.name).sort((a, b) => a.start.localeCompare(b.start));
  const tracks = unique(runs.flatMap((p) => p.tracks));
  const first = runs[0];
  const headline =
    runs.length > 1
      ? `${runs.length} programs at ${short}, from ${tracks.slice(0, 2).join(" and ")} to ${tracks[tracks.length - 1]}.`
      : `${first.title} at ${short}, inside the college's own timetable.`;
  return {
    slug: slugify(short),
    kind: "college",
    name: c.name,
    logo: c.src,
    tone,
    poster: tracks.slice(0, 4),
    headline,
    summary: `${c.name} in ${c.city}, ${c.state} has run ${runs.length === 1 ? "a TechCity program" : `${runs.length} TechCity programs`} covering ${tracks.join(", ")}.`,
    facts: [
      { label: "Location", value: `${c.city}, ${c.state}` },
      ...(c.founded ? [{ label: "Founded", value: String(c.founded) }] : []),
      { label: "Type", value: c.kind.label },
      { label: "Programs", value: String(runs.length) },
      { label: "With TechCity since", value: firstMonth(first.dates) },
    ],
    college: c,
    programs: runs,
  };
};

const industryStory = (p: Industry, tone: StoryTone, poster: string[]): PartnerStory => ({
  slug: slugify(p.name),
  kind: "industry",
  name: p.name,
  logo: p.src,
  tone,
  poster,
  headline:
    p.group === "training"
      ? `${p.name} brings ${p.detail.toLowerCase()} to the campuses we work with.`
      : `${p.name}, a ${p.detail.toLowerCase()} company, on the industry side of our programs.`,
  summary: p.fact ?? p.detail,
  facts: [
    { label: "Focus", value: p.detail },
    { label: "Partner type", value: p.group === "training" ? "Training and certification" : "Technology and services" },
    ...(p.founded ? [{ label: "Founded", value: String(p.founded) }] : []),
  ],
  partner: p,
  programs: [],
});

const byName = <T extends { name: string }>(list: T[], name: string) => list.find((x) => x.name === name)!;

export const partnerStories: PartnerStory[] = [
  collegeStory(byName(colleges, "Echelon Institute of Technology"), "navy", "Echelon"),
  industryStory(byName(industry, "HCL GUVI"), "amber", ["Upskilling", "Certification", "Indian languages"]),
  collegeStory(byName(colleges, "Inmantec Institutions"), "violet", "Inmantec"),
  industryStory(byName(industry, "Chetu"), "teal", ["Custom software", "AI", "Noida"]),
  collegeStory(byName(colleges, "St. Andrews Institute of Technology and Management"), "rose", "St. Andrews"),
  collegeStory(byName(colleges, "KCNIT Group of Institutions"), "indigo", "KCNIT"),
  collegeStory(byName(colleges, "School of Management Sciences"), "amber", "SMS Lucknow"),
  industryStory(byName(industry, "Hitbullseye"), "violet", ["Aptitude", "Test prep", "Placement"]),
  industryStory(byName(industry, "VTS Infosoft"), "navy", ["Dynamics 365", "ERP", "Delhi-NCR"]),
];

export const storyBySlug = (slug: string) => partnerStories.find((s) => s.slug === slug);
