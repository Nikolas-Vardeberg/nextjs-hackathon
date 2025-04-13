"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { useAuthContextHook } from "@/common/providers/use-auth-context";
import TypeSelectionForm from "./type-selection-form";
import dynamic from "next/dynamic";

const DetailForm = dynamic(() => import("./account-details-form"), {
  ssr: false,
});

const OTPForm = dynamic(() => import("./otp-form"), {
  ssr: true,
});

const RegistrationStep = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const { currentStep } = useAuthContextHook();
  const [onOTP, setOnOTP] = useState<string>("");
  const [onUserType, setOnUserType] = useState<"none" | "travler" | "explorer">(
    "travler",
  );

  setValue("otp", onOTP);

  switch (currentStep) {
    case 1:
      return (
        <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        />
      );
    case 2:
      return <DetailForm errors={errors} register={register}></DetailForm>;
    case 3:
      return <OTPForm onOTP={onOTP} setOTP={setOnOTP} />;
  }
};

export default RegistrationStep;
