import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export const runtime = "nodejs";

type PartnerKind = "college" | "industry";

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const kind = String(body.kind ?? "").trim() as PartnerKind;
    const organization = String(body.organization ?? "").trim();
    const city = String(body.city ?? "").trim();
    const name = String(body.name ?? "").trim();
    const role = String(body.role ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const note = String(body.note ?? "").trim();

    if (kind !== "college" && kind !== "industry") {
      return NextResponse.json(
        { error: "Choose college or industry." },
        { status: 400 },
      );
    }

    if (!organization || !city || !name || !role || !email || !phone) {
      return NextResponse.json(
        { error: "Please fill every required field." },
        { status: 400 },
      );
    }

    if (!isEmail(email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    const kindLabel = kind === "college" ? "College" : "Industry";
    const subject = `Partner application — ${kindLabel} — ${organization}`;

    const text = [
      "New partner application",
      "",
      `Partner as: ${kindLabel}`,
      `${kind === "college" ? "College" : "Company"}: ${organization}`,
      `City: ${city}`,
      `Name: ${name}`,
      `Role: ${role}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      "",
      "What they want to start:",
      note || "(no note)",
    ].join("\n");

    await sendMail({
      subject,
      text,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Partner apply email failed:", error);
    return NextResponse.json(
      { error: "Could not send the application. Try again shortly." },
      { status: 500 },
    );
  }
}
