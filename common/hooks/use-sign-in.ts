"use client";

import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserLoginProps, UserLoginSchema } from "@/lib/schemas/auth";

export const useSignInForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!isLoaded) return;

      setLoading(true);

      try {
        const authenticated = await signIn.create({
          identifier: values.email,
          password: values.password,
        });

        if (authenticated.status === "complete") {
          const now = new Date();
          const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);

          await fetch("/api/users/user-docs", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              authToken: authenticated.createdSessionId,
              clerkUserID: authenticated.identifier,
              authExpiry: twoHoursFromNow,
            }),
          });

          setLoading(false);

          await setActive({
            session: authenticated.createdSessionId,
            redirectUrl: "/dashboard",
          });
        } else {
          setLoading(false);
        }
      } catch (error: unknown) {
        setLoading(false);
        console.log(error);
        if (error instanceof Error) {
          return { message: error.message };
        } else {
          return { message: "An unknown error occurred" };
        }
      }
    },
  );

  return {
    methods,
    loading,
    onHandleSubmit,
  };
};
