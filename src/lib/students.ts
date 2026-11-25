import type { ProductId } from "@/components/product-logo";
import type { StoryTrack } from "@/lib/company";
import type { ProcessStep } from "@/lib/program-pages";

/*
 * Content for the student side (/students and the pages under it). The
 * student stories themselves are in lib/company (`studentStories`); the
 * projects here belong to students from those stories and retell the work
 * they describe. Names and numbers inside the animated scenes illustrate the
 * product; they are not records.
 */

/** "Your path": how a student goes from first lesson to first offer. */
export const journey: ProcessStep[] = [
  {
    title: "Pick a path",
    body: "Choose where you're headed. Marg turns it into a roadmap, one clear step at a time.",
    scene: {
      kind: "select",
      title: "Your goal",
      prompt: "What do you want to become?",
      chips: ["Full-stack developer", "AI engineer", "Data analyst", "Cloud engineer", "Product designer", "Backend developer"],
      picked: [0],
      done: "Roadmap ready: 12 steps",
    },
  },
  {
    title: "Practise every day",
    body: "A few problems a day on Riyaaz, with feedback on every run and a streak that keeps you coming back.",
    scene: {
      kind: "progress",
      title: "This week · Riyaaz",
      rows: [
        { label: "Arrays and hashing", value: 100, note: "12 of 12 solved" },
        { label: "Trees and graphs", value: 64, note: "7 of 11 solved" },
        { label: "Dynamic programming", value: 30, note: "3 of 10 solved" },
      ],
    },
  },
  {
    title: "Prove it",
    body: "Timed tests and campus contests on Spardha show where you stand, with a score companies trust.",
    scene: {
      kind: "score",
      title: "Weekend contest",
      score: 86,
      criteria: [
        { label: "Problems solved", value: 92 },
        { label: "Speed", value: 78 },
        { label: "Code quality", value: 84 },
      ],
      verdict: "Rank 12 of 640",
    },
  },
  {
    title: "Get hired",
    body: "Mock interviews, mentors who hire and drives with our partner companies, all the way to the offer.",
    scene: {
      kind: "pipeline",
      title: "Your applications",
      stages: [
        { label: "Applied", value: 12 },
        { label: "Shortlisted", value: 6 },
        { label: "Interviews", value: 4 },
        { label: "Offers", value: 2 },
      ],
    },
  },
];

/** The five tools, as a student uses them (Features page and the home page). */
export type StudentTool = {
  id: ProductId;
  /** What the student gets, in a few words. */
  lead: string;
  body: string;
  points: string[];
};

export const tools: StudentTool[] = [
  {
    id: "marg",
    lead: "Know what to learn next.",
    body: "Roadmaps for DSA, AI/ML, cloud and more turn a big goal into small steps, with the resources for each one.",
    points: ["A roadmap for your goal", "Curated resources per step", "Progress you can see"],
  },
  {
    id: "riyaaz",
    lead: "Practise a little, every day.",
    body: "A few problems a day, feedback on every run, and a streak that turns practice into a habit.",
    points: ["Daily problem sets", "Instant test feedback", "Streaks and badges"],
  },
  {
    id: "spardha",
    lead: "Prove what you can do.",
    body: "Timed tests and campus contests with instant scores and live leaderboards, the way online assessments run.",
    points: ["Timed tests", "Campus contests", "Live leaderboards"],
  },
  {
    id: "kaksha",
    lead: "Learn with a cohort.",
    body: "Video courses with hands-on labs, taken with your batch and finished with something you built.",
    points: ["Video lessons and labs", "Live cohort classes", "A project to show"],
  },
  {
    id: "setu",
    lead: "Your classes, in one place.",
    body: "Courses, assignments and attendance from your college, on the same account as everything else.",
    points: ["Courses and assignments", "Attendance and grades", "Everything on one login"],
  },
];

/** A thumbnail of the project's kind (drawn in CSS, not a screenshot). */
export type ProjectLook = "dashboard" | "chat" | "pipeline" | "design" | "chart" | "code";

export type StudentProject = {
  slug: string;
  title: string;
  student: string;
  /** Degree and city, as in the student's story. */
  detail: string;
  track: StoryTrack;
  summary: string;
  stack: string[];
  /** What it led to. */
  outcome: string;
  look: ProjectLook;
};

