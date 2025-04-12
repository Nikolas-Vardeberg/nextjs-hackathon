"use client";

import { FormProvider } from "react-hook-form";
import { useSignUpForm } from "../hooks/use-sign-up";
import Loader from "../components/ui/Loader";
import { AuthContextProvider } from "./use-auth-context";
import { useSignInForm } from "../hooks/use-sign-in";

type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useSignUpForm();

  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit}>
          <div className="flex flex-col justify-between gap-3 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

const SignInFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useSignInForm();

  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className="w-full">
          <div className="flex flex-col justify-between gap-3 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

export { SignInFormProvider, SignUpFormProvider };
