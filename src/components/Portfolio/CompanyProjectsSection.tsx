import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Users, Clock, Lightbulb, Code } from "lucide-react";
import { portfolioApi, type CompanyProject } from "@/services/portfolioApi";

const CompanyProjectsSection = () => {
  const [companyProjects, setCompanyProjects] = useState<CompanyProject[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setCompanyProjects(portfolioApi.getCompanyProjects());
  }, []);

  const visibleProjects = showAll 
    ? companyProjects 
    : companyProjects.filter(project => project.visible);

  const getTypeIcon = (type: string) => {
    return type === 'poc' ? <Lightbulb className="h-4 w-4" /> : <Code className="h-4 w-4" />;
  };

  const getTypeColor = (type: string) => {
    return type === 'poc' 
      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30' 
      : 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-500/30';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'ongoing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'planned':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section className="py-20 px-6" id="company-projects">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            SquareShift Projects & POCs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional projects and proof-of-concepts delivered at SquareShift Company
          </p>
          
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              {showAll ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {showAll ? 'Show Public Only' : 'Show All Projects'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleProjects.map((project, index) => (
            <Card 
              key={project.id}
              className={`border-2 backdrop-blur-sm hover:shadow-glow hover:scale-105 transition-all duration-300 animate-scale-in ${getTypeColor(project.type)}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 rounded bg-primary/20">
                      {getTypeIcon(project.type)}
                    </div>
                    <Badge variant="secondary">
                      {project.type.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    {!project.visible && (
                      <Badge variant="destructive" className="text-xs">
                        Private
                      </Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-xl text-foreground">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        variant="outline"
                        className="text-xs border-primary/30"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Project Details */}
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Duration: {project.duration}</span>
                    </div>
                    {project.team && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{project.team}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {companyProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No company projects to display yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompanyProjectsSection;