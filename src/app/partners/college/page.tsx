import type { Metadata } from "next";
import PartnerDirectory from "@/components/PartnerDirectory";
import { collegePartners } from "@/data/partners";

export const metadata: Metadata = {
  title: "College partners",
  description:
    "Colleges TechCity teaches with: names, cities, and a short note on how the work runs on each campus.",
};

export default function CollegePartnersPage() {
  return (
    <PartnerDirectory
      label="College partners"
      title="Colleges we teach with."
      partners={collegePartners}
    />
  );
}
