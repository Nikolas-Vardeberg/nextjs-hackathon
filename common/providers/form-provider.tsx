"use client";

import { FormProvider } from "react-hook-form";
import { useSignUpForm } from "../hooks/use-sign-up";
import { AuthContextProvider } from "./use-auth-context";
import { useSignInForm } from "../hooks/use-sign-in";

type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit } = useSignUpForm();

  return (
    <AuthContextProvider>
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
  const { methods, onHandleSubmit } = useSignInForm();

  return (
    <AuthContextProvider>
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
