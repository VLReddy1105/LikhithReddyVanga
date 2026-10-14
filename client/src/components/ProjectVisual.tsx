import { useState } from "react";
import {
  AudioLines,
  ArrowRight,
  BrainCircuit,
  Fingerprint,
  Layers3,
  Map,
  ScanLine,
  Users,
  Workflow,
} from "lucide-react";
import type { Project } from "@/data/projects";

const stages = ["Embeddings", "Attention", "Residual", "Prediction"];
const prompts = [
  {
    tokens: ["The", "capital", "of", "Germany", "is"],
    candidates: ["Berlin", "a", "located"],
  },
  {
    tokens: ["The", "model", "learns", "from", "context"],
    candidates: ["and", ".", "to"],
  },
];
function TransformerPreview() {
  const [stage, setStage] = useState(1);
  const [token, setToken] = useState(3);
  const [prompt, setPrompt] = useState(0);
  return (
    <div className="transformer-preview">
      <div className="preview-heading">
        <BrainCircuit size={18} />
        <span>TRANSFORMER EXPLORER</span>
        <span className="preview-label">Conceptual preview</span>
      </div>
      <div className="preview-prompt">
        <span>01 / INPUT</span>
        <button
          type="button"
          onClick={() => {
            setPrompt(1 - prompt);
            setToken(3);
          }}
          aria-label="Change illustrative prompt"
        >
          Change example ↗
        </button>
      </div>
      <div
        className="preview-tokens"
        role="group"
        aria-label="Select an illustrative token"
      >
        {prompts[prompt].tokens.map((text, i) => (
          <button
            type="button"
            key={i}
            aria-pressed={token === i}
            onClick={() => setToken(i)}
          >
            {text}
            <small>{String(i).padStart(2, "0")}</small>
          </button>
        ))}
      </div>
      <div
        className="preview-stage-controls"
        role="group"
        aria-label="Explore processing stages"
      >
        {stages.map((text, i) => (
          <button
            type="button"
            key={text}
            aria-pressed={stage === i}
            onClick={() => setStage(i)}
          >
            {text}
          </button>
        ))}
      </div>
      <div className="preview-analysis" aria-live="polite">
        <div className="preview-matrix-panel">
          <span className="preview-overline">
            {
              [
                "Vector coordinates",
                "Causal attention",
                "Representation update",
                "Vocabulary readout",
              ][stage]
            }
          </span>
          <div
            className={`preview-matrix matrix-stage-${stage}`}
            aria-hidden="true"
          >
            {Array.from({ length: 25 }, (_, i) => {
              const row = Math.floor(i / 5),
                col = i % 5;
              return (
                <span
                  key={i}
                  className={row === token ? "selected-row" : ""}
                  style={{
                    opacity:
                      stage === 1 && col > row
                        ? 0.07
                        : 0.22 + ((row * 3 + col * 7 + stage * 2) % 8) * 0.09,
                  }}
                />
              );
            })}
          </div>
          <p>
            {stage === 1
              ? `Selected token: “${prompts[prompt].tokens[token]}”`
              : stages[stage] + " · simplified view"}
          </p>
        </div>
        <div className="preview-readout">
          <span className="preview-overline">Next-token candidates</span>
          {prompts[prompt].candidates.map((candidate, i) => (
            <div className="candidate" key={candidate}>
              <div>
                <span>{candidate}</span>
                <small>
                  {i === 0 ? "illustrative top candidate" : "alternative"}
                </small>
              </div>
              <i style={{ width: `${[88, 40, 22][i]}%` }} />
            </div>
          ))}
          <p>Illustrative values · no model is running</p>
        </div>
      </div>
      <div className="preview-footer">
        <span>Tokens → layers → vocabulary</span>
        <span>Trace once. Explore many ways.</span>
      </div>
    </div>
  );
}
function VoicePreview() {
  const [active, setActive] = useState(0);
  const steps = [
    {
      title: "Audio",
      detail: "Browser recording",
      body: "Audio enters through browser-controlled microphone recording. This preview does not access your microphone.",
    },
    {
      title: "ASR",
      detail: "Faster-Whisper",
      body: "Local speech recognition creates a reusable transcript, so a failed conversation turn can be retried without recording again.",
    },
    {
      title: "LLM",
      detail: "Ollama + memory",
      body: "FastAPI connects the transcript to Ollama and ordered session memory. The implemented response is text.",
    },
    {
      title: "TTS",
      detail: "Planned",
      body: "Speech generation is a future stage. The current implementation ends at an AI text response.",
    },
  ];
  return (
    <div className="voice-preview">
      <div className="preview-heading">
        <AudioLines size={18} />
        <span>VOICE → UNDERSTANDING</span>
        <span className="preview-label">Conceptual preview</span>
      </div>
      <div className="voice-wave" aria-hidden="true">
        {Array.from({ length: 45 }, (_, i) => (
          <i
            key={i}
            style={{
              height: `${18 + Math.abs(Math.sin(i * 0.68) * Math.cos(i * 0.21)) * 100}px`,
              opacity: 0.45 + Math.sin(i * 0.12) * 0.3,
            }}
          />
        ))}
      </div>
      <div
        className="voice-stages"
        role="group"
        aria-label="Explore voice processing stages"
      >
        {steps.map((step, i) => (
          <button
            type="button"
            key={step.title}
            className={i === 3 ? "is-planned" : ""}
            aria-pressed={active === i}
            onClick={() => setActive(i)}
          >
            <span>0{i + 1}</span>
            <strong>{step.title}</strong>
            <small>{step.detail}</small>
          </button>
        ))}
      </div>
      <p className="voice-explanation" aria-live="polite">
        {steps[active].body}
      </p>
      <div className="preview-footer">
        <span>Local inference · explicit service boundaries</span>
        <span>Text response available</span>
      </div>
    </div>
  );
}
function CommunityPreview() {
  const [role, setRole] = useState(0);
  const roles = ["Student", "Institution", "Organization"];
  const features = [
    ["Profile & onboarding", "Spaces & events", "Opportunities & applications"],
    [
      "Verified account roles",
      "Institution workspaces",
      "Permission-aware data",
    ],
    ["Organization profiles", "Opportunity workflows", "Role-aware access"],
  ];
  return (
    <div className="community-preview">
      <div className="preview-heading">
        <Users size={18} />
        <span>GENZNECT</span>
        <span className="preview-label">Architecture preview</span>
      </div>
      <div className="community-title">
        One shared core.
        <br />
        <span>Different perspectives.</span>
      </div>
      <div
        className="community-roles"
        role="group"
        aria-label="Explore documented platform roles"
      >
        {roles.map((text, i) => (
          <button
            type="button"
            key={text}
            aria-pressed={role === i}
            onClick={() => setRole(i)}
          >
            {text}
          </button>
        ))}
      </div>
      <div className="community-features" aria-live="polite">
        {features[role].map((text, i) => (
          <div key={text}>
            <span>0{i + 1}</span>
            <strong>{text}</strong>
            <ArrowRight size={16} />
          </div>
        ))}
      </div>
      <div className="community-core">
        <Fingerprint size={20} />
        <div>
          <strong>Identity & permissions</strong>
          <span>Supabase Auth · FastAPI · PostgreSQL RLS</span>
        </div>
      </div>
      <div className="preview-footer">
        <span>Documented platform workflows</span>
        <span>In development</span>
      </div>
    </div>
  );
}
function RadarPreview() {
  const [provider, setProvider] = useState(0);
  return (
    <div className="radar-preview">
      <div className="preview-heading">
        <ScanLine size={18} />
        <span>LEADRADAR / DATA PIPELINE</span>
        <span className="preview-label">Architecture preview</span>
      </div>
      <div className="radar-title">
        Every signal
        <br />
        <span>has a source.</span>
      </div>
      <div
        className="provider-switch"
        role="group"
        aria-label="Explore data providers"
      >
        {["Overture Maps", "OpenStreetMap"].map((name, i) => (
          <button
            type="button"
            key={name}
            aria-pressed={provider === i}
            onClick={() => setProvider(i)}
          >
            <Map size={16} />
            {name}
          </button>
        ))}
      </div>
      <div className="provenance-source" aria-live="polite">
        <span>Source layer</span>
        <strong>
          {provider === 0
            ? "Overture Places → DuckDB"
            : "OSM listings → Overpass API"}
        </strong>
        <p>
          {provider === 0
            ? "Location-aware queries over open business-place records."
            : "Public geographic listings with their original source preserved."}
        </p>
      </div>
      <ol className="radar-flow">
        {["Normalize", "Qualify", "Organize"].map((name, i) => (
          <li key={name}>
            <span>0{i + 1}</span>
            <strong>{name}</strong>
            <small>
              {
                [
                  "Conservative deduplication",
                  "Explained opportunity signals",
                  "Filters & Excel export",
                ][i]
              }
            </small>
          </li>
        ))}
      </ol>
      <div className="preview-footer">
        <span>Provenance preserved at every stage</span>
        <span>No sample leads shown</span>
      </div>
    </div>
  );
}
function ResearchPreview({ genetic }: { genetic: boolean }) {
  return (
    <div
      className={`applied-preview ${genetic ? "applied-preview--genetics" : ""}`}
    >
      <div className="preview-heading">
        {genetic ? <Workflow size={18} /> : <Layers3 size={18} />}
        <span>{genetic ? "GENOMIC ML" : "GEOSPATIAL INTELLIGENCE"}</span>
        <span className="preview-label">Workflow overview</span>
      </div>
      <div className="layer-composition" aria-hidden="true">
        {[0, 1, 2].map(i => (
          <div className={`data-plane plane-${i}`} key={i}>
            <div className="plane-cells">
              {Array.from({ length: 24 }, (_, j) => (
                <i key={j} />
              ))}
            </div>
            <span>
              {
                (genetic
                  ? [
                      "MODEL EXPLANATIONS",
                      "TREE-BASED MODELS",
                      "VARIANT RECORDS",
                    ]
                  : [
                      "QGIS VALIDATION",
                      "DETECTION + SEGMENTATION",
                      "MULTISPECTRAL IMAGERY",
                    ])[i]
              }
            </span>
          </div>
        ))}
      </div>
      <p className="applied-caption">
        {genetic
          ? "IndiGenomes + GWAS → ML → SHAP"
          : "Satellite & geospatial data → deep learning → mapping"}
      </p>
      <div className="preview-footer">
        <span>
          {genetic
            ? "Portfolio record · source artifacts pending"
            : "Completed academic work at BTU"}
        </span>
        <span>
          {genetic ? "No clinical claims" : "No satellite data displayed"}
        </span>
      </div>
    </div>
  );
}
export default function ProjectVisual({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div
      className={`project-visual project-visual--${project.visual} ${className}`}
    >
      {project.visual === "transformer" ? (
        <TransformerPreview />
      ) : project.visual === "voice" ? (
        <VoicePreview />
      ) : project.visual === "community" ? (
        <CommunityPreview />
      ) : project.visual === "radar" ? (
        <RadarPreview />
      ) : (
        <ResearchPreview genetic={project.visual === "genetics"} />
      )}
    </div>
  );
}
