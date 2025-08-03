import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";

export default async function Page() {
  const supabase = await createClient();
  const pathLogin = "/notes";
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    // Sudah login, redirect ke halaman protected
    redirect(pathLogin);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm pathLogin={pathLogin} />
      </div>
    </div>
  );
}
