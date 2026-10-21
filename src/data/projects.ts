export type ProjectStatus = "completed" | "current" | "upcoming";

export type CampusProject = {
  id: string;
  title: string;
  campus: string;
  city: string;
  subject: string;
  term: string;
  cohort: string;
  summary: string;
  outcome: string;
  status: ProjectStatus;
  /** Named college for a finished project report. */
  college?: string;
  /** Students in the room for a finished project. */
  students?: number;
  /** How a finished project went, for the project report. */
  report?: string;
};

export type TrainerOpening = {
  id: string;
  projectId: string;
  city: string;
  campus: string;
  subject: string;
  timing: "current" | "upcoming";
  start: string;
  commitment: string;
  detail: string;
  lat: number;
  lng: number;
};

export const projects: CampusProject[] = [
  {
    id: "saitm-data",
    title: "Python Data Analytics, Aptitude, Power BI, and Excel",
    campus: "St. Andrews (SAITM)",
    city: "Gurugram",
    subject: "Data Analytics, Aptitude, Power BI, Excel",
    term: "Aug–Dec 2025",
    cohort: "B.Tech sections",
    summary:
      "Finished training at St. Andrews Institute of Technology & Management: Python Data Analytics, Aptitude, Power BI, and Excel, taught on the Gurugram campus.",
    outcome:
      "Students can clean a dataset, show it in Excel and Power BI, and sit a timed aptitude round.",
    college: "St. Andrews Institute of Technology & Management",
    students: 52,
    report:
      "The Gurugram campus ran four tracks in one term. Python Data Analytics covered the path from a raw sheet to a result a reader can question. Aptitude was timed practice in the formats companies use at the start of hiring. Power BI and Excel were the tools students used to present the same result. The college kept the lab notes.",
    status: "completed",
  },
  {
    id: "kcnit-aiml",
    title: "AI/ML, Java DSA, and an AI/ML workshop",
    campus: "KCNIT",
    city: "Banda",
    subject: "AI/ML, Java DSA, AI/ML workshop",
    term: "Jan–Jun 2026",
    cohort: "B.Tech sections",
    summary:
      "Finished training at Kali Charan Nigam Institute of Technology, Banda: Artificial Intelligence and Machine Learning, Java DSA, and a separate AI/ML workshop.",
    outcome:
      "The sections finished the AI/ML and Java DSA terms. The workshop gave a shorter cohort the same AI/ML lab in a few days.",
    college: "Kali Charan Nigam Institute of Technology",
    students: 64,
    report:
      "KCNIT ran two full terms and one workshop. Artificial Intelligence and Machine Learning asked students to measure an answer, not only produce a demo. Java DSA was the data-structures track: problems written out, then reviewed in the room. The AI/ML workshop used the same lab with a shorter group, so students who were not in the full term could still walk through a model and say where it failed.",
    status: "completed",
  },
  {
    id: "inmantec-stacks",
    title: "Python Full Stack, MERN, and two workshops",
    campus: "INMANTEC",
    city: "Ghaziabad",
    subject: "Python Full Stack, MERN, AI Tools, Cybersecurity",
    term: "Aug 2025–May 2026",
    cohort: "B.Tech and MCA sections",
    summary:
      "Finished training at Integrated Academy of Management and Technology, Ghaziabad: Python Full Stack, MERN Stack, an AI Tools workshop, and a Cybersecurity workshop.",
    outcome:
      "Students left with a full-stack build they can walk through, plus workshop notes on AI tools and on how a team ranks a security fix.",
    college: "Integrated Academy of Management and Technology",
    students: 70,
    report:
      "INMANTEC took four trainings across the year. Python Full Stack and the MERN Stack were the long labs: one shared codebase, reviewed in the room, with the college keeping the notes. The AI Tools workshop was a short block on tools a team actually uses, and what to check before trusting an answer. The Cybersecurity workshop used one sample service. Students wrote the finding and ranked what they would fix first.",
    status: "completed",
  },
  {
    id: "echelon-workshops",
    title: "AI workshop and Python DSA",
    campus: "Echelon",
    city: "Faridabad",
    subject: "AI workshop, Python DSA",
    term: "Jan–Apr 2026",
    cohort: "B.Tech section",
    summary:
      "Finished training at Echelon Institute of Technology, Faridabad: an Artificial Intelligence workshop and a Python DSA term.",
    outcome:
      "The workshop cohort can say where a model failed. The DSA section can walk through a solution and the cases it misses.",
    college: "Echelon Institute of Technology",
    students: 46,
    report:
      "Echelon ran two finished tracks before the current term. The AI workshop was a short lab: students had to judge an answer, not only generate one. Python DSA ran longer. Students wrote solutions, then reviewed them the way a teammate would, including the cases the first pass missed. Faculty kept both sets of lab notes.",
    status: "completed",
  },
  {
    id: "sms-lucknow",
    title: "AI/ML, Aptitude, and Excel",
    campus: "SMS Lucknow",
    city: "Lucknow",
    subject: "AI/ML, Aptitude, Excel",
    term: "Aug–Dec 2025",
    cohort: "B.Tech and MBA sections",
    summary:
      "Finished training at School of Management Sciences, Lucknow: Artificial Intelligence and Machine Learning, Aptitude, and Excel.",
    outcome:
      "Engineering sections left with an AI/ML evaluation they can walk through. Aptitude and Excel covered the placement and reporting work beside it.",
    college: "School of Management Sciences",
    students: 48,
    report:
      "SMS Lucknow teaches computer science, artificial intelligence, and management, so the term followed those programmes. Artificial Intelligence and Machine Learning was the engineering lab: what to keep, what to throw out, and how to say that out loud. Aptitude was timed practice for hiring rounds. Excel was the shared reporting tool for both the engineering and management sections. The college kept the lab.",
    status: "completed",
  },
  {
    id: "echelon-current",
    title: "Aptitude, Java DSA, MERN, and AI/ML",
    campus: "Echelon",
    city: "Faridabad",
    subject: "Aptitude, Java DSA, MERN, AI/ML",
    term: "Aug–Dec 2026",
    cohort: "B.Tech sections",
    summary:
      "Training running now at Echelon Institute of Technology, Faridabad: Aptitude, Java DSA, MERN Stack, and Artificial Intelligence and Machine Learning.",
    outcome:
      "In progress. Four tracks are on the Faridabad timetable through December.",
    college: "Echelon Institute of Technology",
    students: 86,
    report:
      "Echelon’s current term has four tracks in the college timetable. Aptitude is timed practice. Java DSA is the data-structures lab, reviewed in the room. MERN Stack is one shared codebase the section reviews each week. Artificial Intelligence and Machine Learning is the evaluation track: which answers hold, and how students write that down. The term runs through December.",
    status: "current",
  },
  {
    id: "mmu-ambala",
    title: "Artificial intelligence and machine learning",
    campus: "MMU",
    city: "Ambala",
    subject: "AI/ML",
    term: "Sep 2026–Jan 2027",
    cohort: "B.Tech section",
    summary:
      "Training running now at Maharishi Markandeshwar (Deemed to be University), Mullana, Ambala: Artificial Intelligence and Machine Learning.",
    outcome:
      "In progress. The section is measuring answers, and the write-up is the rest of the term through January.",
    college: "Maharishi Markandeshwar (Deemed to be University)",
    students: 42,
    report:
      "MMU Ambala is mid-term on Artificial Intelligence and Machine Learning. The lab uses material the college already teaches. Students have to say which answers hold and which get thrown out, then write that down. Faculty sit in on the review. The term closes in January.",
    status: "current",
  },
  {
    id: "standrews-upcoming",
    title: "Python Full Stack and SCADA",
    campus: "St. Andrews",
    city: "Gurugram",
    subject: "Python Full Stack, SCADA",
    term: "Jan–May 2027",
    cohort: "B.Tech sections",
    summary:
      "Training opening next at St. Andrews Institute of Technology & Management, Gurugram: Python Full Stack and SCADA.",
    outcome:
      "Opens in January. The timetable slot is held. Trainer seats are open for both tracks.",
    college: "St. Andrews Institute of Technology & Management",
    students: 50,
    report:
      "St. Andrews has held the Gurugram timetable for two tracks from January. Python Full Stack is one shared codebase and a weekly review in the room. SCADA is the industrial-control lab: how a process is watched, what a fault looks like, and how students explain the fix. A trainer needs to be in place for each track before the term opens. The work runs through May.",
    status: "upcoming",
  },
];

