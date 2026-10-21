export type StudentProduct = {
  slug: string;
  category: string;
  name: string;
  label: string;
  index: string;
  title: string;
  line: string;
  href: string;
  accent: string;
  external: boolean;
};

export const studentProducts: StudentProduct[] = [
  {
    slug: "marg",
    category: "Roadmaps",
    name: "Marg",
    label: "Marg",
    index: "01",
    title: "Learning paths and roadmaps",
    line: "Ordered tracks so you always know the next step: DSA, AI/ML, cloud, and more.",
    href:
      process.env.NEXT_PUBLIC_PRODUCT_MARG_URL?.trim() ||
      "https://tech-city-rm.vercel.app/",
    accent: "#2563eb",
    external: true,
  },
  {
    slug: "spardha",
    category: "Assessment",
    name: "Spardha",
    label: "Spardha",
    index: "02",
    title: "Tests and assessments",
    line: "Campus contests and skill checks you can enter, finish, and talk through later.",
    href:
      process.env.NEXT_PUBLIC_PRODUCT_SPARDHA_URL?.trim() ||
      "https://tech-city-spardha.vercel.app/",
    accent: "#d97706",
    external: true,
  },
  {
    slug: "riyaaz",
    category: "Code Arena",
    name: "Riyaaz",
    label: "Riyaaz",
    index: "03",
    title: "Daily coding practice",
    line: "LeetCode-style problems you can attempt every day and keep the attempt on file.",
    href: "/students/riyaaz",
    accent: "#0d9488",
    external: false,
  },
  {
    slug: "kaksha",
    category: "Content",
    name: "Kaksha",
    label: "Kaksha",
    index: "04",
    title: "Cohort-based video courses",
    line: "Watch sessions with your cohort, then open the lab that follows each one.",
    href: "/students/kaksha",
    accent: "#e11d48",
    external: false,
  },
  {
    slug: "setu",
    category: "LMS",
    name: "Setu",
    label: "Setu",
    index: "05",
    title: "Learning management",
    line: "Lessons, labs, and progress for the programs your college already runs.",
    href: "/students/setu",
    accent: "#4f46e5",
    external: false,
  },
];

/** Partner-side pages only (no student-only about routes). */
export const studentAboutLinks = [
  { href: "/about", label: "Story" },
  { href: "/partners/college", label: "Colleges" },
  { href: "/programs", label: "Programs" },
  { href: "/testimonials", label: "Testimonials" },
] as const;

const loginUrl =
  process.env.NEXT_PUBLIC_STUDENT_LOGIN_URL?.trim() ||
  "https://tech-city-spardha.vercel.app/login";

export const studentLogin = {
  slug: "login",
  href: loginUrl,
  label: "Get started",
  line: "One account for Marg, Spardha, Riyaaz, Kaksha, and Setu.",
  external: true,
} as const;

export const comingSoonProducts = studentProducts.filter(
  (product) => !product.external,
);

export function studentProduct(slug: string) {
  return studentProducts.find((product) => product.slug === slug);
}

export function studentPage(slug: string) {
  if (slug === studentLogin.slug) return studentLogin;
  return comingSoonProducts.find((product) => product.slug === slug);
}
