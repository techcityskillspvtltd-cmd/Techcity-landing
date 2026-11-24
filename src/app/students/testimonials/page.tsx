import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Student testimonials" };

export default function Page() {
  return (
    <PageShell crumb={{ label: "Students", href: "/students" }} title="Student testimonials" />
  );
}
