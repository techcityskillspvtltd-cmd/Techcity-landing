export type FacultyMember = {
  slug: string;
  name: string;
  role: string;
  subject: string;
  campus: string;
  years: string;
  summary: string;
  body: string;
  note: string;
  teaches: string;
  focus: string[];
  image: string;
  imagePosition?: string;
  linkedin?: string;
};

export const faculty: FacultyMember[] = [
  {
    slug: "sameer-kumar",
    name: "Sameer Kumar",
    role: "Technical trainer",
    subject: "Data",
    campus: "Ambala, Haryana",
    years: "3 years training",
    summary:
      "Data science and analytics trainer with three years of freelance technical training. He has mentored over 2,500 students across 15+ organizations and campuses.",
    body: "His work covers Python, SQL, machine learning, Power BI, advanced Excel, data visualization, and NLP. Labs run on Jupyter and Google Colab, with real projects students can open and defend.",
    note: "Sameer also teaches Adobe Photoshop beside the analytics stack, so students can present dashboards and visuals the way a team would ship them.",
    teaches:
      "Data science, Power BI, advanced Excel, cloud computing, and dashboard development for campus cohorts.",
    focus: [
      "Data science",
      "Power BI",
      "Advanced Excel",
      "Cloud computing",
      "Data visualization",
    ],
    image: "/faculty/sameer.jpg",
    imagePosition: "50% 18%",
  },
  {
    slug: "anshika-bhatt",
    name: "Anshika Bhatt",
    role: "Technical trainer",
    subject: "Software",
    campus: "Delhi NCR",
    years: "4 years",
    summary:
      "AI/ML technical trainer and Java developer with four years in training, software development, and student mentorship.",
    body: "She teaches Java, DSA, machine learning, deep learning, and AI with a focus on hands-on labs and industry-oriented practice.",
    note: "Docker and Kubernetes sit beside the language work, so students leave able to run what they build, not only write it.",
    teaches:
      "Java, DSA, AI/ML, Docker, and Kubernetes for college sections in Delhi NCR.",
    focus: ["Java", "DSA", "AI / ML", "Docker", "Kubernetes"],
    image: "/faculty/anshika.jpg",
    imagePosition: "50% 22%",
  },
  {
    slug: "vineet-dubey",
    name: "Vineet Dubey",
    role: "Technical trainer",
    subject: "Software",
    campus: "Noida",
    years: "4 years",
    summary:
      "Technical trainer at TechCity Skills specializing in Java, DSA, Python, machine learning, and data analytics.",
    body: "He focuses on industry-oriented training: simplifying hard concepts and building programming, analytical, and problem-solving skill through coding and projects.",
    note: "Sessions stay practical. Students strengthen logic with real applications, not slide-only theory.",
    teaches:
      "DSA with Java and C++, Python, machine learning, and data analytics on campus in Noida.",
    focus: ["DSA", "Java", "C++", "Python", "Machine learning"],
    image: "/faculty/vineet.jpg",
    imagePosition: "50% 20%",
    linkedin: "https://www.linkedin.com/in/vineet-dubey-45b543277",
  },
  {
    slug: "divyanshi-singh",
    name: "Divyanshi Singh",
    role: "Technical trainer",
    subject: "Software",
    campus: "Lucknow",
    years: "1.5 years",
    summary:
      "Technical trainer and developer with experience in DSA, C++, Python, Java, and cybersecurity.",
    body: "She specializes in logic building, problem-solving, and industry-oriented training that prepares students for technical interviews and placements.",
    note: "Her tracks include DSA with Python and artificial intelligence for software engineering.",
    teaches:
      "DSA with Python and AI for software engineering for Lucknow campus cohorts.",
    focus: ["DSA", "Python", "C++", "Java", "Cybersecurity"],
    image: "/faculty/divyanshi.png",
    imagePosition: "50% 18%",
    linkedin: "https://www.linkedin.com/in/divyanshi-singh-43a609218",
  },
  {
    slug: "ayush",
    name: "Ayush",
    role: "Technical trainer",
    subject: "Artificial intelligence",
    campus: "Delhi",
    years: "5+ years",
    summary:
      "Technical trainer with five years across colleges and universities, specializing in generative AI and LLMs.",
    body: "He delivers hands-on work in RAG, prompt engineering, AI agents, and n8n automation, and covers AI/ML, MLOps, cloud, DevOps, Linux, networking, cybersecurity, robotics, and DSA.",
    note: "He has trained and mentored 4,000+ students, faculty, and professionals through 200+ workshops and corporate sessions, and guided learners on 100+ real-world AI and automation projects.",
    teaches:
      "Generative AI, AIML, cloud computing, DevOps, data science, and full-stack development for campus and corporate cohorts.",
    focus: [
      "Generative AI",
      "AIML",
      "Cloud",
      "DevOps",
      "Data science",
      "DSA",
    ],
    image: "/faculty/ayush.png",
    imagePosition: "50% 15%",
  },
  {
    slug: "dhruv-kumar",
    name: "Dhruv Kumar",
    role: "Technical trainer",
    subject: "Data",
    campus: "Lucknow",
    years: "5 years",
    summary:
      "Trainer and mentor with over five years of teaching experience, now focused on data science.",
    body: "He is building depth in Python, data analysis, statistics, and machine learning so students can apply data-driven methods to real problems.",
    note: "Campus sessions stay practical: analysis first, then the model, then what the result means for a team.",
    teaches: "Data science tracks for Lucknow cohorts, with Python and applied analysis.",
    focus: ["Data science", "Python", "Statistics", "Machine learning"],
    image: "/faculty/dhruv.jpg",
    imagePosition: "50% 22%",
  },
  {
    slug: "puja-kumari",
    name: "Puja Kumari",
    role: "Technical trainer",
    subject: "Artificial intelligence",
    campus: "Faridabad",
    years: "1 year",
    summary:
      "B.Tech CSE (AI & ML) trainer with hands-on experience in programming and AI/ML projects.",
    body: "She focuses on AIML and data modelling, helping students apply problem-solving and analytical skill on real applications.",
    note: "Sessions emphasize building and explaining models students can defend in a review.",
    teaches: "AIML and data modelling for Faridabad campus sections.",
    focus: ["AIML", "Data modelling", "Programming"],
    image: "/faculty/puja.jpg",
    imagePosition: "50% 20%",
    linkedin: "https://www.linkedin.com/in/pujak17",
  },
];

export function getFaculty(slug: string) {
  return faculty.find((person) => person.slug === slug);
}
