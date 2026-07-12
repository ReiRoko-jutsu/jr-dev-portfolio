export enum GameScene {
  INTRO = "INTRO",
  ORIGIN = "ORIGIN",
  SKILLS = "SKILLS",
  PROJECTS = "PROJECTS",
  CLIENTS = "CLIENTS",
  ACHIEVEMENTS = "ACHIEVEMENTS",
  CONTACT = "CONTACT"
}

export interface PlayerStats {
  level: number;
  xp: number;
  maxXp: number;
  completedQuests: string[];
  unlockedSkills: string[];
  viewedProjects: string[];
  unlockedBadges: string[];
  score: number;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  xpReward: number;
  category: "Origin" | "Training" | "First Quest" | "Level Up";
  details: string[];
  icon: string;
}

export interface SkillNode {
  id: string;
  name: string;
  category: "frontend" | "backend" | "tools" | "special" | "comms" | "language";
  level: number;
  maxLevel: number;
  cost: number;
  description: string;
  icon: string;
  parentIds?: string[];
  stats: string[];
  unlocked: boolean;
}

export interface ProjectWorld {
  id: string;
  levelNum: number;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  contribution: string;
  techStack: string[];
  role: string;
  xpReward: number;
  demoUrl?: string;
  githubUrl?: string;
  unlockedAtXp: number;
  image: string;
  stats: { label: string; value: string }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  badgeIcon: string;
  criteria: string;
  isUnlocked: boolean;
  unlockedAt?: string;
}
