export const linkedinProfile = {
  url: "https://www.linkedin.com/in/likhithreddyvanga/",
  name: "Likhith Reddy Vanga",
  // Professional context is confirmed portfolio content. Set headline only from a verified LinkedIn source.
  headline: null as string | null,
  context:
    "AI Researcher · M.Sc. AI at BTU Cottbus-Senftenberg · Founder of VLR Technologies",
};
export interface LinkedInPost {
  url: string;
  title: string;
  excerpt: string;
  publishedAt?: string;
  image?: { src: string; alt: string };
  tag: string;
}
/** Manually curated public posts. Never an automatically updating LinkedIn feed. */
export const linkedinPosts: LinkedInPost[] = [
  {
    url: "https://www.linkedin.com/posts/likhithreddyvanga_clawbio-nebius-hackathon-activity-7495802058248380416-DWAN",
    title: "Agentic AI for genomics: third place in Berlin",
    excerpt:
      "A team-built cancer-target evaluation workflow using ClawBio, TCGA and survival analysis, with a Next.js dashboard for inspecting evidence and counter-signals.",
    publishedAt: "2026-08-19T11:21:15.884Z",
    image: {
      src: "https://media.licdn.com/dms/image/v2/D4E22AQEECqyrJlBoew/feedshare-shrink_800/B4EaAZq2l9JMAc-/0/1787137059532?e=2147483647&v=beta&t=xly6Q1FbkJhO0jM4AnkzQGnQR1XdvTTt4M3SoOGyQAQ",
      alt: "Photo shared with the ClawBio and Nebius genomics hackathon post",
    },
    tag: "AI × genomics · original post",
  },
  {
    url: "https://www.linkedin.com/posts/likhithreddyvanga_activity-7460262481165295616-ih28",
    title: "Berlin Battery Hackathon: building for the energy transition",
    excerpt:
      "Shared an event recap from European Energy Collective on battery research, grid flexibility and collaboration across the energy ecosystem.",
    publishedAt: "2026-05-13T09:39:40.475Z",
    image: {
      src: "https://media.licdn.com/dms/image/v2/D4D22AQGtk_FP2ljDcA/feedshare-shrink_800/B4DZ4BeTzjJkAc-/0/1778141183829?e=2147483647&v=beta&t=8MBYJ279iz7ilUzXTwxnHQzStuSWhsta_VZmtUEI9sc",
      alt: "Photo from the European Energy Collective Berlin Battery Hackathon recap",
    },
    tag: "Energy × engineering · repost",
  },
];
export const selectedRepositoryNames = [
  "nebius-survivor",
  "LLM-Interpretability",
  "nextgen",
];
export const repositoryContext: Record<string, string> = {
  "nebius-survivor":
    "Genomics hackathon work · ClawBio-based cancer-target evaluation and survival analysis.",
  "LLM-Interpretability":
    "Traceform · an interpretability workbench with a labelled mock trace and a Qwen model adapter.",
  nextgen: "GenZnect · role-aware student spaces, events and opportunities.",
};
