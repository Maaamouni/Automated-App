// Core domain types for the portfolio app

export type SectionId = "profile" | "skills" | "projects" | "contact";

export interface NavItem {
  id: SectionId;
  index: number;
  label: string;
  icon: string; // lucide-react icon name
  href: string;
}

export interface Profile {
  name: string;
  tagline: string;
  available: boolean;
  photoUrl: string | null;
  headline: string;
  bio: string;
  location: string;
  availability: string;
  currentWork: string;
  stats: StatItem[];
  background: BackgroundEntry[];
  experience: ExperienceEntry[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface BackgroundEntry {
  period: string;
  role: string;
  organization: string;
}

export interface ExperienceEntry {
  period: string;
  role: string;
  organization: string;
  description: string[];
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  description: string;
  skills: Skill[];
  extras: string[];
}

export interface Skill {
  name: string;
  icon: string;
  level: number; // 0 - 100
}

export interface Projects {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  description: string;
  links: InterestLink[];
}

export interface InterestLink {
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  icon: string;
  label: string;
  handle: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}
