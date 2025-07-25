import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Calendar, Building } from "lucide-react";
import { portfolioApi, type Achievement } from "@/services/portfolioApi";

const AchievementsSection = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    setAchievements(portfolioApi.getAchievements());
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'hackathon':
        return <Trophy className="h-5 w-5" />;
      case 'certification':
        return <Award className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'hackathon':
        return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30';
      case 'certification':
        return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      default:
        return 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30';
    }
  };

  return (
    <section className="py-20 px-6" id="achievements">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Achievements & Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recognition and accomplishments in the tech industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <Card 
              key={achievement.id}
              className={`border-2 backdrop-blur-sm hover:shadow-glow hover:scale-105 transition-all duration-300 animate-scale-in ${getCategoryColor(achievement.category)}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      {getCategoryIcon(achievement.category)}
                    </div>
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {achievement.category}
                      </Badge>
                      <CardTitle className="text-xl text-foreground">
                        {achievement.title}
                      </CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <CardDescription className="text-muted-foreground mb-4">
                  {achievement.description}
                </CardDescription>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(achievement.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  {achievement.organization && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Building className="h-4 w-4 mr-2" />
                      {achievement.organization}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;