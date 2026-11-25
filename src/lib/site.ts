export const site = {
  name: "TechCity Skills",
  legalName: "TechCity Skills Pvt. Ltd.",
  url: "https://techcityskills.com",
  tagline: "Industry-aligned skilling for modern tech careers",
  description:
    "Partnering with universities to deliver an integrated suite of skilling solutions, from classrooms to careers.",
  longDescription:
    "TechCity Skills runs inside colleges, with their faculty, so students leave able to join a team. Lab-first programs, on-campus trainers, faculty development, placement preparation and platforms for colleges, built with 50+ industry partners across 30+ partner colleges.",
  email: "techcityskillspvt.ltd@gmail.com",
  phone: "+91 96506 57821",
  phoneE164: "+919650657821",
  logo: "/techcity-logo-bold.png",
  themeColor: "#FFFFFF",
  areaServed: ["Delhi NCR", "Faridabad", "Noida", "Lucknow", "Ambala", "Haryana", "Uttar Pradesh", "Punjab", "Bihar"],
  products: [
    { name: "Setu", description: "Learning management for colleges", url: "https://setu.techcityskills.com" },
    { name: "Marg", description: "Learning paths and roadmaps", url: "https://marg.techcityskills.com" },
    { name: "Kaksha", description: "Cohort-based video courses", url: "https://kaksha.techcityskills.com" },
    { name: "Riyaaz", description: "Daily coding practice", url: "https://riyaaz.techcityskills.com" },
    { name: "Spardha", description: "Tests, assessments and campus contests", url: "https://spardha.techcityskills.com" },
  ],
  founders: ["Deepak Tripathi", "Gunjan Soam"],
  keywords: [
    "TechCity Skills",
    "university skilling",
    "college training partner",
    "industry-aligned curriculum",
    "campus placement preparation",
    "faculty development program",
    "on-campus trainers",
    "AI/ML training for colleges",
    "full-stack training",
    "cloud and DevOps training",
    "cybersecurity training",
    "data analytics training",
    "college LMS and ERP",
    "EdTech India",
    "Delhi NCR",
  ],
} as const;

/** Where students create their TechCity account (on Setu). */
export const signupUrl = "https://setu.techcityskills.com/signup";

/** Off-site links (http/https) open in a new tab. */
export const linkTarget = (href: string) =>
  /^https?:\/\//.test(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
