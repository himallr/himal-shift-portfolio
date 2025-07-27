// Portfolio API service using Supabase for persistent data
import { supabase } from "@/integrations/supabase/client";

// Data structure interfaces matching Supabase schema
export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  demo_url?: string;
  github_url?: string;
  technologies: string[];
  category: string;
  is_public?: boolean;
  user_id?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  user_id?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  description: string;
  technologies: string[];
  achievements: string[];
  is_current: boolean;
  user_id?: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image_url?: string;
  url?: string;
  published_date: string;
  tags: string[];
  is_published?: boolean;
  user_id?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  date_achieved: string;
  organization: string;
  certificate_url?: string;
  user_id?: string;
}

export interface CompanyProject {
  id: string;
  title: string;
  description: string;
  company: string;
  type: string;
  status: string;
  technologies: string[];
  start_date?: string;
  end_date?: string;
  team_size?: number;
  is_public: boolean;
  user_id?: string;
}

export interface Profile {
  id: string;
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  leetcode_url: string;
  resume_url: string;
  profile_image_url: string;
  user_id?: string;
}

// Utility function to upload files to Supabase storage
export const uploadFile = async (file: File, bucket: string, path: string): Promise<string | null> => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.user.id}/${path}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, { upsert: true });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

// API functions
export const portfolioApi = {
  // Projects
  getProjects: async (): Promise<Project[]> => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  },
  
  saveProject: async (project: Omit<Project, 'id' | 'user_id'>): Promise<Project | null> => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('projects')
        .insert([{ ...project, user_id: user.user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving project:', error);
      return null;
    }
  },
  
  updateProject: async (id: string, updates: Partial<Project>): Promise<Project | null> => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  },
  
  deleteProject: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  },

  // Skills
  getSkills: async (): Promise<Skill[]> => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching skills:', error);
      return [];
    }
  },
  
  saveSkill: async (skill: Omit<Skill, 'id' | 'user_id'>): Promise<Skill | null> => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('skills')
        .insert([{ ...skill, user_id: user.user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving skill:', error);
      return null;
    }
  },
  
  updateSkill: async (id: string, updates: Partial<Skill>): Promise<Skill | null> => {
    try {
      const { data, error } = await supabase
        .from('skills')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating skill:', error);
      return null;
    }
  },
  
  deleteSkill: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting skill:', error);
      return false;
    }
  },

  // Experiences
  getExperiences: async (): Promise<Experience[]> => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching experiences:', error);
      return [];
    }
  },
  
  saveExperience: async (experience: Omit<Experience, 'id' | 'user_id'>): Promise<Experience | null> => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('experiences')
        .insert([{ ...experience, user_id: user.user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving experience:', error);
      return null;
    }
  },
  
  updateExperience: async (id: string, updates: Partial<Experience>): Promise<Experience | null> => {
    try {
      const { data, error } = await supabase
        .from('experiences')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating experience:', error);
      return null;
    }
  },
  
  deleteExperience: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('experiences')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting experience:', error);
      return false;
    }
  },

  // Profile
  getProfile: async (): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  },
  
  saveProfile: async (profile: Omit<Profile, 'id' | 'user_id'>): Promise<Profile | null> => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .upsert([{ ...profile, user_id: user.user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving profile:', error);
      return null;
    }
  },

  // Blogs
  getBlogs: async (): Promise<Blog[]> => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
  },
  
  saveBlog: async (blog: Omit<Blog, 'id' | 'user_id'>): Promise<Blog | null> => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('blogs')
        .insert([{ ...blog, user_id: user.user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving blog:', error);
      return null;
    }
  },
  
  updateBlog: async (id: string, updates: Partial<Blog>): Promise<Blog | null> => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating blog:', error);
      return null;
    }
  },
  
  deleteBlog: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      return false;
    }
  },

  // Achievements
  getAchievements: async (): Promise<Achievement[]> => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('date_achieved', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching achievements:', error);
      return [];
    }
  },
  
  saveAchievement: async (achievement: Omit<Achievement, 'id' | 'user_id'>): Promise<Achievement | null> => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('achievements')
        .insert([{ ...achievement, user_id: user.user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving achievement:', error);
      return null;
    }
  },
  
  updateAchievement: async (id: string, updates: Partial<Achievement>): Promise<Achievement | null> => {
    try {
      const { data, error } = await supabase
        .from('achievements')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating achievement:', error);
      return null;
    }
  },
  
  deleteAchievement: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('achievements')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting achievement:', error);
      return false;
    }
  },

  // Company Projects
  getCompanyProjects: async (): Promise<CompanyProject[]> => {
    try {
      const { data, error } = await supabase
        .from('company_projects')
        .select('*')
        .order('start_date', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching company projects:', error);
      return [];
    }
  },
  
  saveCompanyProject: async (project: Omit<CompanyProject, 'id' | 'user_id'>): Promise<CompanyProject | null> => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('company_projects')
        .insert([{ ...project, user_id: user.user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error saving company project:', error);
      return null;
    }
  },
  
  updateCompanyProject: async (id: string, updates: Partial<CompanyProject>): Promise<CompanyProject | null> => {
    try {
      const { data, error } = await supabase
        .from('company_projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating company project:', error);
      return null;
    }
  },
  
  deleteCompanyProject: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('company_projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting company project:', error);
      return false;
    }
  },

  toggleCompanyProjectVisibility: async (id: string): Promise<CompanyProject | null> => {
    try {
      // First get the current project
      const { data: project, error: fetchError } = await supabase
        .from('company_projects')
        .select('is_public')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      // Then update with opposite visibility
      const { data, error } = await supabase
        .from('company_projects')
        .update({ is_public: !project.is_public })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error toggling company project visibility:', error);
      return null;
    }
  },
};