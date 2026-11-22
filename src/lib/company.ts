/**
 * Company content for the /company pages: story, team, student stories.
 *
 * Taken from TechCity Skills' live site (techcityskills.com: /about, /faculty
 * and /testimonials), copied in November 2026. Keep it in step with that site
 * rather than writing new claims here.
 */

/* ------------------------------------------------------------- story */

export const figures = [
  { value: "30+", label: "Partner colleges" },
  { value: "50+", label: "Industry partners" },
  { value: "40+", label: "Faculty & trainers" },
  { value: "10K+", label: "Students mentored" },
  { value: "12,000+", label: "Sessions taught" },
  { value: "150+", label: "Workshops run" },
];

/** The three places the classroom and the team miss each other, and the answer to each. */
export const problems = [
  {
    problem: "A finished course is not finished work.",
    detail:
      "A syllabus can run to the last chapter and still never ask a student to ship something a team would keep. Marks measure what was remembered. A role measures whether the system holds.",
    answer: "Labs are built to be kept.",
    how: "Programs run inside the college, and engineering leaders review what is taught. A student leaves with work a hiring team can open, run and ask about, not a demo that only exists for the exam.",
    from: ["Exam", "Filed"],
    to: ["Project", "Kept"],
  },
  {
    problem: "The tools move faster than the semester.",
    detail:
      "Generative AI, cloud architecture and production engineering show up in interviews long before they show up in a lab. Faculty are asked to close that distance with a textbook and one term.",
    answer: "The stack stays current, with the faculty.",
    how: "Tracks stay on generative AI, cloud systems and full-stack engineering built to a production standard. Faculty sessions sit beside the trainers, so the college keeps teaching the work after we leave the room.",
    from: ["Syllabus", "Last year"],
    to: ["Hiring", "This year"],
  },
  {
    problem: "Hiring still starts with a training month.",
    detail:
      "Companies take on graduates and then spend months teaching the work the degree was meant to cover. The student is qualified on paper and still not ready on Monday.",
    answer: "The first week is the measure.",
    how: "Every program maps to a production skill a team can check. The aim is a graduate who can join a project in the first week and own a piece of a system, not only write code on a whiteboard.",
    from: ["Week 01", "Training"],
    to: ["Week 01", "Shipping"],
  },
];

/** What the work is held to. */
export const standards = [
  {
    lead: "Reviewed with people who hire.",
    body: "Curriculum is checked with engineering leaders and hiring managers. Labs that fail that review don't ship.",
  },
  {
    lead: "Built for the work ahead.",
    body: "Generative AI, cloud architecture and full-stack engineering. Frameworks go when teams stop using them.",
  },
  {
    lead: "Tied to a result you can check.",
    body: "Every program maps to a hands-on production skill, so a college can point to what changed.",
  },
];

/* ------------------------------------------------------------- team */

export type Track = "Software" | "Artificial intelligence" | "Data";

export const TRACK_TINT: Record<Track, string> = {
  Software: "var(--g-navy)",
  "Artificial intelligence": "var(--g-periwinkle)",
  Data: "var(--g-amber)",
};

export const directors = [
  {
    name: "Deepak Tripathi",
    title: "Mr.",
    initials: "DT",
    role: "Director & Co-Founder",
    focus: "Training, mentoring and operations",
    note: "15+ years in industry",
    photo: undefined as string | undefined,
    bio: [
      "Deepak brings more than fifteen years of experience, and the network that comes with it. He is a strong trainer and a mentor, and he handles the operations that keep TechCity Skills running.",
      "People meet him in the room. He teaches, he stays with someone at the start of the work, and he keeps the day-to-day of the company in order.",
    ],
  },
  {
    name: "Gunjan Soam",
    title: "Ms.",
    initials: "GS",
    role: "Director & Co-Founder",
    focus: "Technology, hiring and trainers",
    note: "Leads the technical side",
    photo: undefined as string | undefined,
    bio: [
      "Gunjan handles the technology. She is strong in it, and she brings the energy the work needs.",
      "She hires, and she handles the trainers. The technical side of TechCity Skills sits with her.",
    ],
  },
];

/**
 * Portraits: put each photo in public/team/ and set `photo` to its path (for
 * example "/team/deepak-tripathi.jpg"). A portrait-shaped image, around
 * 800 × 1000, works best. Until then the page shows a studio-style placeholder.
 */
