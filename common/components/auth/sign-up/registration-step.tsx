"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { useAuthContextHook } from "@/common/providers/use-auth-context";
import TypeSelectionForm from "./type-selection-form";
import AccountDetailsForm from "./account-details-form";
import OTPForm from "./otp-form";
import type { UserType } from "@/lib/schemas/auth";

const RegistrationStep = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { currentStep } = useAuthContextHook();
  const [onOTP, setOnOTP] = useState<string>("");
  const [onUserType, setOnUserType] = useState<UserType | undefined>(undefined);

  setValue("otp", onOTP);

  return (
    <>
      {currentStep === 1 && (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
          errors={errors}
        />
      )}
      {currentStep === 2 && (
        <AccountDetailsForm errors={errors} register={register} />
      )}
      {currentStep === 3 && <OTPForm onOTP={onOTP} setOTP={setOnOTP} />}
    </>
  );
};

export default RegistrationStep;
