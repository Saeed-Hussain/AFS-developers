"use client";

import { motion } from "framer-motion";
import { courses } from "@/lib/courses";
import CourseCard from "./CourseCard";

export default function Courses() {
  return (
    <section id="courses" className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-10"
        >
          <p className="font-mono text-xs text-signal mb-3">$ ls courses/</p>
          <h2 className="font-display text-3xl sm:text-4xl text-mist">
            Two tracks. AI built in.
          </h2>
          <p className="text-mist-dim mt-4 text-lg">
            Pick the path that matches where you want to end up. Both tracks run 12 weeks,
            100% online, with real projects — and both weave in AI: prompt engineering and
            LLM/agent APIs, not a bolt-on module.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {courses.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
