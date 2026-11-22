import type { IconName } from "@/components/icons";
import type { ProductId } from "@/components/product-logo";
import { productUrl } from "@/lib/products";

export type NavItem = {
  label: string;
  href: string;
  /** Short line under the label (a few words). */
  description?: string;
  nowrapDescription?: boolean;
  icon?: IconName;
  product?: ProductId;
  /** Off-site link (the product sites): opens in a new tab, with a ↗ arrow. */
  external?: boolean;
};

/** One column of links inside a dropdown. */
export type NavSection = {
  title: string;
  items: NavItem[];
  /** Animated gradient rule under the title (used for products). */
  accent?: boolean;
};

/** Tinted column on the right of a dropdown. */
export type NavAside = { title: string; links: { label: string; href: string }[] };

export type NavGroup = {
  label: string;
  /** Plain link when there are no sections. */
  href?: string;
  sections?: NavSection[];
  aside?: NavAside;
};

export type NavCta = { label: string; href: string };

export type NavConfig = {
  home: string;
  groups: NavGroup[];
  secondary: NavCta;
  primary: NavCta;
};

/** Every link in a group, flattened (mobile menu, sitemap). */
export const groupItems = (group: NavGroup): NavItem[] => (group.sections ?? []).flatMap((s) => s.items);

const productSections: NavSection[] = [
  {
    title: "Live now",
    accent: true,
    items: [
      { label: "Spardha", product: "spardha", description: "Tests and campus contests", href: productUrl("spardha"), external: true },
      { label: "Marg", product: "marg", description: "Learning paths and roadmaps", nowrapDescription: true, href: productUrl("marg"), external: true },
      { label: "Setu", product: "setu", description: "Learning management", href: productUrl("setu"), external: true },
      { label: "Riyaaz", product: "riyaaz", description: "Daily coding practice", href: productUrl("riyaaz"), external: true },
      { label: "Kaksha", product: "kaksha", description: "Cohort-based video courses", nowrapDescription: true, href: productUrl("kaksha"), external: true },
    ],
  },
];

const story: NavItem = { label: "Story", icon: "book", description: "How we started", href: "/company/story" };
const team: NavItem = { label: "Team", icon: "team", description: "People behind TechCity", href: "/company/team" };
const contact: NavGroup = { label: "Contact", href: "#contact" };

export const partnerNav: NavConfig = {
  home: "/",
  groups: [
    {
      label: "Products",
      sections: productSections,
      aside: {
        title: "One account",
        links: [
          { label: "Student platform", href: "/students" },
          { label: "Reports", href: "/reports" },
        ],
      },
    },
    {
      label: "Programs",
      sections: [
        {
          title: "For students",
          items: [
            { label: "Trainers for students", icon: "trainer", description: "30+ subjects on campus", href: "/programs#trainers" },
            { label: "Placement preparation", icon: "target", description: "Interviews and drills", href: "/programs#placement" },
            { label: "Student placement", icon: "briefcase", description: "Campus to first role", href: "/programs#placing" },
            { label: "Mentorship", icon: "compass", description: "Industry mentors", href: "/programs#mentorship" },
          ],
        },
        {
          title: "For colleges",
          items: [
            { label: "Faculty development", icon: "faculty", description: "Upskill your faculty", href: "/programs#faculty" },
            { label: "Online lessons", icon: "video", description: "Live virtual classes", href: "/programs#online" },
            { label: "Online content", icon: "content", description: "Videos, notes and tests", href: "/programs#content" },
            { label: "Platforms for colleges", icon: "platform", description: "LMS, ERP and more", href: "/programs#platforms" },
          ],
        },
      ],
      aside: {
        title: "Programs",
        links: [
          { label: "See all programs", href: "/programs" },
          { label: "Partner with us", href: "#contact" },
        ],
      },
    },
    {
      label: "Projects",
      sections: [
        {
          title: "Campus projects",
          items: [
            { label: "Upcoming", icon: "calendar", description: "Starting next term", href: "/projects/upcoming" },
            { label: "Ongoing", icon: "pulse", description: "Running on campus now", href: "/projects/ongoing" },
            { label: "Completed", icon: "check", description: "Programs we’ve delivered", href: "/projects/completed" },
          ],
        },
      ],
      aside: { title: "Work with us", links: [{ label: "Start a project", href: "#contact" }] },
    },
    {
      label: "Company",
      sections: [
        {
          title: "About",
          items: [story, team, { label: "Testimonials", icon: "quote", description: "From partner colleges", href: "/company/testimonials" }],
        },
        {
          title: "Updates",
          items: [
            { label: "Reports", icon: "content", description: "From partner campuses", href: "/reports" },
            { label: "News", icon: "news", description: "Latest announcements", href: "/company/news" },
            { label: "Careers", icon: "briefcase", description: "Join the team", href: "/company/careers" },
          ],
        },
      ],
      aside: { title: "Get in touch", links: [{ label: "Contact us", href: "#contact" }] },
    },
    {
      label: "Partners",
      sections: [
        {
          title: "Partner with us",
          items: [
            { label: "Colleges", icon: "platform", description: "Bring skilling to your campus", nowrapDescription: true, href: "/partners/colleges" },
            { label: "Industry", icon: "briefcase", description: "Connect with emerging talent", nowrapDescription: true, href: "/partners/industry" },
          ],
        },
      ],
      aside: { title: "Build together", links: [{ label: "Start a conversation", href: "#contact" }] },
    },
    contact,
  ],
  secondary: { label: "For students", href: "/students" },
  primary: { label: "Partner with us", href: "#contact" },
};

export const studentNav: NavConfig = {
  home: "/students",
  groups: [
    {
      label: "Products",
      sections: productSections,
      aside: { title: "One account", links: [{ label: "Get started", href: "#contact" }] },
    },
    {
      label: "Showcase",
      sections: [
        {
          title: "Showcase",
          items: [
            { label: "Features", icon: "sparkle", description: "What your account does", href: "/students/features" },
            { label: "Student projects", icon: "code", description: "Built by students", href: "/students/projects" },
          ],
        },
      ],
      aside: { title: "Get started", links: [{ label: "Create your account", href: "#contact" }] },
    },
    {
      label: "About",
      sections: [
        {
          title: "About",
          items: [story, team, { label: "Testimonials", icon: "quote", description: "From students", href: "/students/testimonials" }],
        },
      ],
      aside: { title: "Join us", links: [{ label: "Careers", href: "/company/careers" }] },
    },
    { label: "Careers", href: "/company/careers" },
    contact,
  ],
  secondary: { label: "For Partners", href: "/" },
  primary: { label: "Get Started", href: "#contact" },
};
