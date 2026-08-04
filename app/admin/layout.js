"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [session, setSession] = useState(undefined); // undefined = checking

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/admin-login");
      } else {
        setSession(data.session);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!newSession) {
        router.replace("/admin-login");
      } else {
        setSession(newSession);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [router]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink">
        <Loader2 className="animate-spin text-signal" size={28} />
      </div>
    );
  }

  return <div className="min-h-screen bg-ink">{children}</div>;
}
