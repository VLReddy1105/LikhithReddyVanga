/* Neural Monochrome — Skills Section
   Categorized tech stack with animated progress-style bars */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SKILL_CATEGORIES = [
  {
    category: "Programming",
    icon: "{ }",
    skills: ["Python", "JavaScript", "React.js", "HTML", "CSS"],
  },
  {
    category: "ML / Deep Learning",
    icon: "∿",
    skills: ["PyTorch", "Scikit-learn", "XGBoost", "Hugging Face", "SHAP", "Logistic Regression"],
  },
  {
    category: "LLM & GenAI",
    icon: "◈",
    skills: ["RAG", "llama.cpp", "Qwen2.5", "LLaMA", "Gemma", "Ollama", "GGUF Models", "MCP Servers"],
  },
  {
    category: "Data Engineering",
    icon: "⊞",
    skills: ["Pandas", "NumPy", "Matplotlib", "Plotly", "PCA", "UMAP", "t-SNE"],
  },
  {
    category: "Geospatial",
    icon: "◎",
    skills: ["QGIS", "Sentinel-2", "PyDeck", "Remote Sensing", "NDVI"],
  },
  {
    category: "Backend & APIs",
    icon: "⟶",
    skills: ["FastAPI", "REST APIs", "Model Serving", "API Deployment"],
  },
  {
    category: "Databases",
    icon: "▣",
    skills: ["MySQL", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Tools",
    icon: "⚙",
    skills: ["GitHub", "Docker", "Google Colab", "VS Code", "Streamlit"],
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

export default function SkillsSection() {
  return (
    <section
      id="skills"
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
              Skills
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--border)", border: "1px solid var(--border)", borderRadius: "4px", overflow: "hidden" }}>
          {SKILL_CATEGORIES.map((cat, i) => (
            <AnimatedSection key={i} delay={i * 0.06}>
              <div
                style={{
                  background: "var(--background)",
                  padding: "1.5rem",
                  height: "100%",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "var(--surface)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "var(--background)";
                }}
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.9rem",
                      color: "var(--navy)",
                    }}
                  >
                    {cat.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                    }}
                  >
                    {cat.category}
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.68rem",
                        padding: "0.22rem 0.55rem",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                        color: "var(--text-muted)",
                        background: "transparent",
                        letterSpacing: "0.03em",
                        transition: "all 0.2s",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLSpanElement).style.borderColor = "var(--navy)";
                        (e.currentTarget as HTMLSpanElement).style.color = "var(--navy)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLSpanElement).style.borderColor = "var(--border)";
                        (e.currentTarget as HTMLSpanElement).style.color = "var(--text-muted)";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
