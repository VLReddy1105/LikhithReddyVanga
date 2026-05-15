/* Neural Monochrome — Navbar
   Sticky top nav, minimal, navy accent on active, Hire Me CTA, Theme Toggle */

import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(var(--bg-rgb), 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
      }}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2 group"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.85rem",
                color: "var(--navy)",
                letterSpacing: "0.05em",
                fontWeight: 700,
              }}
            >
              VLR
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                letterSpacing: "-0.01em",
              }}
            >
              .dev
            </span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="transition-colors duration-200"
                    style={{
                      background: "none",
                      border: "none",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: isActive ? 500 : 400,
                      color: isActive ? "var(--navy)" : "var(--text-muted)",
                      letterSpacing: "0.01em",
                      padding: "4px 0",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "-2px",
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: "var(--navy)",
                        }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Right side: Theme Toggle + Hire Me + Mobile Menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="mailto:reddylikhith10@gmail.com"
              className="hidden md:inline-flex items-center gap-2 transition-all duration-200 hover:opacity-80"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "white",
                background: "var(--navy)",
                padding: "0.45rem 1.1rem",
                borderRadius: "2px",
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              Hire Me
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-label="Toggle menu"
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: menuOpen ? "var(--navy)" : "var(--text-primary)",
                  transition: "all 0.2s",
                  transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: menuOpen ? "var(--navy)" : "var(--text-primary)",
                  transition: "all 0.2s",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "1px",
                  background: menuOpen ? "var(--navy)" : "var(--text-primary)",
                  transition: "all 0.2s",
                  transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
                }}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--card)",
            borderTop: "1px solid var(--border)",
            padding: "1.5rem",
          }}
        >
          <ul className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    style={{
                      background: "none",
                      border: "none",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "1rem",
                      color: isActive ? "var(--navy)" : "var(--text-primary)",
                      padding: "4px 0",
                      width: "100%",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
            <li>
              <a
                href="mailto:reddylikhith10@gmail.com"
                style={{
                  display: "inline-block",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "white",
                  background: "var(--navy)",
                  padding: "0.5rem 1.2rem",
                  borderRadius: "2px",
                  textDecoration: "none",
                  marginTop: "0.5rem",
                }}
              >
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
