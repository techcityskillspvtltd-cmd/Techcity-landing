"use server";

import { checkPartner } from "@/lib/apply-checks";
import { SEND_FAILED, sendMail } from "@/lib/mail";

/*
 * Partner enquiry (the "Partner with us" pop-up, components/partner-dialog):
 * runs the same checks as the form (lib/apply-checks), then emails it to the
 * TechCity inbox (lib/mail), with replies going to the person who wrote.
 */

export type PartnerState = {
  status: "idle" | "error" | "sent";
  message?: string;
  /** Field name → what's wrong with it. */
  errors?: Partial<Record<string, string>>;
};

const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

export async function submitPartner(_prev: PartnerState, form: FormData): Promise<PartnerState> {
  const errors = checkPartner(form);
  if (Object.keys(errors).length) {
    return { status: "error", message: "A few details need another look.", errors };
  }

  const data = {
    name: text(form, "name"),
    email: text(form, "email"),
    phone: text(form, "phone"),
    organisation: text(form, "organisation"),
    kind: text(form, "kind"),
    message: text(form, "message"),
  };

  const sent = await sendMail({
    subject: `Partner enquiry: ${data.organisation} · ${data.name}`,
    heading: `New partner enquiry from ${data.organisation}`,
    replyTo: { name: data.name, email: data.email },
    rows: [
      ["Name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Organisation", data.organisation],
      ["Partner type", data.kind],
      ["Message", data.message],
    ],
  });
  if (!sent) return { status: "error", message: SEND_FAILED };

  return {
    status: "sent",
    message: `Thanks, ${data.name.split(" ")[0]}. We have your details and will write to you at ${data.email}.`,
  };
}
