"use client";

import { useSignUp } from "@clerk/nextjs";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  UserRegistrationProps,
  UserRegistrationSchema,
} from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export const useSignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { signUp, isLoaded, setActive } = useSignUp();

  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    defaultValues: {
      type: "user",
    },
    mode: "onChange",
  });

  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      onNext((prev) => prev + 1);
    } catch (e) {
      console.log(e);
    }
  };

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
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
          const now = new Date();
          const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000); // https://clerk.com/docs/advanced-usage/clerk-idp#when-do-the-tokens-expire

          const registered = await fetch("/api/users/user-docs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fullName: values.fullName,
              authToken: signUp.createdSessionId,
              clerkUserID: signUp.emailAddress,
              authExpiry: twoHoursFromNow,
            }),
          });

          if (registered?.status == 200) {
            await setActive({
              session: completeSignUp.createdSessionId,
              redirectUrl: "/dashboard",
            });
          }

          if (registered?.status == 400) {
            return { message: "Something went wrong" };
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  );

  return {
    methods,
    onGenerateOTP,
    onHandleSubmit,
    loading,
  };
};
