"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useApplyModal } from "@/lib/ApplyModalContext";

export default function CTABanner() {
  const { open: openApply } = useApplyModal();

  return (
    <section className="relative py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="corner-frame relative overflow-hidden rounded-2xl border border-signal/30 bg-gradient-to-br from-signal/10 via-ink-700 to-ink-700 px-6 sm:px-12 py-14 sm:py-16"
        >
          <div className="absolute inset-0 bp-grid-fine opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,black,transparent)]" />
          <div className="relative flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
            <p className="font-mono text-xs text-signal">$ ./apply.sh --cohort 2026</p>
            <h2 className="font-display text-3xl sm:text-4xl text-mist">
              Admissions are open for the 2026 cohort.
            </h2>
            <p className="text-mist-dim text-lg">
              Seats are limited to keep mentorship close to one-on-one. Apply now — we review
              every application personally.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <button
                onClick={() => openApply()}
                className="inline-flex items-center gap-2 rounded-md bg-signal text-ink font-semibold px-7 py-3.5 hover:bg-signal-glow transition-colors"
              >
                Enroll now
                <ArrowUpRight size={18} />
              </button>
              <a
                href="https://wa.me/923167122831?text=Hi%20AFS%20Developers!%20I'd%20like%20to%20know%20more%20about%20the%202026%20cohort."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm text-mist-dim hover:text-mist transition-colors"
              >
                <MessageCircle size={16} />
                Message us on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
