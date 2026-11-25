import nodemailer from "nodemailer";
import { site } from "@/lib/site";

/*
 * Sends the site's forms (trainer and student applications, partner
 * enquiries) to the TechCity inbox over SMTP. Server only: it's imported by
 * the server actions, never by a client component.
 *
 * Set these environment variables (in .env.local, and in Vercel → Settings →
 * Environment Variables):
 *
 *   SMTP_HOST  smtp.gmail.com          (default)
 *   SMTP_PORT  465                     (default; 465 = SSL, 587 = STARTTLS)
 *   SMTP_USER  the Gmail address that sends, e.g. techcityskillspvt.ltd@gmail.com
 *   SMTP_PASS  a Google App Password for that account (16 letters, no spaces)
 *   MAIL_TO    where the forms go      (default: site.email)
 *
 * Without SMTP_USER and SMTP_PASS, development logs the email to the terminal
 * and reports it sent, so the forms can be tried locally; production reports
 * a failure instead, so nothing is lost without anyone knowing.
 */

export type MailRow = [label: string, value: string | undefined];

export type Mail = {
  /** The email's subject line. */
  subject: string;
  /** A line above the details, e.g. "New trainer application". */
  heading: string;
  /** Label → value, shown as a table; empty values are left out. */
  rows: MailRow[];
  /** Replies go to the person who filled in the form. */
  replyTo?: { name: string; email: string };
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
};

const config = () => {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  if (!user || !pass) return null;
  const port = Number(process.env.SMTP_PORT ?? 465);
  return {
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass },
  };
};

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function html({ heading, rows }: Mail) {
  const body = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#64748d;vertical-align:top;white-space:nowrap">${escape(k)}</td>` +
        `<td style="padding:8px 0;color:#0a2540;white-space:pre-wrap">${escape(v!)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:15px;line-height:1.5">
<p style="margin:0 0 16px;font-size:18px;color:#0a2540">${escape(heading)}</p>
<table style="border-collapse:collapse">${body}</table>
<p style="margin:24px 0 0;font-size:13px;color:#64748d">Sent from the form on ${escape(site.url.replace(/^https?:\/\//, ""))}. Reply to this email to answer them.</p>
</div>`;
}

const text = ({ heading, rows }: Mail) =>
  [heading, "", ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)].join("\n");

/** Sends one form's details. Returns false if it couldn't be sent. */
export async function sendMail(mail: Mail): Promise<boolean> {
  const smtp = config();
  const to = process.env.MAIL_TO?.trim() || site.email;

  if (!smtp) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[mail] SMTP not set up; would send to ${to}:\n${mail.subject}\n${text(mail)}`);
      return true;
    }
    console.error("[mail] SMTP_USER and SMTP_PASS are not set; the form could not be sent.");
    return false;
  }

  try {
    await nodemailer.createTransport(smtp).sendMail({
      from: { name: `${site.name} website`, address: smtp.auth.user },
      to,
      replyTo: mail.replyTo ? { name: mail.replyTo.name, address: mail.replyTo.email } : undefined,
      subject: mail.subject,
      text: text(mail),
      html: html(mail),
      attachments: mail.attachments,
    });
    return true;
  } catch (e) {
    console.error("[mail] Sending failed:", e);
    return false;
  }
}

/** A File from a form, ready to attach. */
export async function attachment(file: File) {
  return { filename: file.name, content: Buffer.from(await file.arrayBuffer()), contentType: file.type || undefined };
}

/** What the forms say when the email couldn't go. */
export const SEND_FAILED = `We couldn't send that just now. Please try again in a minute, or email us at ${site.email}.`;
