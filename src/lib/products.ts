import type { ProductId } from "@/components/product-logo";

export type Product = {
  id: ProductId;
  name: string;
  /** Short category shown in the mono label and the stack callout. */
  category: string;
  /** One- or two-word headline for the scroll section. */
  headline: string;
  /** One-sentence blurb under the headline. */
  blurb: string;
  tagline: string;
  description: string;
  features: string[];
  status: "Live" | "Coming soon";
  /** The product's own site (external, opens in a new tab). */
  href: string;
};

/** Each product lives on its own subdomain, outside this site. */
export const productUrl = (id: ProductId) => `https://${id}.techcityskills.com`;

/** Order matters: this is the order the products scroll through on the home page. */
export const products: Product[] = [
  {
    id: "setu",
    name: "Setu",
    category: "Learning management",
    headline: "Run every course",
    blurb: "Courses, assignments and attendance in one place, for every batch on campus.",
    tagline: "The campus learning hub.",
    description:
      "Courses, assignments, attendance and progress in one place, so faculty can run every cohort and students always know what’s next.",
    features: ["Courses and assignments", "Attendance and grading", "Progress for every batch"],
    status: "Live",
    href: productUrl("setu"),
  },
  {
    id: "marg",
    name: "Marg",
    category: "Learning roadmaps",
    headline: "Know what’s next",
    blurb: "Guided roadmaps for DSA, AI/ML and cloud, one clear step at a time.",
    tagline: "A clear path to every skill.",
    description:
      "Guided roadmaps for DSA, AI/ML and cloud that turn big goals into small steps, and show students what to learn next and how far they’ve come.",
    features: ["DSA, AI/ML and cloud tracks", "Milestones with curated resources", "Progress students can see"],
    status: "Live",
    href: productUrl("marg"),
  },
  {
    id: "kaksha",
    name: "Kaksha",
    category: "Cohort courses",
    headline: "Learn together",
    blurb: "Video courses with hands-on labs, taken with your batch, finished with work you built.",
    tagline: "Learn together, build as you go.",
    description:
      "Cohort-based video courses paired with hands-on labs, so students learn alongside their batch and finish every chapter with work they built.",
    features: ["Video chapters with labs", "Live cohorts", "Work to show at the end"],
    status: "Live",
    href: productUrl("kaksha"),
  },
  {
    id: "riyaaz",
    name: "Riyaaz",
    category: "Daily practice",
    headline: "Practise daily",
    blurb: "A few problems a day, instant feedback on every run, and streaks that build the habit.",
    tagline: "The daily habit that gets students hired.",
    description:
      "A few LeetCode-style problems every day, instant feedback on every run, and streaks that keep students coming back.",
    features: ["Daily problem sets", "Instant test feedback", "Streaks and progress"],
    status: "Live",
    href: productUrl("riyaaz"),
  },
  {
    id: "spardha",
    name: "Spardha",
    category: "Tests and contests",
    headline: "Prove it",
    blurb: "Timed tests and campus contests with instant scores and live leaderboards.",
    tagline: "Tests and contests for the whole campus.",
    description:
      "Timed assessments and coding contests with instant scoring and live leaderboards, so faculty see where every student stands.",
    features: ["Timed tests and assessments", "Campus-wide coding contests", "Instant results and leaderboards"],
    status: "Live",
    href: productUrl("spardha"),
  },
];
