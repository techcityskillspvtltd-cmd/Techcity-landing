import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function field(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const name = field(form, "name");
    const email = field(form, "email");
    const phone = field(form, "phone");
    const years = field(form, "years");
    const city = field(form, "city");
    const subjects = field(form, "subjects");
    const languages = field(form, "languages");
    const opening = field(form, "opening");
    const note = field(form, "note");
    const resume = form.get("resume");

    if (!name || !email || !phone || !years || !city || !subjects || !languages) {
      return NextResponse.json(
        { error: "Please fill every required field." },
        { status: 400 },
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    if (!(resume instanceof File) || !resume.name || resume.size === 0) {
      return NextResponse.json(
        { error: "Attach a resume (PDF or Word)." },
        { status: 400 },
      );
    }

    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json(
        { error: "Resume must be 5 MB or smaller." },
        { status: 400 },
      );
    }

    if (resume.type && !ALLOWED_RESUME_TYPES.has(resume.type)) {
      return NextResponse.json(
        { error: "Resume must be a PDF or Word file." },
        { status: 400 },
      );
    }

    const openingLine = opening || "General application";
    const subject = opening
      ? `Trainer application — ${city}`
      : `Trainer application — ${city || "general"}`;

    const text = [
      "New trainer application",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Subjects: ${subjects}`,
      `Languages: ${languages}`,
      `City: ${city}`,
      `Years teaching: ${years}`,
      `Opening: ${openingLine}`,
      `Resume: ${resume.name}`,
      "",
      note || "(no note)",
    ].join("\n");

    const buffer = Buffer.from(await resume.arrayBuffer());

    await sendMail({
      subject,
      text,
      replyTo: email,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
          contentType: resume.type || undefined,
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Trainer apply email failed:", error);
    return NextResponse.json(
      { error: "Could not send the application. Try again shortly." },
      { status: 500 },
    );
  }
}
