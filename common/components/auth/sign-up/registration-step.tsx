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

  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
          errors={errors}
        />
      );
    case 2:
      return <AccountDetailsForm errors={errors} register={register} />;
    case 3:
      return <OTPForm onOTP={onOTP} setOTP={setOnOTP} />;
  }
};

export default RegistrationStep;
