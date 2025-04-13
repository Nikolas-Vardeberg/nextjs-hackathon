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
        <form onSubmit={onHandleSubmit}>
          <div className="flex flex-col justify-between gap-3 h-full">
            {children}
          </div>
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
        <form onSubmit={onHandleSubmit} className="w-full">
          <div className="flex flex-col justify-between gap-3 h-full">
            {children}
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

export { SignInFormProvider, SignUpFormProvider };
