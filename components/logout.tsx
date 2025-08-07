"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return <button className="text-sm text-muted-foreground w-full text-start px-2 rounded-sm hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50" onClick={logout}>Logout</button>;
}
