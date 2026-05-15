/* Neural Monochrome — Blogs Section
   Blog cards with category, read time, coming soon state */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { toast } from "sonner";

const BLOGS = [
  {
    title: "Understanding LLM Internals: A Visual Guide to Transformer Activations",
    category: "LLM Interpretability",
    excerpt:
      "Exploring how hidden states, attention heads, and residual streams encode information — and how to visualize them interactively using PCA, UMAP, and t-SNE.",
    readTime: "8 min read",
    date: "Coming Soon",
    tags: ["LLM", "Interpretability", "Visualization"],
    available: false,
  },
  {
    title: "From SNPs to Risk Scores: ML in Computational Genomics",
    category: "Bioinformatics",
    excerpt:
      "How machine learning can analyze genetic variants from population genomics data to predict disease risk — with ethical considerations for clinical deployment.",
    readTime: "6 min read",
    date: "Coming Soon",
    tags: ["Genomics", "ML", "Ethics"],
    available: false,
  },
  {
    title: "Building RAG Pipelines with Open-Source LLMs",
    category: "GenAI Engineering",
    excerpt:
      "A practical walkthrough of building retrieval-augmented generation systems using LLaMA, Qwen2.5, and Ollama for real-world business automation.",
    readTime: "10 min read",
    date: "Coming Soon",
    tags: ["RAG", "LLaMA", "Engineering"],
    available: false,
  },
  {
    title: "Satellite Imagery + Deep Learning: Detecting Solar Farms at Scale",
    category: "Remote Sensing",
    excerpt:
      "How segmentation models trained on Sentinel-2 multi-band imagery can identify photovoltaic infrastructure across entire countries.",
    readTime: "7 min read",
    date: "Coming Soon",
    tags: ["Remote Sensing", "Deep Learning", "Segmentation"],
    available: false,
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

export default function BlogsSection() {
  return (
    <section
      id="blogs"
      style={{ background: "var(--background)", padding: "7rem 0", borderTop: "1px solid var(--border)" }}
    >
      <div className="container">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center justify-between mb-14 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                Blogs
              </h2>
            </div>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "var(--text-dim)",
                letterSpacing: "0.08em",
                border: "1px solid var(--border)",
                padding: "4px 10px",
                borderRadius: "2px",
              }}
            >
              Writing in progress...
            </span>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOGS.map((blog, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  padding: "1.75rem",
                  cursor: "pointer",
                  transition: "border-color 0.25s, background 0.25s",
                  opacity: blog.available ? 1 : 0.7,
                }}
                onClick={() => {
                  if (!blog.available) {
                    toast("Blog coming soon!", {
                      description: "This article is being written. Check back soon.",
                      style: { background: "var(--popover)", border: "1px solid var(--border)", color: "var(--text-primary)" },
                    });
                  }
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(59,130,246,0.2)";
                  (e.currentTarget as HTMLDivElement).style.background = "var(--surface-2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLDivElement).style.background = "var(--surface)";
                }}
              >
                {/* Category + Date */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.62rem",
                      color: "var(--navy)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {blog.category}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.62rem",
                      color: "var(--text-dim)",
                    }}
                  >
                    {blog.date}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.98rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.4,
                    marginBottom: "0.75rem",
                  }}
                >
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.84rem",
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    marginBottom: "1.25rem",
                  }}
                >
                  {blog.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {blog.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.62rem",
                      color: "var(--text-dim)",
                      whiteSpace: "nowrap",
                      marginLeft: "1rem",
                    }}
                  >
                    {blog.readTime}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
