import type { Profile, SkillCategory, Projects, SocialLink, NavItem } from "@/types";

export const navItems: NavItem[] = [
  { id: "profile", index: 1, label: "PROFILE", icon: "User", href: "#profile" },
  { id: "skills", index: 2, label: "SKILLS", icon: "Layers", href: "#skills" },
  { id: "projects", index: 3, label: "PROJECTS", icon: "Zap", href: "#project" },
  { id: "contact", index: 4, label: "CONTACT", icon: "Mail", href: "#contact" },
];

export const profileData: Profile = {
  name: "MAMOUNI Outhmane",
  tagline: "DevOps · AI · Security",
  available: true,
  photoUrl: null,
  headline: "Building secure, intelligent systems.",
  bio: "An engineering student with a passion for DevOps, AI, and security. I specialize in building production-grade systems that are scalable, reliable, and secure. Currently focused on the intersection of AI and security — from red teaming LLMs to securing AI-native infrastructure.",
  location: "Rabat, MA",
  availability: "Freelance · Full-time · Research",
  currentWork: "Building a Red teaming assistant using fine tunning",
  stats: [
    //{ value: "5+", label: "Years experience" },
    { value: "+10", label: "Projects shipped" },
    // { value: "3", label: "CVEs disclosed" },
    { value: "2", label: "Certifications" },
  ],
  background: [
    {
      period: "2024–now",
      role: "Computer Engineering Student",
      organization: "Mohammadia School of Engineering (EMI), Rabat, Morocco",
    },
    {
      period: "2022–2024",
      role: "University Diploma in Science and Technology",
      organization: "Faculty of Sciences and Techniques of Fez (FST Fez), Morocco",
    },
  ],
};

export const skillCategories: SkillCategory[] = [
  {
    id: "devops",
    label: "DevOps",
    icon: "Server",
    description:
      "Platform engineering and site reliability — from container orchestration to zero-downtime deployments.",
    skills: [
      { name: "Programming Language: JavaScript, Java", icon: "Code", level: 90 },
      { name: "Git", icon: "Code", level: 92 },
      { name: "Linux", icon: "Code", level: 95 },
      { name: "Docker", icon: "Container", level: 80 },
      { name: "GitHub Actions / ArgoCD", icon: "GitBranch", level: 85 },
      { name: "Prometheus + Grafana", icon: "LineChart", level: 80 },
      { name: "AWS / GCP", icon: "Cloud", level: 83 },
    ],
    extras: [""]
  },
  {
    id: "ai",
    label: "AI / ML",
    icon: "Brain",
    description:
      "Building production LLM systems — from agentic frameworks and RAG pipelines to evals and observability.",
    skills: [
      { name: "Scikit-learn / PyTorch", icon: "Code", level: 90 },
      { name: "LangGraph / LangChain", icon: "Workflow", level: 85 },
      { name: "Vector DBs (pgvector, Weaviate)", icon: "Database", level: 82 },
      { name: "Claude / GPT APIs", icon: "Sparkles", level: 92 },
      { name: "Evals & Guardrails", icon: "ShieldCheck", level: 78 },
      { name: "Fine-tuning (LoRA / QLoRA)", icon: "Settings2", level: 70 },
    ],
    extras: [""],
  },
  {
    id: "security",
    label: "Security",
    icon: "Shield",
    description:
      "I have a solid foundation in offensive security principles and practices, with hands-on experience in pen testing in rootme.org",
    skills: [
      { name: "Pen Testing (Web / Cloud)", icon: "Bug", level: 88 },
      { name: "Burp Suite / Nmap", icon: "Search", level: 90 },
      { name: "Threat Modeling", icon: "AlertTriangle", level: 85 },
      { name: "SIEM / SOAR", icon: "Activity", level: 80 },
      { name: "Container Security (Trivy, Falco)", icon: "Lock", level: 87 },
      { name: "Supply Chain (SLSA, Sigstore)", icon: "Link2", level: 82 },
    ],
    extras: [""],
  },
];

export const projects: Projects[] = [
  {
    id: "project1",
    icon: "Server",
    iconColor: "#60a5fa",
    title: "Active Directory Lab",
    description:
      "I built a home lab to experiment with Active Directory attacks and defenses. It's a great way to understand the security implications of AD misconfigurations and practice real-world attack techniques.",
    links: [
      { label: "github repo", href: "https://github.com/Maaamouni/Active-Directory-Lab" },
    ],
  },
  {
    id: "project2",
    icon: "Brain",
    iconColor: "#a78bfa",
    title: "Anomaly Detection in Active Directory",
    description:
      "In this project, My group and I worked on building an anomaly detection system for Active Directory environments. We used machine learning techniques to identify unusual patterns of behavior that could indicate a security breach or insider threat.",
    links: [
      { label: "github repo", href: "https://github.com/Maaamouni/Anomaly-detection-in-AD"},
    ],
  },
  {
    id: "project3",
    icon: "Shield",
    iconColor: "#f87171",
    title: "Offensive Security",
    description:
      "I usually play CTFs and study vulnerabilities.",
    links: [
      { label: "Rootme", href: "https://www.root-me.org/maamouni?lang=en#12d6f228d3d7552ef52e8d3fa31952ef" },
    ],
  },
  {
    id: "research",
    icon: "FlaskConical",
    iconColor: "#fbbf24",
    title: "Building a RAG",
    description:
      "I gathered my pdfs and i tried to build a RAG system for answering my questions and answers me based on my private data using LangChain .",
    links: [
      { label: "github repo", href: "https://github.com/Maaamouni/Interview-preparation-chatbot" },
      { label: "Mini Blog", href: "#" },
    ],
  },
  {
    id: "reading",
    icon: "BookOpen",
    iconColor: "#34d399",
    title: "Reading & Learning",
    description:
      "There are many resources I'm currently exploring. In my github profile, I share projects I'm working on, check the link below for more.",
    links: [
      { label: "Maaamouni", href: "https://www.github.com/Maaamouni" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    icon: "Github",
    label: "GitHub",
    handle: "@Maaamouni",
    href: "https://github.com/Maaamouni",
  },
  {
    id: "linkedin",
    icon: "Linkedin",
    label: "LinkedIn",
    handle: "/in/outhmane-mamouni",
    href: "https://linkedin.com/in/outhmane-mamouni-408379280",
  },
  {
    id: "email",
    icon: "Mail",
    label: "Email",
    handle: "othmanmamouni3@gmail.com",
    href: "mailto:othmanmamouni3@gmail.com",
  },
];
