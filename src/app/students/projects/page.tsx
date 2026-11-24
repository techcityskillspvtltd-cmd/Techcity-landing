import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { title: "Student projects" };

export default function Page() {
  return (
    <PageShell crumb={{ label: "Students", href: "/students" }} title="Student projects" />
  );
}
