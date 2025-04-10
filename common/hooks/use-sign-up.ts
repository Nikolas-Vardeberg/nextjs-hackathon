"use client"

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UserRegistrationProps, UserRegistrationSchema } from "../schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { onCompleteUserRegistration } from "../../actions/auth";


export const useSignUpForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { signUp, isLoaded, setActive } = useSignUp();
    const router = useRouter();
    const methods = useForm<UserRegistrationProps>({
        resolver: zodResolver(UserRegistrationSchema),
        defaultValues: {
            type: "user",
        },
        mode: "onChange",
    });

    const onGenerateOTP = async(email: string, password: string, onNext: React.Dispatch<React.SetStateAction<number>>) => {
        if (!isLoaded) return;

        try {
            await signUp.create({
                emailAddress: email,
                password: password,
            })

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            onNext((prev) => prev + 1);
        } catch (e) {
            console.log(e);
        }
    }

    const onHandleSubmit = methods.handleSubmit(async (values: UserRegistrationProps) => {
        if (!isLoaded) return;

        try {
            setLoading(true);
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: values.otp,
            });

            if (completeSignUp.status !== "complete") {
                return { message: "Something went wrong" };
            }

            if (completeSignUp.status === "complete") {
                if (!signUp.createdUserId) return;

                const registred = await onCompleteUserRegistration(
                    values.fullname,
                    signUp.createdUserId,
                    values.type
                )

                if (registred?.status == 200 && registred.user) {
                    await setActive({
                        session: completeSignUp.createdSessionId,
                    });

                    setLoading(true);
                    router.push("/dashboard");
                }

                if (registred?.status == 400) {
                    return { message: "Something went wrong" };
                }
            }
        } catch (e) {
            console.log(e);
        }
    })

    return {
        methods,
        onGenerateOTP,
        onHandleSubmit,
        loading,
    }
}