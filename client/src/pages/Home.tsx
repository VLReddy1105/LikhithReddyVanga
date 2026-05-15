/* Neural Monochrome — Home Page
   Assembles all sections with loading screen gate */

import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResearchSection from "@/components/ResearchSection";
import SkillsSection from "@/components/SkillsSection";
import BlogsSection from "@/components/BlogsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          background: "var(--background)",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ResearchSection />
        <SkillsSection />
        <BlogsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
