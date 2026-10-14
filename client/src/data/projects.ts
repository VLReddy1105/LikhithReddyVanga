export type ProjectVisualKind =
  | "transformer"
  | "voice"
  | "community"
  | "radar"
  | "satellite"
  | "genetics";

export interface ProjectLink {
  label: string;
  href: string;
  kind: "github" | "live";
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  role: string;
  status: string;
  technologies: string[];
  visual: ProjectVisualKind;
  visualLabel: string;
  links: ProjectLink[];
  linkNote?: string;
  architecture: { title: string; description: string }[];
  caseStudy: {
    problem: string;
    approach: string;
    contribution: string;
    challenges: string[];
    outcome: string;
  };
  evidenceImage?: { src: string; alt: string; caption: string };
}

// Content is grounded in source and documentation. See docs/project-evidence.md
// for verification, deployment limits and the remaining ownership confirmations.
export const projects: Project[] = [
  {
    slug: "llm-interpretability",
    title: "LLM Interpretability & Visualization System",
    shortTitle: "Inside the transformer.",
    category: "AI research · Visualization",
    summary:
      "Follow a real model from tokens and attention to residual states and next-token candidates.",
    role: "Research & full-stack engineering",
    status: "Research prototype",
    technologies: [
      "PyTorch",
      "Hugging Face",
      "FastAPI",
      "Next.js",
      "TypeScript",
    ],
    visual: "transformer",
    visualLabel: "A token's journey through the model",
    links: [],
    linkNote:
      "Source is private. A public demonstration is not currently available.",
    architecture: [
      {
        title: "Capture",
        description:
          "A Qwen3 model adapter records tensors from real PyTorch computation.",
      },
      {
        title: "Retain",
        description:
          "A bounded trace store keeps owned CPU snapshots with explicit expiry and lifecycle controls.",
      },
      {
        title: "Analyze",
        description:
          "FastAPI exposes retained attention, residual states and diagnostic vocabulary projections.",
      },
      {
        title: "Explore",
        description:
          "Linked React views share token and layer selection without another model forward.",
      },
    ],
    caseStudy: {
      problem:
        "A generated answer hides the transformations that produced it. Inspecting a model needs a way to connect tokens, layers, attention and output candidates while preserving the origin and meaning of each value.",
      approach:
        "The system follows a trace-once, explore-many-times design. Real Qwen3-0.6B computation produces retained model states; connected inspectors expose attention relationships, representation evolution, logit-lens projections and saved-logit sampling previews.",
      contribution:
        "Research tooling and full-stack implementation across model capture, typed API contracts and linked visual inspection. The design separates model execution from exploration and makes unavailable or expired data explicit.",
      challenges: [
        "Bound tensor memory and API response sizes while preserving enough detail for inspection.",
        "Keep token and layer selection consistent across views without accidental recapture.",
        "Validate reconstructed attention and vocabulary projections against retained model outputs.",
        "Communicate interpretation limits: attention is routing; intermediate logit projections are diagnostics, not causal explanations.",
      ],
      outcome:
        "The local research prototype includes documented real-model validation for attention and token-evolution views. The screenshot below comes from that validation work. Dimensionality-reduction views remain planned.",
    },
    evidenceImage: {
      src: "/images/projects/llm-attention-validation.png",
      alt: "Actual LLM Visualization Lab attention inspector, showing the Qwen3 Layer 12 head selector, causal attention matrix and selected token relation.",
      caption:
        "Actual local validation screenshot · Qwen3-0.6B, Layer 12 attention inspector. This image is from the implemented application.",
    },
  },
  {
    slug: "ai-voice-agent",
    title: "AI Voice Agent",
    shortTitle: "A modular local assistant.",
    category: "LLM engineering · Conversational AI",
    summary:
      "A microphone-to-transcript-to-LLM workflow with bounded conversation memory.",
    role: "AI & full-stack engineering",
    status: "In development",
    technologies: ["Faster-Whisper", "Ollama", "FastAPI", "Next.js", "Python"],
    visual: "voice",
    visualLabel: "Audio in. Context-aware text out.",
    links: [],
    linkNote: "No publicly accessible repository or live demo was verified.",
    architecture: [
      {
        title: "Record",
        description:
          "The browser controls microphone permissions, audio limits and recording cleanup.",
      },
      {
        title: "Transcribe",
        description:
          "Local Faster-Whisper turns uploaded audio into a reusable transcript.",
      },
      {
        title: "Converse",
        description:
          "FastAPI composes a configured assistant profile with ordered session memory.",
      },
      {
        title: "Respond",
        description:
          "Ollama returns a validated text response; speech generation is a future stage.",
      },
    ],
    caseStudy: {
      problem:
        "A conversational assistant has to connect audio input, inference and memory without coupling its interface to one speech engine or silently losing failed turns.",
      approach:
        "Separate speech-to-text, LLM transport, assistant instructions and session storage behind explicit service boundaries. Typed messages use the same chat path, and a captured transcript can be retried without recording again.",
      contribution:
        "A modular local assistant with browser recording, FastAPI speech and chat services, an Ollama adapter and ordered conversation state. The current implemented scope ends at text responses.",
      challenges: [
        "Preserve turn order when requests share a session and commit memory only after success.",
        "Handle model timeouts, incomplete outputs and microphone failures with visible errors.",
        "Bound session lifetime and memory while allowing explicit conversation reset.",
      ],
      outcome:
        "The Stage 2 implementation supports local speech recognition and LLM text conversation. Speech generation, retrieval, telephony and external business actions remain future work. Speech quality has not yet been evaluated for a public release.",
    },
  },
  {
    slug: "genznect",
    title: "GenZnect",
    shortTitle: "Connections that lead somewhere.",
    category: "Full-stack · Community platform",
    summary:
      "Student spaces, events and opportunities connected through role-aware workflows.",
    role: "Full-stack platform engineering",
    status: "In development",
    technologies: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
    ],
    visual: "community",
    visualLabel: "People, spaces and opportunities",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/VLReddy1105/nextgen",
        kind: "github",
      },
    ],
    architecture: [
      {
        title: "Identity",
        description:
          "Supabase Auth and server-side profile checks validate identity and account role.",
      },
      {
        title: "Workspace",
        description:
          "Next.js views connect profiles, opportunities, applications, spaces and events.",
      },
      {
        title: "API",
        description:
          "FastAPI provides validated business workflows and deterministic, explained ranking.",
      },
      {
        title: "Permissions",
        description:
          "User-scoped PostgREST and PostgreSQL row-level security preserve access boundaries.",
      },
    ],
    caseStudy: {
      problem:
        "Student collaboration involves different roles, institutions and organizations. A shared platform needs clear permission boundaries and connected workflows beyond a static profile directory.",
      approach:
        "Build a shared student data core with separate role-aware views. Profiles, opportunities, applications, spaces, events and notifications connect through authenticated APIs and database permission checks.",
      contribution:
        "Full-stack development on the GenZnect workspace, including typed interfaces, authenticated workflows and permission-aware data access. The repository contains contributions from multiple authors.",
      challenges: [
        "Keep verified identity, onboarding and role checks consistent across frontend and API.",
        "Preserve database row-level security when making backend requests.",
        "Distinguish missing setup from empty results, and future features from available actions.",
      ],
      outcome:
        "The development codebase contains student and cross-role workflows. The documented hosted database migrations remain pending, so the portfolio does not claim a production launch. AI tools, new mentorship bookings, email and push delivery are outside the current scope.",
    },
  },
  {
    slug: "leadradar",
    title: "LeadRadar",
    shortTitle: "Discovery with evidence.",
    category: "Full-stack · B2B lead discovery",
    summary:
      "Turn open business listings into traceable leads with explained opportunity signals.",
    role: "Product & full-stack engineering",
    status: "Under active development",
    technologies: [
      "Next.js / React",
      "TypeScript",
      "Python / FastAPI",
      "DuckDB",
      "Supabase / PostgreSQL",
      "OSM / Overpass",
      "Overture Maps",
    ],
    visual: "radar",
    visualLabel: "Discover → qualify → organize",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/VLR-Technologies/Leadradar",
        kind: "github",
      },
    ],
    architecture: [
      {
        title: "Discover",
        description:
          "Location-aware queries read Overture Maps Places and OpenStreetMap business listings.",
      },
      {
        title: "Normalize",
        description:
          "Conservative deduplication merges contacts while preserving source and field provenance.",
      },
      {
        title: "Qualify",
        description:
          "Bounded official-site inspection produces explained digital-presence signals.",
      },
      {
        title: "Manage",
        description:
          "Expiring search sessions support server filters, Excel export and optional Supabase persistence.",
      },
    ],
    caseStudy: {
      problem:
        "Business discovery produces fragmented records, inconsistent contacts and uncertain website information. Sales research needs useful context without disguising missing data as certainty.",
      approach:
        "LeadRadar combines open geographic datasets with bounded website inspection. It preserves provenance, explains its deterministic opportunity score and distinguishes an unverified website from one that has actually been inspected.",
      contribution:
        "Contributed to development of the platform, including discovery workflows, lead qualification, data normalization, API integration, persistence and lead management. This work is a contribution to a shared platform.",
      challenges: [
        "Deduplicate cross-source records conservatively without losing provenance.",
        "Isolate provider failures so usable results survive a secondary-provider timeout.",
        "Inspect public websites within bounded requests, domains and resource limits.",
        "Export the entire filtered search session with safe spreadsheet text, rather than only the visible page.",
      ],
      outcome:
        "LeadRadar remains under active development. The public repository documents discovery, qualification, filtering and export workflows. Persistence requires Supabase configuration. Coverage depends on upstream datasets; the opportunity score is a sales heuristic, not a business-quality rating.",
    },
  },
  {
    slug: "motioncb",
    title: "MotionCB — Solar Farm Detection",
    shortTitle: "Solar infrastructure from above.",
    category: "Research · Remote sensing",
    summary:
      "Designed deep learning pipelines to detect and map solar infrastructure in satellite imagery across Germany.",
    role: "Deep learning research · BTU Cottbus-Senftenberg",
    status: "Completed",
    technologies: [
      "Python",
      "Deep Learning",
      "Computer Vision",
      "QGIS",
      "Remote Sensing",
      "Object Detection",
      "Image Segmentation",
    ],
    visual: "satellite",
    visualLabel: "Solar detection research concept",
    links: [],
    linkNote:
      "No public project-specific repository or demonstration is linked.",
    architecture: [
      {
        title: "Explore",
        description:
          "Used QGIS to explore satellite and geospatial layers and extract relevant imagery.",
      },
      {
        title: "Prepare",
        description:
          "Worked with multispectral and geospatial datasets for the detection pipeline.",
      },
      {
        title: "Detect",
        description:
          "Designed and implemented object detection and image segmentation pipelines.",
      },
      {
        title: "Validate",
        description:
          "Used geospatial layers and QGIS to inspect detections and map solar infrastructure.",
      },
    ],
    caseStudy: {
      problem:
        "Detecting and mapping photovoltaic infrastructure across Germany required connecting satellite imagery with geospatial analysis and deep learning methods.",
      approach:
        "The completed BTU Cottbus-Senftenberg research work combined multispectral and geospatial datasets with object detection and image segmentation. QGIS supported imagery exploration, extraction, layer analysis and validation.",
      contribution:
        "Designed and implemented deep learning pipelines for solar and photovoltaic infrastructure detection. Worked with satellite and geospatial imagery, developed detection and segmentation workflows, and used QGIS to explore and validate the resulting layers.",
      challenges: [
        "Connected multispectral image analysis with geospatial mapping workflows.",
        "Worked across object detection and segmentation representations of solar infrastructure.",
        "Used imagery and geospatial layers to inspect and validate detections.",
      ],
      outcome:
        "Completed the research work on detection and mapping of solar infrastructure across Germany. The preview describes the workflow; no satellite imagery or model prediction is shown.",
    },
  },
  {
    slug: "genetic-disease-risk",
    title: "Genetic Disease Risk Analysis using ML",
    shortTitle: "From variants to interpretable risk.",
    category: "Machine learning · Bioinformatics",
    summary:
      "An academic ML pipeline connecting IndiGenomes variants and GWAS records with explainable risk analysis.",
    role: "Machine learning & genomic data analysis",
    status: "Completed",
    technologies: [
      "Python",
      "Scikit-learn",
      "XGBoost",
      "Random Forest",
      "SHAP",
    ],
    visual: "genetics",
    visualLabel: "Genomic data and explainable machine learning",
    links: [],
    linkNote:
      "Completed academic work, October 2024–March 2025, as recorded in the existing portfolio. A project-specific repository, report and evaluation artifacts are not publicly verified.",
    architecture: [
      {
        title: "Integrate",
        description:
          "Connect IndiGenomes variant records with GWAS Catalog SNP information.",
      },
      {
        title: "Model",
        description:
          "Analyze disease-risk features with tree-based machine learning.",
      },
      {
        title: "Inspect",
        description: "Use SHAP to examine model feature contributions.",
      },
    ],
    caseStudy: {
      problem:
        "The existing portfolio describes academic work on genetic disease risk in the Indian population, bringing together genomic variants and published association records.",
      approach:
        "The recorded approach integrates IndiGenomes and GWAS Catalog data with a Python machine-learning pipeline using Random Forest, XGBoost and SHAP. This account preserves the prior portfolio record; source artifacts have not been independently reviewed.",
      contribution:
        "Machine-learning pipeline and genomic data analysis, as described in the original portfolio. A source repository or report is needed to confirm the detailed contribution breakdown.",
      challenges: [
        "Connect variant records with association data while preserving their origin.",
        "Interpret model feature contributions within the limits of the available evidence.",
      ],
      outcome:
        "Recorded as completed academic work in March 2025. No accuracy, clinical validation, patient outcomes or deployment claims are presented. SHAP explanations describe model behavior and do not establish clinical validity.",
    },
  },
];

export const showcasedProjects = projects;
export const getProject = (slug: string) =>
  projects.find(project => project.slug === slug);
