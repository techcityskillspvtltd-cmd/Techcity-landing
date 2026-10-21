export const programFamilyIds = [
  "trainers",
  "faculty",
  "placement",
  "placing",
  "mentorship",
  "online",
  "content",
  "platforms",
] as const;

export type ProgramFamilyId = (typeof programFamilyIds)[number];

export type ProgramItem = {
  name: string;
  detail: string;
};

export type ProgramFamily = {
  id: ProgramFamilyId;
  index: string;
  title: string;
  line: string;
  body: string;
  audience: string;
  figure: string;
  how: string;
  steps: [string, string, string];
  count: string;
  countNoun: string;
  chips?: string[];
  programs: ProgramItem[];
};

export const programFamilies: ProgramFamily[] = [
  {
    id: "trainers",
    index: "01",
    title: "Trainers for students",
    line: "Trainers on campus for software, data, AI, cloud, and security.",
    body: "TechCity places trainers with students. Each trainer teaches one subject the way a working team practices it, inside the college timetable.",
    audience: "Students",
    figure: "Subject for the day",
    how: "A trainer is placed on the campus for one subject and teaches it inside the college timetable. The lab follows a shared piece of work, and the trainer reviews it the way a teammate would.",
    steps: ["Campus", "Subject", "Review"],
    count: "30+",
    countNoun: "subjects",
    chips: ["Software", "Data", "AI", "Cloud", "Security"],
    programs: [
      {
        name: "Software engineering",
        detail:
          "How teams write, review, and ship code. Labs follow a shared codebase, and students practice the review a teammate would actually give.",
      },
      {
        name: "Data and analytics",
        detail:
          "From a raw dataset to a result someone can question. Trainers stay for the analysis and the explanation, not only the tool.",
      },
      {
        name: "Artificial intelligence",
        detail:
          "Applied models, how to judge them, and where AI belongs in a product. Students leave with a project they can walk through in an interview.",
      },
      {
        name: "Cloud and DevOps",
        detail:
          "How software is deployed, watched, and recovered. The pipeline in class follows the shape teams use after a release.",
      },
      {
        name: "Cybersecurity",
        detail:
          "How systems fail and how teams defend them. Students work through scenarios, then explain the fix in plain language.",
      },
    ],
  },
  {
    id: "faculty",
    index: "02",
    title: "Faculty development",
    line: "Programs that keep college faculty aligned with what the trainers teach.",
    body: "These programs are for the college’s own faculty. The aim is a syllabus, a lab, and an assessment that match the work trainers are doing with students.",
    audience: "College faculty",
    figure: "Syllabus and lab",
    how: "College faculty sit with TechCity trainers before they teach the same material. They rebuild a lab or a syllabus, rehearse it, then run that session with their own students.",
    steps: ["Trainers", "Rehearse", "Teach"],
    count: "3",
    countNoun: "programs",
    programs: [
      {
        name: "Industry immersion",
        detail:
          "Faculty spend structured time with practitioners and bring that practice back into the courses they already teach.",
      },
      {
        name: "Curriculum studio",
        detail:
          "A course is rebuilt around the work hiring teams look for, with the faculty leading the syllabus and TechCity beside them.",
      },
      {
        name: "Classroom practice lab",
        detail:
          "Faculty rehearse a lab, a critique, and an assessment with TechCity trainers before that session runs with students.",
      },
    ],
  },
  {
    id: "placement",
    index: "03",
    title: "Placement preparation",
    line: "Practice for the hiring path companies actually run.",
    body: "Students rehearse the path from the profile a recruiter opens to the last conversation. Each program is one part of that path, in the order companies use.",
    audience: "Students",
    figure: "Hiring path",
    how: "Students practice the hiring path in the order companies use it. They start with a profile and timed work, then interviews, then one full loop from the application to the last conversation.",
    steps: ["Profile", "Practice", "Loop"],
    count: "4",
    countNoun: "programs",
    programs: [
      {
        name: "Interview studio",
        detail:
          "Mock technical and conversation rounds. Students get notes on what to change before the next one, not a score alone.",
      },
      {
        name: "Coding and aptitude drills",
        detail:
          "Timed practice in the formats companies use at the start of a process, with a trainer in the room to review the approach.",
      },
      {
        name: "Portfolio and resume clinic",
        detail:
          "Projects and profiles rewritten the way a recruiter reads them: what shipped, what the student did, and what to open first.",
      },
      {
        name: "Hiring-loop rehearsal",
        detail:
          "One full cycle, from application to the final conversation, run as a single program so the parts connect.",
      },
    ],
  },
  {
    id: "placing",
    index: "04",
    title: "Student placement",
    line: "Students introduced to hiring partners once the campus work is ready to open.",
    body: "TechCity places students with companies it already works with. The introduction follows the project and the interviews practiced on campus.",
    audience: "Students",
    figure: "From campus to a team",
    how: "TechCity places a student with a company it already works with. The introduction follows the project and the interviews practiced on campus. The company reviews that work and runs its own process.",
    steps: ["Work", "Introduce", "Place"],
    count: "3",
    countNoun: "domains",
    programs: [
      {
        name: "Campus introductions",
        detail:
          "A student is put in front of a hiring partner TechCity already works with.",
      },
      {
        name: "Project review",
        detail:
          "The company opens the work from the lab, not a slide about it.",
      },
      {
        name: "Internship placement",
        detail:
          "A term with a partner team, tied to the subject the student just practiced.",
      },
      {
        name: "First-role placement",
        detail:
          "The introduction for a full-time start, after the campus loop is done.",
      },
    ],
  },
  {
    id: "mentorship",
    index: "05",
    title: "Mentorship",
    line: "A practitioner who stays with the student after the lecture.",
    body: "Mentorship covers the questions a timetable does not. A working practitioner stays with a student or a cohort across the semester.",
    audience: "Students",
    figure: "Across the semester",
    how: "A working practitioner stays with a student or a cohort for the semester. There is a standing time outside class to review work, a stuck lab, or the first weeks of a job.",
    steps: ["Mentor", "Semester", "Review"],
    count: "5",
    countNoun: "programs",
    programs: [
      {
        name: "Industry mentor match",
        detail:
          "One practitioner paired with one student for the semester, with a standing time to review work and decisions.",
      },
      {
        name: "Cohort office hours",
        detail:
          "Open sessions for a stuck lab, a code review, or a career question. Students bring the work; the mentor works through it with them.",
      },
      {
        name: "First-role mentoring",
        detail:
          "Guidance through the months between campus and the first job: the offer, the team, and the first weeks of work.",
      },
    ],
  },
  {
    id: "online",
    index: "06",
    title: "Online lessons",
    line: "Live classes and lessons students can replay.",
    body: "When a trainer is shared across colleges, the lesson still happens. Students join live or replay it before a lab or an interview.",
    audience: "Students and campuses",
    figure: "One live lesson",
    how: "A trainer teaches the lesson live, and students join from campus or from home. The recording stays with the cohort so they can replay it before a lab or an interview.",
    steps: ["Live", "Campus", "Replay"],
    count: "10+",
    countNoun: "subjects",
    programs: [
      {
        name: "Live virtual classrooms",
        detail:
          "Scheduled lessons students join from campus or from home, with the same trainer they would meet in the room.",
      },
      {
        name: "Lesson library",
        detail:
          "Recorded sessions kept for the cohort, so a student can replay a topic before a lab, a test, or an interview.",
      },
      {
        name: "Weekend intensives",
        detail:
          "A short online block on one skill, taught across two days, for a cohort that needs a subject between semesters.",
      },
      {
        name: "Campus relay classes",
        detail:
          "One trainer, live, with several colleges in the same session. Campuses share the lesson and keep their own lab time.",
      },
    ],
  },
  {
    id: "content",
    index: "07",
    title: "Online content",
    line: "Videos, notes, roadmaps, and assessments a student opens between classes.",
    body: "Beside the live lesson, the same subject stays available to study alone. A video or a note covers the class, a roadmap shows what comes next, and an assessment checks it before the lab.",
    audience: "Students",
    figure: "Between classes",
    how: "Beside the live lesson, the same subject stays available to study alone. A video or a note covers the class, a roadmap shows what comes next, and an assessment checks it before the lab.",
    steps: ["Open", "Study", "Check"],
    count: "4",
    countNoun: "formats",
    programs: [
      {
        name: "Videos",
        detail:
          "A recording of the subject the trainer teaches, so a student can watch it again before a lab.",
      },
      {
        name: "Notes",
        detail:
          "The same lesson written down, for the part a student wants to read instead of replay.",
      },
      {
        name: "Roadmaps",
        detail:
          "The order of a subject, from the first class to the work a hiring partner can open.",
      },
      {
        name: "Assessments",
        detail:
          "A check on the subject before the lab, so the student knows what still needs work.",
      },
    ],
  },
  {
    id: "platforms",
    index: "08",
    title: "Platforms for colleges",
    line: "Systems built for a campus: learning, records, the college site, and assessment.",
    body: "TechCity also builds the systems a college runs on. A campus names what it needs, and the same students use it beside the teaching.",
    audience: "Colleges",
    figure: "Built for the campus",
    how: "A college names the system it needs. TechCity designs and builds it, and the campus runs teaching, records, or assessment on it.",
    steps: ["Brief", "Build", "Run"],
    count: "5",
    countNoun: "platforms",
    programs: [
      {
        name: "LMS for colleges",
        detail:
          "The place a campus runs lessons, labs, and the work students hand in.",
      },
      {
        name: "ERP platforms",
        detail:
          "Records for students, faculty, and the semester, kept in one system the college runs.",
      },
      {
        name: "Websites",
        detail:
          "The college site, built so a visitor can find a program, a faculty page, or how to enquire.",
      },
      {
        name: "Assessment platforms",
        detail:
          "Tests and reviews a campus runs for a subject, with a result a faculty member can open.",
      },
      {
        name: "Content platforms",
        detail:
          "Videos, notes, and roadmaps kept for a cohort, in the order the trainers teach them.",
      },
    ],
  },
];

export const programTotal = programFamilies.reduce(
  (sum, family) => sum + family.programs.length,
  0,
);
