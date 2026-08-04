"use client";

import { motion } from "framer-motion";

const founders = [
  {
    initials: "A",
    role: "Full-Stack & Product",
    note: "Leads the web track — ships production apps, obsessed with clean architecture.",
  },
  {
    initials: "F",
    role: "Mobile & Systems",
    note: "Leads the Flutter track — has published apps used by real customers.",
  },
  {
    initials: "S",
    role: "AI & Backend",
    note: "Leads AI-integration — wires LLMs and automation into production systems.",
  },
];

export default function Founders() {
  return (
    <section className="relative border-y border-white/10 bg-ink-700/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="font-mono text-xs text-signal mb-2">$ cat team.json</p>
            <h2 className="font-display text-2xl sm:text-3xl text-mist">
              Built by three developers, not a marketing team.
            </h2>
          </div>
          <p className="text-mist-dim max-w-sm text-sm">
            AFS is the initials of the three of us. We started teaching because we couldn't find a
            course in Pakistan that taught what studios actually hire for — so we built one.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {founders.map((f, i) => (
            <motion.div
              key={f.initials}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-panel rounded-lg p-6"
            >
              <div className="w-11 h-11 rounded-md bg-signal/10 border border-signal/25 flex items-center justify-center font-display text-lg text-signal mb-4">
                {f.initials}
              </div>
              <p className="text-mist font-medium">{f.role}</p>
              <p className="text-mist-dim text-sm mt-1.5 leading-relaxed">{f.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
