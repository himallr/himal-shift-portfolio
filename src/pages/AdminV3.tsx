import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Trash2, 
  Edit, 
  Plus, 
  Upload,
  Eye,
  EyeOff,
  Calendar,
  MapPin,
  Building,
  User,
  Award,
  Briefcase,
  Code,
  BookOpen,
  Image
} from "lucide-react";
import { portfolioApi, uploadFile, type Project, type Skill, type Experience, type Blog, type Achievement, type CompanyProject, type Profile } from "@/services/portfolioApi";
import { EditDialog, FormField, NumberField } from "@/components/ui/edit-dialog";

export default function AdminV3() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // State for all data
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [companyProjects, setCompanyProjects] = useState<CompanyProject[]>([]);

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Load all data
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [profileData, projectsData, skillsData, experiencesData, blogsData, achievementsData, companyProjectsData] = await Promise.all([
        portfolioApi.getProfile(),
        portfolioApi.getProjects(),
        portfolioApi.getSkills(),
        portfolioApi.getExperiences(),
        portfolioApi.getBlogs(),
        portfolioApi.getAchievements(),
        portfolioApi.getCompanyProjects()
      ]);

      setProfile(profileData);
      setProjects(projectsData);
      setSkills(skillsData);
      setExperiences(experiencesData);
      setBlogs(blogsData);
      setAchievements(achievementsData);
      setCompanyProjects(companyProjectsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Generic handlers
  const openDialog = (type: string, item?: any) => {
    setDialogType(type);
    setEditingItem(item);
    setSelectedFile(null);
    
    if (item) {
      setFormData({ ...item });
    } else {
      // Set default values based on type
      switch (type) {
        case "profile":
          setFormData({
            name: "",
            title: "",
            description: "",
            email: "",
            phone: "",
            location: "",
            github_url: "",
            linkedin_url: "",
            leetcode_url: "",
            resume_url: "",
            profile_image_url: ""
          });
          break;
        case "project":
          setFormData({
            title: "",
            description: "",
            image_url: "",
            demo_url: "",
            github_url: "",
            technologies: [],
            category: "web",
            is_public: true
          });
          break;
        case "skill":
          setFormData({
            name: "",
            category: "",
            proficiency: 80
          });
          break;
        case "experience":
          setFormData({
            company: "",
            position: "",
            start_date: "",
            end_date: "",
            description: "",
            technologies: [],
            achievements: [],
            is_current: false
          });
          break;
        case "blog":
          setFormData({
            title: "",
            excerpt: "",
            content: "",
            image_url: "",
            url: "",
            published_date: new Date().toISOString().split('T')[0],
            tags: [],
            is_published: true
          });
          break;
        case "achievement":
          setFormData({
            title: "",
            description: "",
            category: "",
            date_achieved: new Date().toISOString().split('T')[0],
            organization: "",
            certificate_url: ""
          });
          break;
        case "company_project":
          setFormData({
            title: "",
            description: "",
            company: "",
            type: "development",
            status: "completed",
            technologies: [],
            start_date: "",
            end_date: "",
            team_size: 1,
            is_public: true
          });
          break;
      }
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      let imageUrl = formData.image_url || formData.profile_image_url || formData.certificate_url;

      // Handle file upload if there's a selected file
      if (selectedFile) {
        const uploadedUrl = await uploadFile(selectedFile, 'portfolio-images', `${dialogType}_${Date.now()}`);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const dataWithImage = { ...formData };
      if (imageUrl) {
        if (dialogType === "profile") {
          dataWithImage.profile_image_url = imageUrl;
        } else if (dialogType === "achievement") {
          dataWithImage.certificate_url = imageUrl;
        } else {
          dataWithImage.image_url = imageUrl;
        }
      }

      let result;
      if (editingItem) {
        // Update existing item
        switch (dialogType) {
          case "profile":
            result = await portfolioApi.saveProfile(dataWithImage);
            break;
          case "project":
            result = await portfolioApi.updateProject(editingItem.id, dataWithImage);
            break;
          case "skill":
            result = await portfolioApi.updateSkill(editingItem.id, dataWithImage);
            break;
          case "experience":
            result = await portfolioApi.updateExperience(editingItem.id, dataWithImage);
            break;
          case "blog":
            result = await portfolioApi.updateBlog(editingItem.id, dataWithImage);
            break;
          case "achievement":
            result = await portfolioApi.updateAchievement(editingItem.id, dataWithImage);
            break;
          case "company_project":
            result = await portfolioApi.updateCompanyProject(editingItem.id, dataWithImage);
            break;
        }
      } else {
        // Create new item
        switch (dialogType) {
          case "profile":
            result = await portfolioApi.saveProfile(dataWithImage);
            break;
          case "project":
            result = await portfolioApi.saveProject(dataWithImage);
            break;
          case "skill":
            result = await portfolioApi.saveSkill(dataWithImage);
            break;
          case "experience":
            result = await portfolioApi.saveExperience(dataWithImage);
            break;
          case "blog":
            result = await portfolioApi.saveBlog(dataWithImage);
            break;
          case "achievement":
            result = await portfolioApi.saveAchievement(dataWithImage);
            break;
          case "company_project":
            result = await portfolioApi.saveCompanyProject(dataWithImage);
            break;
        }
      }

      if (result) {
        toast({
          title: "Success",
          description: `${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)} ${editingItem ? 'updated' : 'created'} successfully`,
        });
        loadAllData();
        setIsDialogOpen(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${editingItem ? 'update' : 'create'} ${dialogType}`,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (type: string, id: string) => {
    try {
      let success = false;
      switch (type) {
        case "project":
          success = await portfolioApi.deleteProject(id);
          break;
        case "skill":
          success = await portfolioApi.deleteSkill(id);
          break;
        case "experience":
          success = await portfolioApi.deleteExperience(id);
          break;
        case "blog":
          success = await portfolioApi.deleteBlog(id);
          break;
        case "achievement":
          success = await portfolioApi.deleteAchievement(id);
          break;
        case "company_project":
          success = await portfolioApi.deleteCompanyProject(id);
          break;
      }

      if (success) {
        toast({
          title: "Success",
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`,
        });
        loadAllData();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to delete ${type}`,
        variant: "destructive",
      });
    }
  };

  const toggleVisibility = async (id: string) => {
    try {
      const result = await portfolioApi.toggleCompanyProjectVisibility(id);
      if (result) {
        toast({
          title: "Success",
          description: "Visibility updated successfully",
        });
        loadAllData();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleArrayFieldChange = (field: string, value: string) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData({ ...formData, [field]: array });
  };

  const renderFormFields = () => {
    switch (dialogType) {
      case "profile":
        return (
          <div className="space-y-4">
            <FormField
              label="Name"
              id="name"
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <FormField
              label="Title"
              id="title"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <FormField
              label="Description"
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
            />
            <FormField
              label="Email"
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <FormField
              label="Phone"
              id="phone"
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <FormField
              label="Location"
              id="location"
              value={formData.location || ""}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <FormField
              label="GitHub URL"
              id="github_url"
              value={formData.github_url || ""}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            />
            <FormField
              label="LinkedIn URL"
              id="linkedin_url"
              value={formData.linkedin_url || ""}
              onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
            />
            <FormField
              label="LeetCode URL"
              id="leetcode_url"
              value={formData.leetcode_url || ""}
              onChange={(e) => setFormData({ ...formData, leetcode_url: e.target.value })}
            />
            <FormField
              label="Resume URL"
              id="resume_url"
              value={formData.resume_url || ""}
              onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
            />
            <div>
              <Label htmlFor="profile_image">Profile Image</Label>
              <Input
                id="profile_image"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </div>
          </div>
        );

      case "project":
        return (
          <div className="space-y-4">
            <FormField
              label="Title"
              id="title"
              value={formData.title || ""}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <FormField
              label="Description"
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
            />
            <FormField
              label="Demo URL"
              id="demo_url"
              value={formData.demo_url || ""}
              onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
            />
            <FormField
              label="GitHub URL"
              id="github_url"
              value={formData.github_url || ""}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            />
            <FormField
              label="Technologies (comma-separated)"
              id="technologies"
              value={formData.technologies?.join(', ') || ""}
              onChange={(e) => handleArrayFieldChange('technologies', e.target.value)}
            />
            <FormField
              label="Category"
              id="category"
              value={formData.category || ""}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <div>
              <Label htmlFor="project_image">Project Image</Label>
              <Input
                id="project_image"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </div>
          </div>
        );

      // Add other form types...
      default:
        return <div>Form fields for {dialogType}</div>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Portfolio Admin Dashboard</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="experience" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Experience
          </TabsTrigger>
          <TabsTrigger value="company_projects" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Company
          </TabsTrigger>
          <TabsTrigger value="blogs" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Blogs
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Awards
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <Button onClick={() => openDialog("profile", profile)}>
              <Edit className="w-4 h-4 mr-2" />
              {profile ? "Edit Profile" : "Create Profile"}
            </Button>
          </div>
          
          {profile ? (
            <Card>
              <CardHeader>
                <CardTitle>{profile.name}</CardTitle>
                <CardDescription>{profile.title}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone:</strong> {profile.phone}</p>
                <p><strong>Location:</strong> {profile.location}</p>
                {profile.github_url && <p><strong>GitHub:</strong> {profile.github_url}</p>}
                {profile.linkedin_url && <p><strong>LinkedIn:</strong> {profile.linkedin_url}</p>}
                {profile.leetcode_url && <p><strong>LeetCode:</strong> {profile.leetcode_url}</p>}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p>No profile information available. Create one to get started.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Projects ({projects.length})</h2>
            <Button onClick={() => openDialog("project")}>
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openDialog("project", project)}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete("project", project.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <Badge variant={project.is_public ? "default" : "secondary"}>
                      {project.is_public ? "Public" : "Private"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Add other tabs similarly... */}
      </Tabs>

      {/* Edit Dialog */}
      <EditDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={`${editingItem ? 'Edit' : 'Add'} ${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)}`}
        onSave={handleSave}
        isLoading={loading}
      >
        {renderFormFields()}
      </EditDialog>
    </div>
  );
}