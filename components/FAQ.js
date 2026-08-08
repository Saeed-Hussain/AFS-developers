"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "When is the last date to apply?",
    a: "15 August 2026. Applications close for the 2026 cohort on this date, so apply early — seats are limited to keep mentorship close to one-on-one.",
  },
  {
    q: "Do I need any coding experience to apply?",
    a: "No. Both tracks are built for complete beginners. If you already know the basics, we'll move faster with you — but zero experience is the default assumption.",
  },
  {
    q: "Are classes live or pre-recorded?",
    a: "Live, over Google Meet / Zoom, with sessions timed to fit around university or work. One-on-one classes are available for students who need extra attention.",
  },
  {
    q: "What do I need to join?",
    a: "Your own laptop, a stable internet connection, and a willingness to practice daily. Everything else — tools, resources, guidance — we provide.",
  },
  {
    q: "Can I apply for more than one track?",
    a: "Yes. Apply separately for each track you're interested in, and mention it in your motivation — we'll help you sequence them sensibly.",
  },
  {
    q: "How much does the cohort cost?",
    a: "Pricing is shared on your screening call, since we sometimes adjust it per cohort and offer partial scholarships. Apply and we'll walk you through it on WhatsApp.",
  },
  {
    q: "What happens after I apply?",
    a: "We review applications within 48 hours and follow up on WhatsApp with a short screening call before confirming your seat in the cohort.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-16 sm:py-20 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="font-mono text-xs text-signal mb-3">$ man afs-developers</p>
          <h2 className="font-display text-3xl sm:text-4xl text-mist">Common questions</h2>
        </motion.div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-mist font-medium">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-signal"
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-mist-dim text-sm leading-relaxed pb-5 pr-8">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
