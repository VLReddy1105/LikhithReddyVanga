import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import "./profile.css";

const EXPERIENCES = [
  {
    context: "Academic research",
    role: "Research Assistant",
    organization: "BTU Cottbus-Senftenberg",
    location: "Cottbus, Germany",
    period: "March 2026 – Present",
    current: true,
    focus: "LLM interpretability & visualization",
    contribution:
      "Connecting real transformer computations to interactive tools for inspecting how models process text.",
    bullets: [
      "Build a full-stack explorer for tokens, embeddings, attention, residual updates and vocabulary logits.",
      "Implement capture and retained-tensor APIs so views can inspect an existing trace without rerunning inference.",
      "Link token and layer selection across attention, representation and Logit Lens views, with explicit data provenance and unavailable states.",
    ],
    technologies: [
      "PyTorch",
      "Hugging Face",
      "FastAPI",
      "Next.js",
      "TypeScript",
    ],
    link: { href: "#research", label: "Explore the research" },
  },
  {
    context: "Completed academic project",
    role: "MotionCB — Solar Infrastructure Detection",
    organization: "BTU Cottbus-Senftenberg",
    status: "Completed",
    focus: "Deep learning & remote sensing",
    contribution:
      "Designed and implemented deep learning pipelines to identify solar photovoltaic infrastructure across Germany.",
    bullets: [
      "Developed object detection and image segmentation workflows using multispectral satellite and geospatial imagery.",
      "Used QGIS for data exploration, extraction, layer management and validation of solar infrastructure mapping.",
    ],
    technologies: [
      "Python",
      "Deep Learning",
      "Computer Vision",
      "QGIS",
      "Remote Sensing",
    ],
    link: { href: "/projects/motioncb", label: "View the project" },
  },
  {
    context: "Founder responsibilities",
    role: "Founder & Engineer",
    organization: "VLR Technologies",
    focus: "Software, AI solutions & digital products",
    contribution:
      "Bring product thinking and hands-on engineering together, from service design to working web and API workflows.",
    bullets: [
      "Shape the software development, AI solutions and digital product offering.",
      "Build the Next.js company website and Django REST backend for service enquiries and administrative workflows.",
    ],
    technologies: ["Next.js", "React", "Django REST Framework", "PostgreSQL"],
    link: { href: "#work", label: "View selected work" },
  },
  {
    context: "Employed internship",
    role: "Full Stack Developer Intern",
    organization: "Dhalav’s Designers",
    location: "Hyderabad, India",
    period: "December 2023 – March 2024",
    current: false,
    focus: "AI-enabled web applications",
    contribution:
      "Connected web interfaces, backend APIs and AI services for business application workflows.",
    bullets: [
      "Developed Next.js interfaces backed by authentication, API integrations and database models.",
      "Built retrieval-based chatbot workflows around business and FAQ data, lead capture and structured responses.",
    ],
    technologies: ["Next.js", "RAG", "FastAPI", "PostgreSQL", "REST APIs"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="portfolio-section experience-section">
      <div className="container">
        <Reveal>
          <SectionHeading
            title="Where research meets delivery."
          />
        </Reveal>
        <div className="experience-list">
          {EXPERIENCES.map((experience, index) => (
            <Reveal key={experience.role} delay={index * 0.06}>
              <article className="experience-entry">
                <div className="experience-context">
                  
                  <p className="experience-organization">
                    {experience.organization}
                  </p>
                  {experience.location && <p>{experience.location}</p>}
                  {experience.period && (
                    <p className="experience-period">{experience.period}</p>
                  )}
                </div>
                <div className="experience-detail">
                  <div className="experience-title-row">
                    <h3>{experience.role}</h3>
                    
                  </div>
                  
                  <p className="experience-contribution">
                    {experience.contribution}
                  </p>
                  <ul className="experience-contributions">
                    {experience.bullets.map(bullet => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <ul
                    className="profile-tools"
                    aria-label={`Technologies used as ${experience.role}`}
                  >
                    {experience.technologies.map(technology => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  {experience.link && (
                    <a
                      className="text-link experience-link"
                      href={experience.link.href}
                    >
                      {experience.link.label}
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
