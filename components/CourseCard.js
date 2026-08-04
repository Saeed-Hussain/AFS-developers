"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useApplyModal } from "@/lib/ApplyModalContext";

export default function CourseCard({ course, index }) {
  const { open: openApply } = useApplyModal();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      className="group relative flex flex-col card-panel rounded-xl p-6 sm:p-7 hover:border-signal/40 border transition-colors"
    >
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-xs text-mist-faint">{course.path}</span>
        <span className="font-mono text-[11px] text-signal border border-signal/30 rounded-full px-2.5 py-0.5">
          {course.level}
        </span>
      </div>

      <h3 className="font-display text-xl sm:text-2xl text-mist leading-snug">{course.name}</h3>
      <p className="text-signal-glow text-sm mt-1.5">{course.tagline}</p>
      <p className="text-mist-dim text-sm mt-4 leading-relaxed">{course.description}</p>

      <div className="flex flex-wrap gap-2 mt-5">
        {course.stack.map((s) => (
          <span
            key={s}
            className="font-mono text-[11px] text-mist-dim bg-white/5 border border-white/10 rounded px-2 py-1"
          >
            {s}
          </span>
        ))}
      </div>

      <ul className="mt-6 space-y-2.5 flex-1">
        {course.outcomes.map((o) => (
          <li key={o} className="flex items-start gap-2.5 text-sm text-mist-dim">
            <Check size={16} className="text-signal mt-0.5 shrink-0" />
            {o}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between mt-7 pt-5 border-t border-white/10">
        <span className="font-mono text-xs text-mist-faint">{course.weeks} weeks · online</span>
        <button
          onClick={() => openApply(course.slug)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-mist group-hover:text-signal transition-colors"
        >
          Apply for this track
          <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.div>
  );
}
