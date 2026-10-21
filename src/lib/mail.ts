import nodemailer from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";

const DEFAULT_INBOX = "techcityskillspvt.ltd@gmail.com";

export type SendMailInput = {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
};

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getMailInbox(): string {
  return process.env.MAIL_TO?.trim() || DEFAULT_INBOX;
}

export function createTransport() {
  const host = required("SMTP_HOST");
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = required("SMTP_USER");
  const pass = required("SMTP_PASS");
  const secure =
    process.env.SMTP_SECURE === "true" || port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function sendMail({
  subject,
  text,
  replyTo,
  attachments,
}: SendMailInput) {
  const from =
    process.env.SMTP_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    DEFAULT_INBOX;
  const to = getMailInbox();
  const transport = createTransport();

  await transport.sendMail({
    from,
    to,
    subject,
    text,
    replyTo,
    attachments,
  });
}
