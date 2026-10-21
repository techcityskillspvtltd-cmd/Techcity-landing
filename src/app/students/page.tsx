import type { Metadata } from "next";
import CollegeLogoTicker from "@/components/CollegeLogoTicker";
import StudentAbout from "@/components/StudentAbout";
import StudentCareers from "@/components/StudentCareers";
import StudentCta from "@/components/StudentCta";
import StudentHero from "@/components/StudentHero";
import StudentProducts from "@/components/StudentProducts";
import StudentShowcase from "@/components/StudentShowcase";

export const metadata: Metadata = {
  title: "For students",
  description:
    "Marg, Spardha, Riyaaz, Kaksha, and Setu: TechCity products for students: roadmaps, assessments, coding practice, courses, and LMS.",
};

export default function Students() {
  return (
    <main className="flex-1">
      <StudentHero />

      <div className="-mt-4 pb-2 pt-1 sm:-mt-6 sm:pb-4 sm:pt-2 md:-mt-8 md:pb-6 md:pt-3">
        <CollegeLogoTicker />
      </div>

      <StudentAbout />

      <StudentProducts />

      <StudentShowcase />

      <StudentCareers />

      <StudentCta />
    </main>
  );
}
