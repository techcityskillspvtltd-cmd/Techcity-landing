import type { IconName } from "@/components/icons";
import type { HeroStat, Step, Tile } from "@/components/page-blocks";

/*
 * Content for the eight program pages (/programs/<slug>). Every page has the
 * same sections, in the same order, so they read as one set:
 *
 *   hero      run-in headline, a paragraph, a stageshow scene, rolling figures
 *   gets      what the program gives (six ruled tiles)
 *   steps     how it runs, start to finish (four numbered steps)
 *   covers    the subjects, tracks or modules inside it
 *   faqs      the questions colleges ask first
 *
 * Figures are the site's own (30+ subjects, 50+ industry partners, 40+ faculty
 * and trainers, 10K+ students, five products). Copy is a first draft for the
 * team to check before launch.
 */

export type ProgramSlug =
  | "trainers"
  | "placement-preparation"
  | "student-placement"
  | "mentorship"
  | "faculty-development"
  | "online-lessons"
  | "online-content"
  | "platforms";

export type ProgramPage = {
  slug: ProgramSlug;
  /** The anchor the home page bento and older links use. */
  anchor: string;
  label: string;
  audience: "For students" | "For colleges";
  icon: IconName;
  summary: string;
  hero: { lead: string; rest: string; body: string; stats: HeroStat[] };
  gets: { lead: string; rest: string; tiles: Tile[] };
  steps: { lead: string; rest: string; items: Step[] };
  covers: { lead: string; rest: string; items: { title: string; body: string }[] };
  faqs: { q: string; a: string }[];
};

