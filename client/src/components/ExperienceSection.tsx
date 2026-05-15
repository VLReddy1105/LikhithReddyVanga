/* Neural Monochrome — Experience Section
   Vertical timeline with role cards, tech tags, period badges */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EXPERIENCES = [
  {
    role: "Research Assistant",
    subtitle: "LLM Interpretability & Visualization",
    company: "BTU Cottbus-Senftenberg",
    location: "Cottbus, Germany",
    period: "03/2026 – Present",
    current: true,
    bullets: [
      "Architected a full-stack LLM visualization system for analyzing transformer behavior from input prompt to next-token generation.",
      "Built scalable activation-extraction workflows for hidden states, attention heads, residual streams, MLP outputs, logits, and token embeddings using PyTorch, Hugging Face, and TransformerLens.",
      "Integrated open-source LLMs including Qwen2.5, TinyLlama, Pythia, Gemma, and GGUF-based models via llama.cpp for local-first AI experimentation.",
      "Developed interactive visualizations with Streamlit, Plotly, PCA, UMAP, t-SNE, and 3D activation mapping — transforming activations into interpretable token clouds and attention matrices.",
    ],
    tags: ["PyTorch", "Hugging Face", "TransformerLens", "Streamlit", "UMAP", "t-SNE", "LLM"],
  },
  {
    role: "Full Stack Developer Intern",
    subtitle: "AI-Enabled Web Applications",
    company: "Dhalav's Designers",
    location: "Hyderabad, India",
    period: "12/2023 – 03/2024",
    current: false,
    bullets: [
      "Built AI-enabled client web applications connecting Next.js interfaces with backend APIs, authentication, database models, and AI service integrations.",
      "Developed RAG-based chatbot workflows to understand user queries, retrieve FAQ/business data, capture lead details, and generate structured real-time responses.",
      "Integrated AI endpoints and third-party APIs with secure authentication, JSON request/response handling, and frontend-backend synchronization.",
      "Implemented database-backed modules for managing leads, chatbot conversations, FAQs, and automation logs.",
    ],
    tags: ["Next.js", "RAG", "FastAPI", "PostgreSQL", "LLM", "REST APIs"],
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

export default function ExperienceSection() {
  return (
    <section
      id="experience"
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
              Experience
            </h2>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "0",
              top: "0",
              bottom: "0",
              width: "1px",
              background: "linear-gradient(to bottom, var(--navy), var(--border))",
            }}
          />

          <div className="space-y-12 pl-8">
            {EXPERIENCES.map((exp, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                {/* Timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-4px",
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: exp.current ? "var(--navy)" : "#2a2a2a",
                    border: exp.current ? "none" : "1px solid var(--text-dim)",
                    marginTop: "6px",
                    boxShadow: exp.current ? "0 0 12px rgba(59,130,246,0.5)" : "none",
                  }}
                />

                <div
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    padding: "1.75rem",
                    transition: "border-color 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                  }}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3
                          style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.6rem",
                              color: "var(--background)",
                              background: "var(--navy)",
                              padding: "2px 6px",
                              borderRadius: "2px",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                            }}
                          >
                            Current
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.82rem",
                          color: "var(--navy)",
                          marginTop: "2px",
                        }}
                      >
                        {exp.subtitle}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.7rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {exp.period}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.78rem",
                          color: "var(--text-dim)",
                          marginTop: "2px",
                        }}
                      >
                        {exp.company} · {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ height: "1px", background: "var(--border)", margin: "1rem 0" }} />

                  {/* Bullets */}
                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((b, j) => (
                      <li
                        key={j}
                        style={{
                          display: "flex",
                          gap: "10px",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.87rem",
                          color: "#7a7a7a",
                          lineHeight: 1.65,
                        }}
                      >
                        <span style={{ color: "var(--navy)", flexShrink: 0, marginTop: "2px" }}>›</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