export const trainers: { name: string; initials: string; city: string; track: Track; bio: string; photo?: string }[] = [
  {
    name: "Sameer Kumar",
    initials: "SK",
    city: "Ambala, Haryana",
    track: "Data",
    bio: "Data science and analytics trainer with three years of freelance technical training. Has mentored over 2,500 students across 15+ organisations and campuses.",
  },
  {
    name: "Anshika Bhatt",
    initials: "AB",
    city: "Delhi NCR",
    track: "Software",
    bio: "AI/ML technical trainer and Java developer with four years in training, software development and student mentorship.",
  },
  {
    name: "Vineet Dubey",
    initials: "VD",
    city: "Noida",
    track: "Software",
    bio: "Technical trainer specialising in Java, DSA, Python, machine learning and data analytics.",
  },
  {
    name: "Divyanshi Singh",
    initials: "DS",
    city: "Lucknow",
    track: "Software",
    bio: "Technical trainer and developer with experience in DSA, C++, Python, Java and cybersecurity.",
  },
  {
    name: "Ayush",
    initials: "A",
    city: "Delhi",
    track: "Artificial intelligence",
    bio: "Technical trainer with five years across colleges and universities, specialising in generative AI and LLMs.",
  },
  {
    name: "Dhruv Kumar",
    initials: "DK",
    city: "Lucknow",
    track: "Data",
    bio: "Trainer and mentor with over five years of teaching experience, now focused on data science.",
  },
  {
    name: "Puja Kumari",
    initials: "PK",
    city: "Faridabad",
    track: "Artificial intelligence",
    bio: "B.Tech CSE (AI & ML) trainer with hands-on experience in programming and AI/ML projects.",
  },
];

/* ----------------------------------------------------- student stories */

export type StoryTrack = "Full-stack engineering" | "Generative AI" | "Data & analytics" | "Cloud & DevOps" | "Product & design";

export const storyTracks: StoryTrack[] = [
  "Full-stack engineering",
  "Generative AI",
  "Data & analytics",
  "Cloud & DevOps",
  "Product & design",
];

export type StudentStory = {
  name: string;
  initials: string;
  outcome: string;
  degree: string;
  city: string;
  track: StoryTrack;
  quote: string;
};

const s = (
  name: string,
  initials: string,
  outcome: string,
  degree: string,
  city: string,
  track: StoryTrack,
  quote: string,
): StudentStory => ({ name, initials, outcome, degree, city, track, quote });

