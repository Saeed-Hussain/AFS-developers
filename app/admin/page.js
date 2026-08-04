"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, Loader2, Search, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { courses } from "@/lib/courses";
import ApplicationRow from "@/components/admin/ApplicationRow";

export default function AdminDashboard() {
  const router = useRouter();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    const { data, error: fetchError } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error(fetchError);
      setError(
        `Couldn't load applications: ${fetchError.message}. If this says nothing and the list is just empty, it's most likely a Row Level Security policy blocking reads — see supabase/migration_2_tracks.sql.`
      );
    } else {
      setApps(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleUpdate = async (id, patch) => {
    const { error: updateError } = await supabase
      .from("applications")
      .update(patch)
      .eq("id", id);
    if (!updateError) {
      setApps((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
    }
  };

  const handleDelete = async (id) => {
    const { error: deleteError } = await supabase.from("applications").delete().eq("id", id);
    if (!deleteError) {
      setApps((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/admin-login");
  };

  const filtered = useMemo(() => {
    return apps.filter((a) => {
      const matchesSearch =
        !search ||
        a.full_name.toLowerCase().includes(search.toLowerCase()) ||
        a.email.toLowerCase().includes(search.toLowerCase());
      const matchesCourse = courseFilter === "all" || a.course === courseFilter;
      const matchesStatus = statusFilter === "all" || a.status === statusFilter;
      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [apps, search, courseFilter, statusFilter]);

  const stats = useMemo(() => {
    const counts = { total: apps.length, new: 0, contacted: 0, accepted: 0, rejected: 0 };
    apps.forEach((a) => {
      counts[a.status] = (counts[a.status] || 0) + 1;
    });
    return counts;
  }, [apps]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p className="font-mono text-xs text-signal mb-1">$ ./admin --dashboard</p>
          <h1 className="font-display text-2xl sm:text-3xl text-mist">Applications</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchApplications}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 text-mist-dim hover:text-mist hover:border-white/25 text-xs font-mono px-3 py-2 transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 text-mist-dim hover:text-mist hover:border-white/25 text-xs font-mono px-3 py-2 transition-colors"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="New" value={stats.new} accent="text-blue-300" />
        <StatCard label="Contacted" value={stats.contacted} accent="text-amber" />
        <StatCard label="Accepted" value={stats.accepted} accent="text-signal" />
        <StatCard label="Rejected" value={stats.rejected} accent="text-red-300" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist-faint" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-md bg-white/[0.03] border border-white/10 pl-9 pr-3.5 py-2.5 text-sm text-mist placeholder:text-mist-faint focus:outline-none focus:border-signal transition-colors"
          />
        </div>
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="rounded-md bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-sm text-mist focus:outline-none focus:border-signal transition-colors"
        >
          <option value="all">All tracks</option>
          {courses.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-md bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-sm text-mist focus:outline-none focus:border-signal transition-colors"
        >
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {error && (
        <div className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24 text-mist-faint">
          <Loader2 size={22} className="animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 text-mist-faint font-mono text-sm">
          No applications match these filters.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.03 }}
            >
              <ApplicationRow app={app} onUpdate={handleUpdate} onDelete={handleDelete} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, accent = "text-mist" }) {
  return (
    <div className="card-panel rounded-lg px-4 py-3.5 border">
      <p className={`font-display text-2xl ${accent}`}>{value}</p>
      <p className="font-mono text-[11px] text-mist-faint mt-1">{label}</p>
    </div>
  );
}
