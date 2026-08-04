"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Lock, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/admin");
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setLoading(false);
    if (signInError) {
      setError("Incorrect email or password.");
      return;
    }
    router.replace("/admin");
  };

  if (checking) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink bp-grid px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="corner-frame w-full max-w-sm card-panel rounded-xl border border-white/10 p-8 bg-ink-700/90 backdrop-blur"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-lg text-mist">AFS<span className="text-signal">_</span></span>
        </div>
        <p className="font-mono text-xs text-signal mb-6">$ sudo login --admin</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-mist-faint mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="founder@afsdevelopers.com"
              className="w-full rounded-md bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-sm text-mist placeholder:text-mist-faint focus:outline-none focus:border-signal transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-mist-faint mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md bg-white/[0.03] border border-white/10 px-3.5 py-2.5 text-sm text-mist placeholder:text-mist-faint focus:outline-none focus:border-signal transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-300">
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-signal text-ink font-semibold py-3 hover:bg-signal-glow transition-colors disabled:opacity-70"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-mist-faint font-mono">
          founder accounts only · no public sign-up
        </p>
      </motion.div>
    </div>
  );
}
