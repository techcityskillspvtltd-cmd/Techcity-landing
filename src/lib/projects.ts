export type ProjectStatus = "ongoing" | "completed" | "upcoming";

export type Project = {
  title: string;
  /** The partner college, as named on techcityskills.com. */
  college: string;
  city: string;
  /** [lat, lon] of the campus city. */
  at: [number, number];
  tracks: string[];
  dates: string;
  /** First month, as YYYY-MM, for ordering (News). */
  start: string;
  status: ProjectStatus;
};

const CITY: Record<string, [number, number]> = {
  Faridabad: [28.41, 77.32],
  Ambala: [30.38, 76.78],
  Gurugram: [28.46, 77.03],
  Banda: [25.48, 80.33],
  Ghaziabad: [28.67, 77.45],
  Lucknow: [26.85, 80.95],
};

const p = (
  status: ProjectStatus,
  title: string,
  college: string,
  city: string,
  tracks: string[],
  dates: string,
  start: string,
): Project => ({
  title,
  college,
  city,
  at: CITY[city],
  tracks,
  dates,
  start,
  status,
});

export const projects: Project[] = [
  p("ongoing", "Aptitude, Java DSA, MERN, and AI/ML", "Echelon Institute of Technology", "Faridabad", ["Aptitude", "Java DSA", "MERN", "AI/ML"], "Aug–Dec 2026", "2026-08"),
  p("ongoing", "Artificial intelligence and machine learning", "MMU Ambala", "Ambala", ["AI/ML"], "Sep 2026–Jan 2027", "2026-09"),
  p("upcoming", "Python Full Stack and SCADA", "St. Andrews Institute of Technology and Management", "Gurugram", ["Python Full Stack", "SCADA"], "Jan–May 2027", "2027-01"),
  p(
    "completed",
    "Python Data Analytics, Aptitude, Power BI, and Excel",
    "St. Andrews Institute of Technology and Management",
    "Gurugram",
    ["Data Analytics", "Aptitude", "Power BI", "Excel"],
    "Aug–Dec 2025",
    "2025-08",
  ),
  p("completed", "AI/ML, Java DSA, and an AI/ML workshop", "KCNIT Group of Institutions", "Banda", ["AI/ML", "Java DSA", "AI/ML workshop"], "Jan–Jun 2026", "2026-01"),
  p(
    "completed",
    "Python Full Stack, MERN, and two workshops",
    "Inmantec Institutions",
    "Ghaziabad",
    ["Python Full Stack", "MERN", "AI Tools", "Cybersecurity"],
    "Aug 2025–May 2026",
    "2025-08",
  ),
  p("completed", "AI workshop and Python DSA", "Echelon Institute of Technology", "Faridabad", ["AI workshop", "Python DSA"], "Jan–Apr 2026", "2026-01"),
  p("completed", "AI/ML, Aptitude, and Excel", "School of Management Sciences", "Lucknow", ["AI/ML", "Aptitude", "Excel"], "Aug–Dec 2025", "2025-08"),
];

/** Tab order, labels and marker colours (brand tokens: amber, navy, periwinkle). */
export const projectStatuses: { id: ProjectStatus; label: string; color: string }[] = [
  { id: "ongoing", label: "Ongoing", color: "#F59E0B" },
  { id: "completed", label: "Completed", color: "#1C257D" },
  { id: "upcoming", label: "Upcoming", color: "#6B7BE6" },
];
