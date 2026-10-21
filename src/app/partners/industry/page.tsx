import type { Metadata } from "next";
import PartnerDirectory from "@/components/PartnerDirectory";
import { industryPartners } from "@/data/partners";

export const metadata: Metadata = {
  title: "Industry partners",
  description:
    "Companies TechCity ties up with: a short list of hiring and technology partners.",
};

export default function IndustryPartnersPage() {
  return (
    <PartnerDirectory
      label="Industry partners"
      title="Companies we work with."
      partners={industryPartners}
    />
  );
}
