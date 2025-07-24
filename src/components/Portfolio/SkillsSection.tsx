import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Globe, Smartphone, GitBranch, Settings } from "lucide-react";

const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: Globe,
      skills: ["React", "TypeScript", "Next.js", "Vue.js", "HTML5", "CSS3", "Tailwind CSS", "SASS"],
      color: "text-blue-400"
    },
    {
      title: "Backend Development", 
      icon: Database,
      skills: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
      color: "text-green-400"
    },
    {
      title: "Mobile Development",
      icon: Smartphone,
      skills: ["React Native", "Flutter", "Ionic", "Progressive Web Apps"],
      color: "text-purple-400"
    },
    {
      title: "DevOps & Tools",
      icon: Settings,
      skills: ["Docker", "AWS", "GitHub Actions", "Jenkins", "Kubernetes", "Nginx"],
      color: "text-orange-400"
    },
    {
      title: "Version Control",
      icon: GitBranch,
      skills: ["Git", "GitHub", "GitLab", "Bitbucket"],
      color: "text-red-400"
    },
    {
      title: "Programming Languages",
      icon: Code2,
      skills: ["JavaScript", "TypeScript", "Python", "Java", "C++", "Go"],
      color: "text-indigo-400"
    }
  ];

  return (
    <section className="py-20 px-6" id="skills">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="border-border bg-card/50 backdrop-blur-sm hover:shadow-card hover:scale-105 transition-all duration-300 animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/20 w-fit group-hover:animate-glow transition-all duration-300">
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <CardTitle className="text-xl text-foreground">
                  {category.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex}
                      variant="secondary"
                      className="bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Skill Progress Bars */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Proficiency Levels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { skill: "JavaScript/TypeScript", level: 95 },
              { skill: "React/Next.js", level: 90 },
              { skill: "Node.js", level: 85 },
              { skill: "Python", level: 80 },
              { skill: "AWS/DevOps", level: 75 },
              { skill: "Mobile Development", level: 70 }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-foreground font-medium">{item.skill}</span>
                  <span className="text-primary">{item.level}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;