export const openings: TrainerOpening[] = [
  {
    id: "open-standrews-python",
    projectId: "standrews-upcoming",
    city: "Gurugram",
    campus: "St. Andrews",
    subject: "Python Full Stack",
    timing: "upcoming",
    start: "January 2027",
    commitment: "On campus for one term, Jan–May 2027.",
    detail:
      "Python Full Stack at St. Andrews Institute of Technology & Management, Gurugram. The work is one shared codebase and a weekly review in the college timetable.",
    lat: 28.46,
    lng: 77.03,
  },
  {
    id: "open-standrews-scada",
    projectId: "standrews-upcoming",
    city: "Gurugram",
    campus: "St. Andrews",
    subject: "SCADA",
    timing: "upcoming",
    start: "January 2027",
    commitment: "On campus for one term, Jan–May 2027.",
    detail:
      "SCADA training at St. Andrews, Gurugram. The trainer teaches how a process is watched, what a fault looks like, and how students explain the fix.",
    lat: 28.47,
    lng: 77.04,
  },
];

export type ProjectReport = CampusProject & {
  college: string;
  students: number;
  report: string;
};

export function isProjectReport(project: CampusProject): project is ProjectReport {
  return (
    typeof project.college === "string" &&
    typeof project.students === "number" &&
    typeof project.report === "string"
  );
}

