"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { courses } from "@/lib/courses";

const heardFromOptions = [
  "WhatsApp / friend referral",
  "Instagram",
  "Facebook",
  "University / college",
  "Google search",
  "Other",
];

const initialState = {
  full_name: "",
  email: "",
  whatsapp: "",
  city: "",
  course: "",
  motivation: "",
  heard_from: "",
};

export default function ApplyForm({ presetCourse }) {
  const [form, setForm] = useState(() => ({
    ...initialState,
    course: presetCourse || "",
  }));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const update = (field) => (e) => {
    const value = e?.target ? e.target.value : e;
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!/^[0-9+\-\s]{7,15}$/.test(form.whatsapp)) e.whatsapp = "Enter a valid WhatsApp number.";
    if (!form.city.trim()) e.city = "Enter your city.";
    if (!form.course) e.course = "Choose a track.";
    if (!form.motivation.trim() || form.motivation.trim().length < 20)
      e.motivation = "Tell us a little more (20+ characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage("");

    const { error } = await supabase.from("applications").insert([
      {
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        whatsapp: form.whatsapp.trim(),
        city: form.city.trim(),
        course: form.course,
        motivation: form.motivation.trim(),
        heard_from: form.heard_from || null,
      },
    ]);

    if (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(
        `We couldn't submit your application (${error.message}). Try again, or message us directly on WhatsApp.`
      );
      return;
    }

    setStatus("success");
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-10 text-center"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.05 }}
          className="mx-auto w-16 h-16 rounded-full bg-signal/10 border border-signal/30 flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="text-signal" size={32} />
        </motion.div>
        <h3 className="font-display text-2xl text-mist mb-2">Application received</h3>
        <p className="text-mist-dim max-w-sm mx-auto">
          Thanks, {form.full_name.split(" ")[0]}. We review applications within 48 hours and
          follow up on WhatsApp with next steps.
        </p>
        <a
          href={`https://wa.me/923167122831?text=${encodeURIComponent(
            `Hi, I am ${form.full_name} and I want to apply for the ${
              courses.find((c) => c.slug === form.course)?.name || "cohort"
            } course.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-7 rounded-md bg-signal text-ink font-semibold px-5 py-3 hover:bg-signal-glow transition-colors"
        >
          Message us on WhatsApp
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" error={errors.full_name}>
          <input
            type="text"
            value={form.full_name}
            onChange={update("full_name")}
            placeholder="Ali Raza"
            className={inputClass(errors.full_name)}
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="ali@example.com"
            className={inputClass(errors.email)}
          />
        </Field>
        <Field label="WhatsApp number" error={errors.whatsapp}>
          <input
            type="tel"
            value={form.whatsapp}
            onChange={update("whatsapp")}
            placeholder="+92 3XX XXXXXXX"
            className={inputClass(errors.whatsapp)}
          />
        </Field>
        <Field label="City" error={errors.city}>
          <input
            type="text"
            value={form.city}
            onChange={update("city")}
            placeholder="Bhakkar"
            className={inputClass(errors.city)}
          />
        </Field>
      </div>

      <Field label="Which track are you applying for?" error={errors.course}>
        <div className="grid sm:grid-cols-2 gap-3">
          {courses.map((c) => (
            <button
              type="button"
              key={c.slug}
              onClick={() => update("course")(c.slug)}
              className={`text-left rounded-lg border px-4 py-3 transition-colors ${
                form.course === c.slug
                  ? "border-signal bg-signal/10"
                  : "border-white/10 bg-white/[0.02] hover:border-white/25"
              }`}
            >
              <p className="font-mono text-[11px] text-signal">{c.index}</p>
              <p className="text-sm text-mist mt-1 leading-snug">{c.name}</p>
            </button>
          ))}
        </div>
      </Field>

      <Field label="How did you hear about us? (optional)">
        <select value={form.heard_from} onChange={update("heard_from")} className={inputClass()}>
          <option value="">Select one</option>
          {heardFromOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Why do you want to join this cohort?" error={errors.motivation}>
        <textarea
          value={form.motivation}
          onChange={update("motivation")}
          rows={4}
          placeholder="Tell us about your goals, what you've tried so far, and what you want to build."
          className={inputClass(errors.motivation)}
        />
      </Field>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-signal text-ink font-semibold py-3.5 hover:bg-signal-glow transition-colors disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit application"
        )}
      </button>
      <p className="text-center text-xs text-mist-faint font-mono">
        no spam · reviewed within 48 hours · WhatsApp follow-up
      </p>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-mono text-mist-faint mb-2">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return `w-full rounded-md bg-white/[0.03] border px-3.5 py-2.5 text-sm text-mist placeholder:text-mist-faint focus:outline-none focus:border-signal transition-colors ${
    error ? "border-red-500/60" : "border-white/10"
  }`;
}
