import type { IconName } from "@/components/icons";
import type { HeroStat, Tile } from "@/components/page-blocks";

/*
 * Content for the eight program pages (/programs/<slug>). Every page has the
 * same sections, in the same order, so they read as one set:
 *
 *   hero      run-in headline, a stageshow scene, rolling figures
 *   process   how it runs, in four steps; each step plays a small scene of
 *             the thing it produces (components/program-process)
 *   gets      what the program gives (four ruled tiles)
 *   covers    the subjects, tracks or modules inside it
 *
 * Figures are the site's own (30+ subjects, 50+ industry partners, 40+ faculty
 * and trainers, 10K+ students, five products). The names and numbers inside
 * the process scenes are illustrations of the product, not records.
 */

export type ProgramSlug =
  | "trainers"
  | "placement-preparation"
  | "student-placement"
  | "mentorship"
  | "faculty-development"
  | "online-lessons"
  | "online-content"
  | "platforms";

/** What a process step shows: one small screen, the thing the step produces. */
export type Scene =
  /** Options picked one by one. */
  | { kind: "select"; title: string; prompt: string; chips: string[]; picked: number[]; done: string }
  /** People or groups assigned, row by row. */
  | { kind: "assign"; title: string; rows: { name: string; role: string; tag: string }[] }
  /** A week's timetable filling with sessions. */
  | { kind: "week"; title: string; sessions: { day: number; slot: number; label: string }[] }
  /** Bars filling to their values. */
  | { kind: "progress"; title: string; rows: { label: string; value: number; note: string }[] }
  /** A scorecard: a total rolling up, its parts, a verdict. */
  | { kind: "score"; title: string; score: number; criteria: { label: string; value: number }[]; verdict: string }
  /** A report: figures rolling in, then its findings. */
  | { kind: "report"; title: string; metrics: { value: number; suffix?: string; label: string }[]; lines: string[] }
  /** A funnel of stages and their counts. */
  | { kind: "pipeline"; title: string; stages: { label: string; value: number }[] }
  /** A conversation: messages arriving, then a status. */
  | { kind: "chat"; title: string; status: string; lines: { who: string; text: string; me?: boolean }[]; result: string }
  /** A library of material being published. */
  | { kind: "library"; title: string; items: { type: "Video" | "Notes" | "Test" | "Lab"; label: string; meta: string }[]; tag: string };

export type ProcessStep = { title: string; body: string; scene: Scene };

export type ProgramPage = {
  slug: ProgramSlug;
  /** The anchor the home page bento and older links use. */
  anchor: string;
  label: string;
  audience: "For students" | "For colleges";
  icon: IconName;
  summary: string;
  /** `body` is the page's description for search and sharing. */
  hero: { lead: string; rest: string; body: string; stats: HeroStat[] };
  process: { lead: string; rest: string; steps: ProcessStep[] };
  gets: { lead: string; rest: string; tiles: Tile[] };
  covers: { lead: string; rest: string; items: { title: string; body: string }[] };
};

