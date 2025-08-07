import { LoginForm } from "@/components/login-form";
import { AuthWrapper } from "@/components/auth-wrapper";

export default function Page() {
  return (
    <AuthWrapper>
      <LoginForm pathLogin="/notes" />
    </AuthWrapper>
  );
}
