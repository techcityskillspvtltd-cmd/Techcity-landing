import type { Metadata } from "next";
import { Newsroom } from "@/components/newsroom";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "The latest from TechCity Skills: programs starting, under way and finished at partner colleges, partner stories, and the product stack.",
  alternates: { canonical: "/company/news" },
};

export default function Page() {
  return <Newsroom />;
}
