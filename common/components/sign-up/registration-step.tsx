"use client"

import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { useAuthContextHook } from "@/common/providers/use-auth-context";



const RegistrationStep = () => {
    const { register, formState: {errors}, setValue } = useFormContext();
    const { currentStep } = useAuthContextHook();
    const [onOTP, setOnOTP] = useState<string>("")
    const [onUserType, setOnUserType] = useState<"none" | "travler" | "explorer">("travler");

    setValue("otp", onOTP)

    switch (currentStep) {
        case 1: <h1>What type of visitor are you</h1>
        case 2:
            return <h1>Enter your details</h1>
        case 3:
            return <h1>Enter OTP</h1>
    }
}

export default RegistrationStep;