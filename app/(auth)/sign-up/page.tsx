import AuthCard from "@/common/components/auth-card";
import ButtonHandler from "@/common/components/auth-card/sign-up/button-handler";
import HightlightBar from "@/common/components/auth-card/sign-up/highlight-bar";
import RegistrationStep from "@/common/components/auth-card/sign-up/registration-step";
import { SignUpFormProvider } from "@/common/providers/form-provider";

export default function Page() {
  return (
    <AuthCard
      title="Sign up"
      description="Sign up to your account"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/sign-in"
    >
      <div id="clerk-captcha" />

      <SignUpFormProvider>
        <div className="flex flex-col gap-3">
          <RegistrationStep />
          <ButtonHandler />
          <HightlightBar />
        </div>
      </SignUpFormProvider>
    </AuthCard>
  );
}
