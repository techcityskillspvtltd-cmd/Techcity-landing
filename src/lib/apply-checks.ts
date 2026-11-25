/*
 * Checks for the site's forms: the two application forms (trainers on
 * /company/careers, students on /students/careers) and the partner enquiry. The same functions run in the browser, so
 * a missing field is flagged before anything is sent, and on the server, so
 * nothing gets through without them. Each returns field name → message.
 */

export type FieldErrors = Record<string, string>;

export const RESUME_MAX = 5 * 1024 * 1024;
const RESUME_EXT = [".pdf", ".doc", ".docx"];
const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

/** The résumé: there, a PDF or Word file, under 5 MB. */
export function resumeError(file: unknown): string | undefined {
  if (!(file instanceof File) || file.size === 0) return "Attach your résumé.";
  const okType = RESUME_TYPES.includes(file.type) || RESUME_EXT.some((e) => file.name.toLowerCase().endsWith(e));
  if (!okType) return "Use a PDF or Word file.";
  if (file.size > RESUME_MAX) return "Keep the file under 5 MB.";
}

function contact(f: FormData, e: FieldErrors) {
  if (!text(f, "name")) e.name = "Enter your full name.";
  const email = text(f, "email");
  if (!email) e.email = "Enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email, like name@example.com.";
  const phone = text(f, "phone").replace(/\D/g, "");
  if (!phone) e.phone = "Enter your phone number.";
  else if (phone.length < 10) e.phone = "Enter a 10-digit phone number.";
  if (f.get("consent") !== "on") e.consent = "Tick the box so we can contact you.";
}

function common(f: FormData, e: FieldErrors) {
  contact(f, e);
  const link = text(f, "link");
  if (link && !/^https?:\/\/\S+\.\S+/.test(link)) e.link = "Use a full link, starting with https://";
  const resume = resumeError(f.get("resume"));
  if (resume) e.resume = resume;
}

/** Students: the role, about you, the résumé. */
export function checkStudent(f: FormData, roles: string[]): FieldErrors {
  const e: FieldErrors = {};
  if (!roles.includes(text(f, "role"))) e.role = "Choose a role.";
  common(f, e);
  if (!text(f, "college")) e.college = "Enter your college.";
  if (!text(f, "degree")) e.degree = "Enter your degree and branch.";
  if (!text(f, "year")) e.year = "Choose your year.";
  return order(e, ["role", "name", "email", "phone", "college", "degree", "year", "link", "resume", "consent"]);
}

/** Trainers: about you, the role, what you teach, the résumé. */
export function checkTrainer(f: FormData, roles: string[]): FieldErrors {
  const e: FieldErrors = {};
  common(f, e);
  if (!text(f, "city")) e.city = "Enter the city you're based in.";
  if (!roles.includes(text(f, "role"))) e.role = "Choose a role.";
  if (!text(f, "experience")) e.experience = "Choose your experience.";
  if (!text(f, "subjects")) e.subjects = "List the subjects or skills you'd teach.";
  return order(e, ["name", "email", "phone", "city", "role", "experience", "subjects", "link", "resume", "consent"]);
}

/** Errors in the order the fields appear, so the summary reads top to bottom. */
function order(e: FieldErrors, fields: string[]): FieldErrors {
  return Object.fromEntries(fields.filter((k) => e[k]).map((k) => [k, e[k]]));
}

/** Partners: who you are, your organisation; the rest is optional. */
export function checkPartner(f: FormData): FieldErrors {
  const e: FieldErrors = {};
  contact(f, e);
  if (!text(f, "organisation")) e.organisation = "Enter your college or company.";
  if (text(f, "message").length > 1000) e.message = "Keep the message under 1,000 characters.";
  return order(e, ["name", "email", "phone", "organisation", "message", "consent"]);
}
