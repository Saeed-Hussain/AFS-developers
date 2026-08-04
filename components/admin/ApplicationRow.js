"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MessageCircle,
  Mail,
  MapPin,
  Laptop2,
  Loader2,
  Trash2,
  Check,
} from "lucide-react";
import { StatusBadge, statusOptions } from "./StatusBadge";
import { courses } from "@/lib/courses";

const courseLabel = (slug) => courses.find((c) => c.slug === slug)?.name || slug;

const experienceLabel = {
  none: "Complete beginner",
  some: "Some self-taught experience",
  comfortable: "Comfortable with basics",
};

export default function ApplicationRow({ app, onUpdate, onDelete }) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(app.admin_notes || "");
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleStatusChange = async (e) => {
    const value = e.target.value;
    setSavingStatus(true);
    await onUpdate(app.id, { status: value });
    setSavingStatus(false);
  };

  const handleSaveNotes = async () => {
    setSavingNotes(true);
    await onUpdate(app.id, { admin_notes: notes });
    setSavingNotes(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    setDeleting(true);
    await onDelete(app.id);
  };

  const date = new Date(app.created_at);

  return (
    <div className="border border-white/10 rounded-lg bg-white/[0.015] overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-5 py-3.5 text-left"
      >
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-mist-faint shrink-0">
          <ChevronDown size={16} />
        </motion.span>

        <div className="min-w-[160px]">
          <p className="text-mist text-sm font-medium">{app.full_name}</p>
          <p className="text-mist-faint text-xs font-mono">{app.email}</p>
        </div>

        <span className="font-mono text-[11px] text-mist-dim bg-white/5 border border-white/10 rounded px-2 py-1">
          {courseLabel(app.course)}
        </span>

        <span className="text-mist-faint text-xs font-mono hidden sm:inline">{app.city}</span>

        <span className="text-mist-faint text-xs font-mono hidden md:inline">
          {date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
        </span>

        <div className="ml-auto flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {savingStatus && <Loader2 size={14} className="animate-spin text-mist-faint" />}
          <select
            value={app.status}
            onChange={handleStatusChange}
            className="bg-ink-600 border border-white/10 rounded-md text-xs font-mono text-mist px-2 py-1.5 focus:outline-none focus:border-signal"
          >
            {statusOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <StatusBadge status={app.status} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/10"
          >
            <div className="px-4 sm:px-5 py-5 grid md:grid-cols-2 gap-6">
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-2 text-mist-dim">
                  <Mail size={14} className="text-signal shrink-0" /> {app.email}
                </p>
                <p className="flex items-center gap-2 text-mist-dim">
                  <MessageCircle size={14} className="text-signal shrink-0" />
                  <a
                    href={`https://wa.me/${app.whatsapp.replace(/[^0-9]/g, "")}?text=Hi ${app.full_name.split(" ")[0]}, thanks for applying to AFS Developers!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-mist transition-colors"
                  >
                    {app.whatsapp}
                  </a>
                </p>
                <p className="flex items-center gap-2 text-mist-dim">
                  <MapPin size={14} className="text-signal shrink-0" /> {app.city}
                </p>
                {app.has_laptop !== null && app.has_laptop !== undefined && (
                  <p className="flex items-center gap-2 text-mist-dim">
                    <Laptop2 size={14} className="text-signal shrink-0" />
                    {app.has_laptop ? "Has a laptop" : "No laptop yet"}
                  </p>
                )}
                {app.experience_level && (
                  <p className="text-mist-dim">
                    <span className="text-mist-faint">Experience:</span>{" "}
                    {experienceLabel[app.experience_level] || app.experience_level}
                  </p>
                )}
                {app.heard_from && (
                  <p className="text-mist-dim">
                    <span className="text-mist-faint">Heard from:</span> {app.heard_from}
                  </p>
                )}
                <div>
                  <p className="text-mist-faint mb-1">Motivation:</p>
                  <p className="text-mist-dim leading-relaxed">{app.motivation}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-mist-faint mb-2">
                  Admin notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  placeholder="Interview notes, decisions, follow-up reminders..."
                  className="w-full rounded-md bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-sm text-mist placeholder:text-mist-faint focus:outline-none focus:border-signal transition-colors"
                />
                <div className="flex items-center justify-between mt-3">
                  <button
                    onClick={handleSaveNotes}
                    disabled={savingNotes}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-signal hover:text-signal-glow transition-colors disabled:opacity-60"
                  >
                    {savingNotes ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Check size={14} />
                    )}
                    Save notes
                  </button>

                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                      confirmDelete ? "text-red-400" : "text-mist-faint hover:text-red-400"
                    }`}
                  >
                    {deleting ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                    {confirmDelete ? "Click again to confirm" : "Delete application"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
