"use client";

import { useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserLoginProps, UserLoginSchema } from "../schemas/auth.schema";

export const useSignInForm = () => {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!isLoaded) return;

      try {
        setLoading(true);

        const authenticated = await signIn.create({
          identifier: values.email,
          password: values.password,
        });

        if (authenticated.status === "complete") {
          await setActive({ session: authenticated.createdSessionId });
          router.push("/dashboard");
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
