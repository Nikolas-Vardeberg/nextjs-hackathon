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
      setLoading(true);
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setLoading(false);

      onNext((prev) => prev + 1);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded) return;

      console.log("submitted otp", values.otp);

      try {
        setLoading(true);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        });
        console.log("completeSignUp status", completeSignUp.status);

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

          console.log("registered status", registered?.status);

          if (registered?.status == 200) {
            setLoading(false);
            await setActive({
              session: completeSignUp.createdSessionId,
              redirectUrl: "/dashboard",
            });
          }

          if (registered?.status == 400) {
            setLoading(false);
            return { message: "Something went wrong" };
          }
        }
      } catch (e) {
        setLoading(false);
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
