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
    id: "setu",
    lead: "Your classes, in one place.",
    body: "Courses, assignments and attendance from your college, on the same account as everything else.",
    points: ["Courses and assignments", "Attendance and grades", "Everything on one login"],
  },
  {
    id: "marg",
    lead: "Know what to learn next.",
    body: "Roadmaps for DSA, AI/ML, cloud and more turn a big goal into small steps, with the resources for each one.",
    points: ["A roadmap for your goal", "Curated resources per step", "Progress you can see"],
  },
  {
    id: "kaksha",
    lead: "Learn with a cohort.",
    body: "Video courses with hands-on labs, taken with your batch and finished with something you built.",
    points: ["Video lessons and labs", "Live cohort classes", "A project to show"],
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
  /** Shown on the Featured page. */
  featured?: boolean;
  /** The project page: the problem, what was built, how it turned out. */
  problem: string;
  built: string[];
  result: string;
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
    featured: true,
    problem: "A small payments team needed to see failed payments and refunds the moment they happened, not in tomorrow's spreadsheet.",
    built: ["A live list of transactions, filterable by status and date", "A refunds view with the reason and who approved it", "Alerts for spikes in failed payments"],
    result: "Every week ended in a code review. By the end, Aarav could defend each design choice, and half of his SDE-1 interview was about this project.",
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
    featured: true,
    problem: "Students asked the same syllabus questions again and again, and the answers lived across dozens of PDFs.",
    built: ["Retrieval over every unit's notes, split and indexed", "A chat that cites the unit each answer came from", "An evaluation set of real questions, to measure how often answers were right"],
    result: "The first version was buggy. Measuring it properly is what made it good, and that evaluation is what got Harshit his AI internship.",
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
    problem: "Most text models are trained on English; Gujarati news gets sorted badly or not at all.",
    built: ["A labelled set of Gujarati news headlines", "A small model fine-tuned to sort them by topic", "A write-up of what worked, what didn't and why"],
    result: "Her mentor pushed her to write it up properly. That write-up is what her interviewers asked about, and it got her a research internship.",
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
    featured: true,
    problem: "The cohort's capstone app had to deploy safely, recover from bad releases and tell the team when something broke.",
    built: ["A CI/CD pipeline that builds, tests and deploys on every merge", "Rollbacks that take one command", "Alerts that fire before users notice, tested by breaking things on purpose"],
    result: "Breaking it and fixing it at 2 am taught Priya more than any certificate. She moved from electronics to cloud and is now a cloud support engineer.",
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
    problem: "A neighbourhood store guessed what to stock for festivals, and often guessed wrong.",
    built: ["A year of sales, cleaned and organised", "Charts that show what sells, and when", "A simple forecast for festival weeks"],
    result: "Indian data made the problem feel close to home, and the project led Riya to an analytics internship at a healthtech.",
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
    featured: true,
    problem: "Students missed campus events because notices were scattered across groups, boards and emails.",
    built: ["Interviews with students about how they find events", "Flows and screens for browsing, saving and reminders", "A tested prototype, built with two developers on the capstone"],
    result: "Pairing with developers taught Kavya how handoff really works. She is now a UX designer.",
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
    problem: "A sales head got the numbers in messy spreadsheets, a week late.",
    built: ["Spreadsheets cleaned and joined with Python and SQL", "A dashboard that refreshes every morning", "A one-page view a sales head can read in a minute"],
    result: "The first two weeks felt slow; the dashboard at the end became Kunal's portfolio and his way into BI.",
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
    problem: "A service is only as good as how fast the team hears it's down.",
    built: ["Dashboards for the service's health", "Alerts with sensible thresholds", "A week of simulated on-call, handled as a team"],
    result: "The on-call week was chaos, and the best week of the program. It led Yash to a site reliability internship.",
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
    problem: "A logistics team needed to see where each shipment was without calling the driver.",
    built: ["Live shipment status on a map", "A timeline for every shipment", "Notifications when a delivery is running late"],
    result: "Rebuilding it twice with mentor feedback gave Arjun the confidence to talk about trade-offs, and a job at a logistics startup.",
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
    problem: "Hostel complaints went into a register and were rarely followed up.",
    built: ["Interviews with students and wardens", "A product spec with priorities and success measures", "A clickable prototype, presented to a hiring partner"],
    result: "Writing specs and presenting to a real hiring partner made the APM interviews feel familiar. Ananya is now an associate product manager.",
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
    problem: "Attendance lived in three systems that never agreed.",
    built: ["Daily imports from all three", "Cleaning and joining, with checks at every step", "A scheduled job that runs before classes start"],
    result: "Her mentor reviewed every line. Now Fatima's team lead says her pull requests are the easiest to review.",
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
    problem: "Students outside the big cities struggle to find remote roles that fit them.",
    built: ["Job listings, filters and saved searches", "Accounts, applications and email alerts", "Deployed for real users, and kept running"],
    result: "Built through patchy internet with recordings and late doubt sessions. Sahil now works remotely for a Bengaluru team.",
  },
];

/* ---------------------------------------------------------- openings */

/**
 * Open roles for students (/students/careers). Students apply to one through
 * the form on that page; `value` is what the form sends. Details are kept
 * general on purpose; edit them here as roles open and close.
 */
export type Opening = {
  value: string;
  title: string;
  team: string;
  /** Kind of role, shown as a chip. */
  type: string;
  summary: string;
  /** What you'll do. */
  work: string[];
  /** What helps. */
  skills: string[];
};

export const openings: Opening[] = [
  {
    value: "design-intern",
    title: "Designing Intern",
    team: "Design",
    type: "Internship",
    summary: "Design screens, flows and campaigns for TechCity's products and programs, with the team that ships them.",
    work: ["Design screens and flows for our five products", "Make posters, decks and social posts for campus programs", "Test your designs with students and improve them"],
    skills: ["Figma", "Visual design", "A portfolio, even a small one"],
  },
  {
    value: "junior-intern",
    title: "Junior Intern",
    team: "Programs and operations",
    type: "Internship",
    summary: "Help run TechCity's programs on campus: batches, schedules, students and the reports that keep them on track.",
    work: ["Coordinate batches, sessions and trainers", "Keep student records and reports up to date", "Help plan workshops and placement drives"],
    skills: ["Clear communication", "Spreadsheets", "Getting things done"],
  },
  {
    value: "software-intern",
    title: "Software Development Intern",
    team: "Engineering",
    type: "Internship",
    summary: "Build features for Setu, Marg, Kaksha, Riyaaz and Spardha with the engineers who build them, reviewed like real work.",
    work: ["Build and ship features with code reviews", "Fix bugs and write tests", "Work across the frontend, backend and APIs"],
    skills: ["JavaScript or Python", "Git", "A project you can talk about"],
  },
];

export const projectBySlug = (slug: string) => studentProjects.find((p) => p.slug === slug);
export const projectHref = (p: StudentProject) => `/students/projects/${p.slug}`;
