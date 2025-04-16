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
  const [error, setError] = useState<string | null>(null);
  const { signUp, isLoaded, setActive } = useSignUp();

  const methods = useForm<UserRegistrationProps>({
    resolver: zodResolver(UserRegistrationSchema),
    mode: "onChange",
  });

  const onGenerateOTP = async (
    email: string,
    password: string,
    onNext?: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    if (!isLoaded) return;

    try {
      setLoading(true);
      setError(null);
      await signUp.create({
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setLoading(false);
      onNext?.((prev) => prev + 1);
    } catch (e) {
      setLoading(false);
      console.error("Error generating OTP", e);
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Error generating verification code. Please try again.");
      }
    }
  };

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserRegistrationProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);
        setError(null);
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code: values.otp,
        });

        if (completeSignUp.status !== "complete") {
          setLoading(false);
          setError("Something went wrong with verification");
          return;
        }

        if (completeSignUp.status === "complete") {
          if (!signUp.createdUserId) {
            setLoading(false);
            setError("Something went wrong");
            return;
          }
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
              // TODO: change this to clerkUserID
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
            setLoading(false);
            setError("Something went wrong with registration");
          }
        }
      } catch (e) {
        setLoading(false);
        console.error("Error signing up", e);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An error occurred during sign up");
        }
      }
    },
  );

  return {
    methods,
    onGenerateOTP,
    onHandleSubmit,
    loading,
    error,
    setError,
  };
};
