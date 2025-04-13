"use client";

import { useSignUpForm } from "@/common/hooks/use-sign-up";
import { useFormContext } from "react-hook-form";
import Button from "../../ui/Button";
import { useAuthContextHook } from "@/common/providers/use-auth-context";
import SubmitButton from "@/common/components/auth/submit-button";

const ButtonHandler = () => {
  const { setCurrentStep, currentStep, loading } = useAuthContextHook();
  const { formState, getFieldState, getValues } = useFormContext();
  const { onGenerateOTP, loading: otpLoading } = useSignUpForm();

  const { isDirty: isName } = getFieldState("fullName", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState);

  if (currentStep === 3) {
    return (
      <SubmitButton loading={loading} className="w-full">
        Create account
      </SubmitButton>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="flex flex-row gap-3">
        <Button
          variant="inverted-tealwave"
          type="button"
          className="w-full"
          onClick={() => setCurrentStep((prev: number) => prev - 1)}
        >
          Back
        </Button>
        <SubmitButton
          loading={otpLoading}
          className="w-full"
          {...(isName &&
            isEmail &&
            isPassword && {
              onClick: () => {
                onGenerateOTP(
                  getValues("email"),
                  getValues("password"),
                  setCurrentStep,
                );
              },
            })}
        >
          Continue
        </SubmitButton>
      </div>
    );
  }

  return (
    <SubmitButton
      loading={loading}
      className="w-full"
      onClick={() => setCurrentStep((prev: number) => prev + 1)}
    >
      Continue
    </SubmitButton>
  );
};

export default ButtonHandler;
