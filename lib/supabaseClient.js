import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't throw during build — just warn. The form will surface a clear
  // error if someone tries to submit without real credentials configured.
  console.warn(
    "[AFS Developers] Missing Supabase env vars. Copy .env.local.example to .env.local and fill in your project keys."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
