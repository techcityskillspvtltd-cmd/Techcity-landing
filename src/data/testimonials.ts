export type Testimonial = {
  id: string;
  name: string;
  degree: string;
  city: string;
  program: string;
  outcome: string;
  rating: number;
  date: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "aarav-sharma",
    name: "Aarav Sharma",
    degree: "B.Tech CSE, 2025",
    city: "Jaipur",
    program: "Full-stack engineering",
    outcome: "SDE-1, fintech startup",
    rating: 5,
    date: "2026-08-14",
    quote:
      "In college I had only built to-do apps. Here we shipped a payments dashboard with code reviews every week. My interviewer spent half the round asking about that project.",
  },
  {
    id: "sneha-iyer",
    name: "Sneha Iyer",
    degree: "B.E. IT, 2024",
    city: "Chennai",
    program: "Data & analytics",
    outcome: "Data Analyst, retail MNC",
    rating: 5,
    date: "2026-07-02",
    quote:
      "The mentors actually worked in analytics, so the SQL problems felt like real tickets, not textbook questions. I stopped being scared of messy datasets.",
  },
  {
    id: "rohan-verma",
    name: "Rohan Verma",
    degree: "BCA, 2025",
    city: "Lucknow",
    program: "Full-stack engineering",
    outcome: "Frontend Developer",
    rating: 4,
    date: "2026-05-21",
    quote:
      "Coming from a BCA background, I was worried I'd be behind B.Tech students. The pace was tough, but the doubt sessions after 9 pm saved me more than once.",
  },
  {
    id: "priya-nair",
    name: "Priya Nair",
    degree: "B.Tech ECE, 2024",
    city: "Kochi",
    program: "Cloud & DevOps",
    outcome: "Cloud Support Engineer",
    rating: 5,
    date: "2026-06-11",
    quote:
      "I switched from electronics to cloud. Deploying our capstone on a real pipeline, breaking it, and fixing it at 2 am taught me more than any certification.",
  },
  {
    id: "harshit-agarwal",
    name: "Harshit Agarwal",
    degree: "B.Tech CSE, 2026",
    city: "Indore",
    program: "Generative AI",
    outcome: "AI Intern, SaaS product team",
    rating: 5,
    date: "2026-09-03",
    quote:
      "We built a RAG chatbot over our own college syllabus. It was buggy at first, but the mentor made us measure answers properly. That evaluation part is what got me the internship.",
  },
  {
    id: "ananya-reddy",
    name: "Ananya Reddy",
    degree: "B.Tech CSE, 2025",
    city: "Hyderabad",
    program: "Product & design",
    outcome: "Associate Product Manager",
    rating: 4,
    date: "2026-04-18",
    quote:
      "I liked that it wasn't only coding. Writing PRDs, talking to users and presenting to an actual hiring partner made the APM interviews feel familiar.",
  },
  {
    id: "kunal-mehta",
    name: "Kunal Mehta",
    degree: "B.Sc Computer Science, 2024",
    city: "Ahmedabad",
    program: "Data & analytics",
    outcome: "BI Developer",
    rating: 4,
    date: "2026-03-09",
    quote:
      "Honestly the first two weeks felt slow because I already knew Excel. After that the Power BI and Python work picked up and my final dashboard became my portfolio.",
  },
  {
    id: "ishita-banerjee",
    name: "Ishita Banerjee",
    degree: "B.Tech IT, 2025",
    city: "Kolkata",
    program: "Full-stack engineering",
    outcome: "Software Engineer, IT services",
    rating: 5,
    date: "2026-08-27",
    quote:
      "Mock interviews were brutal in a good way. By the fourth one I could explain my system design choices without freezing. Got two offers in the same month.",
  },
  {
    id: "vikram-singh",
    name: "Vikram Singh",
    degree: "B.Tech Mechanical, 2023",
    city: "Chandigarh",
    program: "Cloud & DevOps",
    outcome: "DevOps Engineer",
    rating: 5,
    date: "2026-02-15",
    quote:
      "Everyone told me a mechanical graduate can't get into tech. The Linux and Kubernetes labs gave me hands-on proof I could show in interviews instead of just saying I'm a quick learner.",
  },
  {
    id: "meera-joshi",
    name: "Meera Joshi",
    degree: "MCA, 2025",
    city: "Pune",
    program: "Generative AI",
    outcome: "ML Engineer Trainee",
    rating: 5,
    date: "2026-07-29",
    quote:
      "The faculty didn't hype AI. They showed where LLMs fail and how teams actually ship them. That honesty is rare and it made me a better engineer.",
  },
  {
    id: "aditya-kulkarni",
    name: "Aditya Kulkarni",
    degree: "B.E. CSE, 2026",
    city: "Nagpur",
    program: "Full-stack engineering",
    outcome: "Placement in progress",
    rating: 4,
    date: "2026-09-19",
    quote:
      "Still in my final semester, but the labs run alongside college, so I don't have to choose between attendance and learning. My GitHub finally looks alive.",
  },
  {
    id: "fatima-sheikh",
    name: "Fatima Sheikh",
    degree: "B.Tech CSE, 2024",
    city: "Bhopal",
    program: "Data & analytics",
    outcome: "Data Engineer",
    rating: 5,
    date: "2026-01-24",
    quote:
      "My mentor reviewed every pipeline I wrote line by line. Annoying at the time, but now my team lead says my PRs are the easiest to review.",
  },
  {
    id: "siddharth-rao",
    name: "Siddharth Rao",
    degree: "B.Tech ISE, 2025",
    city: "Bengaluru",
    program: "Generative AI",
    outcome: "Backend Engineer, AI startup",
    rating: 5,
    date: "2026-06-30",
    quote:
      "The hiring brief we worked on came from an actual company. Three of us from that cohort got interview calls from them directly.",
  },
  {
    id: "kavya-pillai",
    name: "Kavya Pillai",
    degree: "B.Des, 2024",
    city: "Thiruvananthapuram",
    program: "Product & design",
    outcome: "UX Designer",
    rating: 4,
    date: "2026-05-06",
    quote:
      "As a designer I was nervous about a tech-heavy program. Pairing with developers on the capstone helped me understand handoff in a way design school never did.",
  },
  {
    id: "yash-gupta",
    name: "Yash Gupta",
    degree: "B.Tech CSE, 2025",
    city: "Delhi",
    program: "Cloud & DevOps",
    outcome: "Site Reliability Intern",
    rating: 5,
    date: "2026-08-08",
    quote:
      "Our on-call simulation week was chaos, and the best week of the program. I now actually understand what monitoring and alerts are for.",
  },
  {
    id: "neha-choudhary",
    name: "Neha Choudhary",
    degree: "B.Tech IT, 2026",
    city: "Jodhpur",
    program: "Full-stack engineering",
    outcome: "Internship, edtech product",
    rating: 4,
    date: "2026-09-25",
    quote:
      "Coming from a smaller city, I never had seniors in product companies to guide me. The mentors filled that gap, from resume edits to salary negotiation tips.",
  },
  {
    id: "arjun-menon",
    name: "Arjun Menon",
    degree: "B.Tech CSE, 2024",
    city: "Coimbatore",
    program: "Full-stack engineering",
    outcome: "Full-stack Developer, logistics startup",
    rating: 5,
    date: "2026-03-28",
    quote:
      "I had cleared DSA rounds before but kept failing the project discussion. After rebuilding our capstone twice with mentor feedback, I could finally talk about trade-offs with confidence.",
  },
  {
    id: "riya-deshpande",
    name: "Riya Deshpande",
    degree: "B.E. CSE, 2025",
    city: "Nashik",
    program: "Data & analytics",
    outcome: "Analytics Intern, healthtech",
    rating: 4,
    date: "2026-06-19",
    quote:
      "The case studies used Indian datasets, like kirana sales and railway bookings, so the problems felt close to home. I wish the statistics module was a little longer.",
  },
  {
    id: "mohit-yadav",
    name: "Mohit Yadav",
    degree: "B.Tech IT, 2023",
    city: "Gurugram",
    program: "Cloud & DevOps",
    outcome: "Platform Engineer",
    rating: 5,
    date: "2026-04-02",
    quote:
      "I was stuck in a support role for a year. The weekend batch let me keep my job while learning Terraform and AWS, and I switched internally within four months.",
  },
  {
    id: "tanvi-patel",
    name: "Tanvi Patel",
    degree: "B.Tech AI & DS, 2026",
    city: "Surat",
    program: "Generative AI",
    outcome: "Research Intern, AI lab",
    rating: 5,
    date: "2026-09-12",
    quote:
      "Fine-tuning a small model on Gujarati text was my favourite project. The mentor pushed me to write it up properly, and that write-up is what my interviewers asked about.",
  },
  {
    id: "devansh-saxena",
    name: "Devansh Saxena",
    degree: "BBA, 2024",
    city: "Kanpur",
    program: "Product & design",
    outcome: "Product Analyst",
    rating: 4,
    date: "2026-02-27",
    quote:
      "Not from an engineering background at all. The product track taught me enough SQL and wireframing to hold my own in conversations with developers.",
  },
  {
    id: "lakshmi-narayanan",
    name: "Lakshmi Narayanan",
    degree: "M.Sc Data Science, 2025",
    city: "Madurai",
    program: "Data & analytics",
    outcome: "Junior Data Scientist",
    rating: 5,
    date: "2026-07-17",
    quote:
      "My college taught me models. Here I learnt to clean data, explain results to non-technical people and deploy a simple API. That last part made all the difference.",
  },
  {
    id: "sahil-khan",
    name: "Sahil Khan",
    degree: "B.Tech CSE, 2025",
    city: "Srinagar",
    program: "Full-stack engineering",
    outcome: "Remote Developer, SaaS company",
    rating: 5,
    date: "2026-08-21",
    quote:
      "Internet issues back home meant I missed a few live sessions, but recordings and the mentor's patience kept me on track. Now I work remotely for a Bengaluru team.",
  },
  {
    id: "pooja-hegde",
    name: "Pooja Hegde",
    degree: "B.E. ISE, 2024",
    city: "Mangaluru",
    program: "Cloud & DevOps",
    outcome: "Cloud Engineer, IT services",
    rating: 4,
    date: "2026-05-30",
    quote:
      "Labs were very practical. The first Kubernetes week was overwhelming, but the troubleshooting drills later made production issues at work feel less scary.",
  },
];
