import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Save, Upload, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("projects");

  // Mock data states
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      technologies: ["React", "Node.js", "PostgreSQL"],
      status: "published"
    }
  ]);

  const [skills, setSkills] = useState([
    { id: 1, name: "JavaScript", category: "Programming Languages", proficiency: 95 },
    { id: 2, name: "React", category: "Frontend Development", proficiency: 90 }
  ]);

  const [experiences, setExperiences] = useState([
    {
      id: 1,
      company: "SquareShift Company",
      position: "Full Stack Developer",
      duration: "2022 - Present",
      description: "Building scalable web applications and leading frontend development initiatives."
    }
  ]);

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
    description: ""
  });

  const handleSaveProject = () => {
    const newProject = {
      id: Date.now(),
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(t => t.trim()),
      status: "published"
    };
    setProjects([...projects, newProject]);
    setProjectForm({ title: "", description: "", technologies: "", github: "", live: "", category: "fullstack" });
    toast({ title: "Project saved successfully!" });
  };

  const handleSaveSkill = () => {
    const newSkill = {
      id: Date.now(),
      ...skillForm
    };
    setSkills([...skills, newSkill]);
    setSkillForm({ name: "", category: "", proficiency: 80 });
    toast({ title: "Skill added successfully!" });
  };

  const handleSaveExperience = () => {
    const newExperience = {
      id: Date.now(),
      ...experienceForm
    };
    setExperiences([...experiences, newExperience]);
    setExperienceForm({ company: "", position: "", duration: "", description: "" });
    toast({ title: "Experience saved successfully!" });
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
                Manage your portfolio content
              </p>
            </div>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Eye className="mr-2 h-4 w-4" />
              Preview Site
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add New Project */}
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Project
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="project-title">Title</Label>
                    <Input
                      id="project-title"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                      placeholder="Project title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="project-desc">Description</Label>
                    <Textarea
                      id="project-desc"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                      placeholder="Project description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="project-tech">Technologies (comma-separated)</Label>
                    <Input
                      id="project-tech"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                      placeholder="React, Node.js, TypeScript"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="project-github">GitHub URL</Label>
                      <Input
                        id="project-github"
                        value={projectForm.github}
                        onChange={(e) => setProjectForm({...projectForm, github: e.target.value})}
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-live">Live URL</Label>
                      <Input
                        id="project-live"
                        value={projectForm.live}
                        onChange={(e) => setProjectForm({...projectForm, live: e.target.value})}
                        placeholder="https://project.com"
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveProject} className="w-full bg-gradient-primary">
                    <Save className="mr-2 h-4 w-4" />
                    Save Project
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Projects */}
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Existing Projects</CardTitle>
                  <CardDescription>Manage your published projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold">{project.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {project.technologies.map((tech, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Skill
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="skill-name">Skill Name</Label>
                    <Input
                      id="skill-name"
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({...skillForm, name: e.target.value})}
                      placeholder="e.g., JavaScript"
                    />
                  </div>
                  <div>
                    <Label htmlFor="skill-category">Category</Label>
                    <Input
                      id="skill-category"
                      value={skillForm.category}
                      onChange={(e) => setSkillForm({...skillForm, category: e.target.value})}
                      placeholder="e.g., Programming Languages"
                    />
                  </div>
                  <div>
                    <Label htmlFor="skill-proficiency">Proficiency (%)</Label>
                    <Input
                      id="skill-proficiency"
                      type="number"
                      min="0"
                      max="100"
                      value={skillForm.proficiency}
                      onChange={(e) => setSkillForm({...skillForm, proficiency: parseInt(e.target.value)})}
                    />
                  </div>
                  <Button onClick={handleSaveSkill} className="w-full bg-gradient-primary">
                    <Save className="mr-2 h-4 w-4" />
                    Add Skill
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Current Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-gradient-primary h-2 rounded-full"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{skill.category}</span>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="exp-company">Company</Label>
                    <Input
                      id="exp-company"
                      value={experienceForm.company}
                      onChange={(e) => setExperienceForm({...experienceForm, company: e.target.value})}
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exp-position">Position</Label>
                    <Input
                      id="exp-position"
                      value={experienceForm.position}
                      onChange={(e) => setExperienceForm({...experienceForm, position: e.target.value})}
                      placeholder="Job title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exp-duration">Duration</Label>
                    <Input
                      id="exp-duration"
                      value={experienceForm.duration}
                      onChange={(e) => setExperienceForm({...experienceForm, duration: e.target.value})}
                      placeholder="e.g., 2022 - Present"
                    />
                  </div>
                  <div>
                    <Label htmlFor="exp-description">Description</Label>
                    <Textarea
                      id="exp-description"
                      value={experienceForm.description}
                      onChange={(e) => setExperienceForm({...experienceForm, description: e.target.value})}
                      placeholder="Job description and achievements"
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleSaveExperience} className="w-full bg-gradient-primary">
                    <Save className="mr-2 h-4 w-4" />
                    Save Experience
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold">{exp.company}</h4>
                            <p className="text-primary font-medium">{exp.position}</p>
                            <p className="text-sm text-muted-foreground">{exp.duration}</p>
                            <p className="text-sm mt-2">{exp.description}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
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
                  <p className="text-muted-foreground mb-4">Drop your PDF file here or click to browse</p>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Choose File
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-semibold">current-resume.pdf</h4>
                      <p className="text-sm text-muted-foreground">Uploaded 2 days ago</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
