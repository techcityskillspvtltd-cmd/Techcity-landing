"use server";

import { site } from "@/lib/site";

/*
 * Careers application: validates what the form sends and returns a result the
 * form shows. Sending it on by email is not wired up yet: the TODO below is the
 * one place to add it (the details and the résumé are both here, ready to
 * attach), addressed to the company inbox in `site.email`.
 */

export type ApplyState = {
  status: "idle" | "error" | "sent";
  message?: string;
  /** Field name → what's wrong with it. */
  errors?: Partial<Record<string, string>>;
};

const MAX_RESUME = 5 * 1024 * 1024; // 5 MB; next.config allows a little more for the form overhead
const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

export async function submitApplication(_prev: ApplyState, form: FormData): Promise<ApplyState> {
  const data = {
    name: text(form, "name"),
    email: text(form, "email"),
    phone: text(form, "phone"),
    city: text(form, "city"),
    role: text(form, "role"),
    engagement: text(form, "engagement"),
    mode: text(form, "mode"),
    experience: text(form, "experience"),
    subjects: text(form, "subjects"),
    company: text(form, "company"),
    link: text(form, "link"),
    availability: text(form, "availability"),
    note: text(form, "note"),
    consent: form.get("consent") === "on",
  };
  const resume = form.get("resume");

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Enter a valid email address.";
  if (data.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a 10-digit phone number.";
  if (!data.city) errors.city = "Tell us where you're based.";
  if (!data.role) errors.role = "Choose the role you're applying for.";
  if (!data.experience) errors.experience = "Choose your experience.";
  if (!data.subjects) errors.subjects = "List the subjects or skills you'd teach.";
  if (data.link && !/^https?:\/\/\S+\.\S+/.test(data.link)) errors.link = "Use a full link, starting with https://";
  if (!(resume instanceof File) || resume.size === 0) errors.resume = "Attach your résumé.";
  else if (!RESUME_TYPES.includes(resume.type)) errors.resume = "Use a PDF or Word file.";
  else if (resume.size > MAX_RESUME) errors.resume = "Keep the file under 5 MB.";
  if (!data.consent) errors.consent = "Please confirm so we can contact you.";

  if (Object.keys(errors).length) {
    return { status: "error", message: "A few details need another look.", errors };
  }

  // TODO(careers email): send `data` and the résumé to `site.email`, for example
  // with an email provider's API or SMTP, attaching `resume` as a file.
  void site.email;

  return {
    status: "sent",
    message: `Thanks, ${data.name.split(" ")[0]}. Your application is in, and we'll write to you at ${data.email}.`,
  };
}