export const studentStories: StudentStory[] = [
  s("Neha Choudhary", "NC", "Internship, edtech product", "B.Tech IT, 2026", "Jodhpur", "Full-stack engineering", "Coming from a smaller city, I never had seniors in product companies to guide me. The mentors filled that gap, from resume edits to salary negotiation tips."),
  s("Aditya Kulkarni", "AK", "Placement in progress", "B.E. CSE, 2026", "Nagpur", "Full-stack engineering", "Still in my final semester, but the labs run alongside college, so I don't have to choose between attendance and learning. My GitHub finally looks alive."),
  s("Tanvi Patel", "TP", "Research Intern, AI lab", "B.Tech AI & DS, 2026", "Surat", "Generative AI", "Fine-tuning a small model on Gujarati text was my favourite project. The mentor pushed me to write it up properly, and that write-up is what my interviewers asked about."),
  s("Harshit Agarwal", "HA", "AI Intern, SaaS product team", "B.Tech CSE, 2026", "Indore", "Generative AI", "We built a RAG chatbot over our own college syllabus. It was buggy at first, but the mentor made us measure answers properly. That evaluation part is what got me the internship."),
  s("Ishita Banerjee", "IB", "Software Engineer, IT services", "B.Tech IT, 2025", "Kolkata", "Full-stack engineering", "Mock interviews were brutal in a good way. By the fourth one I could explain my system design choices without freezing. Got two offers in the same month."),
  s("Sahil Khan", "SK", "Remote Developer, SaaS company", "B.Tech CSE, 2025", "Srinagar", "Full-stack engineering", "Internet issues back home meant I missed a few live sessions, but recordings and the mentor's patience kept me on track. Now I work remotely for a Bengaluru team."),
  s("Aarav Sharma", "AS", "SDE-1, fintech startup", "B.Tech CSE, 2025", "Jaipur", "Full-stack engineering", "In college I had only built to-do apps. Here we shipped a payments dashboard with code reviews every week. My interviewer spent half the round asking about that project."),
  s("Yash Gupta", "YG", "Site Reliability Intern", "B.Tech CSE, 2025", "Delhi", "Cloud & DevOps", "Our on-call simulation week was chaos, and the best week of the program. I now actually understand what monitoring and alerts are for."),
  s("Meera Joshi", "MJ", "ML Engineer Trainee", "MCA, 2025", "Pune", "Generative AI", "The faculty didn't hype AI. They showed where LLMs fail and how teams actually ship them. That honesty is rare and it made me a better engineer."),
  s("Lakshmi Narayanan", "LN", "Junior Data Scientist", "M.Sc Data Science, 2025", "Madurai", "Data & analytics", "My college taught me models. Here I learnt to clean data, explain results to non-technical people and deploy a simple API. That last part made all the difference."),
  s("Sneha Iyer", "SI", "Data Analyst, retail MNC", "B.E. IT, 2024", "Chennai", "Data & analytics", "The mentors actually worked in analytics, so the SQL problems felt like real tickets, not textbook questions. I stopped being scared of messy datasets."),
  s("Siddharth Rao", "SR", "Backend Engineer, AI startup", "B.Tech ISE, 2025", "Bengaluru", "Generative AI", "The hiring brief we worked on came from an actual company. Three of us from that cohort got interview calls from them directly."),
  s("Riya Deshpande", "RD", "Analytics Intern, healthtech", "B.E. CSE, 2025", "Nashik", "Data & analytics", "The case studies used Indian datasets, like kirana sales and railway bookings, so the problems felt close to home. I wish the statistics module was a little longer."),
  s("Priya Nair", "PN", "Cloud Support Engineer", "B.Tech ECE, 2024", "Kochi", "Cloud & DevOps", "I switched from electronics to cloud. Deploying our capstone on a real pipeline, breaking it, and fixing it at 2 am taught me more than any certification."),
  s("Pooja Hegde", "PH", "Cloud Engineer, IT services", "B.E. ISE, 2024", "Mangaluru", "Cloud & DevOps", "Labs were very practical. The first Kubernetes week was overwhelming, but the troubleshooting drills later made production issues at work feel less scary."),
  s("Rohan Verma", "RV", "Frontend Developer", "BCA, 2025", "Lucknow", "Full-stack engineering", "Coming from a BCA background, I was worried I'd be behind B.Tech students. The pace was tough, but the doubt sessions after 9 pm saved me more than once."),
  s("Kavya Pillai", "KP", "UX Designer", "B.Des, 2024", "Thiruvananthapuram", "Product & design", "As a designer I was nervous about a tech-heavy program. Pairing with developers on the capstone helped me understand handoff in a way design school never did."),
  s("Ananya Reddy", "AR", "Associate Product Manager", "B.Tech CSE, 2025", "Hyderabad", "Product & design", "I liked that it wasn't only coding. Writing PRDs, talking to users and presenting to an actual hiring partner made the APM interviews feel familiar."),
  s("Mohit Yadav", "MY", "Platform Engineer", "B.Tech IT, 2023", "Gurugram", "Cloud & DevOps", "I was stuck in a support role for a year. The weekend batch let me keep my job while learning Terraform and AWS, and I switched internally within four months."),
  s("Arjun Menon", "AM", "Full-stack Developer, logistics startup", "B.Tech CSE, 2024", "Coimbatore", "Full-stack engineering", "I had cleared DSA rounds before but kept failing the project discussion. After rebuilding our capstone twice with mentor feedback, I could finally talk about trade-offs with confidence."),
  s("Kunal Mehta", "KM", "BI Developer", "B.Sc Computer Science, 2024", "Ahmedabad", "Data & analytics", "Honestly the first two weeks felt slow because I already knew Excel. After that the Power BI and Python work picked up and my final dashboard became my portfolio."),
  s("Devansh Saxena", "DS", "Product Analyst", "BBA, 2024", "Kanpur", "Product & design", "Not from an engineering background at all. The product track taught me enough SQL and wireframing to hold my own in conversations with developers."),
  s("Vikram Singh", "VS", "DevOps Engineer", "B.Tech Mechanical, 2023", "Chandigarh", "Cloud & DevOps", "Everyone told me a mechanical graduate can't get into tech. The Linux and Kubernetes labs gave me hands-on proof I could show in interviews instead of just saying I'm a quick learner."),
  s("Fatima Sheikh", "FS", "Data Engineer", "B.Tech CSE, 2024", "Bhopal", "Data & analytics", "My mentor reviewed every pipeline I wrote line by line. Annoying at the time, but now my team lead says my PRs are the easiest to review."),
];

/** One colour per story track, from the brand ramp. */
export const STORY_TINT: Record<StoryTrack, string> = {
  "Full-stack engineering": "var(--g-navy)",
  "Generative AI": "var(--g-periwinkle)",
  "Data & analytics": "var(--g-amber)",
  "Cloud & DevOps": "var(--p-riyaaz-2)",
  "Product & design": "var(--p-kaksha-2)",
};
