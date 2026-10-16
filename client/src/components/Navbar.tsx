import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

import { HOME_SECTIONS as NAV_ITEMS } from "@/data/sections";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";

export default function Navbar() {
  const { scrolled, activeSection } = useSectionNavigation();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const pointerdown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node))
        setMenuOpen(false);
    };
    const media = window.matchMedia("(min-width: 1024px)");
    const closeAtDesktop = () => {
      if (media.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", keydown);
    document.addEventListener("pointerdown", pointerdown);
    media.addEventListener("change", closeAtDesktop);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("pointerdown", pointerdown);
      media.removeEventListener("change", closeAtDesktop);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`site-header${scrolled || menuOpen ? " is-scrolled" : ""}`}
    >
      <nav className="container navbar" aria-label="Main navigation">
        <a
          href="/#home"
          className="brand"
          aria-label="Vanga Likhith Reddy, home"
        >
          VLR<span>.dev</span>
        </a>
        <ul className="desktop-nav">
          {NAV_ITEMS.map(({ label, id }) => (
            <li key={id}>
              <a
                href={`/#${id}`}
                aria-current={activeSection === id ? "location" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <ThemeToggle />
          <a href="/#contact" className="button-primary nav-contact">
            Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            className="icon-button menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation container"
          aria-label="Mobile navigation"
        >
          <ul>
            {NAV_ITEMS.map(({ label, id }) => (
              <li key={id}>
                <a
                  href={`/#${id}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeSection === id ? "location" : undefined}
                >
                  {label}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <a className="text-link" href="mailto:reddylikhith10@gmail.com">
            reddylikhith10@gmail.com
          </a>
        </nav>
      )}
    </header>
  );
}
