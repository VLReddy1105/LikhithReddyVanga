import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Github,
  Layers3,
} from "lucide-react";
import { Link } from "wouter";
import { getProject, showcasedProjects } from "@/data/projects";
import ProjectVisual from "@/components/ProjectVisual";
import Reveal from "@/components/Reveal";
import ThemeToggle from "@/components/ThemeToggle";
import "@/components/projects.css";

const sections = [
  "Problem",
  "Approach",
  "Architecture",
  "Contribution",
  "Technical challenges",
  "Outcome",
  "Links",
];
const sectionId = (title: string) => title.toLowerCase().replaceAll(" ", "-");

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = project
      ? `${project.title} — Vanga Likhith Reddy`
      : "Project not found — Vanga Likhith Reddy";
    window.scrollTo({ top: 0, behavior: "instant" });
    headingRef.current?.focus({ preventScroll: true });
    return () => {
      document.title = previousTitle;
    };
  }, [project]);

  if (!project) {
    return (
      <main
        id="main-content"
        className="case-study-missing container"
        tabIndex={-1}
      >
        <p className="eyebrow">Project not found</p>
        <h1 ref={headingRef} tabIndex={-1}>
          This case study is unavailable.
        </h1>
        <Link href="/#work" className="button-primary">
          <ArrowLeft size={17} aria-hidden="true" /> Back to selected work
        </Link>
      </main>
    );
  }

  const relatedProjects = showcasedProjects
    .filter(item => item.slug !== project.slug)
    .slice(0, 2);

  return (
    <div className="case-study-page">
      <a href="#main-content" className="skip-link">
        Skip to case study
      </a>
      <header className="case-study-header">
        <div className="container">
          <Link href="/#work" className="case-back">
            <ArrowLeft size={17} aria-hidden="true" /> Selected work
          </Link>
          <Link
            href="/"
            className="case-brand"
            aria-label="Vanga Likhith Reddy, home"
          >
            VLR<span>.dev</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main
        id="main-content"
        className="container case-study-main"
        tabIndex={-1}
      >
        <Reveal>
          <div className="case-study-intro">
            <div>
              <p className="eyebrow">{project.category}</p>
              <h1 ref={headingRef} tabIndex={-1}>
                {project.title}
              </h1>
              <p className="case-study-lede">{project.summary}</p>
            </div>
            <span className="project-status case-status">{project.status}</span>
          </div>
          <dl className="case-study-facts">
            <div>
              <dt>Contribution</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Technologies</dt>
              <dd>{project.technologies.join(" · ")}</dd>
            </div>
          </dl>
        </Reveal>
        <Reveal>
          <ProjectVisual project={project} className="case-study-visual" />
        </Reveal>
        <div className="case-study-layout">
          <nav className="case-study-nav" aria-label="Case study sections">
            <span className="eyebrow">In this case study</span>
            <ol>
              {sections.map((section, index) => (
                <li key={section}>
                  <a href={`#${sectionId(section)}`}>
                    <span aria-hidden="true">0{index + 1}</span>
                    {section}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="case-study-body">
            <Reveal>
              <section id="problem" className="case-chapter">
                <span className="case-chapter-number" aria-hidden="true">
                  01
                </span>
                <h2>Problem</h2>
                <p>{project.caseStudy.problem}</p>
              </section>
            </Reveal>
            <Reveal>
              <section id="approach" className="case-chapter">
                <span className="case-chapter-number" aria-hidden="true">
                  02
                </span>
                <h2>Approach</h2>
                <p>{project.caseStudy.approach}</p>
              </section>
            </Reveal>
            <Reveal>
              <section id="architecture" className="case-chapter">
                <span className="case-chapter-number" aria-hidden="true">
                  03
                </span>
                <h2>Architecture</h2>
                <ol className="case-architecture">
                  {project.architecture.map((step, index) => (
                    <li key={step.title}>
                      <span className="architecture-icon" aria-hidden="true">
                        {index + 1}
                      </span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>
            <Reveal>
              <section id="contribution" className="case-chapter">
                <span className="case-chapter-number" aria-hidden="true">
                  04
                </span>
                <h2>Contribution</h2>
                <p>{project.caseStudy.contribution}</p>
              </section>
            </Reveal>
            <Reveal>
              <section id="technical-challenges" className="case-chapter">
                <span className="case-chapter-number" aria-hidden="true">
                  05
                </span>
                <h2>Technical challenges</h2>
                <ul className="case-challenges">
                  {project.caseStudy.challenges.map(challenge => (
                    <li key={challenge}>
                      <Layers3 size={18} aria-hidden="true" />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
            <Reveal>
              <section id="outcome" className="case-chapter">
                <span className="case-chapter-number" aria-hidden="true">
                  06
                </span>
                <h2>Outcome</h2>
                <p>{project.caseStudy.outcome}</p>
                {project.evidenceImage && (
                  <figure className="case-evidence">
                    <a
                      href={project.evidenceImage.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open the full-size application validation screenshot in a new tab"
                    >
                      <img
                        src={project.evidenceImage.src}
                        alt={project.evidenceImage.alt}
                        loading="lazy"
                        width="1344"
                        height="1969"
                      />
                    </a>
                    <figcaption>{project.evidenceImage.caption}</figcaption>
                  </figure>
                )}
              </section>
            </Reveal>
            <Reveal>
              <section id="links" className="case-chapter">
                <span className="case-chapter-number" aria-hidden="true">
                  07
                </span>
                <h2>Links</h2>
                {project.links.length > 0 && (
                  <div className="case-link-list">
                    {project.links.map(link => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-secondary"
                        aria-label={`${link.label} (opens in a new tab)`}
                      >
                        {link.kind === "github" ? (
                          <Github size={18} aria-hidden="true" />
                        ) : (
                          <ArrowUpRight size={18} aria-hidden="true" />
                        )}
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
                {project.linkNote && (
                  <p className="case-link-note">{project.linkNote}</p>
                )}
                <Link href="/#contact" className="text-link">
                  Discuss this work <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </section>
            </Reveal>
          </div>
        </div>
        <Reveal>
          <aside className="case-next" aria-label="More selected work">
            <div>
              <p className="eyebrow">Keep exploring</p>
              <h2>Different problems. Shared craft.</h2>
            </div>
            <div>
              {relatedProjects.map(item => (
                <Link key={item.slug} href={`/projects/${item.slug}`}>
                  <span>
                    <small>{item.category}</small>
                    <strong>{item.title}</strong>
                  </span>
                  <ArrowUpRight size={22} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </aside>
        </Reveal>
      </main>
      <footer className="case-footer container">
        <p>© {new Date().getFullYear()} Vanga Likhith Reddy</p>
        <Link href="/#work" className="text-link">
          All selected work <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </footer>
    </div>
  );
}
