"use client";

import { useSignUpForm } from "@/common/hooks/use-sign-up";
import { useFormContext } from "react-hook-form";
import Button from "../ui/Button";
import Link from "next/link";
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
      <div className="w-full flex flex-col gap-3 items-center">
        <Button typeof="submit" className="w-full">
          Create an account
        </Button>
        <p>
          Already have an account?{" "}
          <Link href="/sign-up" className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="w-full flex flex-col gap-3 items-center">
        <Button
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
        <p>
          Already have an account?{" "}
          <Link href="/sign-up" className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      <Button
        typeof="submit"
        className="w-full"
        onClick={() => setCurrentStep((prev: number) => prev + 1)}
      >
        Continue
      </Button>
      <p>
        Already have an account?{" "}
        <Link href="/sign-up" className="font-bold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default ButtonHandler;
