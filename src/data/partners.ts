export type Partner = {
  name: string;
  place: string;
  info: string;
  logo?: string;
  logoSurface?: "light" | "dark";
  summary?: string;
};

export const collegePartnerMarks: Partner[] = [
  {
    name: "Echelon Institute of Technology",
    place: "Faridabad, Haryana",
    info: "Opened in 2007 and affiliated to Guru Gobind Singh Indraprastha University, Delhi.",
    summary: "A Faridabad partner. Labs run on the college campus.",
    logo: "/logos/White-Logo.webp",
    logoSurface: "dark",
  },
  {
    name: "Kali Charan Nigam Institute of Technology",
    place: "Banda, Uttar Pradesh",
    info: "Established in 2002 by Banda Education Centre. Approved by AICTE and affiliated to Dr. A.P.J. Abdul Kalam Technical University, Lucknow.",
    summary: "A Banda partner. Labs run on the college campus.",
    logo: "/logos/kcnitlogo.jpg",
  },
  {
    name: "Integrated Academy of Management and Technology",
    place: "Ghaziabad, Uttar Pradesh",
    info: "Opened in 1995. The institute teaches management, information technology, law, education, and technology.",
    summary: "A Ghaziabad partner for management and technology.",
    logo: "/logos/inmantec-logo-1-1.png",
  },
  {
    name: "Adhunik Group of Institutions",
    place: "Ghaziabad, Uttar Pradesh",
    info: "An NCR campus in Duhai, Ghaziabad, with engineering and other programmes.",
    summary: "A Duhai partner. Sessions sit in the college timetable.",
    logo: "/logos/logo.png",
  },
  {
    name: "Ajay Kumar Garg Engineering College",
    place: "Ghaziabad, Uttar Pradesh",
    info: "Established in 1998. The college offers B.Tech across the major engineering disciplines, plus M.Tech and MCA.",
    summary: "A Ghaziabad engineering partner for B.Tech sections.",
    logo: "/logos/AKGEC_1_0.png",
  },
  {
    name: "St. Andrews Institute of Technology & Management",
    place: "Gurugram, Haryana",
    info: "Approved by AICTE and affiliated to Maharshi Dayanand University. It offers undergraduate and postgraduate courses in technology and management.",
    summary: "A Gurugram partner for technology and management.",
    logo: "/logos/logo%20(1).png",
  },
  {
    name: "Lovely Professional University",
    place: "Phagwara, Punjab",
    info: "A university in Phagwara, Kapurthala district. The recorded year of establishment is December 2005.",
    summary: "A Phagwara partner. Sessions sit with the university cohort.",
    logo: "/logos/lpu-logo.svg",
  },
  {
    name: "Chandigarh University",
    place: "Mohali, Punjab",
    info: "Established by the Punjab State Legislature and recognised by the University Grants Commission. NAAC has accredited it A+.",
    summary: "A Mohali partner. Labs run with the university cohort.",
    logo: "/logos/logo%20(2).png",
  },
  {
    name: "Chitkara University, Punjab",
    place: "Rajpura, Punjab",
    info: "A state private university. Punjab approved it in December 2010, and the UGC approved it to award degrees in January 2011.",
    summary: "A Rajpura partner. Sessions sit in the university timetable.",
    logo: "/logos/cu-logo.webp",
  },
  {
    name: "Jai Prakash University",
    place: "Chapra, Bihar",
    info: "Established in 1990 under the Bihar State Universities Act. Its jurisdiction is the Saran division: Chapra, Siwan, and Gopalganj.",
    summary: "A Chapra partner. Labs run with the university cohort.",
    logo: "/logos/logo-new.avif",
  },
  {
    name: "KCNIT, Ghaziabad",
    place: "Ghaziabad, Uttar Pradesh",
    info: "A Ghaziabad campus partner. Sessions sit in the college timetable.",
    summary: "A Ghaziabad partner. Labs run on the college campus.",
    logo: "/logos/kcnitlogo.jpg",
  },
  {
    name: "Shobhit Institute of Engineering & Technology",
    place: "Meerut, Uttar Pradesh",
    info: "A deemed-to-be university in Modipuram, Meerut. The Government of India granted that status in November 2006. NAAC has accredited it A.",
    summary: "A Meerut partner. Sessions sit with the university cohort.",
    logo: "/logos/logo%20(3).png",
  },
  {
    name: "School of Management Sciences",
    place: "Lucknow, Uttar Pradesh",
    info: "The Lucknow campus opened in 2008. It is approved by AICTE and affiliated to Dr. A.P.J. Abdul Kalam Technical University, with B.Tech and MBA on the Sultanpur Road campus. NAAC has accredited it A+.",
    summary: "A Lucknow partner for engineering and management.",
    logo: "/logos/sms_luck.jpeg",
  },
  {
    name: "KIET Group of Institutions",
    place: "Ghaziabad, Uttar Pradesh",
    info: "Krishna Institute of Engineering and Technology, on the Delhi–Meerut road in Ghaziabad. Opened in 1998. NAAC has accredited it A+, and it was conferred deemed-to-be-university status in November 2025.",
    summary: "A Ghaziabad engineering partner on the Meerut road campus.",
    logo: "/logos/KIET-Logo.webp",
  },
];

