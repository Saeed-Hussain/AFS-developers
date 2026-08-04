"use client";

import { motion } from "framer-motion";
import { Users, Rocket, MessagesSquare, GraduationCap, Laptop2, Sparkles } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Live one-on-one classes",
    desc: "Available for students who need extra attention, not just group calls.",
  },
  {
    icon: Rocket,
    title: "Real, hands-on projects",
    desc: "Not just theory or slides — every week ends with something shipped.",
  },
  {
    icon: GraduationCap,
    title: "Direct mentorship",
    desc: "Taught by working developers, not a random instructor reading a script.",
  },
  {
    icon: MessagesSquare,
    title: "Doubt-solving support",
    desc: "Ask questions outside class hours on WhatsApp — you're never stuck alone.",
  },
  {
    icon: Sparkles,
    title: "Hands-on AI integration",
    desc: "Learn to add real AI features into both your web and Flutter apps.",
  },
  {
    icon: Laptop2,
    title: "Flexible online classes",
    desc: "Via Google Meet, timed to fit around university or work schedules.",
  },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-16 sm:py-20 border-t border-white/10 bg-ink-700/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-10"
        >
          <p className="font-mono text-xs text-signal mb-3">$ cat why-afs.md</p>
          <h2 className="font-display text-3xl sm:text-4xl text-mist">
            Everything applies across both tracks.
          </h2>
          <p className="text-mist-dim mt-4 text-lg">
            Whichever path you choose, this is what's underneath every cohort.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-panel rounded-lg p-6 hover:border-signal/30 border transition-colors"
            >
              <div className="w-10 h-10 rounded-md bg-signal/10 border border-signal/25 flex items-center justify-center mb-4">
                <f.icon size={18} className="text-signal" />
              </div>
              <h3 className="text-mist font-medium">{f.title}</h3>
              <p className="text-mist-dim text-sm mt-2 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
