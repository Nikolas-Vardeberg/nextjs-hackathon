"use client";

import { useFormContext } from "react-hook-form";
import OTPInput from "./otp-input";
import { useSignUpForm } from "@/common/hooks/use-sign-up";
import { useState, useEffect } from "react";

type OTPFormProps = {
  setOTP: React.Dispatch<React.SetStateAction<string>>;
  onOTP: string;
};

const OTPForm = ({ onOTP, setOTP }: OTPFormProps) => {
  const { onGenerateOTP } = useSignUpForm();
  const { getValues } = useFormContext();
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [cooldown]);

  const handleResend = () => {
    if (cooldown > 0) return;

    onGenerateOTP(getValues("email"), getValues("password"));
    setCooldown(60); // 60 second cooldown
  };
  return (
    <div className="flex flex-col items-center space-y-5 w-full max-w-full px-2">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900">Verification Code</h3>
        <p className="text-sm text-gray-500 mt-1">
          We&apos;ve sent a 6-digit code to your email address
        </p>
      </div>

      <div className="w-full max-w-md">
        <OTPInput otp={onOTP} setOtp={setOTP} />
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>
          Didn&apos;t receive a code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0}
            className={`font-medium ${
              cooldown > 0
                ? "text-gray-400"
                : "text-primary hover:text-primary/80  cursor-pointer"
            }`}
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPForm;
