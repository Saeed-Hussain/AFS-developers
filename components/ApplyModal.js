"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useApplyModal } from "@/lib/ApplyModalContext";
import ApplyForm from "./ApplyForm";

export default function ApplyModal() {
  const { isOpen, close, presetCourse } = useApplyModal();
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/90 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Apply to AFS Developers"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full sm:max-w-2xl my-0 sm:my-auto min-h-screen sm:min-h-0 bg-ink-700 sm:rounded-xl border border-white/10 shadow-[0_0_80px_-20px_rgba(0,216,176,0.35)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 sm:px-8 pt-6 sm:pt-7 pb-4 border-b border-white/10 bg-ink-600/40">
              <div>
                <p className="font-mono text-[11px] text-signal">$ ./apply.sh</p>
                <h2 className="font-display text-xl sm:text-2xl text-mist mt-1">
                  Apply to AFS Developers
                </h2>
              </div>
              <button
                onClick={close}
                aria-label="Close application form"
                className="p-2 rounded-md text-mist-dim hover:text-mist hover:bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[75vh] sm:max-h-[70vh] overflow-y-auto px-6 sm:px-8 py-6">
              <ApplyForm presetCourse={presetCourse} onSuccess={() => {}} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
