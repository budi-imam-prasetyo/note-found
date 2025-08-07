import { SignUpForm } from "@/components/sign-up-form";
import { AuthWrapper } from "@/components/auth-wrapper";

export default function Page() {
  return (
    <AuthWrapper>
      <SignUpForm />
    </AuthWrapper>
  );
}