export const studentProjects: StudentProject[] = [
  {
    slug: "payments-dashboard",
    title: "A payments dashboard",
    student: "Aarav Sharma",
    detail: "B.Tech CSE · Jaipur",
    track: "Full-stack engineering",
    summary: "Shipped with weekly code reviews: transactions, refunds and a live view of failed payments.",
    stack: ["React", "Node.js", "PostgreSQL"],
    outcome: "Half of his SDE-1 interview was about it",
    look: "dashboard",
  },
  {
    slug: "syllabus-chatbot",
    title: "A chatbot over the college syllabus",
    student: "Harshit Agarwal",
    detail: "B.Tech CSE · Indore",
    track: "Generative AI",
    summary: "Retrieval over every unit's notes, with an evaluation set that measured how often answers were right.",
    stack: ["Python", "Embeddings", "Evaluation"],
    outcome: "Led to an AI internship",
    look: "chat",
  },
  {
    slug: "gujarati-classifier",
    title: "A Gujarati text classifier",
    student: "Tanvi Patel",
    detail: "B.Tech AI & DS · Surat",
    track: "Generative AI",
    summary: "A small model fine-tuned on Gujarati news, with a write-up of what worked and what didn't.",
    stack: ["Python", "PyTorch", "Fine-tuning"],
    outcome: "The write-up got her a research internship",
    look: "code",
  },
  {
    slug: "capstone-pipeline",
    title: "A deploy pipeline that breaks well",
    student: "Priya Nair",
    detail: "B.Tech ECE · Kochi",
    track: "Cloud & DevOps",
    summary: "The cohort capstone on a real CI/CD pipeline, broken on purpose and fixed with rollbacks and alerts.",
    stack: ["Docker", "GitHub Actions", "AWS"],
    outcome: "Now a cloud support engineer",
    look: "pipeline",
  },
  {
    slug: "kirana-sales",
    title: "What sells at a kirana store",
    student: "Riya Deshpande",
    detail: "B.E. CSE · Nashik",
    track: "Data & analytics",
    summary: "A year of neighbourhood store sales, cleaned and explained, with a forecast for festival weeks.",
    stack: ["Python", "pandas", "Forecasting"],
    outcome: "Analytics internship at a healthtech",
    look: "chart",
  },
  {
    slug: "campus-events",
    title: "A campus events app",
    student: "Kavya Pillai",
    detail: "B.Des · Thiruvananthapuram",
    track: "Product & design",
    summary: "Designed with two developers on the capstone, from interviews with students to a tested prototype.",
    stack: ["Figma", "User interviews", "Prototyping"],
    outcome: "Now a UX designer",
    look: "design",
  },
  {
    slug: "sales-dashboard",
    title: "A regional sales dashboard",
    student: "Kunal Mehta",
    detail: "B.Sc Computer Science · Ahmedabad",
    track: "Data & analytics",
    summary: "From messy spreadsheets to a dashboard a sales head could read in a minute, refreshed every morning.",
    stack: ["Power BI", "Python", "SQL"],
    outcome: "His portfolio piece as a BI developer",
    look: "dashboard",
  },
  {
    slug: "on-call-week",
    title: "Monitoring for an on-call week",
    student: "Yash Gupta",
    detail: "B.Tech CSE · Delhi",
    track: "Cloud & DevOps",
    summary: "Dashboards and alerts for a service the cohort kept alive through a simulated on-call week.",
    stack: ["Prometheus", "Grafana", "Kubernetes"],
    outcome: "Site reliability internship",
    look: "chart",
  },
  {
    slug: "logistics-tracker",
    title: "A shipment tracker",
    student: "Arjun Menon",
    detail: "B.Tech CSE · Coimbatore",
    track: "Full-stack engineering",
    summary: "Rebuilt twice with mentor feedback, until he could explain every trade-off in it.",
    stack: ["Next.js", "Maps API", "PostgreSQL"],
    outcome: "Full-stack developer at a logistics startup",
    look: "code",
  },
  {
    slug: "hostel-complaints",
    title: "Hostel complaints, sorted",
    student: "Ananya Reddy",
    detail: "B.Tech CSE · Hyderabad",
    track: "Product & design",
    summary: "A product spec, user interviews and a prototype, presented to a hiring partner.",
    stack: ["Product spec", "Figma", "User research"],
    outcome: "Associate product manager",
    look: "design",
  },
  {
    slug: "attendance-pipeline",
    title: "An attendance data pipeline",
    student: "Fatima Sheikh",
    detail: "B.Tech CSE · Bhopal",
    track: "Data & analytics",
    summary: "Daily attendance from three systems, cleaned and joined, with every step reviewed line by line.",
    stack: ["Python", "SQL", "Scheduling"],
    outcome: "Now a data engineer",
    look: "pipeline",
  },
  {
    slug: "remote-ready",
    title: "A job board for remote roles",
    student: "Sahil Khan",
    detail: "B.Tech CSE · Srinagar",
    track: "Full-stack engineering",
    summary: "Built through patchy internet with recordings and late doubt sessions, and deployed for real users.",
    stack: ["React", "Express", "MongoDB"],
    outcome: "Remote developer for a Bengaluru team",
    look: "dashboard",
  },
];
