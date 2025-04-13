"use client";

import { useSignUpForm } from "@/common/hooks/use-sign-up";
import { useFormContext } from "react-hook-form";
import Button from "../../ui/Button";
import { useAuthContextHook } from "@/common/providers/use-auth-context";

const ButtonHandler = () => {
  const { setCurrentStep, currentStep } = useAuthContextHook();
  const { formState, getFieldState, getValues } = useFormContext();
  const { onGenerateOTP } = useSignUpForm();

  const { isDirty: isName } = getFieldState("fullName", formState);
  const { isDirty: isEmail } = getFieldState("email", formState);
  const { isDirty: isPassword } = getFieldState("password", formState);

  if (currentStep === 3) {
    return (
      <Button variant="tealwave" typeof="submit" className="w-full">
        Create an account
      </Button>
    );
  }

  if (currentStep === 2) {
    return (
      <Button
        variant="tealwave"
        typeof="submit"
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
      </Button>
    );
  }

  return (
    <Button
      variant="tealwave"
      typeof="submit"
      className="w-full"
      onClick={() => setCurrentStep((prev: number) => prev + 1)}
    >
      Continue
    </Button>
  );
};

export default ButtonHandler;
