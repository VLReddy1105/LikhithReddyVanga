/* Neural Monochrome — Contact Section
   Minimal contact form, social links, location info */

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { toast } from "sonner";

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
);

const SOCIALS = [
  {
    label: "LinkedIn",
    handle: "Likhith Reddy Vanga",
    href: "https://www.linkedin.com/in/likhith-reddy-vanga",
    icon: <LinkedInIcon />,
  },
  {
    label: "GitHub",
    handle: "VLReddy1105",
    href: "https://github.com/VLReddy1105",
    icon: <GitHubIcon />,
  },
  {
    label: "Email",
    handle: "reddylikhith10@gmail.com",
    href: "mailto:reddylikhith10@gmail.com",
    icon: <MailIcon />,
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

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      const error = "Please fill in your name, email, and message.";
      setStatusType("error");
      setStatusMessage(error);
      toast.error(error);
      return;
    }

    setSending(true);
    setStatusMessage("");
    setStatusType("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setForm({ name: "", email: "", subject: "", message: "" });
      setStatusType("success");
      setStatusMessage(result.message || "Thanks, your message was sent.");
      toast.success("Thanks, your message was sent.", {
        style: { background: "#111", border: "1px solid var(--border)", color: "var(--text-primary)" },
      });
    } catch (error) {
      const messageText = error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setStatusType("error");
      setStatusMessage(messageText);
      toast.error(messageText);
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "2px",
    padding: "0.75rem 1rem",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.88rem",
    color: "var(--text-primary)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
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
              Contact
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <AnimatedSection delay={0.1}>
            <div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  marginBottom: "1rem",
                  lineHeight: 1.2,
                }}
              >
                Let's build
                <br />
                <span style={{ color: "var(--navy)" }}>Smart</span> together.
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.95rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.8,
                  marginBottom: "2.5rem",
                  maxWidth: "380px",
                }}
              >
                Open to research collaborations, AI/ML roles, Internships, and Interesting projects.
              </p>

              {/* Location info */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "2.5rem",
                  padding: "0.75rem 1rem",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  background: "var(--surface)",
                  width: "fit-content",
                }}
              >
                <span
                  style={{
                    color: "var(--navy)",
                    fontSize: "0.8rem",
                    animation: "statusPulse 1.6s ease-in-out infinite",
                  }}
                >
                  ◉
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    letterSpacing: "0.06em",
                  }}
                >
                  Actively Building
                </span>
              </div>

              {/* Social links */}
              <div className="space-y-3">
                {SOCIALS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "0.85rem 1rem",
                      border: "1px solid var(--border)",
                      borderRadius: "2px",
                      background: "var(--surface)",
                      textDecoration: "none",
                      transition: "all 0.2s",
                      color: "var(--text-muted)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(59,130,246,0.3)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--navy)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-muted)";
                    }}
                  >
                    <span style={{ flexShrink: 0 }}>{social.icon}</span>
                    <div>
                      <div
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          color: "inherit",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {social.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.68rem",
                          color: "var(--text-dim)",
                          marginTop: "1px",
                        }}
                      >
                        {social.handle}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Form */}
          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--navy)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Opportunity, collaboration, or project"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--navy)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--navy)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    color: "var(--text-dim)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Message
                </label>
                <textarea
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={6}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "140px",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--navy)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                style={{
                  width: "100%",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "var(--background)",
                  background: sending ? "#8aaa00" : "var(--navy)",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "2px",
                  border: "none",
                  cursor: sending ? "not-allowed" : "pointer",
                  letterSpacing: "0.02em",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!sending) (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                }}
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
              {statusMessage && (
                <p
                  role={statusType === "error" ? "alert" : "status"}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: statusType === "success" ? "var(--navy)" : "#ef4444",
                    lineHeight: 1.6,
                    marginTop: "0.75rem",
                  }}
                >
                  {statusMessage}
                </p>
              )}
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
