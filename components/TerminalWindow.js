"use client";

import { useEffect, useState } from "react";

const LINES = [
  { type: "prompt", text: "whoami" },
  { type: "output", text: "AFS Developers — three engineers, one studio, Bhakkar." },
  { type: "prompt", text: "cat mission.txt" },
  { type: "output", text: "We teach what actually got us hired. No fluff, no filler." },
  { type: "prompt", text: "./enroll.sh --cohort 2026" },
  { type: "success", text: "Admissions open → Full-Stack & App Dev tracks (AI built in)" },
];

export default function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState([]);
  const [charIndex, setCharIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      setDone(true);
      return;
    }
    const current = LINES[lineIndex];
    if (charIndex <= current.text.length) {
      const speed = current.type === "prompt" ? 38 : 10;
      const t = setTimeout(() => setCharIndex((c) => c + 1), speed);
      return () => clearTimeout(t);
    } else {
      const pause = setTimeout(() => {
        setVisibleLines((v) => [...v, current]);
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, current.type === "prompt" ? 250 : 420);
      return () => clearTimeout(pause);
    }
  }, [charIndex, lineIndex]);

  const current = LINES[lineIndex];
  const currentText = current ? current.text.slice(0, charIndex) : "";

  return (
    <div className="corner-frame rounded-lg overflow-hidden border border-white/10 bg-ink-700/80 backdrop-blur-sm shadow-[0_0_60px_-15px_rgba(0,216,176,0.25)]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-ink-600/60">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-xs text-mist-faint">afs@studio:~</span>
      </div>
      <div className="p-5 sm:p-6 font-mono text-[13px] sm:text-sm leading-relaxed min-h-[220px]">
        {visibleLines.map((l, i) => (
          <Line key={i} line={l} />
        ))}
        {!done && current && (
          <Line
            line={{ ...current, text: currentText }}
            cursor
          />
        )}
      </div>
    </div>
  );
}

function Line({ line, cursor }) {
  if (line.type === "prompt") {
    return (
      <p className="text-mist">
        <span className="text-signal">$</span> {line.text}
        {cursor && <span className="inline-block w-2 h-4 bg-signal ml-0.5 align-middle animate-blink" />}
      </p>
    );
  }
  if (line.type === "success") {
    return (
      <p className="text-signal-glow mb-1 pl-4">
        {line.text}
        {cursor && <span className="inline-block w-2 h-4 bg-signal ml-0.5 align-middle animate-blink" />}
      </p>
    );
  }
  return (
    <p className="text-mist-dim mb-1 pl-4">
      {line.text}
      {cursor && <span className="inline-block w-2 h-4 bg-signal ml-0.5 align-middle animate-blink" />}
    </p>
  );
}
