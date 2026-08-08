"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Apply online",
    desc: "Fill the application form and tell us which track and why.",
  },
  {
    n: "02",
    title: "Screening call",
    desc: "A short WhatsApp call with a founder — no gatekeeping, just fit.",
  },
  {
    n: "03",
    title: "Cohort starts",
    desc: "Live classes, weekly projects, and direct mentorship begin.",
  },
  {
    n: "04",
    title: "Build your portfolio",
    desc: "Ship real projects each week, including one capstone product.",
  },
  {
    n: "05",
    title: "Career support",
    desc: "Resume review, portfolio polish, and referrals when you graduate.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-16 sm:py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-10"
        >
          <p className="font-mono text-xs text-signal mb-3">$ ./enroll.sh --steps</p>
          <h2 className="font-display text-3xl sm:text-4xl text-mist">
            From application to shipped portfolio.
          </h2>
          <p className="text-mist-dim mt-4 text-lg">
            Complete, step-by-step guidance at every stage — nothing skipped, nothing left for
            you to figure out alone.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-white/10" />
          <div className="grid md:grid-cols-5 gap-10 md:gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <div className="relative z-10 w-12 h-12 rounded-full bg-ink-700 border border-signal/40 flex items-center justify-center font-mono text-sm text-signal mb-5">
                  {s.n}
                </div>
                <h3 className="text-mist font-medium">{s.title}</h3>
                <p className="text-mist-dim text-sm mt-2 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
