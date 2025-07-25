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

export interface Blog {
  id: number;
  title: string;
  description: string;
  url: string;
  platform: string;
  publishedDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  organization?: string;
  certificate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyProject {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  type: 'project' | 'poc';
  status: 'completed' | 'ongoing' | 'planned';
  duration: string;
  team?: string;
  visible: boolean;
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
  leetcode?: string;
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
  BLOGS: 'portfolio_blogs',
  ACHIEVEMENTS: 'portfolio_achievements',
  COMPANY_PROJECTS: 'portfolio_company_projects',
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

const defaultBlogs: Blog[] = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    description: "A comprehensive guide to understanding and implementing React Hooks in modern applications.",
    url: "https://wax.com/blog/react-hooks-guide",
    platform: "Wax Platform",
    publishedDate: "2024-01-15",
    tags: ["React", "JavaScript", "Hooks"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const defaultAchievements: Achievement[] = [
  {
    id: 1,
    title: "Smart India Hackathon (SIH)",
    description: "Participated in Smart India Hackathon and developed innovative solutions for real-world problems.",
    category: "Hackathon",
    date: "2023-09-15",
    organization: "Government of India",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Zoho Cliq Trix",
    description: "Competed in Zoho Cliq Trix hackathon focusing on productivity and collaboration tools.",
    category: "Hackathon",
    date: "2023-11-20",
    organization: "Zoho Corporation",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const defaultCompanyProjects: CompanyProject[] = [
  {
    id: 1,
    title: "Client Dashboard Redesign",
    description: "Led the complete redesign of client dashboard with improved UX and performance optimization.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    type: "project",
    status: "completed",
    duration: "3 months",
    team: "Frontend Team (4 members)",
    visible: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Microservices Architecture POC",
    description: "Proof of concept for migrating monolithic architecture to microservices using Docker and Kubernetes.",
    technologies: ["Node.js", "Docker", "Kubernetes", "PostgreSQL"],
    type: "poc",
    status: "completed",
    duration: "2 months",
    team: "Backend Team (3 members)",
    visible: true,
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
  leetcode: "https://leetcode.com/u/himallr2003/",
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

  // Blogs
  getBlogs: (): Blog[] => getFromStorage(STORAGE_KEYS.BLOGS, defaultBlogs),
  
  saveBlog: (blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Blog => {
    const blogs = portfolioApi.getBlogs();
    const newBlog: Blog = {
      ...blog,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedBlogs = [...blogs, newBlog];
    saveToStorage(STORAGE_KEYS.BLOGS, updatedBlogs);
    return newBlog;
  },
  
  updateBlog: (id: number, updates: Partial<Blog>): Blog => {
    const blogs = portfolioApi.getBlogs();
    const updatedBlogs = blogs.map(blog => 
      blog.id === id 
        ? { ...blog, ...updates, updatedAt: new Date().toISOString() }
        : blog
    );
    saveToStorage(STORAGE_KEYS.BLOGS, updatedBlogs);
    return updatedBlogs.find(b => b.id === id)!;
  },
  
  deleteBlog: (id: number): void => {
    const blogs = portfolioApi.getBlogs();
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    saveToStorage(STORAGE_KEYS.BLOGS, updatedBlogs);
  },

  // Achievements
  getAchievements: (): Achievement[] => getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, defaultAchievements),
  
  saveAchievement: (achievement: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>): Achievement => {
    const achievements = portfolioApi.getAchievements();
    const newAchievement: Achievement = {
      ...achievement,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedAchievements = [...achievements, newAchievement];
    saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, updatedAchievements);
    return newAchievement;
  },
  
  updateAchievement: (id: number, updates: Partial<Achievement>): Achievement => {
    const achievements = portfolioApi.getAchievements();
    const updatedAchievements = achievements.map(achievement => 
      achievement.id === id 
        ? { ...achievement, ...updates, updatedAt: new Date().toISOString() }
        : achievement
    );
    saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, updatedAchievements);
    return updatedAchievements.find(a => a.id === id)!;
  },
  
  deleteAchievement: (id: number): void => {
    const achievements = portfolioApi.getAchievements();
    const updatedAchievements = achievements.filter(achievement => achievement.id !== id);
    saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, updatedAchievements);
  },

  // Company Projects
  getCompanyProjects: (): CompanyProject[] => getFromStorage(STORAGE_KEYS.COMPANY_PROJECTS, defaultCompanyProjects),
  
  saveCompanyProject: (project: Omit<CompanyProject, 'id' | 'createdAt' | 'updatedAt'>): CompanyProject => {
    const projects = portfolioApi.getCompanyProjects();
    const newProject: CompanyProject = {
      ...project,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedProjects = [...projects, newProject];
    saveToStorage(STORAGE_KEYS.COMPANY_PROJECTS, updatedProjects);
    return newProject;
  },
  
  updateCompanyProject: (id: number, updates: Partial<CompanyProject>): CompanyProject => {
    const projects = portfolioApi.getCompanyProjects();
    const updatedProjects = projects.map(project => 
      project.id === id 
        ? { ...project, ...updates, updatedAt: new Date().toISOString() }
        : project
    );
    saveToStorage(STORAGE_KEYS.COMPANY_PROJECTS, updatedProjects);
    return updatedProjects.find(p => p.id === id)!;
  },
  
  deleteCompanyProject: (id: number): void => {
    const projects = portfolioApi.getCompanyProjects();
    const updatedProjects = projects.filter(project => project.id !== id);
    saveToStorage(STORAGE_KEYS.COMPANY_PROJECTS, updatedProjects);
  },

  toggleCompanyProjectVisibility: (id: number): CompanyProject => {
    const projects = portfolioApi.getCompanyProjects();
    const updatedProjects = projects.map(project => 
      project.id === id 
        ? { ...project, visible: !project.visible, updatedAt: new Date().toISOString() }
        : project
    );
    saveToStorage(STORAGE_KEYS.COMPANY_PROJECTS, updatedProjects);
    return updatedProjects.find(p => p.id === id)!;
  },
};