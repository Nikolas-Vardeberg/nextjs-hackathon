"use client";

import React from "react";
import { FormProvider } from "react-hook-form";
import { useSignUpForm } from "../hooks/use-sign-up";
import { AuthContextProvider } from "./use-auth-context";
import { useSignInForm } from "../hooks/use-sign-in";

type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useSignUpForm();

  return (
    <AuthContextProvider loading={loading}>
      <FormProvider {...methods}>
        <form
          onSubmit={onHandleSubmit}
          className="w-full flex flex-col justify-between gap-6 h-full"
        >
          {children}
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

const SignInFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useSignInForm();

  return (
    <AuthContextProvider loading={loading}>
      <FormProvider {...methods}>
        <form
          onSubmit={onHandleSubmit}
          className="w-full flex flex-col justify-between gap-6 h-full"
        >
          {children}
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

export { SignInFormProvider, SignUpFormProvider };
