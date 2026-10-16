import {
  ArrowUpRight,
  BriefcaseBusiness,
  FlaskConical,
  Layers3,
} from "lucide-react";

const paths = [
  {
    label: "Hiring & opportunities",
    detail: "Experience + technical expertise",
    href: "#experience",
    icon: BriefcaseBusiness,
  },
  {
    label: "Research & collaboration",
    detail: "Methods + interpretability work",
    href: "#research",
    icon: FlaskConical,
  },
  {
    label: "Projects & engineering",
    detail: "Systems + technical case studies",
    href: "#projects",
    icon: Layers3,
  },
];

export default function VisitorPaths() {
  return (
    <nav className="visitor-paths" aria-label="Explore by interest">
      <div className="container visitor-paths-grid">
        {paths.map(({ label, detail, href, icon: Icon }) => (
          <a key={href} href={href}>
            <Icon size={21} aria-hidden="true" />
            <div>
              <strong>{label}</strong>
              <span>{detail}</span>
            </div>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        ))}
      </div>
    </nav>
  );
}
