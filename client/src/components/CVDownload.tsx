import { Download } from "lucide-react";
import { approvedCV } from "@/data/profile";

export default function CVDownload() {
  if (!approvedCV) return null;
  return (
    <a
      className="button-secondary"
      href={approvedCV.path}
      download={approvedCV.filename}
    >
      Download CV <Download size={16} aria-hidden="true" />
    </a>
  );
}
