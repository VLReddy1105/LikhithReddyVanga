import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { Link } from "wouter";
import { showcasedProjects, type Project } from "@/data/projects";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ProjectVisual from "./ProjectVisual";
import "./projects.css";

function ProjectStory({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal className="project-story-reveal">
      <article
        className={`project-story project-story--${index % 2 ? "reverse" : "forward"}`}
      >
        <div className="project-story-copy">
          
          <h3>
            <Link href={`/projects/${project.slug}`}>{project.shortTitle}</Link>
          </h3>
          <p className="project-name">{project.title}</p>
          <p className="project-summary">{project.summary}</p>
          <p className="project-role">
            
            {project.role}
          </p>
          
          <div className="project-actions">
            <Link
              href={`/projects/${project.slug}`}
              className="button-primary"
              aria-label={`Read ${project.title} case study`}
            >
              Explore the project <ArrowRight size={16} aria-hidden="true" />
            </Link>
            {project.links.map(link => (
              <a
                href={link.href}
                key={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-external"
                aria-label={`${project.title}: ${link.label} (opens in a new tab)`}
              >
                {link.kind === "github" ? (
                  <Github size={17} aria-hidden="true" />
                ) : (
                  <ArrowUpRight size={17} aria-hidden="true" />
                )}
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="project-story-stage">
          <ProjectVisual project={project} />
          {project.evidenceImage && (
            <a
              className="preview-evidence-link"
              href={project.evidenceImage.src}
              target="_blank"
              rel="noopener noreferrer"
            >
              View actual Qwen3 validation screenshot{" "}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}
export default function ProjectsSection() {
  return (
    <section
      id="work"
      className="portfolio-section projects-section"
      aria-label="Selected projects"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            title="Understanding AI. Engineering what comes next."
          />
        </Reveal>
        <div className="project-stories">
          {showcasedProjects.map((project, index) => (
            <ProjectStory key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
