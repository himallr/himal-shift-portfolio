import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar } from "lucide-react";
import { portfolioApi, type Experience } from "@/services/portfolioApi";

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    setExperiences(portfolioApi.getExperiences());
  }, []);

  const legacyExperiences = [
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
                
                {exp.current && (
                  <Badge className="bg-gradient-primary text-primary-foreground">
                    Current Position
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;