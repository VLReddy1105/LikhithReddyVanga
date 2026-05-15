/* Neural Monochrome — About Section
   Two-column: left text, right AI brain visual
   Stats row, education timeline, language badges */

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { value: "4+", label: "Years in AI" },
  { value: "2", label: "Degrees in AI" },
  { value: "5+", label: "Projects Built" },
  { value: "3", label: "Research Areas" },
];

const EDUCATION = [
  {
    degree: "M.Sc. Artificial Intelligence",
    school: "BTU Cottbus-Senftenberg",
    location: "Cottbus, Germany",
    period: "2024 – Present",
  },
  {
    degree: "B.Tech CSE — Artificial Intelligence",
    school: "Parul University",
    location: "Gujarat, India",
    period: "2020 – 2024",
  },
];

const LANGUAGES = [
  { lang: "English", level: "Fluent" },
  { lang: "German", level: "Basic" },
  { lang: "Hindi", level: "Fluent" },
  { lang: "Telugu", level: "Native" },
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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

export default function AboutSection() {
  return (
    <section id="about" style={{ background: "var(--background)", padding: "7rem 0" }}>
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
              About
            </h2>
          </div>
        </AnimatedSection>

        {/* Text content - wider single column */}
        <div className="max-w-4xl">
          {/* Left: Text content */}
          <div>
            <AnimatedSection delay={0.1}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.05rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.85,
                  marginBottom: "1.5rem",
                }}
              >
                I'm an AI enthusiast and Master's student at{" "}
                <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
                  BTU Cottbus-Senftenberg
                </span>
                , Germany. My entire academic journey — from Bachelor's to Master's — has been
                rooted in Artificial Intelligence, giving me a deep, end-to-end understanding
                of the field.
              </p>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.05rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.85,
                  marginBottom: "2.5rem",
                }}
              >
                Currently working as a{" "}
                <span style={{ color: "var(--navy)", fontWeight: 500 }}>
                  Research Assistant
                </span>{" "}
                on LLM interpretability and visualization, I build systems that make transformer
                models understandable. I'm motivated by ethical, scalable AI across agriculture,
                healthcare, and data-driven automation.
              </p>
            </AnimatedSection>

            {/* Stats */}
            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      padding: "1.25rem 1rem",
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      background: "var(--surface)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        color: "var(--navy)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.72rem",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Education */}
            <AnimatedSection delay={0.3}>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.75rem",
                  color: "var(--text-dim)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Education
              </h3>
              <div className="space-y-4">
                {EDUCATION.map((edu, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: "1rem",
                      paddingBottom: "1rem",
                      borderBottom: i < EDUCATION.length - 1 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--navy)",
                        marginTop: "6px",
                        flexShrink: 0,
                      }}
                    />
                    <div>
                      <div
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          marginBottom: "2px",
                        }}
                      >
                        {edu.degree}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.82rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {edu.school} · {edu.location}
                      </div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.7rem",
                          color: "var(--text-dim)",
                          marginTop: "2px",
                        }}
                      >
                        {edu.period}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Languages */}
            <AnimatedSection delay={0.4}>
              <div className="flex flex-wrap gap-2 mt-6">
                {LANGUAGES.map((l) => (
                  <div
                    key={l.lang}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.7rem",
                      padding: "0.3rem 0.75rem",
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      color: "var(--text-muted)",
                      background: "var(--surface)",
                    }}
                  >
                    {l.lang}{" "}
                    <span style={{ color: "var(--text-dim)" }}>· {l.level}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
