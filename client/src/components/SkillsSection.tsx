import {
  AudioLines,
  BrainCircuit,
  Braces,
  Database,
  Layers3,
  ScanLine,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import "./profile.css";

const SKILL_GROUPS = [
  {
    title: "AI / Machine Learning",
    icon: BrainCircuit,
    description: "Model inference, computer vision and speech recognition.",
    tools: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "Faster-Whisper",
      "Object detection",
      "Image segmentation",
    ],
    context: "Applied in the visualization lab, voice agent and MotionCB.",
  },
  {
    title: "LLM Engineering",
    icon: AudioLines,
    description:
      "Local model integration and reliable conversational workflows.",
    tools: [
      "Ollama",
      "Qwen",
      "Tokenization",
      "Inference APIs",
      "Session memory",
    ],
    context: "From real next-token outputs to bounded conversation context.",
  },
  {
    title: "Frontend Development",
    icon: Layers3,
    description: "Responsive interfaces with clear interaction and state.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    context: "Used across research tools and community platforms.",
  },
  {
    title: "Backend Development",
    icon: Braces,
    description: "Typed APIs, application services and validation.",
    tools: ["FastAPI", "Pydantic", "Django REST Framework", "REST APIs"],
    context: "Research trace services and business enquiry workflows.",
  },
  {
    title: "Data & Infrastructure",
    icon: Database,
    description: "Database-backed applications and controlled data access.",
    tools: ["PostgreSQL", "Supabase", "DuckDB", "SQL", "Git", "Vercel"],
    context:
      "Community access, LeadRadar data workflows and web deployment configuration.",
  },
  {
    title: "Visualization & Research",
    icon: ScanLine,
    description:
      "Interactive inspection with scientific context and provenance.",
    tools: [
      "Attention maps",
      "Hidden states",
      "Residual streams",
      "Embeddings",
      "Logit Lens",
      "QGIS",
      "Remote sensing",
    ],
    context: "Retained model traces and geospatial exploration in MotionCB.",
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="portfolio-section skills-section">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Technical toolkit"
            title="Tools with a purpose."
            description="The technologies and methods behind the work — grouped by how I use them."
            action={
              <a className="text-link" href="#projects">
                See them in practice <span aria-hidden="true">↗</span>
              </a>
            }
          />
        </Reveal>
        <div className="skills-grid">
          {SKILL_GROUPS.map(
            ({ title, icon: Icon, description, tools, context }, index) => (
              <Reveal
                className="skills-reveal"
                key={title}
                delay={index * 0.04}
              >
                <article className="skills-card">
                  <div className="skills-card-heading">
                    <span className="profile-icon">
                      <Icon size={22} aria-hidden="true" />
                    </span>
                    <h3>{title}</h3>
                  </div>
                  <p className="skills-description">{description}</p>
                  <ul
                    className="profile-tools"
                    aria-label={`${title} tools and methods`}
                  >
                    {tools.map(tool => (
                      <li key={tool}>{tool}</li>
                    ))}
                  </ul>
                  <p className="skills-context">{context}</p>
                </article>
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}
