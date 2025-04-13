import AuthCard from "@/common/components/auth-card";
import LoginForm from "@/common/components/auth-card/sign-in/login-form";
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
        <LoginForm />
      </SignInFormProvider>
    </AuthCard>
  );
}
