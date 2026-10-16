/* Portfolio composition; one shared procedural scene. */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResearchSection from "@/components/ResearchSection";
import SocialSection from "@/components/SocialSection";
import DigitalTwin from "@/components/DigitalTwin";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="portfolio-shell">
        <DigitalTwin />
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SocialSection />
          <ProjectsSection />
          <ResearchSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
