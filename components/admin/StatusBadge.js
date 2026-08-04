export const statusOptions = [
  { value: "new", label: "New", classes: "bg-blue-500/10 text-blue-300 border-blue-500/30" },
  {
    value: "contacted",
    label: "Contacted",
    classes: "bg-amber/10 text-amber border-amber/30",
  },
  {
    value: "accepted",
    label: "Accepted",
    classes: "bg-signal/10 text-signal border-signal/30",
  },
  {
    value: "rejected",
    label: "Rejected",
    classes: "bg-red-500/10 text-red-300 border-red-500/30",
  },
];

export function StatusBadge({ status }) {
  const opt = statusOptions.find((o) => o.value === status) || statusOptions[0];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${opt.classes}`}>
      {opt.label}
    </span>
  );
}
