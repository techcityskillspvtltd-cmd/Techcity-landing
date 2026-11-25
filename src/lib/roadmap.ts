import type { ProductId } from "@/components/product-logo";

/*
 * The TechCity product roadmap, quarter by quarter, for the student side's
 * Product roadmap page (app/students/roadmap). Edit it here: a quarter's
 * place on the timeline (shipped, now, next) comes from its items' status.
 */

export type RoadStatus = "shipped" | "building" | "planned";

export type RoadItem = {
  product: ProductId;
  title: string;
  body: string;
  status: RoadStatus;
  /** Uses the AI layer. */
  ai?: boolean;
};

export type Quarter = {
  id: string;
  label: string;
  span: string;
  /** What the quarter is about, in a few words. */
  theme: string;
  items: RoadItem[];
};

export const roadmap: Quarter[] = [
  {
    id: "2026-q1",
    label: "Q1 2026",
    span: "January to March",
    theme: "One account for everything",
    items: [
      { product: "setu", title: "TechCity ID", body: "One login for all five apps, with your college, batch and roles on it.", status: "shipped" },
      { product: "marg", title: "The DSA roadmap", body: "The first track: six stages from arrays to dynamic programming.", status: "shipped" },
      { product: "riyaaz", title: "Daily sets and streaks", body: "Three problems a day, judged the moment you run them.", status: "shipped" },
      { product: "spardha", title: "Timed tests", body: "Tests with instant results, set by your trainers.", status: "shipped" },
    ],
  },
  {
    id: "2026-q2",
    label: "Q2 2026",
    span: "April to June",
    theme: "Practice that sticks",
    items: [
      { product: "setu", title: "Attendance in one tap", body: "A rotating code and the classroom's location, so roll call takes seconds.", status: "shipped" },
      { product: "marg", title: "AI/ML, cloud and MERN tracks", body: "Three more roadmaps, each linked to videos, problems and a test.", status: "shipped" },
      { product: "kaksha", title: "Cohort courses", body: "Courses taken with your batch, with live classes and recordings.", status: "shipped" },
      { product: "riyaaz", title: "The revision queue", body: "Problems you missed come back after 1, 3 and 7 days.", status: "shipped" },
    ],
  },
  {
    id: "2026-q3",
    label: "Q3 2026",
    span: "July to September",
    theme: "Your college on TechCity",
    items: [
      { product: "setu", title: "Timetable solver", body: "Timetables built in seconds around rooms, faculty and labs.", status: "shipped", ai: true },
      { product: "setu", title: "Absence alerts", body: "Parents told the same day, and a warning before you fall under 75%.", status: "shipped" },
      { product: "kaksha", title: "Quick checks in videos", body: "Short questions inside each lesson that feed your mastery.", status: "shipped" },
      { product: "spardha", title: "Campus contests", body: "Coding contests across your college, with live leaderboards.", status: "shipped" },
    ],
  },
  {
    id: "2026-q4",
    label: "Q4 2026",
    span: "October to December",
    theme: "Learning that adapts",
    items: [
      { product: "setu", title: "Placement drives", body: "Every drive you're eligible for, with your applications and offers tracked.", status: "shipped" },
      { product: "marg", title: "Adaptive path", body: "The next stage picked from what you've mastered, not from the calendar.", status: "shipped", ai: true },
      { product: "riyaaz", title: "Code review", body: "Why a test failed, and the time your solution takes, explained.", status: "shipped", ai: true },
      { product: "kaksha", title: "Notes in Hindi", body: "Transcripts, summaries and notes in Hindi and regional languages.", status: "building", ai: true },
      { product: "spardha", title: "Integrity score", body: "Proctoring that gives every attempt an integrity score, so results are trusted.", status: "building", ai: true },
    ],
  },
  {
    id: "2027-q1",
    label: "Q1 2027",
    span: "January to March",
    theme: "Proof recruiters can use",
    items: [
      { product: "spardha", title: "Verified certificates", body: "A link on every certificate to the score and its integrity record.", status: "planned" },
      { product: "spardha", title: "Recruiter portal", body: "Recruiters find students by verified skill and invite them to hiring contests.", status: "planned" },
      { product: "marg", title: "Python and Java full-stack tracks", body: "Two more roadmaps, from the language to a deployed app.", status: "planned" },
      { product: "kaksha", title: "Labs in the browser", body: "Cloud sandboxes and an editor in the browser; nothing to install.", status: "planned" },
    ],
  },
  {
    id: "2027-q2",
    label: "Q2 2027",
    span: "April to June",
    theme: "Your whole record, in one place",
    items: [
      { product: "setu", title: "Student 360", body: "Attendance, marks, practice and tests on one profile, with your readiness for placements.", status: "planned" },
      { product: "setu", title: "Mentor check-ins", body: "Early warnings that send a mentor your way before exams, not after.", status: "planned", ai: true },
      { product: "riyaaz", title: "Practice on the go", body: "Daily sets in a phone app that works on a patchy connection.", status: "planned" },
    ],
  },
  {
    id: "2027-h2",
    label: "H2 2027",
    span: "July to December",
    theme: "Open, and in your language",
    items: [
      { product: "setu", title: "Campus assistant", body: "Answers about fees, timetable and results, in Indian languages.", status: "planned", ai: true },
      { product: "spardha", title: "Hiring contests", body: "Contests run by recruiters, with interviews for the top scorers.", status: "planned" },
      { product: "kaksha", title: "Courses from industry partners", body: "Cohorts taught with companies that hire from them.", status: "planned" },
    ],
  },
];

/** Where a quarter sits: all shipped, under way, or still ahead. */
export function quarterState(q: Quarter): "shipped" | "now" | "next" {
  if (q.items.every((i) => i.status === "shipped")) return "shipped";
  if (q.items.some((i) => i.status !== "planned")) return "now";
  return "next";
}

export const currentQuarter = roadmap.find((q) => quarterState(q) === "now") ?? roadmap[roadmap.length - 1];
