import AuthCard from "@/common/components/auth/auth-card";
import AuthSignInForm from "@/common/components/auth/auth-sign-in";
import { SignInFormProvider } from "@/common/providers/form-provider";

export default function Page() {
  return (
    <AuthCard
      title="Sign in"
      description="Welcome back! Sign in to continue"
      footerText="Dont have an account?"
      footerLinkText="Create one"
      footerLinkHref="/sign-up"
    >
      <SignInFormProvider>
        <AuthSignInForm />
      </SignInFormProvider>
    </AuthCard>
  );
}
