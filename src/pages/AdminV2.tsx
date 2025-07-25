import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, Upload, ExternalLink, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { portfolioApi, type Project, type Skill, type Experience, type Blog, type Achievement, type CompanyProject } from "@/services/portfolioApi";
import { EditDialog, FormField, NumberField } from "@/components/ui/edit-dialog";

const AdminV2 = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("projects");

  // Data states
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [companyProjects, setCompanyProjects] = useState<CompanyProject[]>([]);

  // Dialog states
  const [projectDialog, setProjectDialog] = useState({ isOpen: false, editingId: null as number | null });
  const [skillDialog, setSkillDialog] = useState({ isOpen: false, editingId: null as number | null });
  const [experienceDialog, setExperienceDialog] = useState({ isOpen: false, editingId: null as number | null });

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    technologies: "",
    github: "",
    live: "",
    category: "fullstack"
  });

  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "",
    proficiency: 80
  });

  const [experienceForm, setExperienceForm] = useState({
    company: "",
    position: "",
    duration: "",
    description: "",
    location: "",
    current: false
  });

  // Load data on mount
  useEffect(() => {
    setProjects(portfolioApi.getProjects());
    setSkills(portfolioApi.getSkills());
    setExperiences(portfolioApi.getExperiences());
    setBlogs(portfolioApi.getBlogs());
    setAchievements(portfolioApi.getAchievements());
    setCompanyProjects(portfolioApi.getCompanyProjects());
  }, []);

  // Project handlers
  const openProjectDialog = (project?: Project) => {
    if (project) {
      setProjectForm({
        title: project.title,
        description: project.description,
        technologies: project.technologies.join(", "),
        github: project.github || "",
        live: project.live || "",
        category: project.category
      });
      setProjectDialog({ isOpen: true, editingId: project.id });
    } else {
      setProjectForm({ title: "", description: "", technologies: "", github: "", live: "", category: "fullstack" });
      setProjectDialog({ isOpen: true, editingId: null });
    }
  };

  const handleSaveProject = () => {
    try {
      const projectData = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(Boolean),
        status: "published" as const
      };

      if (projectDialog.editingId) {
        portfolioApi.updateProject(projectDialog.editingId, projectData);
        toast({ title: "Project updated successfully!" });
      } else {
        portfolioApi.saveProject(projectData);
        toast({ title: "Project created successfully!" });
      }

      setProjects(portfolioApi.getProjects());
      setProjectDialog({ isOpen: false, editingId: null });
    } catch (error) {
      toast({ title: "Error saving project", variant: "destructive" });
    }
  };

  const handleDeleteProject = (id: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      portfolioApi.deleteProject(id);
      setProjects(portfolioApi.getProjects());
      toast({ title: "Project deleted successfully!" });
    }
  };

  // Skill handlers
  const openSkillDialog = (skill?: Skill) => {
    if (skill) {
      setSkillForm({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency
      });
      setSkillDialog({ isOpen: true, editingId: skill.id });
    } else {
      setSkillForm({ name: "", category: "", proficiency: 80 });
      setSkillDialog({ isOpen: true, editingId: null });
    }
  };

  const handleSaveSkill = () => {
    try {
      if (skillDialog.editingId) {
        portfolioApi.updateSkill(skillDialog.editingId, skillForm);
        toast({ title: "Skill updated successfully!" });
      } else {
        portfolioApi.saveSkill(skillForm);
        toast({ title: "Skill created successfully!" });
      }

      setSkills(portfolioApi.getSkills());
      setSkillDialog({ isOpen: false, editingId: null });
    } catch (error) {
      toast({ title: "Error saving skill", variant: "destructive" });
    }
  };

  const handleDeleteSkill = (id: number) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      portfolioApi.deleteSkill(id);
      setSkills(portfolioApi.getSkills());
      toast({ title: "Skill deleted successfully!" });
    }
  };

  // Experience handlers
  const openExperienceDialog = (experience?: Experience) => {
    if (experience) {
      setExperienceForm({
        company: experience.company,
        position: experience.position,
        duration: experience.duration,
        description: experience.description,
        location: experience.location || "",
        current: experience.current
      });
      setExperienceDialog({ isOpen: true, editingId: experience.id });
    } else {
      setExperienceForm({ company: "", position: "", duration: "", description: "", location: "", current: false });
      setExperienceDialog({ isOpen: true, editingId: null });
    }
  };

  const handleSaveExperience = () => {
    try {
      if (experienceDialog.editingId) {
        portfolioApi.updateExperience(experienceDialog.editingId, experienceForm);
        toast({ title: "Experience updated successfully!" });
      } else {
        portfolioApi.saveExperience(experienceForm);
        toast({ title: "Experience created successfully!" });
      }

      setExperiences(portfolioApi.getExperiences());
      setExperienceDialog({ isOpen: false, editingId: null });
    } catch (error) {
      toast({ title: "Error saving experience", variant: "destructive" });
    }
  };

  const handleDeleteExperience = (id: number) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      portfolioApi.deleteExperience(id);
      setExperiences(portfolioApi.getExperiences());
      toast({ title: "Experience deleted successfully!" });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your portfolio content with responsive APIs
              </p>
            </div>
            <Button 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => window.open('/', '_blank')}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview Site
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7 mb-8">
            <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
            <TabsTrigger value="skills">Skills ({skills.length})</TabsTrigger>
            <TabsTrigger value="experience">Experience ({experiences.length})</TabsTrigger>
            <TabsTrigger value="company">Company ({companyProjects.length})</TabsTrigger>
            <TabsTrigger value="achievements">Achievements ({achievements.length})</TabsTrigger>
            <TabsTrigger value="blogs">Blogs ({blogs.length})</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Project Management</h2>
              <Button onClick={() => openProjectDialog()} className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="border-border bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                        <Badge variant="secondary" className="mb-2">
                          {project.category}
                        </Badge>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => openProjectDialog(project)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteProject(project.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {project.github && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.live && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Skills Management</h2>
              <Button onClick={() => openSkillDialog()} className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <Card key={skill.id} className="border-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold">{skill.name}</h4>
                        <p className="text-sm text-muted-foreground">{skill.category}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => openSkillDialog(skill)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteSkill(skill.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Proficiency</span>
                        <span>{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Experience Management</h2>
              <Button onClick={() => openExperienceDialog()} className="bg-gradient-primary">
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <Card key={exp.id} className="border-border bg-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-xl font-semibold">{exp.company}</h4>
                          {exp.current && (
                            <Badge className="bg-gradient-primary text-primary-foreground">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-primary font-medium text-lg">{exp.position}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                          <span>{exp.duration}</span>
                          {exp.location && <span>• {exp.location}</span>}
                        </div>
                        <p className="text-muted-foreground mt-3">{exp.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm" onClick={() => openExperienceDialog(exp)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteExperience(exp.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resume Tab */}
          <TabsContent value="resume" className="space-y-6">
            <Card className="border-border bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Resume Management
                </CardTitle>
                <CardDescription>
                  Upload and manage your resume file
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
                  <p className="text-muted-foreground mb-4">Drag and drop your resume file or click to browse</p>
                  <Button className="bg-gradient-primary">
                    Choose File
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Project Dialog */}
        <EditDialog
          isOpen={projectDialog.isOpen}
          onClose={() => setProjectDialog({ isOpen: false, editingId: null })}
          title={projectDialog.editingId ? "Edit Project" : "Create New Project"}
          description="Fill in the project details below"
          onSave={handleSaveProject}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Project Title"
              id="project-title"
              value={projectForm.title}
              onChange={(value) => setProjectForm({...projectForm, title: value})}
              placeholder="Enter project title"
              required
            />
            <FormField
              label="Category"
              id="project-category"
              value={projectForm.category}
              onChange={(value) => setProjectForm({...projectForm, category: value})}
              placeholder="e.g., fullstack, frontend, backend"
            />
          </div>
          <FormField
            label="Description"
            id="project-description"
            value={projectForm.description}
            onChange={(value) => setProjectForm({...projectForm, description: value})}
            placeholder="Describe your project"
            multiline
            rows={4}
            required
          />
          <FormField
            label="Technologies"
            id="project-technologies"
            value={projectForm.technologies}
            onChange={(value) => setProjectForm({...projectForm, technologies: value})}
            placeholder="React, Node.js, TypeScript (comma-separated)"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="GitHub URL"
              id="project-github"
              value={projectForm.github}
              onChange={(value) => setProjectForm({...projectForm, github: value})}
              placeholder="https://github.com/username/project"
            />
            <FormField
              label="Live URL"
              id="project-live"
              value={projectForm.live}
              onChange={(value) => setProjectForm({...projectForm, live: value})}
              placeholder="https://project.com"
            />
          </div>
        </EditDialog>

        {/* Skill Dialog */}
        <EditDialog
          isOpen={skillDialog.isOpen}
          onClose={() => setSkillDialog({ isOpen: false, editingId: null })}
          title={skillDialog.editingId ? "Edit Skill" : "Add New Skill"}
          description="Enter skill details and proficiency level"
          onSave={handleSaveSkill}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Skill Name"
              id="skill-name"
              value={skillForm.name}
              onChange={(value) => setSkillForm({...skillForm, name: value})}
              placeholder="e.g., JavaScript"
              required
            />
            <FormField
              label="Category"
              id="skill-category"
              value={skillForm.category}
              onChange={(value) => setSkillForm({...skillForm, category: value})}
              placeholder="e.g., Programming Languages"
              required
            />
          </div>
          <NumberField
            label="Proficiency (%)"
            id="skill-proficiency"
            value={skillForm.proficiency}
            onChange={(value) => setSkillForm({...skillForm, proficiency: value})}
            min={0}
            max={100}
            required
          />
        </EditDialog>

        {/* Experience Dialog */}
        <EditDialog
          isOpen={experienceDialog.isOpen}
          onClose={() => setExperienceDialog({ isOpen: false, editingId: null })}
          title={experienceDialog.editingId ? "Edit Experience" : "Add New Experience"}
          description="Enter your work experience details"
          onSave={handleSaveExperience}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Company"
              id="experience-company"
              value={experienceForm.company}
              onChange={(value) => setExperienceForm({...experienceForm, company: value})}
              placeholder="Company name"
              required
            />
            <FormField
              label="Position"
              id="experience-position"
              value={experienceForm.position}
              onChange={(value) => setExperienceForm({...experienceForm, position: value})}
              placeholder="Job title"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Duration"
              id="experience-duration"
              value={experienceForm.duration}
              onChange={(value) => setExperienceForm({...experienceForm, duration: value})}
              placeholder="e.g., 2022 - Present"
              required
            />
            <FormField
              label="Location"
              id="experience-location"
              value={experienceForm.location}
              onChange={(value) => setExperienceForm({...experienceForm, location: value})}
              placeholder="City, Country or Remote"
            />
          </div>
          <FormField
            label="Description"
            id="experience-description"
            value={experienceForm.description}
            onChange={(value) => setExperienceForm({...experienceForm, description: value})}
            placeholder="Describe your role and achievements"
            multiline
            rows={4}
            required
          />
        </EditDialog>
      </div>
    </div>
  );
};

export default AdminV2;