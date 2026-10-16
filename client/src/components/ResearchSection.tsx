import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import "./research-contact.css";

const LENSES = [
  {
    id: "embeddings",
    label: "Embeddings",
    question: "Where does a token begin?",
    description:
      "Each token is mapped to a learned vector. This initial representation enters the residual stream and changes as it passes through transformer blocks.",
    limit:
      "Individual coordinates do not have a guaranteed, human-readable meaning.",
  },
  {
    id: "attention",
    label: "Attention",
    question: "How does context enter?",
    description:
      "Attention computes weights over available token positions and combines their value vectors. The lab exposes selected heads and the operations behind these connections.",
    limit: "An attention weight alone is not evidence of causal importance.",
  },
  {
    id: "states",
    label: "Hidden states",
    question: "What changes inside a block?",
    description:
      "Attention and MLP outputs are added to the residual stream. Following retained hidden states makes these successive updates available for inspection.",
    limit:
      "Representation changes describe model computation; they do not by themselves explain a decision.",
  },
  {
    id: "prediction",
    label: "Next token",
    question: "What reaches the vocabulary?",
    description:
      "Final normalization and the language-model head turn the last hidden state into vocabulary logits. A sampling policy then selects the next token.",
    limit:
      "Intermediate Logit Lens readouts are projections, not predictions made at that layer.",
  },
] as const;

function TransformerDiagram({ active }: { active: string }) {
  const stages = [
    { id: "embeddings", label: "Embedding", detail: "Learned token vectors" },
    { id: "attention", label: "Attention", detail: "Context routing" },
    { id: "states", label: "Residual + MLP", detail: "Representation updates" },
    {
      id: "prediction",
      label: "Vocabulary",
      detail: "Norm → LM head → logits",
    },
  ];
  return (
    <div
      className="research-computation"
      aria-label="Conceptual transformer processing workflow"
    >
      <div className="computation-input">
        <span>INPUT TOKENS</span>
        <strong>Context becomes a representation.</strong>
      </div>
      <ol className="computation-stages">
        {stages.map((stage, index) => (
          <li key={stage.id} className={active === stage.id ? "is-active" : ""}>
            <span className="computation-index">0{index + 1}</span>
            <div>
              <strong>{stage.label}</strong>
              <span>{stage.detail}</span>
            </div>
            <span className="computation-port" aria-hidden="true" />
          </li>
        ))}
      </ol>
      <div className="computation-residual">
        Residual stream · attention + MLP updates are added at each block.
      </div>
    </div>
  );
}

export default function ResearchSection() {
  const [activeLens, setActiveLens] =
    useState<(typeof LENSES)[number]["id"]>("attention");
  const selectedLens = LENSES.find(lens => lens.id === activeLens)!;
  return (
    <section
      id="research"
      className="portfolio-section research-section"
      aria-labelledby="research-heading"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Research & exploration"
            title="Making transformer behavior visible."
            description="Building tools that connect real model computation with careful, interactive visual explanation."
          />
        </Reveal>
        <div className="research-layout">
          <Reveal className="research-perspective">
            <p className="eyebrow">The current focus</p>
            <h3 id="research-heading">A closer look at the model.</h3>
            <p>
              My LLM interpretability work follows a token through embeddings,
              attention, hidden states and vocabulary readouts. The aim is to
              make internal computation easier to inspect, while keeping the
              limits of each visualization visible.
            </p>
            <ul className="research-principles">
              <li>
                <span aria-hidden="true">01</span>
                <div>
                  <strong>Capture once, explore many ways</strong>
                  <p>Linked views work from retained model traces.</p>
                </div>
              </li>
              <li>
                <span aria-hidden="true">02</span>
                <div>
                  <strong>Follow the representation</strong>
                  <p>
                    Inspect residual updates and layer-by-layer hidden states.
                  </p>
                </div>
              </li>
              <li>
                <span aria-hidden="true">03</span>
                <div>
                  <strong>Keep interpretation precise</strong>
                  <p>
                    Distinguish observed tensors, derived readouts and causal
                    claims.
                  </p>
                </div>
              </li>
            </ul>
            <Link href="/projects/llm-interpretability" className="text-link">
              Explore the supporting work{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal className="research-explorer" delay={0.1}>
            <div className="research-explorer-header">
              <span className="eyebrow">Inside a transformer</span>
              <span className="research-concept-label">
                Conceptual overview
              </span>
            </div>
            <div
              className="research-lens-controls"
              role="group"
              aria-label="Explore transformer concepts"
            >
              {LENSES.map(lens => (
                <button
                  key={lens.id}
                  type="button"
                  aria-pressed={activeLens === lens.id}
                  aria-controls="research-explanation"
                  onClick={() => setActiveLens(lens.id)}
                >
                  {lens.label}
                </button>
              ))}
            </div>
            <TransformerDiagram active={activeLens} />
            <div
              id="research-explanation"
              className="research-explanation"
              aria-live="polite"
              aria-atomic="true"
            >
              <h4>{selectedLens.question}</h4>
              <p>{selectedLens.description}</p>
              <p className="research-interpretation">
                <strong>Interpretation:</strong> {selectedLens.limit}
              </p>
            </div>
            <p className="research-diagram-caption">
              A simplified explanatory diagram. No experimental measurements or
              model results are shown.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <div className="research-methods">
            <div>
              <span className="eyebrow">Representation geometry</span>
              <h3>High-dimensional states. Thoughtful visual views.</h3>
            </div>
            <div>
              <div className="research-method-tags">
                <span>PCA</span>
                <span>UMAP</span>
                <span>t-SNE</span>
              </div>
              <p>
                Methods of interest for exploring representations. Projection
                geometry needs context: 2D proximity alone does not establish
                meaning or causality. PCA and UMAP are planned work in the lab.
              </p>
            </div>
            <a className="text-link" href="#contact">
              Discuss research <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
        <Reveal>
          <div className="research-completed">
            <div>
              <p className="eyebrow">Applied research · Completed</p>
              <h3>MotionCB — solar infrastructure mapping</h3>
              <p>
                At BTU Cottbus-Senftenberg, I contributed to deep learning
                pipelines for solar-farm and photovoltaic detection in
                multispectral satellite and geospatial imagery. The work
                combined object detection, segmentation and QGIS exploration,
                feature extraction, layer management and validation for mapping
                across Germany.
              </p>
            </div>
            <Link href="/projects/motioncb" className="text-link">
              View the work <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
