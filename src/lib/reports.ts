import { colleges } from "@/lib/partners";

/*
 * Reports: write-ups from partner campuses (/reports and /reports/[slug]).
 *
 * DEMO CONTENT. The campuses, cities, tracks and terms match lib/projects, but
 * every figure, quote and detail in these stories is illustrative, written to
 * show the layout. Replace each one with an approved report before launch.
 * Quotes are credited to roles, not named people, until the college signs off.
 *
 * To add a report, add it to `list` (it is sorted by date, newest first). It gets its
 * own page at /reports/<slug> and a row in "All reports".
 */

export type ReportType = "College report" | "Program report" | "Announcement" | "Annual review";

/** Tint laid over the cover picture (the city illustration, cropped per report). */
export type Tone = "navy" | "indigo" | "slate" | "umber";

export type Block =
  | { p: string }
  | { h: string }
  | { quote: string; by: string }
  | { stats: { value: string; label: string }[] };

export type Report = {
  slug: string;
  type: ReportType;
  title: string;
  /** One or two sentences under the title on cards and at the top of the page. */
  dek: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** The campus the report is about; leave out for TechCity-wide reports. */
  college?: string;
  city?: string;
  tracks: string[];
  cover: { tone: Tone; /** Horizontal crop of the illustration, 0–100. */ x: number };
  caption: string;
  body: Block[];
};