export const programPages: ProgramPage[] = [
  {
    slug: "trainers",
    anchor: "trainers",
    label: "Trainers for students",
    audience: "For students",
    icon: "trainer",
    summary: "Industry trainers teach 30+ subjects on campus.",
    hero: {
      lead: "Industry trainers, inside your timetable.",
      rest: "Practitioners teach on campus, alongside your faculty.",
      body: "We place working engineers in your classrooms and labs for the subjects companies hire for. They teach in your slots, follow your academic calendar and hand your faculty everything they use.",
      stats: [
        { value: "30+", label: "Subjects taught on campus" },
        { value: "40+", label: "Faculty & trainers" },
        { value: "10K+", label: "Students mentored" },
      ],
    },
    gets: {
      lead: "Teaching the way a team works.",
      rest: "Every batch gets the same standard, whichever trainer walks in.",
      tiles: [
        { icon: "trainer", lead: "Practitioners, not lecturers.", body: "Trainers who build software for a living, vetted and reviewed every term." },
        { icon: "calendar", lead: "In your timetable.", body: "Sessions fit your existing slots, labs and semester dates. No weekend add-ons." },
        { icon: "code", lead: "Lab-first sessions.", body: "Most hours are hands-on: students write, run and review code in every class." },
        { icon: "check", lead: "Graded the way you grade.", body: "Assignments and internals map to your university's scheme and marks." },
        { icon: "faculty", lead: "Faculty in the room.", body: "Your faculty co-teach and keep the material, so the subject stays when we leave." },
        { icon: "pulse", lead: "Progress you can see.", body: "Attendance, submissions and scores for every batch, on one dashboard in Setu." },
      ],
    },
    steps: {
      lead: "How a term runs.",
      rest: "From the first call to the last lab.",
      items: [
        { icon: "compass", title: "Choose subjects", body: "Pick from 30+ subjects with your HoD, mapped to the semester and your syllabus." },
        { icon: "team", title: "Meet your trainers", body: "We assign one trainer per subject and introduce them to the department before day one." },
        { icon: "code", title: "Teach and build", body: "Weekly sessions and labs; students ship a project in every subject." },
        { icon: "check", title: "Review the term", body: "A report per batch: attendance, scores, projects and what to change next term." },
      ],
    },
    covers: {
      lead: "Subjects students are hired for.",
      rest: "A few of the 30+ we teach on campus.",
      items: [
        { title: "Data structures & algorithms", body: "Java, C++ or Python, from arrays to graphs, with timed practice." },
        { title: "Full-stack web", body: "MERN and Python full stack, from a first page to a deployed app." },
        { title: "AI & machine learning", body: "Python, data analysis, models and evaluation on real datasets." },
        { title: "Cloud & DevOps", body: "Linux, Git, containers, CI/CD and a cloud deployment of their own." },
        { title: "Cybersecurity", body: "Networks, web security and the habits of secure engineering." },
        { title: "Core & industrial", body: "Embedded systems, IoT, SCADA and PLC for electrical and electronics batches." },
      ],
    },
    faqs: [
      { q: "Do trainers replace our faculty?", a: "No. They teach alongside your faculty, who stay in the room, co-teach and keep every resource we use." },
      { q: "How many hours a week does it take?", a: "It fits the hours your timetable already gives the subject. We plan the split of theory and lab with your HoD." },
      { q: "Which years and branches can join?", a: "Any year and branch. We usually start with second and third years in CSE, IT, ECE and EE." },
      { q: "What happens if a trainer is unavailable?", a: "We send a replacement from the same subject pool, briefed on where the batch is, so no session is lost." },
    ],
  },
  {
    slug: "placement-preparation",
    anchor: "placement",
    label: "Placement preparation",
    audience: "For students",
    icon: "target",
    summary: "Mock interviews, aptitude drills and weekly feedback.",
    hero: {
      lead: "Interview-ready by final year.",
      rest: "Aptitude, coding rounds and interviews, practised every week.",
      body: "Placement season goes better when it isn't the first time. Students rehearse every round a company runs, get scored feedback after each one and know where they stand long before the first drive.",
      stats: [
        { value: "50+", label: "Industry partners shaping the rounds" },
        { value: "40+", label: "Faculty & trainers" },
        { value: "10K+", label: "Students mentored" },
      ],
    },
    gets: {
      lead: "Every round, before the real one.",
      rest: "Built from how our industry partners actually hire.",
      tiles: [
        { icon: "pulse", lead: "Aptitude drills.", body: "Quant, logical reasoning and verbal, timed the way online assessments are." },
        { icon: "code", lead: "Coding rounds.", body: "Timed problem sets on Spardha, scored instantly, at the difficulty companies set." },
        { icon: "team", lead: "Mock interviews.", body: "Technical and HR interviews with industry interviewers, recorded and scored." },
        { icon: "content", lead: "Resumes that get read.", body: "One-page resumes and LinkedIn profiles, reviewed line by line." },
        { icon: "quote", lead: "Group discussions.", body: "Practice GDs with a moderator and feedback on how each student contributed." },
        { icon: "target", lead: "A readiness score.", body: "Every student sees where they stand and what to fix next, week by week." },
      ],
    },
    steps: {
      lead: "From baseline to offer-ready.",
      rest: "A season, start to finish.",
      items: [
        { icon: "pulse", title: "Baseline test", body: "A diagnostic across aptitude, coding and communication sets each student's starting point." },
        { icon: "calendar", title: "Weekly drills", body: "Short, timed sessions every week, matched to each batch's weakest areas." },
        { icon: "team", title: "Mock interviews", body: "Each student sits technical and HR mocks, with a written scorecard after each." },
        { icon: "check", title: "Ready for drives", body: "A readiness report per student for your placement cell, before the first company visits." },
      ],
    },
    covers: {
      lead: "What we drill.",
      rest: "The rounds students meet in campus hiring.",
      items: [
        { title: "Quantitative aptitude", body: "Arithmetic, percentages, time and work, probability, at test speed." },
        { title: "Logical reasoning", body: "Puzzles, series, seating and data interpretation." },
        { title: "Verbal ability", body: "Reading comprehension, grammar and business email writing." },
        { title: "Coding assessments", body: "DSA problems in the formats HackerRank-style tests use." },
        { title: "Technical interviews", body: "Core CS, projects and problem solving out loud." },
        { title: "HR & communication", body: "Introductions, situational questions and salary conversations." },
      ],
    },
    faqs: [
      { q: "When should students start?", a: "Third year is ideal: a full year of practice before drives begin. We also run shorter final-year sprints." },
      { q: "Who conducts the mock interviews?", a: "Engineers and recruiters from our industry partners, briefed on the roles your students apply for." },
      { q: "Does the placement cell see results?", a: "Yes. Your cell gets each student's readiness score and a batch report before every drive." },
      { q: "Can it run alongside regular classes?", a: "Yes. Drills are short and scheduled in free slots or training hours your timetable already has." },
    ],
  },
  {
    slug: "student-placement",
    anchor: "placing",
    label: "Student placement",
    audience: "For students",
    icon: "briefcase",
    summary: "Placement drives and referrals with our partners.",
    hero: {
      lead: "From campus to first offer.",
      rest: "Placement drives and referrals with the companies we work with.",
      body: "Our industry partners shape what we teach, and they hire from the campuses we teach at. We bring drives to your college, refer ready students to open roles and stay with them until they join.",
      stats: [
        { value: "50+", label: "Industry partners" },
        { value: "30+", label: "Partner colleges" },
        { value: "10K+", label: "Students mentored" },
      ],
    },
    gets: {
      lead: "A placement network, working for your campus.",
      rest: "Alongside your placement cell, not instead of it.",
      tiles: [
        { icon: "briefcase", lead: "Campus drives.", body: "Partner companies run drives at your college, with dates planned around your calendar." },
        { icon: "team", lead: "Referrals.", body: "Students who are ready are referred to open roles across our partner network." },
        { icon: "content", lead: "Profiles that match.", body: "Each student's skills, projects and scores, matched to what a role asks for." },
        { icon: "calendar", lead: "Internships first.", body: "Internships in pre-final year turn into offers, and into experience on a resume." },
        { icon: "pulse", lead: "Tracked to the offer.", body: "Applications, rounds and offers for every student, shared with your placement cell." },
        { icon: "compass", lead: "Support after the offer.", body: "Help with offer letters, joining and the first weeks in a new team." },
      ],
    },
    steps: {
      lead: "How a student gets placed.",
      rest: "Four steps, tracked end to end.",
      items: [
        { icon: "target", title: "Get ready", body: "Placement preparation brings each student to a readiness score companies trust." },
        { icon: "content", title: "Build the profile", body: "Resume, projects and scores go into one profile, ready to share." },
        { icon: "briefcase", title: "Match and apply", body: "We match students to drives and referrals, and prepare them for each company's rounds." },
        { icon: "check", title: "Offer and join", body: "We stay with students through offers, documents and joining day." },
      ],
    },
    covers: {
      lead: "Roles our students go into.",
      rest: "Across software, data and core engineering.",
      items: [
        { title: "Software engineering", body: "Frontend, backend and full-stack developer roles." },
        { title: "Data & analytics", body: "Data analyst, business analyst and junior data scientist roles." },
        { title: "Cloud & DevOps", body: "Support, cloud operations and DevOps engineer roles." },
        { title: "Quality engineering", body: "Manual and automation testing roles in product teams." },
        { title: "Core engineering", body: "Embedded, automation and SCADA roles for core branches." },
        { title: "Internships", body: "Pre-final and final-year internships that lead to offers." },
      ],
    },
    faqs: [
      { q: "Does this replace our placement cell?", a: "No. We work with your cell: we add companies, prepare students and share every update." },
      { q: "Is there a fee for students?", a: "Placement support is part of the college partnership. Students don't pay to apply to drives or referrals." },
      { q: "Which companies take part?", a: "Companies from our network of 50+ industry partners, across software, data, cloud and core engineering." },
      { q: "Can students from any branch apply?", a: "Yes. We match roles to each student's skills, including core roles for electrical and electronics branches." },
    ],
  },
  {
    slug: "mentorship",
    anchor: "mentorship",
    label: "Mentorship",
    audience: "For students",
    icon: "compass",
    summary: "One-to-one sessions with engineers who hire.",
    hero: {
      lead: "Mentors from the industry.",
      rest: "One-to-one time with engineers who hire.",
      body: "A good mentor shortens years of guessing. Students meet engineers and managers from our partner companies for career guidance, project reviews and honest feedback on what to learn next.",
      stats: [
        { value: "50+", label: "Industry partners" },
        { value: "40+", label: "Faculty & trainers" },
        { value: "10K+", label: "Students mentored" },
      ],
    },
    gets: {
      lead: "Guidance a classroom can't give.",
      rest: "From people already doing the work.",
      tiles: [
        { icon: "team", lead: "One-to-one sessions.", body: "Booked slots with a mentor matched to each student's goals." },
        { icon: "code", lead: "Project reviews.", body: "Mentors review code and projects the way a senior engineer would." },
        { icon: "roadmap", lead: "A learning plan.", body: "A plan for what to learn next, tracked as a roadmap in Marg." },
        { icon: "content", lead: "Resume feedback.", body: "Honest notes on resumes and portfolios from people who shortlist." },
        { icon: "quote", lead: "Career talks.", body: "Group sessions on roles, teams and how hiring really works." },
        { icon: "pulse", lead: "Check-ins.", body: "Regular check-ins so goals turn into progress, not just a good conversation." },
      ],
    },
    steps: {
      lead: "How mentoring works.",
      rest: "Matched, planned and followed up.",
      items: [
        { icon: "compass", title: "Set goals", body: "Students share where they want to go: a role, a skill, a company." },
        { icon: "team", title: "Get matched", body: "We match each student with a mentor from the right field." },
        { icon: "calendar", title: "Meet regularly", body: "Booked sessions for reviews, questions and planning, online or on campus." },
        { icon: "check", title: "Track progress", body: "Goals and next steps are tracked, so every session builds on the last." },
      ],
    },
    covers: {
      lead: "What students bring to a mentor.",
      rest: "The questions we hear most.",
      items: [
        { title: "Choosing a path", body: "Software, data, cloud or core, and what each looks like day to day." },
        { title: "Project feedback", body: "Code reviews, architecture and how to present a project." },
        { title: "Interview strategy", body: "How to prepare, what interviewers look for and how to follow up." },
        { title: "Open source & portfolios", body: "Where to contribute and how to show work that gets noticed." },
        { title: "Higher studies", body: "Masters, certifications and when they are worth it." },
        { title: "The first job", body: "Offers, teams and the habits that matter in the first year." },
      ],
    },
    faqs: [
      { q: "Who are the mentors?", a: "Engineers, team leads and managers from our 50+ industry partners." },
      { q: "Are sessions online or on campus?", a: "Both. Most one-to-ones are online; career talks often run on campus." },
      { q: "How are students matched?", a: "By the goal they set: the field, the role and the skills they want to build." },
      { q: "How often do students meet their mentor?", a: "We plan a regular rhythm with each college, with extra sessions before placement season." },
    ],
  },
  {
    slug: "faculty-development",
    anchor: "faculty",
    label: "Faculty development",
    audience: "For colleges",
    icon: "faculty",
    summary: "Hands-on labs in AI, cloud and DevOps for faculty.",
    hero: {
      lead: "Faculty who stay current.",
      rest: "Hands-on programs in AI, cloud and DevOps for your teaching staff.",
      body: "Technology moves faster than a syllabus. Our faculty development programs give your teachers time in the same labs and tools industry uses, so they can bring them straight into their own classes.",
      stats: [
        { value: "30+", label: "Subjects to choose from" },
        { value: "40+", label: "Faculty & trainers" },
        { value: "30+", label: "Partner colleges" },
      ],
    },
    gets: {
      lead: "Built for people who teach.",
      rest: "Practical, short and ready for the classroom.",
      tiles: [
        { icon: "code", lead: "Hands-on labs.", body: "Every module is mostly lab time, on the tools and platforms industry uses." },
        { icon: "content", lead: "Ready-to-teach material.", body: "Slides, lab sheets and question banks faculty can use in their own classes." },
        { icon: "calendar", lead: "Fits the calendar.", body: "Short intensive programs in breaks, or weekly sessions through the term." },
        { icon: "trainer", lead: "Industry instructors.", body: "Taught by practitioners who use the tools every day." },
        { icon: "check", lead: "Certificates.", body: "Certificates for every completed program, for appraisals and accreditation files." },
        { icon: "pulse", lead: "Accreditation ready.", body: "Records of every program for NAAC and NBA documentation." },
      ],
    },
    steps: {
      lead: "How a program runs.",
      rest: "Chosen with your department.",
      items: [
        { icon: "compass", title: "Pick a track", body: "Choose topics with your HoDs, from AI and cloud to full stack and security." },
        { icon: "calendar", title: "Schedule it", body: "An intensive week in a break, or sessions spread through the term." },
        { icon: "code", title: "Learn by doing", body: "Labs, a mini project and a session on teaching it to students." },
        { icon: "check", title: "Certify and teach", body: "Faculty are certified and leave with material ready for their classes." },
      ],
    },
    covers: {
      lead: "Tracks for faculty.",
      rest: "The ones colleges ask for most.",
      items: [
        { title: "Generative AI & ML", body: "Models, prompting, evaluation and using AI tools in teaching." },
        { title: "Cloud computing", body: "Core cloud services, deployment and cost, with real accounts." },
        { title: "DevOps", body: "Git, CI/CD, containers and monitoring, end to end." },
        { title: "Full-stack development", body: "Modern web frameworks, APIs and databases." },
        { title: "Data analytics", body: "Python, SQL and dashboards on real datasets." },
        { title: "Outcome-based teaching", body: "Designing labs, projects and assessments that map to outcomes." },
      ],
    },
    faqs: [
      { q: "How long is a program?", a: "Most run for a week of intensive sessions, or a few hours a week across a term." },
      { q: "Do faculty need prior experience?", a: "No. Each track starts from the basics and builds to a project, with more advanced tracks for experienced staff." },
      { q: "Is it on campus or online?", a: "Either. Labs run best on campus; online sessions use live coding and cloud labs." },
      { q: "Do faculty get certificates?", a: "Yes, one per completed program, with records you can use for NAAC and NBA." },
    ],
  },
  {
    slug: "online-lessons",
    anchor: "online",
    label: "Online lessons",
    audience: "For colleges",
    icon: "video",
    summary: "Live virtual classes with industry experts.",
    hero: {
      lead: "Live classes, on any schedule.",
      rest: "Industry experts teach online when campus time is tight.",
      body: "Some subjects need an expert your city doesn't have, and some weeks don't have a free slot. Live online lessons bring practitioners to your students, with live coding, questions and recordings for revision.",
      stats: [
        { value: "30+", label: "Subjects available" },
        { value: "40+", label: "Faculty & trainers" },
        { value: "10K+", label: "Students mentored" },
      ],
    },
    gets: {
      lead: "Live, not lectures on video.",
      rest: "Classes students take part in.",
      tiles: [
        { icon: "video", lead: "Live sessions.", body: "Real-time classes with an industry expert, on a schedule you set." },
        { icon: "code", lead: "Live coding.", body: "Instructors build while they teach, and students code along." },
        { icon: "quote", lead: "Questions answered.", body: "Live Q&A in every class, and doubt sessions between them." },
        { icon: "content", lead: "Recordings.", body: "Every class is recorded in Kaksha, for revision and for anyone who missed it." },
        { icon: "check", lead: "Attendance tracked.", body: "Attendance, quizzes and assignments recorded for every student." },
        { icon: "calendar", lead: "Flexible slots.", body: "Classes after hours, on weekends or in free periods." },
      ],
    },
    steps: {
      lead: "How online lessons run.",
      rest: "Planned like a course, taught live.",
      items: [
        { icon: "compass", title: "Plan the course", body: "Pick the subject and the slots with your department." },
        { icon: "video", title: "Teach live", body: "An expert teaches each class live, with code, questions and polls." },
        { icon: "content", title: "Practise between classes", body: "Assignments and practice sets in Kaksha and Riyaaz keep students moving." },
        { icon: "check", title: "Assess", body: "Quizzes, a project and a report per batch at the end." },
      ],
    },
    covers: {
      lead: "Popular online courses.",
      rest: "Subjects where an expert makes the difference.",
      items: [
        { title: "System design", body: "How large applications are built, scaled and kept running." },
        { title: "Generative AI", body: "Building with language models, from prompts to apps." },
        { title: "Cloud architecture", body: "Designing on the cloud, with live deployments." },
        { title: "Advanced DSA", body: "Hard problems, patterns and contest strategy." },
        { title: "Cybersecurity", body: "Attacks, defences and security in practice." },
        { title: "Product & UI design", body: "Design thinking, Figma and building usable interfaces." },
      ],
    },
    faqs: [
      { q: "What do students need?", a: "A laptop or the college lab, and a stable internet connection. Everything else runs in the browser." },
      { q: "Can classes be recorded?", a: "Yes. Every class is recorded in Kaksha for revision." },
      { q: "How many students per class?", a: "We size classes so everyone can ask questions; large batches get extra doubt sessions." },
      { q: "Can online and on-campus training mix?", a: "Yes. Many colleges run core subjects on campus and specialist topics online." },
    ],
  },
  {
    slug: "online-content",
    anchor: "content",
    label: "Online content",
    audience: "For colleges",
    icon: "content",
    summary: "Videos, notes and tests, ready from day one.",
    hero: {
      lead: "Content, ready to teach.",
      rest: "Videos, notes and tests from day one.",
      body: "Good material takes months to make. Our content library gives your faculty and students video lessons, notes, lab sheets and tests built with industry partners, kept current and mapped to your syllabus.",
      stats: [
        { value: "30+", label: "Subjects covered" },
        { value: "50+", label: "Industry partners shaping it" },
        { value: "10K+", label: "Students learning with it" },
      ],
    },
    gets: {
      lead: "Everything a subject needs.",
      rest: "In one library, on one account.",
      tiles: [
        { icon: "video", lead: "Video lessons.", body: "Short videos for every topic, made for watching between classes." },
        { icon: "book", lead: "Notes.", body: "Clear notes and summaries for each unit, ready to revise from." },
        { icon: "code", lead: "Lab sheets.", body: "Step-by-step labs with starter code and expected output." },
        { icon: "check", lead: "Tests and quizzes.", body: "Question banks and tests in Spardha, scored instantly." },
        { icon: "faculty", lead: "Teaching guides.", body: "Lesson plans and slides for faculty who teach with it." },
        { icon: "sparkle", lead: "Kept current.", body: "Updated with industry partners, so content moves when tools do." },
      ],
    },
    steps: {
      lead: "How colleges use it.",
      rest: "From syllabus to semester.",
      items: [
        { icon: "compass", title: "Map the syllabus", body: "We map our library to your university's syllabus, unit by unit." },
        { icon: "platform", title: "Set up access", body: "Faculty and students get access through Setu and Kaksha on one account." },
        { icon: "book", title: "Teach and revise", body: "Faculty teach with it; students watch, read and practise between classes." },
        { icon: "pulse", title: "Track learning", body: "See what each batch has watched, practised and scored." },
      ],
    },
    covers: {
      lead: "What's in the library.",
      rest: "Across software, data and core subjects.",
      items: [
        { title: "Programming", body: "C, C++, Java and Python, from first program to OOP." },
        { title: "DSA", body: "Every core data structure and algorithm, with practice." },
        { title: "Web development", body: "HTML to full-stack frameworks and deployment." },
        { title: "AI & data", body: "Python, statistics, machine learning and generative AI." },
        { title: "Cloud & DevOps", body: "Linux, cloud services, containers and pipelines." },
        { title: "Aptitude", body: "Quant, reasoning and verbal for placement tests." },
      ],
    },
    faqs: [
      { q: "Is the content mapped to our syllabus?", a: "Yes. We map it to your university's syllabus and fill gaps unit by unit." },
      { q: "Can faculty add their own material?", a: "Yes. Faculty can add notes, videos and tests alongside ours in Setu." },
      { q: "How do students access it?", a: "On one TechCity account, on a phone or laptop, through Setu and Kaksha." },
      { q: "How often is it updated?", a: "Continuously, with our industry partners, and always before each new semester." },
    ],
  },
  {
    slug: "platforms",
    anchor: "platforms",
    label: "Platforms for colleges",
    audience: "For colleges",
    icon: "platform",
    summary: "LMS, tests, practice and placements on one account.",
    hero: {
      lead: "One login for everything.",
      rest: "Courses, tests, practice and placements in five connected tools.",
      body: "Most colleges juggle separate tools for classes, tests and placements. Our platforms run all of it on one TechCity account, so faculty manage less and every student's progress lives in one place.",
      stats: [
        { value: "5", label: "Connected products" },
        { value: "1", label: "Account for every student" },
        { value: "30+", label: "Partner colleges" },
      ],
    },
    gets: {
      lead: "Five tools that share one account.",
      rest: "Use one, or all five together.",
      tiles: [
        { icon: "platform", lead: "Setu, the LMS.", body: "Courses, assignments, attendance and grades for every batch." },
        { icon: "roadmap", lead: "Marg, roadmaps.", body: "Guided paths for DSA, AI/ML and cloud, step by step." },
        { icon: "target", lead: "Spardha, tests.", body: "Timed tests and campus contests with live leaderboards." },
        { icon: "code", lead: "Riyaaz, daily practice.", body: "Coding problems every day, with instant feedback and streaks." },
        { icon: "video", lead: "Kaksha, cohort courses.", body: "Video courses with labs, taken together as a batch." },
        { icon: "check", lead: "One account.", body: "Students sign in once; faculty see everything in one dashboard." },
      ],
    },
    steps: {
      lead: "Going live on campus.",
      rest: "Set up with your team.",
      items: [
        { icon: "compass", title: "Choose products", body: "Start with the tools you need most; add the rest when you're ready." },
        { icon: "team", title: "Bring your batches", body: "We import students, faculty and courses, and set up roles." },
        { icon: "faculty", title: "Train your staff", body: "Short sessions for faculty and admins on running their courses." },
        { icon: "pulse", title: "Run and report", body: "Dashboards and reports for every batch, department and drive." },
      ],
    },
    covers: {
      lead: "Built for how colleges run.",
      rest: "Not adapted from a corporate tool.",
      items: [
        { title: "Batches & sections", body: "Organised by year, branch and section, the way your college is." },
        { title: "Roles", body: "Separate views for students, faculty, HoDs and the placement cell." },
        { title: "Attendance", body: "Per session and per subject, with alerts for low attendance." },
        { title: "Assessments", body: "Internals, contests and practice, scored and recorded together." },
        { title: "Placement records", body: "Readiness, applications and offers per student." },
        { title: "Reports", body: "Exports for HoDs, management and NAAC and NBA files." },
      ],
    },
    faqs: [
      { q: "Do we have to use all five products?", a: "No. Each works on its own; they share one account when you use more than one." },
      { q: "Can it work with our existing systems?", a: "Yes. We import from your current records and export reports in the formats you use." },
      { q: "Which products are live today?", a: "All five are live: Spardha, Marg, Setu, Riyaaz and Kaksha." },
      { q: "Who owns the data?", a: "Your college does. Student and course data stays yours, and you can export it at any time." },
    ],
  },
];

export const programBySlug = (slug: string) => programPages.find((p) => p.slug === slug);
export const programHref = (anchor: string) => {
  const p = programPages.find((x) => x.anchor === anchor);
  return p ? `/programs/${p.slug}` : "/programs";
};
