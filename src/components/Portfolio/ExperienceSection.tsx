import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar } from "lucide-react";

const ExperienceSection = () => {
  const experiences = [
    {
      company: "SquareShift Company",
      position: "Full Stack Developer",
      duration: "2022 - Present (2+ years)",
      description: "Building scalable web applications and leading frontend development initiatives. Collaborating with cross-functional teams to deliver high-quality software solutions.",
      technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "Docker"],
      achievements: [
        "Led the development of 3 major client projects",
        "Improved application performance by 40%",
        "Mentored 2 junior developers",
        "Implemented CI/CD pipelines reducing deployment time by 60%"
      ]
    }
  ];

  return (
    <section className="py-20 px-6" id="experience">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey in software development
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="border-border bg-card/50 backdrop-blur-sm hover:shadow-card transition-all duration-300 animate-slide-in-left">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                      <Building2 className="h-6 w-6 text-primary" />
                      {exp.company}
                    </CardTitle>
                    <CardDescription className="text-lg text-primary font-semibold">
                      {exp.position}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{exp.duration}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
                
                {/* Technologies */}
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Key Achievements */}
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Key Achievements</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start gap-2 text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;