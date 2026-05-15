/* Neural Monochrome — Hero Section
   Asymmetric layout, typewriter role animation, social icons, CTA */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "AI Researcher",
  "LLM Engineer",
  "Full-Stack Developer",
  "ML Practitioner",
  "Deep Learning Enthusiast",
];

// Social icons as inline SVGs
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const role = ROLES[roleIndex];
    if (!isDeleting) {
      if (charIdx < role.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedRole(role.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, 60);
      } else {
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (charIdx > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedRole(role.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex((r) => (r + 1) % ROLES.length);
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [roleIndex, charIdx, isDeleting]);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "var(--background)",
      }}
    >
      {/* Hero background image - hidden in light mode, visible in dark mode */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663641032676/c5uUzgTZkZie2ES2g2A53m/hero-bg-FBgb9nziBUZydbKXBhRiAA.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          opacity: "var(--bg-image-opacity, 0.35)",
        }}
      />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid" style={{ opacity: 0.3 }} />

      {/* Left edge accent line */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, var(--navy), transparent)" }}
      />

      <div className="container relative z-10">
        <div className="hero-layout pt-24 pb-16">
          <div className="hero-copy">
          {/* Location badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 mb-8"
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "var(--navy)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              ◉ Cottbus, Germany
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: "var(--text-dim)",
                letterSpacing: "0.08em",
              }}
            >
              · Available for opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "0.5rem",
            }}
          >
            Vanga
            <br />
            <span style={{ color: "var(--navy)" }}>Likhith</span> Reddy
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-2 mb-6"
            style={{ height: "2rem" }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.1rem",
                color: "var(--text-muted)",
                fontWeight: 400,
              }}
            >
              {displayedRole}
              <span className="typewriter-cursor" />
            </span>
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "var(--text-muted)",
              lineHeight: 1.75,
              maxWidth: "520px",
              marginBottom: "2.5rem",
            }}
          >
            Master's student in AI at BTU Cottbus. Building interpretable LLMs,
            deep learning pipelines, and full-stack AI systems. Passionate about
            ethical, scalable intelligence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <a
              href="mailto:reddylikhith10@gmail.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "white",
                background: "var(--navy)",
                padding: "0.65rem 1.5rem",
                borderRadius: "2px",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Hire Me
            </a>
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "var(--text-primary)",
                background: "transparent",
                padding: "0.65rem 1.5rem",
                borderRadius: "2px",
                border: "1px solid var(--border)",
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--navy)";
                e.currentTarget.style.color = "var(--navy)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              View Projects
            </button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex items-center gap-5"
          >
            <a
              href="https://www.linkedin.com/in/likhith-reddy-vanga"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              style={{ color: "var(--text-dim)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--navy)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/VLReddy1105"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              style={{ color: "var(--text-dim)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--navy)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
            >
              <GitHubIcon />
            </a>
            <a
              href="mailto:reddylikhith10@gmail.com"
              title="Email"
              style={{ color: "var(--text-dim)", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--navy)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
            >
              <MailIcon />
            </a>

            <span style={{ width: "1px", height: "20px", background: "var(--border)", display: "inline-block" }} />

            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                color: "var(--text-dim)",
                letterSpacing: "0.08em",
              }}
            >
              reddylikhith10@gmail.com
            </span>
          </motion.div>
          </div>

          <motion.aside
            className="hero-portrait-wrap"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            aria-label="Profile photo of Vanga Likhith Reddy"
          >
            <div className="hero-portrait-card">
              <div className="hero-portrait-frame">
                <img
                  src="/images/profile-vlr.jpg"
                  alt="Vanga Likhith Reddy"
                  className="hero-portrait-image"
                />
              </div>
              <div className="hero-portrait-badge">
                <span className="hero-portrait-badge-dot" />
                AI/ML Builder
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ background: "none", border: "none", color: "var(--text-dim)", cursor: "pointer" }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDownIcon />
        </motion.div>
      </button>
    </section>
  );
}
