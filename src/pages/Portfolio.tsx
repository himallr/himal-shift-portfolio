import Navigation from "@/components/Portfolio/Navigation";
import HeroSection from "@/components/Portfolio/HeroSection";
import ExperienceSection from "@/components/Portfolio/ExperienceSection";
import SkillsSection from "@/components/Portfolio/SkillsSection";
import ProjectsSection from "@/components/Portfolio/ProjectsSection";
import CompanyProjectsSection from "@/components/Portfolio/CompanyProjectsSection";
import AchievementsSection from "@/components/Portfolio/AchievementsSection";
import BlogsSection from "@/components/Portfolio/BlogsSection";
import ContactSection from "@/components/Portfolio/ContactSection";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div id="home">
          <HeroSection />
        </div>
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <CompanyProjectsSection />
        <AchievementsSection />
        <BlogsSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border bg-background/50 backdrop-blur-sm py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 Himal. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;