const list: Report[] = [
  {
    slug: "st-andrews-python-full-stack-scada",
    type: "Announcement",
    title: "Python Full Stack and SCADA come to St. Andrews next term",
    dek: "After a full analytics term in 2025, the Gurugram campus adds two new tracks from January, one of them for its electrical and electronics students.",
    date: "2026-11-12",
    college: "St. Andrews Institute of Technology and Management",
    city: "Gurugram",
    tracks: ["Python Full Stack", "SCADA"],
    cover: { tone: "indigo", x: 92 },
    caption: "St. Andrews runs its second TechCity term from January to May 2027.",
    body: [
      { p: "St. Andrews Institute of Technology and Management will run two new TechCity tracks from January 2027: Python Full Stack for computer science students, and SCADA for the electrical and electronics batches. Both sit inside the college timetable, taught on campus by industry trainers." },
      { p: "The SCADA track is new for TechCity. It was planned with the college’s electrical faculty around the systems their graduates meet in plants and utilities: PLC basics, HMI screens, alarms and data logging, with a small control project at the end of the term." },
      { h: "Why these two tracks" },
      { p: "The analytics term in 2025 showed the college what a full term of practitioner-led labs looks like. For 2027 the placement cell asked for one track that leads straight to developer roles, and one that serves the core branches that often get left out of software-heavy training." },
      { quote: "Our electrical students kept asking why every training program was about web apps. This one is about the work they will actually do.", by: "Head of Department, Electrical Engineering" },
      { h: "What happens before January" },
      { p: "Lab set-up and the timetable are being finalised with the college now. Students get Setu accounts in December, with a short Python warm-up in Riyaaz before the first class." },
    ],
  },
  {
    slug: "mmu-ambala-first-ai-ml-cohort",
    type: "Announcement",
    title: "MMU Ambala starts its first AI and machine learning cohort",
    dek: "A five-month track, taught on campus, from Python foundations to a deployed model in the final month.",
    date: "2026-09-08",
    college: "MMU Ambala",
    city: "Ambala",
    tracks: ["AI/ML"],
    cover: { tone: "navy", x: 8 },
    caption: "The Ambala cohort runs from September 2026 to January 2027.",
    body: [
      { p: "MMU Ambala has started its first TechCity cohort in artificial intelligence and machine learning. The track runs from September to January, inside the college timetable, with two lab sessions a week led by industry trainers." },
      { p: "The plan moves in four blocks: Python and data handling, classical machine learning, deep learning basics, and a final month where every team trains, evaluates and deploys a small model of its own." },
      { stats: [ { value: "18", label: "Weeks on campus" }, { value: "2", label: "Lab sessions a week" }, { value: "4", label: "Blocks, one project" } ] },
      { h: "Practice between classes" },
      { p: "Students practise between sessions in Riyaaz and follow the AI/ML path in Marg, so faculty can see where each student is without waiting for the next test." },
      { quote: "We wanted AI taught the way it is used, with data that is messy and a model that has to run somewhere at the end.", by: "Dean, Engineering" },
    ],
  },
  {
    slug: "kcnit-banda-ai-ml-java-dsa",
    type: "College report",
    title: "Bringing AI/ML to Banda: six months of labs outside the metros",
    dek: "KCNIT’s first TechCity term paired machine learning with Java DSA, and ended with a two-day workshop the whole department came to.",
    date: "2026-07-02",
    college: "KCNIT Group of Institutions",
    city: "Banda",
    tracks: ["AI/ML", "Java DSA", "AI/ML workshop"],
    cover: { tone: "slate", x: 78 },
    caption: "KCNIT ran AI/ML and Java DSA from January to June 2026.",
    body: [
      { p: "Most training for engineering students in India happens in or near the big cities. KCNIT Group of Institutions in Banda wanted the same practitioner-led labs for its students without asking them to travel for it." },
      { p: "From January to June 2026, TechCity trainers ran two tracks on campus: AI/ML for final-year students, and Java DSA for second and third years preparing for placement tests." },
      { stats: [ { value: "2", label: "Tracks in one term" }, { value: "6", label: "Months on campus" }, { value: "1", label: "Department-wide workshop" } ] },
      { h: "Two tracks, one timetable" },
      { p: "The college fitted both tracks into existing lab hours instead of adding evening classes. Java DSA ran as weekly problem sets with a contest on Spardha every month; AI/ML moved from data cleaning to a classification project students presented in June." },
      { quote: "Students here are as capable as anywhere. What they lacked was someone from industry in the room every week.", by: "Training and Placement Officer" },
      { h: "The workshop" },
      { p: "The term closed with a two-day AI/ML workshop open to every branch. Faculty sat in alongside students, and several have since used the lab material in their own courses." },
    ],
  },
  {
    slug: "inmantec-year-in-review",
    type: "College report",
    title: "Inmantec’s year with TechCity: two stacks, two workshops, one capstone week",
    dek: "From August 2025 to May 2026, Inmantec ran Python Full Stack and MERN side by side, with AI tools and cybersecurity workshops in between.",
    date: "2026-06-10",
    college: "Inmantec Institutions",
    city: "Ghaziabad",
    tracks: ["Python Full Stack", "MERN", "AI Tools", "Cybersecurity"],
    cover: { tone: "umber", x: 30 },
    caption: "Inmantec ran two full-stack tracks across the 2025–26 academic year.",
    body: [
      { p: "Inmantec Institutions in Ghaziabad was the first campus to run two full-stack tracks in the same year: Python Full Stack for its computer applications students and MERN for its engineering batches." },
      { p: "Both tracks met the same goal by different routes. By the end of the year every student had built and deployed a working web application, and walked through it in a capstone week judged by trainers and faculty." },
      { h: "Workshops in between" },
      { p: "Two short workshops broke up the year. AI Tools showed students how to use assistants in their own coding without leaning on them; Cybersecurity covered the basics every developer is now asked about in interviews." },
      { quote: "Capstone week changed how students talk about their work. They stopped saying ‘we did a course’ and started saying ‘we built this’.", by: "Director, Computer Applications" },
      { stats: [ { value: "2", label: "Full-stack tracks" }, { value: "2", label: "Workshops" }, { value: "10", label: "Months on campus" } ] },
    ],
  },
  {
    slug: "echelon-ai-workshop-python-dsa",
    type: "Program report",
    title: "Echelon’s AI workshop and Python DSA term, and what came next",
    dek: "A short term in early 2026 became the pilot for Echelon’s full semester of Aptitude, Java DSA, MERN and AI/ML.",
    date: "2026-05-04",
    college: "Echelon Institute of Technology",
    city: "Faridabad",
    tracks: ["AI workshop", "Python DSA"],
    cover: { tone: "indigo", x: 18 },
    caption: "Echelon ran an AI workshop and Python DSA from January to April 2026.",
    body: [
      { p: "Echelon Institute of Technology in Faridabad started small with TechCity: an AI workshop and a Python DSA track, from January to April 2026." },
      { p: "The workshop gave students a first look at how AI is built and used. The DSA track did the slower work: a few problems every week, explained by a trainer, practised in Riyaaz and tested in a monthly contest." },
      { h: "From pilot to semester" },
      { p: "By April the college had seen enough to plan a full semester. Since August 2026 Echelon has run four tracks at once (Aptitude, Java DSA, MERN and AI/ML), the largest TechCity program on a single campus so far." },
      { quote: "We wanted to see the trainers teach before we committed a whole semester. Four months was enough.", by: "Principal" },
    ],
  },
  {
    slug: "st-andrews-data-analytics-term",
    type: "College report",
    title: "From Excel basics to Power BI dashboards in one term at St. Andrews",
    dek: "The Gurugram campus ran Python Data Analytics, Aptitude, Power BI and Excel from August to December 2025.",
    date: "2026-01-20",
    college: "St. Andrews Institute of Technology and Management",
    city: "Gurugram",
    tracks: ["Data Analytics", "Aptitude", "Power BI", "Excel"],
    cover: { tone: "slate", x: 88 },
    caption: "St. Andrews ran four analytics tracks from August to December 2025.",
    body: [
      { p: "Data roles are among the most common first jobs for graduates around Gurugram, and most of them ask for the same toolkit: Excel, a BI tool, some Python and a clear head for aptitude tests." },
      { p: "St. Andrews built its first TechCity term around exactly that. Students moved from spreadsheets to Python analysis to Power BI dashboards, with aptitude practice every week alongside." },
      { stats: [ { value: "4", label: "Tracks in one term" }, { value: "5", label: "Months on campus" }, { value: "1", label: "Dashboard per student" } ] },
      { h: "Built on real data" },
      { p: "Every student finished the term with a dashboard built on a public dataset of their choice, presented to faculty and a trainer in the last week of December." },
      { quote: "Students can now show an interviewer a dashboard they built, not just a certificate.", by: "Training and Placement Officer" },
    ],
  },
  {
    slug: "sms-lucknow-ai-on-the-management-timetable",
    type: "College report",
    title: "School of Management Sciences puts AI on the management timetable",
    dek: "Lucknow’s business and computer applications students took AI/ML, Aptitude and Excel in the same term.",
    date: "2026-01-12",
    college: "School of Management Sciences",
    city: "Lucknow",
    tracks: ["AI/ML", "Aptitude", "Excel"],
    cover: { tone: "umber", x: 4 },
    caption: "SMS Lucknow ran three tracks from August to December 2025.",
    body: [
      { p: "AI/ML is usually taught to engineers. The School of Management Sciences in Lucknow asked for a version its management and computer applications students could use from day one." },
      { p: "The term ran three tracks together. Excel and aptitude built the everyday skills recruiters test for; AI/ML showed students how models are trained, where they fail, and how to use them in business work." },
      { h: "Less theory, more use" },
      { p: "Sessions were built around cases: forecasting sales, sorting customer feedback, spotting unusual transactions. Each case ended with students explaining a model’s output in plain words, the part managers actually need." },
      { quote: "Our students will manage teams that use AI. They need to know what it can and cannot do.", by: "Director" },
    ],
  },
  {
    slug: "techcity-2025-26-in-review",
    type: "Annual review",
    title: "TechCity in 2025–26: five campuses, one way of teaching",
    dek: "A look back at the academic year: the colleges we worked with, the tracks they chose, and what we are changing for 2026–27.",
    date: "2026-06-28",
    tracks: ["All tracks"],
    cover: { tone: "navy", x: 60 },
    caption: "TechCity programs ran across Haryana and Uttar Pradesh in 2025–26.",
    body: [
      { p: "In 2025–26 TechCity programs ran on campuses in Faridabad, Gurugram, Ghaziabad, Banda and Lucknow. Each college chose its own tracks; every one of them was taught the same way, by practitioners, inside the college timetable." },
      { stats: [ { value: "5", label: "Campuses" }, { value: "15+", label: "Tracks taught" }, { value: "2", label: "States" } ] },
      { h: "What colleges asked for" },
      { p: "Full stack and AI/ML were the most requested tracks, with aptitude close behind as part of placement preparation. New this year were requests from core branches, which we are planning into new tracks for 2026–27." },
      { h: "What we are changing" },
      { p: "Next year every program ends with a capstone week, after the format worked at Inmantec, and every campus gets the same report at the end of term, so colleges can compare one year with the next." },
    ],
  },
];

/** Newest first. */
export const reports = [...list].sort((a, b) => b.date.localeCompare(a.date));

/* ------------------------------------------------------------ helpers */

export const reportBySlug = (slug: string) => reports.find((r) => r.slug === slug);

/** Logo from the partner list, when the college has one there. */
export const collegeLogo = (name?: string) => (name ? colleges.find((c) => c.name === name)?.src : undefined);

/** "12 November 2026", fixed to India time so server and browser agree. */
export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(
    new Date(`${iso}T12:00:00+05:30`),
  );

/** First reports shown in the featured carousel, then two cards, then the rest as rows. */
export const FEATURED = 3;
