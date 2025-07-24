// Portfolio API service using localStorage for persistent data
export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  live?: string;
  category: string;
  status: 'published' | 'draft';
  image?: string;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
  location?: string;
  current: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  name: string;
  title: string;
  description: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  resumeUrl?: string;
  profileImage?: string;
  updatedAt: string;
}

// Storage keys
const STORAGE_KEYS = {
  PROJECTS: 'portfolio_projects',
  SKILLS: 'portfolio_skills',
  EXPERIENCES: 'portfolio_experiences',
  PROFILE: 'portfolio_profile',
};

// Default data
const defaultProjects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, user authentication, and admin dashboard",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "JWT"],
    github: "https://github.com/himal/ecommerce",
    live: "https://ecommerce-demo.com",
    category: "fullstack",
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates and team features",
    technologies: ["Vue.js", "Express", "MongoDB", "Socket.io"],
    github: "https://github.com/himal/taskapp",
    category: "frontend",
    status: "published",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const defaultSkills: Skill[] = [
  { id: 1, name: "JavaScript", category: "Programming Languages", proficiency: 95, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 2, name: "TypeScript", category: "Programming Languages", proficiency: 90, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 3, name: "React", category: "Frontend Development", proficiency: 92, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 4, name: "Node.js", category: "Backend Development", proficiency: 88, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 5, name: "PostgreSQL", category: "Databases", proficiency: 85, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: 6, name: "Docker", category: "DevOps", proficiency: 80, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

const defaultExperiences: Experience[] = [
  {
    id: 1,
    company: "SquareShift Company",
    position: "Full Stack Developer",
    duration: "2022 - Present",
    description: "Building scalable web applications and leading frontend development initiatives. Worked on multiple client projects using React, Node.js, and cloud technologies.",
    location: "Remote",
    current: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const defaultProfile: Profile = {
  name: "Himal",
  title: "Full Stack Developer",
  description: "Passionate about building scalable web applications and innovative solutions. 2+ years of experience at SquareShift Company.",
  email: "himal@example.com",
  github: "https://github.com/himal",
  linkedin: "https://linkedin.com/in/himal",
  location: "Remote",
  updatedAt: new Date().toISOString(),
};

// Utility functions
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

// API functions
export const portfolioApi = {
  // Projects
  getProjects: (): Project[] => getFromStorage(STORAGE_KEYS.PROJECTS, defaultProjects),
  
  saveProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Project => {
    const projects = portfolioApi.getProjects();
    const newProject: Project = {
      ...project,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedProjects = [...projects, newProject];
    saveToStorage(STORAGE_KEYS.PROJECTS, updatedProjects);
    return newProject;
  },
  
  updateProject: (id: number, updates: Partial<Project>): Project => {
    const projects = portfolioApi.getProjects();
    const updatedProjects = projects.map(project => 
      project.id === id 
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    );
    saveToStorage(STORAGE_KEYS.PROJECTS, updatedProjects);
    return updatedProjects.find(p => p.id === id)!;
  },
  
  deleteProject: (id: number): void => {
    const projects = portfolioApi.getProjects();
    const updatedProjects = projects.filter(project => project.id !== id);
    saveToStorage(STORAGE_KEYS.PROJECTS, updatedProjects);
  },

  // Skills
  getSkills: (): Skill[] => getFromStorage(STORAGE_KEYS.SKILLS, defaultSkills),
  
  saveSkill: (skill: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>): Skill => {
    const skills = portfolioApi.getSkills();
    const newSkill: Skill = {
      ...skill,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedSkills = [...skills, newSkill];
    saveToStorage(STORAGE_KEYS.SKILLS, updatedSkills);
    return newSkill;
  },
  
  updateSkill: (id: number, updates: Partial<Skill>): Skill => {
    const skills = portfolioApi.getSkills();
    const updatedSkills = skills.map(skill => 
      skill.id === id 
        ? { ...skill, ...updates, updatedAt: new Date().toISOString() }
        : skill
    );
    saveToStorage(STORAGE_KEYS.SKILLS, updatedSkills);
    return updatedSkills.find(s => s.id === id)!;
  },
  
  deleteSkill: (id: number): void => {
    const skills = portfolioApi.getSkills();
    const updatedSkills = skills.filter(skill => skill.id !== id);
    saveToStorage(STORAGE_KEYS.SKILLS, updatedSkills);
  },

  // Experiences
  getExperiences: (): Experience[] => getFromStorage(STORAGE_KEYS.EXPERIENCES, defaultExperiences),
  
  saveExperience: (experience: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>): Experience => {
    const experiences = portfolioApi.getExperiences();
    const newExperience: Experience = {
      ...experience,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedExperiences = [...experiences, newExperience];
    saveToStorage(STORAGE_KEYS.EXPERIENCES, updatedExperiences);
    return newExperience;
  },
  
  updateExperience: (id: number, updates: Partial<Experience>): Experience => {
    const experiences = portfolioApi.getExperiences();
    const updatedExperiences = experiences.map(experience => 
      experience.id === id 
        ? { ...experience, ...updates, updatedAt: new Date().toISOString() }
        : experience
    );
    saveToStorage(STORAGE_KEYS.EXPERIENCES, updatedExperiences);
    return updatedExperiences.find(e => e.id === id)!;
  },
  
  deleteExperience: (id: number): void => {
    const experiences = portfolioApi.getExperiences();
    const updatedExperiences = experiences.filter(experience => experience.id !== id);
    saveToStorage(STORAGE_KEYS.EXPERIENCES, updatedExperiences);
  },

  // Profile
  getProfile: (): Profile => getFromStorage(STORAGE_KEYS.PROFILE, defaultProfile),
  
  updateProfile: (updates: Partial<Profile>): Profile => {
    const profile = portfolioApi.getProfile();
    const updatedProfile = { 
      ...profile, 
      ...updates, 
      updatedAt: new Date().toISOString() 
    };
    saveToStorage(STORAGE_KEYS.PROFILE, updatedProfile);
    return updatedProfile;
  },
};