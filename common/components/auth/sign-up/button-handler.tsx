"use client";

import { useFormContext } from "react-hook-form";
import Button from "@/common/components/ui/Button";
import { useAuthContextHook } from "@/common/providers/use-auth-context";
import SubmitButton from "@/common/components/auth/submit-button";

const ButtonHandler = () => {
  const { setCurrentStep, currentStep, loading, onGenerateOTP } =
    useAuthContextHook();
  const { formState, getFieldState, getValues, trigger } = useFormContext();

  const { isDirty: isName } = getFieldState("fullName", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState);
  const { isDirty: isConfirmPassword } = getFieldState(
    "confirmPassword",
    formState,
  );

  const isFormValid = isName && isEmail && isPassword && isConfirmPassword;

  const handleFirstStepContinue = async () => {
    const isValid = await trigger("type");
    if (isValid) {
      setCurrentStep((prev: number) => prev + 1);
    }
  };

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
          loading={loading}
          className="w-full"
          {...(isFormValid &&
            onGenerateOTP && {
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
      onClick={handleFirstStepContinue}
    >
      Continue
    </SubmitButton>
  );
};

export default ButtonHandler;