export const industryPartnerMarks: Partner[] = [
  {
    name: "HCL GUVI",
    place: "Tech learning",
    info: "An HCL learning partner for coding and job-ready technical programmes. Students leave with work a reviewer can open.",
    summary: "A learning partner for coding programmes.",
    logo: "/partners/hcl-guvi.webp",
  },
  {
    name: "Hitbullseye",
    place: "Test preparation",
    info: "A test-prep and college-programmes partner. The tie-up is practice and review, beside the labs.",
    summary: "A partner for test preparation beside the labs.",
    logo: "/partners/hitbullseye.png",
  },
  {
    name: "Chetu",
    place: "Software development",
    info: "A custom-software company. Students are prepared for the kind of system a delivery team will actually read.",
    summary: "A software partner for work a team can review.",
    logo: "/partners/chetu.png",
  },
  {
    name: "Froyo Technologies",
    place: "Learning and development",
    info: "A Noida learning partner for technical upskilling and certifications. The work is taught as a lab, not a slide deck.",
    summary: "A Noida partner for technical upskilling.",
    logo: "/partners/froyo.png",
    logoSurface: "dark",
  },
  {
    name: "VTS Infosoft",
    place: "Business applications",
    info: "A Noida firm for Microsoft business applications and corporate training. Students practise on the tools those teams use.",
    logo: "/partners/vts-infosoft.png",
  },
  {
    name: "EdCEPT",
    place: "Tech workshops",
    info: "A Delhi workshop partner for software, data, and applied labs taught with a college cohort.",
    logo: "/partners/edcept.svg",
  },
  {
    name: "My Edu Galaxy",
    place: "Career training",
    info: "A Noida training company in Sector 62, incorporated in 2015. It runs computer, IT, and career programmes as MEGACI, My Edu Galaxy Advance Career Institute.",
    summary: "A Noida partner for computer and career training.",
    logo: "/partners/my-edu-galaxy.svg",
  },
  {
    name: "epiTech Infosystems",
    place: "Software services",
    info: "A software services partner. The partnership is review of student work and the tools a lab is built on.",
    summary: "A software partner for review of student work.",
    logo: "/partners/epitech.png",
  },
  {
    name: "Hadwik Data Solutions",
    place: "Data and skills",
    info: "A Bengaluru skill partner. Training covers software, cloud, data analytics, and other job-oriented work taught with a college cohort.",
    summary: "A Bengaluru partner for data and software training.",
    logo: "/partners/hadwick.jpeg",
  },
  {
    name: "Victory Tech Solutions",
    place: "Data analytics",
    info: "A campus training partner for data analytics. Cohorts practise Python and visualisation on short labs a reviewer can open.",
    summary: "A partner for data analytics labs on campus.",
    logo: "/partners/victory.png",
    logoSurface: "dark",
  },
];

export const collegePartners: Partner[] = collegePartnerMarks;

export const industryPartners: Partner[] = industryPartnerMarks;
