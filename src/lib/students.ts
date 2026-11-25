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
  {
    slug: "exam-planner",
    title: "A study planner for exam week",
    student: "Meera Iyer",
    detail: "B.Sc CS \u00b7 Chennai",
    track: "Full-stack engineering",
    summary: "Plans each day around the exam timetable and moves topics you skipped to the next free slot.",
    stack: ["React", "Node.js", "MongoDB"],
    outcome: "Used by 300 students in her college",
    look: "code",
    problem: "Students in exam week planned on paper and fell behind the moment one day went wrong.",
    built: ["A timetable import from the college's exam schedule", "A daily plan that moves skipped topics forward", "Reminders the night before each paper"],
    result: "It started as a weekend project. Three hundred students used it in the next exam season, and it became the centre of her interviews.",
  },
  {
    slug: "ocr-marksheets",
    title: "Reading mark sheets with OCR",
    student: "Rahul Verma",
    detail: "B.Tech IT \u00b7 Lucknow",
    track: "Generative AI",
    summary: "Reads scanned mark sheets and flags the ones whose totals don't add up.",
    stack: ["Python", "OCR", "FastAPI"],
    outcome: "Now an ML engineer, govtech",
    look: "code",
    problem: "Admissions staff typed marks from scanned sheets by hand, and mistakes slipped through.",
    built: ["OCR over scanned mark sheets in three layouts", "A check that totals and subject marks agree", "A review screen for the sheets it wasn't sure about"],
    result: "It caught errors the staff had missed for years. The review screen, not the model, is what his interviewers wanted to talk about.",
  },
  {
    slug: "canteen-queue",
    title: "A canteen pre-order app",
    student: "Ishaan Malhotra",
    detail: "B.Tech CSE \u00b7 Chandigarh",
    track: "Product & design",
    summary: "Order before the break ends and pick up without the queue; designed with forty interviews.",
    stack: ["Figma", "React Native", "Firebase"],
    outcome: "UX intern at a food-delivery app",
    look: "design",
    problem: "The canteen queue ate half of every 20-minute break.",
    built: ["Forty short interviews with students and canteen staff", "A pre-order flow tested on paper, then in Figma", "A pickup screen the staff could read from across the counter"],
    result: "The interviews changed the design twice. That research is what got Ishaan his UX internship.",
  },
  {
    slug: "bus-arrival",
    title: "When will the college bus come?",
    student: "Sneha Joshi",
    detail: "B.E. CSE \u00b7 Pune",
    track: "Data & analytics",
    summary: "Predicts college bus arrivals from a term of GPS pings, within two minutes most days.",
    stack: ["Python", "Pandas", "scikit-learn"],
    outcome: "Data analyst, mobility startup",
    look: "chart",
    problem: "Students waited at stops with no idea whether the bus had already gone.",
    built: ["A term of GPS pings, cleaned and joined to the timetable", "A model for arrival time at each stop", "A simple page with the next three buses"],
    result: "It was right within two minutes most days, and honest about the days it wasn't. Her write-up on the bad days got her the analyst role.",
  },
  {
    slug: "k8s-autoscale",
    title: "Autoscaling a results portal",
    student: "Vikram Singh",
    detail: "B.Tech CSE \u00b7 Bhopal",
    track: "Cloud & DevOps",
    summary: "Kept a results portal up on results day by scaling it on real traffic, then load-testing it.",
    stack: ["Kubernetes", "Terraform", "Grafana"],
    outcome: "DevOps Engineer",
    look: "pipeline",
    problem: "The college's results portal fell over every results day.",
    built: ["The portal containerised and run on Kubernetes", "Autoscaling on requests per second, not CPU", "A load test that replayed last year's results day"],
    result: "Results day passed without an outage. Vikram now does this work as a DevOps engineer.",
  },
  {
    slug: "library-search",
    title: "Search for the college library",
    student: "Pooja Hegde",
    detail: "B.E. ISE \u00b7 Mangaluru",
    track: "Full-stack engineering",
    summary: "Full-text search over the catalogue with typo tolerance and an availability badge on every book.",
    stack: ["Next.js", "PostgreSQL", "Search"],
    outcome: "Cloud Engineer, IT services",
    look: "dashboard",
    problem: "The library catalogue only matched exact titles, so most searches found nothing.",
    built: ["Full-text search with typo tolerance", "Live availability on every result", "A reserve button that holds the book for a day"],
    result: "Searches that found a book went from a third to most of them. She explained the ranking in every interview.",
  },
  {
    slug: "resume-reviewer",
    title: "A resume reviewer with citations",
    student: "Aditya Kulkarni",
    detail: "B.E. CSE \u00b7 Nagpur",
    track: "Generative AI",
    summary: "Reviews a resume against a job description and quotes the line behind every suggestion.",
    stack: ["Python", "LLMs", "Evaluation"],
    outcome: "Placement in progress",
    look: "chat",
    problem: "Generic resume advice didn't say which line to change, or why.",
    built: ["A review that quotes the line behind each suggestion", "A job-description match score", "A test set of resumes reviewed by mentors, to check it"],
    result: "Mentors agreed with most of its suggestions on the test set. Aditya is in his final semester and already using it in interviews.",
  },
  {
    slug: "fees-reminders",
    title: "Fee reminders that get paid",
    student: "Neha Choudhary",
    detail: "B.Tech IT \u00b7 Jodhpur",
    track: "Data & analytics",
    summary: "Tested three reminder messages on overdue fees and measured which one got paid.",
    stack: ["SQL", "Python", "A/B testing"],
    outcome: "Internship, edtech product",
    look: "chart",
    problem: "Fee reminders went out as one long email that most families ignored.",
    built: ["Three short reminder messages, sent at random", "A dashboard of payments within a week of each", "A write-up of what changed and by how much"],
    result: "The shortest message won clearly. The experiment, more than the dashboard, is what her product team asked about.",
  },
  {
    slug: "lab-booking",
    title: "Booking lab slots",
    student: "Rohan Verma",
    detail: "B.Tech CSE \u00b7 Lucknow",
    track: "Full-stack engineering",
    summary: "Lab slots booked in two taps, with a waitlist that fills cancelled slots automatically.",
    stack: ["React", "Express", "PostgreSQL"],
    outcome: "Frontend Developer",
    look: "dashboard",
    problem: "Lab slots were booked on a shared sheet that someone always overwrote.",
    built: ["Booking in two taps, with clashes blocked", "A waitlist that fills cancelled slots", "A view for lab assistants of who is in each slot"],
    result: "The sheet was retired in a week. Rohan's interviewers spent most of the time on the waitlist logic.",
  },
  {
    slug: "accessibility-audit",
    title: "An accessibility audit of the college site",
    student: "Ishita Banerjee",
    detail: "B.Des \u00b7 Kolkata",
    track: "Product & design",
    summary: "Audited the college website with screen-reader users and fixed the twelve worst problems.",
    stack: ["Figma", "WCAG", "Usability tests"],
    outcome: "Product Designer",
    look: "design",
    problem: "The college website was close to unusable with a screen reader.",
    built: ["Sessions with three screen-reader users", "A list of problems ranked by how badly they blocked people", "Fixes for the twelve worst, tested again"],
    result: "Every session ended with a task that couldn't be done before. Ishita now does this work as a product designer.",
  },
  {
    slug: "log-alerts",
    title: "Alerts that wake the right person",
    student: "Karan Bhatia",
    detail: "B.Tech ECE \u00b7 Jaipur",
    track: "Cloud & DevOps",
    summary: "Routed alerts by service and time of day, and cut the night's false alarms by most.",
    stack: ["Prometheus", "Alertmanager", "Docker"],
    outcome: "Site Reliability Intern",
    look: "pipeline",
    problem: "Every alert paged everyone, so people started ignoring them.",
    built: ["Alerts grouped by service and owner", "Quiet hours for alerts that could wait", "A week of alerts replayed to measure the change"],
    result: "Night-time false alarms fell to a handful. The replay is what his SRE interviewers asked about.",
  },
  {
    slug: "crop-prices",
    title: "Mandi prices for farmers",
    student: "Divya Rao",
    detail: "B.Sc Data Science \u00b7 Hyderabad",
    track: "Data & analytics",
    summary: "Daily mandi prices cleaned into one chart per crop, sent by SMS in Telugu.",
    stack: ["Python", "Airflow", "SMS"],
    outcome: "Data Engineer, agritech",
    look: "chart",
    problem: "Farmers near her town sold at whatever price the first trader offered.",
    built: ["A daily job that pulls and cleans mandi prices", "One chart per crop, by market", "An SMS in Telugu with the best nearby price"],
    result: "A hundred farmers signed up in the first month. Divya joined an agritech company as a data engineer.",
  },
  {
    slug: "code-review-bot",
    title: "A bot for first code reviews",
    student: "Siddharth Jain",
    detail: "B.Tech CSE \u00b7 Indore",
    track: "Generative AI",
    summary: "Leaves a first review on student pull requests so trainers start from the real problems.",
    stack: ["TypeScript", "LLMs", "GitHub Actions"],
    outcome: "SDE Intern, developer tools",
    look: "code",
    problem: "Trainers spent their review time on naming and formatting, not on design.",
    built: ["A bot that comments on style and obvious bugs first", "Comments that link the rule they come from", "A measure of how often trainers kept its comments"],
    result: "Trainers kept most of its comments, and reviews got shorter. It got Siddharth an internship building developer tools.",
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

/* ------------------------------------------------------------ the stack */

/** A product on the student home page's stack explorer. */
export type StackApp = {
  id: ProductId;
  /** What the name means. */
  meaning: string;
  headline: string;
  body: string;
  features: { text: string; ai?: boolean }[];
  /** A short fact on its tab. */
  stat: string;
};

/** In the stack's order: Setu, Marg, Kaksha, Riyaaz, Spardha. */
export const stack: StackApp[] = [
  {
    id: "setu",
    meaning: "Setu means bridge",
    headline: "Your college, in one app.",
    body: "Timetable, attendance, marks, fees and placement drives from your college, on the same account as everything else.",
    features: [{ text: "Attendance in one tap" }, { text: "Your timetable, always current" }, { text: "Marks and results as they're published" }, { text: "Placement drives you're eligible for" }],
    stat: "16 modules",
  },
  {
    id: "marg",
    meaning: "Marg means path",
    headline: "Always know the next step.",
    body: "Roadmaps for DSA, AI/ML, cloud and full stack that move on when you master a stage, not when the calendar says so.",
    features: [{ text: "Six tracks, six stages each" }, { text: "The next stage picked by what you've mastered", ai: true }, { text: "Hints from a mentor that never hands you the answer", ai: true }, { text: "Each stage linked to videos, problems and a test" }],
    stat: "6 tracks",
  },
  {
    id: "kaksha",
    meaning: "Kaksha means classroom",
    headline: "Learn with your batch.",
    body: "Cohort courses with video, labs and live classes, finished with a project you can show in an interview.",
    features: [{ text: "Live classes, with recordings" }, { text: "Quick checks inside every video" }, { text: "Labs in the browser, nothing to install" }, { text: "Notes in Hindi and your own language", ai: true }],
    stat: "Cohorts",
  },
  {
    id: "riyaaz",
    meaning: "Riyaaz means practice",
    headline: "Twenty minutes, every day.",
    body: "A few problems a day, judged the moment you run them, with a streak and a revision queue that brings back what you missed.",
    features: [{ text: "Python, C++, Java and JavaScript" }, { text: "Hints that unlock one at a time" }, { text: "Missed problems come back after 1, 3 and 7 days" }, { text: "A review that explains why a test failed", ai: true }],
    stat: "4 languages",
  },
  {
    id: "spardha",
    meaning: "Spardha means competition",
    headline: "Scores recruiters trust.",
    body: "Proctored tests and campus contests with instant results, and certificates anyone can check with one link.",
    features: [{ text: "Timed tests and coding contests" }, { text: "Instant results and live leaderboards" }, { text: "A paper of your own, at the same difficulty", ai: true }, { text: "Certificates with a verify link" }],
    stat: "Recruiter-ready",
  },
];

/** One student's way through the stack, admission to offer. */
export const studentJourney: { title: string; app: ProductId; body: string }[] = [
  { title: "Join", app: "setu", body: "Your TechCity ID, batch and timetable on day one." },
  { title: "Learn", app: "kaksha", body: "Cohort videos, labs and live classes." },
  { title: "Practise", app: "riyaaz", body: "A few problems a day, and a streak." },
  { title: "Progress", app: "marg", body: "Your path moves as you master each stage." },
  { title: "Prove", app: "spardha", body: "Proctored tests and verified certificates." },
  { title: "Get hired", app: "setu", body: "Drives, interviews and offers, tracked." },
];