export function completedYear(project: CampusProject) {
  const years = project.term.match(/\d{4}/g);
  return years?.[years.length - 1] ?? "";
}

const byYearThenCity = (a: ProjectReport, b: ProjectReport) =>
  completedYear(b).localeCompare(completedYear(a)) || a.city.localeCompare(b.city);

function reportsWithStatus(status: ProjectStatus) {
  return projects
    .filter(
      (project): project is ProjectReport =>
        project.status === status && isProjectReport(project),
    )
    .sort(byYearThenCity);
}

export const completedProjects = reportsWithStatus("completed");

export const ongoingProjects = reportsWithStatus("current");

export function projectReport(id: string) {
  return completedProjects.find((project) => project.id === id);
}

export function ongoingReport(id: string) {
  return ongoingProjects.find((project) => project.id === id);
}

export const currentProjects = projects.filter(
  (project) => project.status === "current",
);

export const upcomingProjects = reportsWithStatus("upcoming");

export function upcomingReport(id: string) {
  return upcomingProjects.find((project) => project.id === id);
}

export function projectById(id: string) {
  return projects.find((project) => project.id === id);
}

export function openingForProject(projectId: string) {
  return openings.find((opening) => opening.projectId === projectId);
}

const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  Ambala: { lat: 30.2514, lng: 77.0486 },
  Banda: { lat: 25.4753, lng: 80.3399 },
  Faridabad: { lat: 28.4089, lng: 77.3178 },
  Ghaziabad: { lat: 28.6692, lng: 77.4538 },
  Gurugram: { lat: 28.4595, lng: 77.0266 },
  Lucknow: { lat: 26.8467, lng: 80.9462 },
};

export function projectCoordinates(project: CampusProject) {
  const base = cityCoordinates[project.city] ?? { lat: 22.5, lng: 79 };
  const siblings = projects.filter((item) => item.city === project.city);
  const index = Math.max(0, siblings.findIndex((item) => item.id === project.id));
  if (siblings.length < 2) return base;
  const angle = (index / siblings.length) * Math.PI * 2;
  return {
    lat: base.lat + Math.sin(angle) * 0.18,
    lng: base.lng + Math.cos(angle) * 0.18,
  };
}
