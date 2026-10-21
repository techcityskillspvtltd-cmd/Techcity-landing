import type { Viewport } from "next";
import Footer from "@/components/Footer";
import StudentNav from "@/components/StudentNav";

export const viewport: Viewport = {
  themeColor: "#090b10",
  colorScheme: "dark",
};

export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="student-page flex min-h-svh flex-col overflow-x-clip bg-background font-sans text-foreground">
      <StudentNav />
      {children}
      <Footer compact />
    </div>
  );
}
