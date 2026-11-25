"use server";

import { checkTrainer } from "@/lib/apply-checks";
import { ROLES } from "@/lib/careers";
import { attachment, SEND_FAILED, sendMail } from "@/lib/mail";

/*
 * Trainer application: runs the same checks as the form (lib/apply-checks),
 * then emails the details and the résumé to the TechCity inbox (lib/mail),
 * with replies going to the applicant.
 */

export type ApplyState = {
  status: "idle" | "error" | "sent";
  message?: string;
  /** Field name → what's wrong with it. */
  errors?: Partial<Record<string, string>>;
};

const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

export async function submitApplication(_prev: ApplyState, form: FormData): Promise<ApplyState> {
  const errors = checkTrainer(
    form,
    ROLES.map((r) => r.value),
  );
  if (Object.keys(errors).length) {
    return { status: "error", message: "A few details need another look.", errors };
  }

  const data = {
    name: text(form, "name"),
    email: text(form, "email"),
    phone: text(form, "phone"),
    city: text(form, "city"),
    company: text(form, "company"),
    link: text(form, "link"),
    role: ROLES.find((r) => r.value === text(form, "role"))!.label,
    experience: text(form, "experience"),
    subjects: text(form, "subjects"),
    engagement: text(form, "engagement"),
    mode: text(form, "mode"),
  };
  const resume = form.get("resume") as File;

  const sent = await sendMail({
    subject: `Trainer application: ${data.role} · ${data.name}`,
    heading: `New trainer application for ${data.role}`,
    replyTo: { name: data.name, email: data.email },
    rows: [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["City", data.city],
      ["Company or college", data.company],
      ["Link", data.link],
      ["Role", data.role],
      ["Experience", data.experience],
      ["Subjects", data.subjects],
      ["Type of work", data.engagement],
      ["Where", data.mode],
    ],
    attachments: [await attachment(resume)],
  });
  if (!sent) return { status: "error", message: SEND_FAILED };

  return {
    status: "sent",
    message: `Thanks, ${data.name.split(" ")[0]}. Your application for ${data.role} is in, and we'll write to you at ${data.email}.`,
  };
}
