import { ArrowUpRight, Code2, FlaskConical, Layers3 } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import "./profile.css";

const FOCUS_AREAS = [
  {
    title: "Research",
    detail: "Making transformer behavior visible and easier to inspect.",
    icon: FlaskConical,
  },
  {
    title: "Engineering",
    detail: "Connecting AI models, dependable APIs and thoughtful interfaces.",
    icon: Code2,
  },
  {
    title: "Building products",
    detail:
      "Turning business needs into practical software at VLR Technologies.",
    icon: Layers3,
  },
];
const EDUCATION = [
  {
    degree: "M.Sc. Artificial Intelligence",
    school: "BTU Cottbus-Senftenberg",
    location: "Cottbus, Germany",
    period: "2024 – Present",
    label: "In progress",
  },
  {
    degree: "B.Tech CSE — Artificial Intelligence",
    school: "Parul University",
    location: "Gujarat, India",
    period: "2020 – 2024",
    label: "Undergraduate study",
  },
];
const LANGUAGES = [
  { language: "English", level: "Fluent" },
  { language: "German", level: "Basic" },
  { language: "Hindi", level: "Fluent" },
  { language: "Telugu", level: "Native" },
];

export default function AboutSection() {
  return (
    <section id="about" className="portfolio-section profile-section">
      <div className="container">
        <Reveal>
          <SectionHeading
            title="Research depth. Product mindset."
          />
        </Reveal>
        <div className="profile-overview">
          <Reveal className="profile-copy">
            <p className="profile-lead">
              I turn complex AI systems into useful, understandable products.
            </p>
            <p>
              I’m Vanga Likhith Reddy, a full-stack and AI engineer pursuing an
              M.Sc. in Artificial Intelligence at{" "}
              <strong>BTU Cottbus-Senftenberg</strong> in Germany. My work
              brings together model internals, interactive visualization and web
              engineering.
            </p>
            <p>
              As a <strong>Research Assistant</strong>, I work on LLM
              interpretability and visualization: connecting transformer
              computations to interfaces that people can explore. As the{" "}
              <strong>founder of VLR Technologies</strong>, I apply that same
              engineering mindset to software, AI solutions and digital
              products.
            </p>
            <div className="profile-links">
              <a className="text-link" href="#experience">
                My experience <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a className="text-link" href="#research">
                Research focus <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <aside
              className="profile-focus"
              aria-label="How I approach my work"
            >
              
              {FOCUS_AREAS.map(({ title, detail, icon: Icon }) => (
                <div className="profile-focus-row" key={title}>
                  <span className="profile-icon">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{detail}</p>
                  </div>
                </div>
              ))}
            </aside>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="profile-education">
            <div className="profile-education-heading">
              <p className="eyebrow">Education</p>
              
            </div>
            <div className="profile-education-grid">
              {EDUCATION.map(education => (
                <article className="profile-degree" key={education.degree}>
                  <div className="profile-degree-meta">
                    
                    <span>{education.period}</span>
                  </div>
                  <h3>{education.degree}</h3>
                  <p>{education.school}</p>
                  <p className="profile-location">{education.location}</p>
                </article>
              ))}
            </div>
          </div>
          <ul className="profile-languages" aria-label="Languages">
            {LANGUAGES.map(({ language, level }) => (
              <li key={language}>
                <span>{language}</span>
                <span>{level}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
