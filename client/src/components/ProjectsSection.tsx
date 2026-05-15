/* Neural Monochrome — Projects Section
   Bento-grid layout, varying card sizes, lime accent on hover */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PROJECTS = [
  {
    title: "LLM Interpretability & Visualization System",
    category: "Research Tool",
    period: "03/2026 – Present",
    description:
      "Full-stack system for analyzing transformer behavior from input prompt to next-token generation. Interactive visualizations of hidden states, attention heads, residual streams, and activation landscapes using PCA, UMAP, and t-SNE.",
    tags: ["PyTorch", "TransformerLens", "Streamlit", "Plotly", "UMAP", "Qwen2.5", "LLaMA"],
    highlight: true,
    github: "https://github.com/VLReddy1105",
    status: "Active",
  },
  {
    title: "MotionCB — Solar Farm Detection",
    category: "Deep Learning / Remote Sensing",
    period: "07/2025 – Present",
    description:
      "Segmentation models on Sentinel-2 satellite imagery with multi-band feature engineering (RGB, NWIR, NDVI, derived spectral indices) to detect photovoltaic infrastructure across Germany.",
    tags: ["Sentinel-2", "QGIS", "Deep Learning", "NDVI", "Segmentation"],
    highlight: false,
    github: "https://github.com/VLReddy1105",
    status: "Active",
  },
  {
    title: "Genetic Disease Risk Analysis",
    category: "ML / Bioinformatics",
    period: "10/2024 – 03/2025",
    description:
      "End-to-end ML pipeline analyzing genetic disease risk in the Indian population by integrating IndiGenomes variant data with GWAS Catalog SNP records. SHAP-based explainability for clinical transparency.",
    tags: ["XGBoost", "Random Forest", "SHAP", "Scikit-learn", "Genomics", "Python"],
    highlight: false,
    github: "https://github.com/VLReddy1105",
    status: "Completed",
  },
  {
    title: "RAG Chatbot for Business Automation",
    category: "Full-Stack / LLM",
    period: "12/2023 – 03/2024",
    description:
      "RAG-based chatbot workflows for understanding user queries, retrieving FAQ/business data, capturing lead details, and generating structured real-time responses. Integrated with Next.js and FastAPI backend.",
    tags: ["RAG", "Next.js", "FastAPI", "PostgreSQL", "LLM", "REST APIs"],
    highlight: false,
    github: "https://github.com/VLReddy1105",
    status: "Completed",
  },
];

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{ background: "var(--background)", padding: "7rem 0", borderTop: "1px solid var(--border)" }}
    >
      <div className="container">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-14">
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              Projects
            </h2>
          </div>
        </AnimatedSection>

        {/* Bento grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1px",
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          {PROJECTS.map((project, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div
                style={{
                  background: project.highlight ? "var(--surface)" : "var(--background)",
                  padding: "2rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "background 0.25s",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const currentBg = project.highlight ? "var(--surface)" : "var(--background)";
                  (e.currentTarget as HTMLDivElement).style.background = currentBg;
                  (e.currentTarget as HTMLDivElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = project.highlight ? "var(--surface)" : "var(--background)";
                  (e.currentTarget as HTMLDivElement).style.opacity = "1";
                }}
              >
                {/* Category + Status */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      color: "var(--navy)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      color: project.status === "Active" ? "var(--navy)" : "var(--text-dim)",
                      letterSpacing: "0.08em",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: project.status === "Active" ? "var(--navy)" : "var(--text-dim)",
                        display: "inline-block",
                      }}
                    />
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--navy)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.3,
                    marginBottom: "0.75rem",
                  }}
                >
                  {project.title}
                </h3>

                {/* Period */}
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "var(--text-dim)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {project.period}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    flexGrow: 1,
                    marginBottom: "1.25rem",
                  }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 transition-colors"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.7rem",
                      color: "var(--text-dim)",
                      textDecoration: "none",
                      letterSpacing: "0.05em",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--navy)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
                  >
                    <GitHubIcon />
                    View Code
                  </a>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* GitHub CTA */}
        <AnimatedSection delay={0.4}>
          <div className="flex justify-center mt-10">
            <a
              href="https://github.com/VLReddy1105"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.82rem",
                fontWeight: 500,
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
                padding: "0.6rem 1.4rem",
                borderRadius: "2px",
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--navy)";
                e.currentTarget.style.borderColor = "var(--navy)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <GitHubIcon />
              View all on GitHub
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
