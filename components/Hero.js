"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import TerminalWindow from "./TerminalWindow";
import { useApplyModal } from "@/lib/ApplyModalContext";

const stats = [
  { value: "2", label: "tracks" },
  { value: "12", label: "weeks each" },
  { value: "100%", label: "online" },
  { value: "Aug 20", label: "apply by" },
];

export default function Hero() {
  const { open: openApply } = useApplyModal();

  return (
    <section className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-16">
      <div className="absolute inset-0 bp-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-signal/10 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-mist-dim mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
          </span>
          Admissions open · apply by 20 Aug 2026 · Bhakkar
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display font-semibold text-[11vw] leading-[0.98] sm:text-5xl lg:text-6xl tracking-tight text-mist"
            >
              Learn to build.
              <br />
              Ship <span className="text-signal text-glow">real</span> products.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-mist-dim text-lg max-w-lg"
            >
              AFS Developers is a three-founder studio running hands-on cohorts in{" "}
              <span className="text-mist">Full-Stack Web Development</span> and{" "}
              <span className="text-mist">Flutter App Development</span> — with{" "}
              <span className="text-mist">AI integrated into both</span>: prompt engineering
              and LLM/agent APIs. Beginner friendly. Zero fluff. One enrollment for the path
              you choose.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => openApply()}
                className="inline-flex items-center gap-2 rounded-md bg-signal text-ink font-semibold px-6 py-3.5 hover:bg-signal-glow transition-colors"
              >
                Apply for the 2026 cohort
                <ArrowUpRight size={18} />
              </button>
              <a
                href="#courses"
                className="inline-flex items-center gap-1 font-mono text-sm text-mist-dim hover:text-mist transition-colors border-b border-transparent hover:border-mist-dim pb-0.5"
              >
                view courses ↓
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 grid grid-cols-4 gap-4 max-w-md border-t border-white/10 pt-6"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl sm:text-3xl text-mist">{s.value}</div>
                  <div className="font-mono text-[11px] text-mist-faint mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="animate-float"
          >
            <TerminalWindow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
