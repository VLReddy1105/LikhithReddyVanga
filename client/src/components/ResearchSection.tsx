/* Neural Monochrome — Research Section
   Research areas, current work, academic interests */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const RESEARCH_AREAS = [
  {
    title: "LLM Interpretability",
    description:
      "Understanding the internal mechanics of large language models — how attention heads, residual streams, and MLP layers contribute to next-token prediction. Building visual analytics tools that bridge AI interpretability and human-computer interaction.",
    icon: "🧠",
    tags: ["TransformerLens", "Mechanistic Interpretability", "Attention Analysis", "Activation Patching"],
    status: "Active Research",
  },
  {
    title: "Remote Sensing & Deep Learning",
    description:
      "Applying deep learning segmentation models to satellite imagery (Sentinel-2) for detecting photovoltaic infrastructure. Multi-band feature engineering with RGB, NWIR, NDVI, and derived spectral indices.",
    icon: "🛰️",
    tags: ["Sentinel-2", "Semantic Segmentation", "NDVI", "Energy Infrastructure"],
    status: "Active Research",
  },
  {
    title: "Computational Genomics",
    description:
      "Machine learning approaches to genetic disease risk analysis. Integrating population genomics data with GWAS catalog records, with SHAP-based explainability for clinical transparency and ethical AI considerations.",
    icon: "🧬",
    tags: ["Genomics", "GWAS", "XGBoost", "SHAP", "Bioinformatics"],
    status: "Completed",
  },
  {
    title: "Generative AI & RAG Systems",
    description:
      "Building retrieval-augmented generation pipelines for real-world business automation. Integrating open-source LLMs (Qwen2.5, LLaMA, Gemma) with structured data retrieval for domain-specific applications.",
    icon: "⚡",
    tags: ["RAG", "LLaMA", "Qwen2.5", "Ollama", "MCP Servers"],
    status: "Ongoing",
  },
];

const AWARDS = [
  {
    title: "FSR AI Volunteer, BTU",
    year: "2024",
    description: "Core member volunteering at AI hackathons at Brandenburg Technical University.",
  },
  {
    title: "Projections 2022 — Core Organizer",
    year: "2022",
    description: "Volunteered to organize Gujarat's largest technical event as a core member.",
  },
  {
    title: "Hackathon Winner — Fraud Detection",
    year: "2021",
    description: "Won fraud detection ML challenge at Gujarat's largest tech fest as Hackathon Leader.",
  },
  {
    title: "National Cyber Olympiad Champion",
    year: "—",
    description: "Gold Medal with Zonal Rank 1st in National Cyber Olympiad.",
  },
];

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

export default function ResearchSection() {
  return (
    <section
      id="research"
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
              Research
            </h2>
          </div>
        </AnimatedSection>

        {/* Research areas grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {RESEARCH_AREAS.map((area, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  padding: "1.75rem",
                  height: "100%",
                  transition: "border-color 0.25s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                }}
              >
                {/* Icon + Status */}
                <div className="flex items-start justify-between mb-3">
                  <span style={{ fontSize: "1.5rem" }}>{area.icon}</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.6rem",
                      color: area.status === "Active Research" ? "var(--navy)" : "var(--text-dim)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
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
                        background: area.status === "Active Research" ? "var(--navy)" : "var(--text-dim)",
                        display: "inline-block",
                      }}
                    />
                    {area.status}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {area.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    marginBottom: "1.25rem",
                  }}
                >
                  {area.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {area.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Awards & Recognition */}
        <AnimatedSection delay={0.1}>
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.75rem",
              color: "var(--text-dim)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Awards & Recognition
          </h3>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {AWARDS.map((award, i) => (
            <AnimatedSection key={i} delay={0.1 + i * 0.08}>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  padding: "1.25rem",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  background: "var(--background)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "var(--navy)",
                    minWidth: "40px",
                    paddingTop: "2px",
                  }}
                >
                  {award.year}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "4px",
                    }}
                  >
                    {award.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.78rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {award.description}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
