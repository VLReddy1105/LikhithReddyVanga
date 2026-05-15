/* Neural Monochrome — Loading Screen
   Aesthetic: minimal dark, typewriter name reveal, lime progress bar
   Animation: boot sequence feel, precise and clean */

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  "initializing portfolio...",
  "loading neural weights...",
  "rendering experience...",
  "ready.",
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Typewriter for boot lines
  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) return;
    const line = BOOT_LINES[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setCurrentLine(line.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex((l) => l + 1);
      }, 220);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex]);

  // Progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 1.4;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Trigger fade out when done
  useEffect(() => {
    if (progress >= 100 && lineIndex >= BOOT_LINES.length) {
      const t = setTimeout(() => {
        setDone(true);
        setFadeOut(true);
        setTimeout(onComplete, 600);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [progress, lineIndex, onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: "var(--background)",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: done ? "none" : "all",
      }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 dot-grid"
        style={{ opacity: 0.4 }}
      />

      <div className="relative z-10 w-full max-w-sm px-8">
        {/* Logo / Name */}
        <div className="mb-10">
          <div
            className="font-mono text-xs tracking-widest mb-3"
            style={{ color: "var(--navy)", fontFamily: "'JetBrains Mono', monospace" }}
          >
            VLR.portfolio
          </div>
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
            }}
          >
            Vanga Likhith Reddy
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}
          >
            AI Researcher & Developer
          </p>
        </div>

        {/* Boot lines */}
        <div
          className="mb-8 space-y-1"
          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem" }}
        >
          {displayedLines.map((line, i) => (
            <div key={i} style={{ color: "var(--text-dim)" }}>
              <span style={{ color: "var(--navy)", marginRight: "8px" }}>›</span>
              {line}
            </div>
          ))}
          {lineIndex < BOOT_LINES.length && (
            <div style={{ color: "var(--text-muted)" }}>
              <span style={{ color: "var(--navy)", marginRight: "8px" }}>›</span>
              {currentLine}
              <span className="typewriter-cursor" />
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div
          className="relative h-px w-full overflow-hidden"
          style={{ background: "var(--border)" }}
        >
          <div
            className="absolute top-0 left-0 h-full transition-all"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: "linear-gradient(90deg, transparent, var(--navy))",
              transition: "width 0.1s linear",
            }}
          />
        </div>
        <div
          className="mt-2 text-right"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "var(--text-dim)",
          }}
        >
          {Math.min(Math.round(progress), 100)}%
        </div>
      </div>
    </div>
  );
}
