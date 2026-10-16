import type { ReactNode } from "react";

export default function SectionHeading({
  title,
  action,
}: {
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-intro">
      <div>
        <h2>{title}</h2>
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  );
}
