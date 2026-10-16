import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <a className="brand" href="/#home">
            VLR<span>.dev</span>
          </a>
          <p>© {new Date().getFullYear()} Vanga Likhith Reddy</p>
        </div>
        <nav aria-label="Social profiles" className="footer-socials">
          <a
            href="https://github.com/VLReddy1105"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <Github size={19} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/likhithreddyvanga/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <Linkedin size={19} aria-hidden="true" />
          </a>
          <a href="mailto:reddylikhith10@gmail.com" aria-label="Send an email">
            <Mail size={19} aria-hidden="true" />
          </a>
        </nav>
        <a
          href="#main-content"
          className="button-secondary"
          onClick={event => {
            event.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "auto"
                : "smooth",
            });
            document
              .querySelector<HTMLElement>("h1")
              ?.focus({ preventScroll: true });
          }}
        >
          Back to top <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
