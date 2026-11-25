import type { IconName } from "@/components/icons";

export const partnerPrograms = [
  {
    title: "For students",
    items: [
      { anchor: "trainers", label: "Trainers for students", description: "30+ subjects on campus", icon: "trainer" },
      { anchor: "placement", label: "Placement preparation", description: "Interviews and drills", icon: "target" },
      { anchor: "placing", label: "Student placement", description: "Campus to first role", icon: "briefcase" },
      { anchor: "workshops", label: "Workshops", description: "Hands-on, led by engineers", icon: "calendar" },
    ],
  },
  {
    title: "For colleges",
    items: [
      { anchor: "faculty", label: "Faculty development", description: "Upskill your faculty", icon: "faculty" },
      { anchor: "online", label: "Online lessons", description: "Live virtual classes", icon: "video" },
      { anchor: "content", label: "Online content", description: "Videos, notes and tests", icon: "content" },
      { anchor: "platforms", label: "Platforms for colleges", description: "LMS, ERP and more", icon: "platform" },
    ],
  },
] satisfies { title: string; items: { anchor: string; label: string; description: string; icon: IconName }[] }[];

/**
 * Homepage bento: all eight programs, students first (rows 1–2), then colleges
 * (rows 3–4). `size` sets the card's footprint on the desktop grid (3 columns):
 *
 *   trainers   trainers   placement
 *   placing    mentor     placement
 *   faculty    content    platforms
 *   faculty    online     online
 *
 * Tile kinds are mixed on purpose: product scenes, one stat (placing, on navy)
 * and one collection (platforms). Copy is a run-in: a bold `lead` and a muted
 * `body` sentence at the same size.
 */
export type BentoSize = "wide" | "tall" | "small";
export type BentoAudience = "For students" | "For colleges";

export type BentoProgram = {
  anchor: string;
  icon: IconName;
  audience: BentoAudience;
  lead: string;
  body: string;
  size: BentoSize;
};

export const programBento: BentoProgram[] = [
  {
    anchor: "trainers",
    icon: "trainer",
    audience: "For students",
    lead: "Industry trainers on campus.",
    body: "Practitioners teach 30+ subjects inside your timetable, alongside your own faculty.",
    size: "wide",
  },
  {
    anchor: "placement",
    icon: "target",
    audience: "For students",
    lead: "Interview-ready by final year.",
    body: "Mock interviews, aptitude drills and feedback every week.",
    size: "tall",
  },
  {
    anchor: "placing",
    icon: "briefcase",
    audience: "For students",
    lead: "From campus to first offer.",
    body: "Placement drives and referrals with the companies we work with.",
    size: "small",
  },
  {
    anchor: "workshops",
    icon: "calendar",
    audience: "For students",
    lead: "Workshops that build something.",
    body: "Hands-on days on campus, led by engineers.",
    size: "small",
  },
  {
    anchor: "faculty",
    icon: "faculty",
    audience: "For colleges",
    lead: "Faculty who stay current.",
    body: "Hands-on labs in AI, cloud and DevOps for your teaching staff.",
    size: "tall",
  },
  {
    anchor: "content",
    icon: "content",
    audience: "For colleges",
    lead: "Content, ready to teach.",
    body: "Videos, notes and tests from day one.",
    size: "small",
  },
  {
    anchor: "platforms",
    icon: "platform",
    audience: "For colleges",
    lead: "One login for everything.",
    body: "Courses, tests, practice and placements in five connected tools.",
    size: "small",
  },
  {
    anchor: "online",
    icon: "video",
    audience: "For colleges",
    lead: "Live classes, on any schedule.",
    body: "Industry experts teach online with live coding when campus time is tight.",
    size: "wide",
  },
];