export const programPages: ProgramPage[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "trainers",
    anchor: "trainers",
    label: "Trainers for students",
    audience: "For students",
    icon: "trainer",
    summary: "Industry trainers teach 30+ subjects on campus.",
    hero: {
      lead: "Industry trainers, inside your timetable.",
      rest: "Practitioners teach on campus, alongside your faculty.",
      body: "TechCity places working engineers in your classrooms and labs for the subjects companies hire for, in your own slots and semester.",
      stats: [
        { value: "30+", label: "Subjects taught on campus" },
        { value: "40+", label: "Faculty & trainers" },
        { value: "10K+", label: "Students mentored" },
      ],
    },
    process: {
      lead: "One term, four steps.",
      rest: "From the subjects you pick to the report at the end.",
      steps: [
        {
          title: "Pick the subjects",
          body: "Choose from 30+ subjects with your HoD, mapped to the semester and the syllabus.",
          scene: {
            kind: "select",
            title: "Semester 5 · CSE",
            prompt: "Subjects for this term",
            chips: ["DSA in Java", "MERN stack", "AI & ML", "Cloud & DevOps", "Cybersecurity", "IoT", "Power BI", "Aptitude"],
            picked: [0, 1, 2],
            done: "3 subjects added to the timetable",
          },
        },
        {
          title: "Meet the trainers",
          body: "One trainer per subject, introduced to the department before the first class.",
          scene: {
            kind: "assign",
            title: "Trainers for Semester 5",
            rows: [
              { name: "Rahul Mehta", role: "DSA in Java · 9 years at product companies", tag: "Confirmed" },
              { name: "Sneha Kapoor", role: "MERN stack · full-stack lead", tag: "Confirmed" },
              { name: "Arjun Nair", role: "AI & ML · data scientist", tag: "Confirmed" },
            ],
          },
        },
        {
          title: "Teach and build",
          body: "Weekly sessions and labs in your slots. Every subject ends in a project students ship.",
          scene: {
            kind: "week",
            title: "Week 6 · CSE 3rd year",
            sessions: [
              { day: 0, slot: 0, label: "DSA lab" },
              { day: 1, slot: 1, label: "MERN" },
              { day: 2, slot: 0, label: "AI & ML" },
              { day: 3, slot: 1, label: "DSA lab" },
              { day: 4, slot: 0, label: "Project review" },
            ],
          },
        },
        {
          title: "Review the term",
          body: "A report for every batch: attendance, scores, projects and what to change next term.",
          scene: {
            kind: "report",
            title: "Term report · CSE",
            metrics: [
              { value: 94, suffix: "%", label: "Attendance" },
              { value: 58, label: "Projects shipped" },
              { value: 81, suffix: "%", label: "Average score" },
            ],
            lines: ["Strongest: the DSA labs", "Next term: add system design"],
          },
        },
      ],
    },
    gets: {
      lead: "Teaching the way a team works.",
      rest: "The same standard in every batch, whichever trainer walks in.",
      tiles: [
        { icon: "trainer", lead: "Practitioners.", body: "Engineers who build software for a living, reviewed every term." },
        { icon: "code", lead: "Lab-first.", body: "Most hours are hands-on: students write, run and review code in class." },
        { icon: "faculty", lead: "Faculty in the room.", body: "Your faculty co-teach and keep the material when the term ends." },
        { icon: "pulse", lead: "Progress you can see.", body: "Attendance, submissions and scores for every batch in Setu." },
      ],
    },
    covers: {
      lead: "Subjects students are hired for.",
      rest: "A few of the 30+ we teach on campus.",
      items: [
        { title: "Data structures & algorithms", body: "Java, C++ or Python, from arrays to graphs, with timed practice." },
        { title: "Full-stack web", body: "MERN and Python full stack, from a first page to a deployed app." },
        { title: "AI & machine learning", body: "Python, data analysis, models and evaluation on real datasets." },
        { title: "Cloud & DevOps", body: "Linux, Git, containers, CI/CD and a cloud deployment of their own." },
        { title: "Cybersecurity", body: "Networks, web security and the habits of secure engineering." },
        { title: "Core & industrial", body: "Embedded systems, IoT, SCADA and PLC for electrical and electronics batches." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "placement-preparation",
    anchor: "placement",
    label: "Placement preparation",
    audience: "For students",
    icon: "target",
    summary: "Mock interviews, aptitude drills and weekly feedback.",
    hero: {
      lead: "Interview-ready by final year.",
      rest: "Aptitude, coding rounds and interviews, practised every week.",
      body: "Students rehearse every round a company runs, get scored feedback after each one and know where they stand before the first drive.",
      stats: [
        { value: "50+", label: "Industry partners shaping the rounds" },
        { value: "40+", label: "Faculty & trainers" },
        { value: "10K+", label: "Students mentored" },
      ],
    },
    process: {
      lead: "From a baseline to offer-ready.",
      rest: "A placement season, start to finish.",
      steps: [
        {
          title: "Take the baseline",
          body: "One diagnostic across aptitude, coding and communication sets each student's starting point.",
          scene: {
            kind: "score",
            title: "Baseline · Ishita B.",
            score: 58,
            criteria: [
              { label: "Aptitude", value: 66 },
              { label: "Coding", value: 49 },
              { label: "Communication", value: 61 },
            ],
            verdict: "Focus: coding rounds",
          },
        },
        {
          title: "Drill every week",
          body: "Short, timed sessions matched to each batch's weakest areas.",
          scene: {
            kind: "progress",
            title: "Week 4 drills · Batch B",
            rows: [
              { label: "Quantitative aptitude", value: 82, note: "20 min, timed" },
              { label: "Logical reasoning", value: 74, note: "15 min, timed" },
              { label: "Coding set 3", value: 68, note: "3 problems on Spardha" },
            ],
          },
        },
        {
          title: "Sit mock interviews",
          body: "Technical and HR mocks with industry interviewers, and a scorecard after each.",
          scene: {
            kind: "chat",
            title: "Mock interview",
            status: "Recording",
            lines: [
              { who: "Interviewer", text: "Walk me through the project on your resume." },
              { who: "Ishita", text: "A payments dashboard in React, with tests for every API.", me: true },
              { who: "Interviewer", text: "Good. How would you make it handle ten times the users?" },
            ],
            result: "Scorecard: strong on projects",
          },
        },
        {
          title: "Go into drives ready",
          body: "A readiness report for your placement cell before the first company visits.",
          scene: {
            kind: "report",
            title: "Readiness · Final year",
            metrics: [
              { value: 86, suffix: "%", label: "Drive-ready" },
              { value: 412, label: "Mocks taken" },
              { value: 24, suffix: " pts", label: "Average score gain" },
            ],
            lines: ["Coding scores up the most", "Shared with the placement cell"],
          },
        },
      ],
    },
    gets: {
      lead: "Every round, before the real one.",
      rest: "Built from how our industry partners actually hire.",
      tiles: [
        { icon: "pulse", lead: "Aptitude drills.", body: "Quant, reasoning and verbal, timed like online assessments." },
        { icon: "code", lead: "Coding rounds.", body: "Timed problem sets on Spardha, scored the moment they're submitted." },
        { icon: "team", lead: "Mock interviews.", body: "Technical and HR mocks with industry interviewers, recorded and scored." },
        { icon: "target", lead: "A readiness score.", body: "Every student sees where they stand and what to fix next." },
      ],
    },
    covers: {
      lead: "What we drill.",
      rest: "The rounds students meet in campus hiring.",
      items: [
        { title: "Quantitative aptitude", body: "Arithmetic, data interpretation and speed maths, timed." },
        { title: "Logical reasoning", body: "Puzzles, sequences and the patterns online tests repeat." },
        { title: "Verbal ability", body: "Reading, grammar and the email and essay tasks some companies set." },
        { title: "Coding assessments", body: "Arrays to dynamic programming, at the difficulty companies set." },
        { title: "Technical interviews", body: "Projects, fundamentals and problem solving, out loud." },
        { title: "HR & communication", body: "Telling your story, group discussions and the questions that trip people." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "student-placement",
    anchor: "placing",
    label: "Student placement",
    audience: "For students",
    icon: "briefcase",
    summary: "Placement drives and referrals with our partners.",
    hero: {
      lead: "From campus to first offer.",
      rest: "Placement drives and referrals with the companies we work with.",
      body: "TechCity connects ready students with campus drives and referrals from its industry partners, and stays with them through the offer.",
      stats: [
        { value: "50+", label: "Industry partners" },
        { value: "30+", label: "Partner colleges" },
        { value: "10K+", label: "Students mentored" },
      ],
    },
    process: {
      lead: "From a profile to an offer.",
      rest: "What happens between ready and hired.",
      steps: [
        {
          title: "Build the profile",
          body: "Resume, projects and readiness score in one profile companies can read in a minute.",
          scene: {
            kind: "report",
            title: "Profile · Siddharth Rao",
            metrics: [
              { value: 84, suffix: "%", label: "Readiness" },
              { value: 3, label: "Projects" },
              { value: 6, label: "Mock interviews" },
            ],
            lines: ["Resume reviewed", "GitHub and portfolio linked"],
          },
        },
        {
          title: "Match to roles",
          body: "We match each profile to the drives and referrals that fit it.",
          scene: {
            kind: "select",
            title: "Matches · Siddharth Rao",
            prompt: "Roles that fit this profile",
            chips: ["Backend engineer", "SDE intern", "Data analyst", "QA engineer", "Cloud support", "Frontend engineer"],
            picked: [0, 1, 5],
            done: "Applied to 3 roles",
          },
        },
        {
          title: "Clear the rounds",
          body: "Each company's rounds, prepared for in advance and tracked as they happen.",
          scene: {
            kind: "pipeline",
            title: "Drive · Final year, CSE",
            stages: [
              { label: "Applied", value: 64 },
              { label: "Shortlisted", value: 28 },
              { label: "Interviews", value: 14 },
              { label: "Offers", value: 9 },
            ],
          },
        },
        {
          title: "Offer and join",
          body: "We stay with students through offers, documents and joining day.",
          scene: {
            kind: "assign",
            title: "Offers this season",
            rows: [
              { name: "Siddharth Rao", role: "Backend engineer", tag: "Offer" },
              { name: "Priya Khanna", role: "Data analyst", tag: "Offer" },
              { name: "Aman Joshi", role: "SDE intern, then full time", tag: "Joined" },
            ],
          },
        },
      ],
    },
    gets: {
      lead: "A way in, not just a list of jobs.",
      rest: "Built on the companies we already work with.",
      tiles: [
        { icon: "briefcase", lead: "Campus drives.", body: "Our industry partners hiring at your college, with the rounds prepared." },
        { icon: "team", lead: "Referrals.", body: "Strong profiles go to hiring managers directly." },
        { icon: "content", lead: "Profiles that match.", body: "Scores, projects and resume in one profile, matched to each role." },
        { icon: "check", lead: "Tracked to the offer.", body: "Every application followed from shortlist to joining day." },
      ],
    },
    covers: {
      lead: "Roles our students go into.",
      rest: "Across software, data and core engineering.",
      items: [
        { title: "Software engineering", body: "Backend, frontend and full stack at product and services companies." },
        { title: "Data & analytics", body: "Analyst and junior data roles, from Power BI to Python." },
        { title: "Cloud & DevOps", body: "Support, operations and junior DevOps roles." },
        { title: "Quality engineering", body: "Manual and automation testing, with the tools teams use." },
        { title: "Core engineering", body: "Embedded, IoT and industrial roles for electrical and electronics." },
        { title: "Internships", body: "Six-month internships that often turn into the first offer." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "mentorship",
    anchor: "mentorship",
    label: "Mentorship",
    audience: "For students",
    icon: "compass",
    summary: "One-to-one sessions with engineers who hire.",
    hero: {
      lead: "Mentors from the industry.",
      rest: "One-to-one time with engineers who hire.",
      body: "Students meet engineers from the field they want to join, one to one, to plan, get their work reviewed and learn how hiring really works.",
      stats: [
        { value: "50+", label: "Industry partners" },
        { value: "40+", label: "Faculty & trainers" },
        { value: "10K+", label: "Students mentored" },
      ],
    },
    process: {
      lead: "A mentor, from first goal to next step.",
      rest: "Every session builds on the last.",
      steps: [
        {
          title: "Set the goals",
          body: "Students say where they want to go: a role, a skill, a company.",
          scene: {
            kind: "select",
            title: "Goals · Neha Choudhary",
            prompt: "What do you want from mentoring?",
            chips: ["A backend role", "Crack DSA rounds", "Open source", "Higher studies", "System design", "A first internship"],
            picked: [0, 1, 4],
            done: "3 goals saved",
          },
        },
        {
          title: "Get matched",
          body: "We match each student with a mentor who works in that field.",
          scene: {
            kind: "assign",
            title: "Your mentor",
            rows: [
              { name: "Divya Verma", role: "Backend engineer · 8 years", tag: "Matched" },
              { name: "Karan Sethi", role: "Engineering manager · hires juniors", tag: "Backup" },
            ],
          },
        },
        {
          title: "Meet one to one",
          body: "Booked sessions for reviews, questions and planning, online or on campus.",
          scene: {
            kind: "chat",
            title: "Session · Divya Verma",
            status: "Live",
            lines: [
              { who: "Neha", text: "Could you review my API project before I apply?", me: true },
              { who: "Divya", text: "Yes. Add tests and a README first; reviewers look there." },
              { who: "Divya", text: "Then we'll do a mock system design next week." },
            ],
            result: "Next session · Thursday, 6 pm",
          },
        },
        {
          title: "Track the progress",
          body: "Goals and next steps are tracked, so nothing said in a session gets lost.",
          scene: {
            kind: "progress",
            title: "Goals · Neha Choudhary",
            rows: [
              { label: "A backend role", value: 70, note: "2 applications out" },
              { label: "Crack DSA rounds", value: 80, note: "120 problems solved" },
              { label: "System design", value: 45, note: "1 mock done" },
            ],
          },
        },
      ],
    },
    gets: {
      lead: "Advice from people who hire.",
      rest: "Specific to each student, not a lecture.",
      tiles: [
        { icon: "team", lead: "One to one.", body: "Booked sessions with one mentor who knows the student's work." },
        { icon: "code", lead: "Project reviews.", body: "Code and portfolio reviewed the way a hiring team would." },
        { icon: "roadmap", lead: "A plan.", body: "Clear next steps after every session, tracked over the term." },
        { icon: "briefcase", lead: "How hiring works.", body: "What interviews test and what gets a resume read." },
      ],
    },
    covers: {
      lead: "What students bring to a mentor.",
      rest: "The questions we hear most.",
      items: [
        { title: "Choosing a path", body: "Backend or data, product or services, a job or higher studies." },
        { title: "Project feedback", body: "What makes a project worth talking about in an interview." },
        { title: "Interview strategy", body: "Preparing for a company, and learning from the rounds that went badly." },
        { title: "Open source & portfolios", body: "Where to start, and how to make work visible." },
        { title: "Higher studies", body: "Which programs, which exams, and when it makes sense." },
        { title: "The first job", body: "Offers, the first ninety days and growing in a team." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "faculty-development",
    anchor: "faculty",
    label: "Faculty development",
    audience: "For colleges",
    icon: "faculty",
    summary: "Hands-on labs in AI, cloud and DevOps for faculty.",
    hero: {
      lead: "Faculty who stay current.",
      rest: "Hands-on programs in AI, cloud and DevOps for your teaching staff.",
      body: "Faculty development programs that put your teaching staff through the same labs industry engineers use, with material ready for their own classes.",
      stats: [
        { value: "30+", label: "Partner colleges" },
        { value: "40+", label: "Faculty & trainers" },
        { value: "50+", label: "Industry partners" },
      ],
    },
    process: {
      lead: "From a track to a class of their own.",
      rest: "Faculty leave ready to teach what they learned.",
      steps: [
        {
          title: "Pick a track",
          body: "Choose the topics with your HoDs, from AI and cloud to full stack and security.",
          scene: {
            kind: "select",
            title: "FDP · Department of CSE",
            prompt: "Tracks for this program",
            chips: ["Generative AI", "Cloud computing", "DevOps", "Full stack", "Data analytics", "Cybersecurity"],
            picked: [0, 2],
            done: "2 tracks for 24 faculty",
          },
        },
        {
          title: "Schedule it",
          body: "An intensive week in a break, or sessions spread through the term.",
          scene: {
            kind: "week",
            title: "FDP week · December",
            sessions: [
              { day: 0, slot: 0, label: "Gen AI basics" },
              { day: 1, slot: 0, label: "Prompt labs" },
              { day: 2, slot: 1, label: "RAG lab" },
              { day: 3, slot: 0, label: "CI/CD lab" },
              { day: 4, slot: 1, label: "Mini project" },
            ],
          },
        },
        {
          title: "Learn by doing",
          body: "Labs, a mini project and a session on teaching it to students.",
          scene: {
            kind: "progress",
            title: "Labs · 24 faculty",
            rows: [
              { label: "Lab 1 · Prompting", value: 100, note: "All complete" },
              { label: "Lab 2 · Retrieval (RAG)", value: 83, note: "20 of 24" },
              { label: "Mini project", value: 54, note: "In review" },
            ],
          },
        },
        {
          title: "Certify and teach",
          body: "Faculty are certified and leave with lesson plans and labs for their classes.",
          scene: {
            kind: "library",
            title: "Ready to teach · Gen AI",
            items: [
              { type: "Notes", label: "Lesson plans, 8 weeks", meta: "Mapped to the syllabus" },
              { type: "Lab", label: "Six student labs", meta: "With solutions" },
              { type: "Test", label: "Unit quizzes", meta: "Auto-graded in Spardha" },
            ],
            tag: "Shared",
          },
        },
      ],
    },
    gets: {
      lead: "Labs first, slides second.",
      rest: "Built with the teams who use these tools daily.",
      tiles: [
        { icon: "code", lead: "Hands-on labs.", body: "Faculty build, deploy and debug, the same as engineers do." },
        { icon: "content", lead: "Ready to teach.", body: "Lesson plans, labs and quizzes for their own classes." },
        { icon: "calendar", lead: "Fits the calendar.", body: "A week in a break or sessions through the term." },
        { icon: "check", lead: "Certified.", body: "Certificates and records that support accreditation." },
      ],
    },
    covers: {
      lead: "Tracks for faculty.",
      rest: "The ones colleges ask for most.",
      items: [
        { title: "Generative AI & ML", body: "Models, prompting, retrieval and evaluation, with labs." },
        { title: "Cloud computing", body: "Core services, deployment and cost, on a real account." },
        { title: "DevOps", body: "Git, containers, CI/CD and monitoring, end to end." },
        { title: "Full-stack development", body: "A modern web stack, from first page to deployed app." },
        { title: "Data analytics", body: "Python, SQL and Power BI on real datasets." },
        { title: "Outcome-based teaching", body: "Mapping labs and projects to course outcomes." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "online-lessons",
    anchor: "online",
    label: "Online lessons",
    audience: "For colleges",
    icon: "video",
    summary: "Live virtual classes with industry experts.",
    hero: {
      lead: "Live classes, on any schedule.",
      rest: "Industry experts teach online when campus time is tight.",
      body: "Live online classes taught by industry experts, scheduled around your timetable, with practice between classes and an assessment at the end.",
      stats: [
        { value: "30+", label: "Subjects" },
        { value: "40+", label: "Faculty & trainers" },
        { value: "10K+", label: "Students mentored" },
      ],
    },
    process: {
      lead: "A course, live, from plan to grade.",
      rest: "Experts teach; students practise in between.",
      steps: [
        {
          title: "Plan the course",
          body: "Pick the subject and the slots with your department.",
          scene: {
            kind: "week",
            title: "System design · 8 weeks",
            sessions: [
              { day: 1, slot: 1, label: "Live class" },
              { day: 3, slot: 1, label: "Live class" },
              { day: 4, slot: 0, label: "Doubt clinic" },
            ],
          },
        },
        {
          title: "Teach it live",
          body: "An expert teaches each class live, with code, questions and polls.",
          scene: {
            kind: "chat",
            title: "Live · Class 5",
            status: "68 watching",
            lines: [
              { who: "Sahil", text: "Why put a cache in front of the database?", me: true },
              { who: "Instructor", text: "Most reads repeat. The cache answers them in a millisecond." },
              { who: "Instructor", text: "Let's draw where it fails, then fix it." },
            ],
            result: "Recording saved to Kaksha",
          },
        },
        {
          title: "Practise in between",
          body: "Assignments and practice sets in Kaksha and Riyaaz keep students moving.",
          scene: {
            kind: "progress",
            title: "Week 5 · Practice",
            rows: [
              { label: "Assignment 3 · URL shortener", value: 86, note: "Submitted" },
              { label: "Practice set · Caching", value: 72, note: "On Riyaaz" },
              { label: "Reading · Load balancing", value: 64, note: "In Kaksha" },
            ],
          },
        },
        {
          title: "Assess the batch",
          body: "Quizzes, a project and a report for each batch at the end.",
          scene: {
            kind: "score",
            title: "Final assessment",
            score: 78,
            criteria: [
              { label: "Quizzes", value: 81 },
              { label: "Project", value: 76 },
              { label: "Attendance", value: 92 },
            ],
            verdict: "Report sent to the HoD",
          },
        },
      ],
    },
    gets: {
      lead: "An expert in the room, from anywhere.",
      rest: "Live teaching, not recorded lectures.",
      tiles: [
        { icon: "video", lead: "Live classes.", body: "Taught live by working experts, with code on screen." },
        { icon: "quote", lead: "Questions answered.", body: "Students ask in class and in weekly doubt clinics." },
        { icon: "content", lead: "Recordings.", body: "Every class saved to Kaksha for revision." },
        { icon: "calendar", lead: "Flexible slots.", body: "Scheduled around your timetable, not ours." },
      ],
    },
    covers: {
      lead: "Popular online courses.",
      rest: "Subjects where an expert makes the difference.",
      items: [
        { title: "System design", body: "Scaling, caching, queues and the trade-offs behind them." },
        { title: "Generative AI", body: "Building with models: prompting, retrieval and evaluation." },
        { title: "Cloud architecture", body: "Designing for reliability and cost on a real cloud." },
        { title: "Advanced DSA", body: "Graphs, dynamic programming and contest-style practice." },
        { title: "Cybersecurity", body: "Web security, threat modelling and secure code." },
        { title: "Product & UI design", body: "From a problem to a tested interface." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "online-content",
    anchor: "content",
    label: "Online content",
    audience: "For colleges",
    icon: "content",
    summary: "Videos, notes and tests, ready from day one.",
    hero: {
      lead: "Content, ready to teach.",
      rest: "Videos, notes and tests from day one.",
      body: "A library of videos, notes, labs and tests mapped to your syllabus, for faculty to teach with and students to revise from.",
      stats: [
        { value: "30+", label: "Subjects" },
        { value: "5", label: "Connected products" },
        { value: "10K+", label: "Students mentored" },
      ],
    },
    process: {
      lead: "From syllabus to what students learned.",
      rest: "The library, mapped and measured.",
      steps: [
        {
          title: "Map the syllabus",
          body: "We map the library to your university's syllabus, unit by unit.",
          scene: {
            kind: "library",
            title: "Unit 3 · Trees",
            items: [
              { type: "Video", label: "Binary trees, in 12 minutes", meta: "Lesson 3.1" },
              { type: "Notes", label: "Traversals, with examples", meta: "Lesson 3.2" },
              { type: "Test", label: "Unit 3 quiz", meta: "20 questions" },
            ],
            tag: "Mapped",
          },
        },
        {
          title: "Open access",
          body: "Faculty and students sign in through Setu and Kaksha, on one account.",
          scene: {
            kind: "assign",
            title: "Access · CSE",
            rows: [
              { name: "Faculty", role: "12 accounts · teaching view", tag: "Active" },
              { name: "Third year", role: "240 students · 4 sections", tag: "Active" },
              { name: "Second year", role: "260 students · 4 sections", tag: "Active" },
            ],
          },
        },
        {
          title: "Teach and revise",
          body: "Faculty teach with it in class; students watch, read and practise in between.",
          scene: {
            kind: "progress",
            title: "This week · Section B",
            rows: [
              { label: "Binary trees · video", value: 88, note: "Watched" },
              { label: "Traversals · notes", value: 73, note: "Read" },
              { label: "Practice set 3", value: 61, note: "Attempted" },
            ],
          },
        },
        {
          title: "See what landed",
          body: "What each batch has watched, practised and scored, unit by unit.",
          scene: {
            kind: "report",
            title: "Report · Unit 3",
            metrics: [
              { value: 82, suffix: "%", label: "Watched" },
              { value: 1460, label: "Problems solved" },
              { value: 74, suffix: "%", label: "Quiz average" },
            ],
            lines: ["Weakest topic: graph traversal", "Suggested: one more lab"],
          },
        },
      ],
    },
    gets: {
      lead: "A library your faculty can trust.",
      rest: "Written and checked by people who teach it.",
      tiles: [
        { icon: "video", lead: "Short videos.", body: "One idea per video, under fifteen minutes." },
        { icon: "content", lead: "Notes and labs.", body: "Worked examples and lab sheets with solutions." },
        { icon: "check", lead: "Tests.", body: "Quizzes and unit tests, graded in Spardha." },
        { icon: "pulse", lead: "Kept current.", body: "Updated as tools change, every term." },
      ],
    },
    covers: {
      lead: "What's in the library.",
      rest: "Across software, data and core subjects.",
      items: [
        { title: "Programming", body: "C, Java and Python, from first program to projects." },
        { title: "DSA", body: "Every structure and algorithm on the syllabus, with practice." },
        { title: "Web development", body: "HTML to full stack, with a project per unit." },
        { title: "AI & data", body: "Python, statistics, machine learning and analytics." },
        { title: "Cloud & DevOps", body: "Linux, Git, containers and deployment." },
        { title: "Aptitude", body: "Quant, reasoning and verbal for placements." },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "platforms",
    anchor: "platforms",
    label: "Platforms for colleges",
    audience: "For colleges",
    icon: "platform",
    summary: "LMS, tests, practice and placements on one account.",
    hero: {
      lead: "One login for everything.",
      rest: "Courses, tests, practice and placements in five connected tools.",
      body: "Setu, Marg, Kaksha, Riyaaz and Spardha, set up for your college: your batches, your faculty and your reports, on one account.",
      stats: [
        { value: "5", label: "Connected products" },
        { value: "30+", label: "Partner colleges" },
        { value: "10K+", label: "Students" },
      ],
    },
    process: {
      lead: "Set up in weeks, not a semester.",
      rest: "From choosing tools to running reports.",
      steps: [
        {
          title: "Choose the products",
          body: "Start with the tools you need most; add the rest when you're ready.",
          scene: {
            kind: "select",
            title: "Set up · Your college",
            prompt: "Products to switch on",
            chips: ["Setu · LMS", "Marg · Roadmaps", "Kaksha · Cohorts", "Riyaaz · Practice", "Spardha · Tests"],
            picked: [0, 2, 3],
            done: "3 products switched on",
          },
        },
        {
          title: "Bring your batches",
          body: "We import students, faculty and courses, and set up roles.",
          scene: {
            kind: "progress",
            title: "Import · 2026–27",
            rows: [
              { label: "Students", value: 100, note: "1,240 imported" },
              { label: "Faculty", value: 100, note: "64 imported" },
              { label: "Courses", value: 76, note: "29 of 38" },
            ],
          },
        },
        {
          title: "Train the staff",
          body: "Short sessions for faculty and admins on running their courses.",
          scene: {
            kind: "week",
            title: "Training week · Staff",
            sessions: [
              { day: 0, slot: 0, label: "Admins" },
              { day: 1, slot: 1, label: "Faculty: Setu" },
              { day: 2, slot: 1, label: "Faculty: Spardha" },
              { day: 3, slot: 0, label: "Placement cell" },
            ],
          },
        },
        {
          title: "Run and report",
          body: "Dashboards and reports for every batch, department and drive.",
          scene: {
            kind: "report",
            title: "College dashboard",
            metrics: [
              { value: 91, suffix: "%", label: "Attendance" },
              { value: 1240, label: "Active students" },
              { value: 38, label: "Courses running" },
            ],
            lines: ["Weekly report to the principal", "Placement records up to date"],
          },
        },
      ],
    },
    gets: {
      lead: "Five tools, one account.",
      rest: "Built for how colleges run, not adapted from a company tool.",
      tiles: [
        { icon: "platform", lead: "Setu, the LMS.", body: "Courses, assignments, attendance and grades." },
        { icon: "check", lead: "Spardha, tests.", body: "Assessments and contests with instant results." },
        { icon: "code", lead: "Riyaaz and Marg.", body: "Daily practice and roadmaps that build the habit." },
        { icon: "video", lead: "Kaksha, cohorts.", body: "Video courses with labs, taken with the batch." },
      ],
    },
    covers: {
      lead: "Built for how colleges run.",
      rest: "Not adapted from a corporate tool.",
      items: [
        { title: "Batches & sections", body: "Years, branches and sections, as your college has them." },
        { title: "Roles", body: "Admins, HoDs, faculty, students and the placement cell." },
        { title: "Attendance", body: "Taken in class, reported by student and subject." },
        { title: "Assessments", body: "Internals, quizzes and contests, graded and recorded." },
        { title: "Placement records", body: "Readiness, applications and offers for every student." },
        { title: "Reports", body: "For HoDs, the principal and accreditation." },
      ],
    },
  },
];

export const programBySlug = (slug: string) => programPages.find((p) => p.slug === slug);
export const programHref = (anchor: string) => {
  const p = programPages.find((x) => x.anchor === anchor);
  return p ? `/programs/${p.slug}` : "/programs";
};
