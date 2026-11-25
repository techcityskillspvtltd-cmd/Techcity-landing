"use server";

import { checkStudent } from "@/lib/apply-checks";
import { attachment, SEND_FAILED, sendMail } from "@/lib/mail";
import { openings } from "@/lib/students";

/*
 * Student application (/students/careers): runs the same checks as the form
 * (lib/apply-checks), then emails the details and the résumé to the TechCity
 * inbox (lib/mail), with replies going to the student.
 */

export type StudentApplyState = {
  status: "idle" | "error" | "sent";
  message?: string;
  /** Field name → what's wrong with it. */
  errors?: Partial<Record<string, string>>;
};

const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

export async function submitStudentApplication(_prev: StudentApplyState, form: FormData): Promise<StudentApplyState> {
  const errors = checkStudent(
    form,
    openings.map((o) => o.value),
  );
  if (Object.keys(errors).length) {
    return { status: "error", message: "A few details need another look.", errors };
  }

  const data = {
    role: openings.find((o) => o.value === text(form, "role"))!.title,
    name: text(form, "name"),
    email: text(form, "email"),
    phone: text(form, "phone"),
    college: text(form, "college"),
    degree: text(form, "degree"),
    year: text(form, "year"),
    link: text(form, "link"),
  };
  const resume = form.get("resume") as File;

  const sent = await sendMail({
    subject: `Student application: ${data.role} · ${data.name}`,
    heading: `New student application for ${data.role}`,
    replyTo: { name: data.name, email: data.email },
    rows: [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["College", data.college],
      ["Degree and branch", data.degree],
      ["Year", data.year],
      ["Link", data.link],
      ["Role", data.role],
    ],
    attachments: [await attachment(resume)],
  });
  if (!sent) return { status: "error", message: SEND_FAILED };

  return {
    status: "sent",
    message: `Thanks, ${data.name.split(" ")[0]}. Your application for ${data.role} is in, and we'll write to you at ${data.email} about the first round.`,
  };
}
