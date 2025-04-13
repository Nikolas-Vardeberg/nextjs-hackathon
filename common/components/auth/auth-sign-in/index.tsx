"use client";

import { USER_LOGIN_FORM } from "@/common/constants/forms";
import FormGenerator from "@/common/components/auth/auth-sign-up/form-generator";
import { useFormContext } from "react-hook-form";
import AuthSubmit from "@/common/components/auth/auth-submit";
import { useSignInForm } from "@/common/hooks/use-sign-in";

const AuthSignInForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { loading } = useSignInForm();

  return (
    <>
      <div className="flex flex-col gap-6">
        {USER_LOGIN_FORM.map((field) => (
          <FormGenerator
            key={field.id}
            {...field}
            errors={errors}
            register={register}
            name={field.name}
          />
        ))}
      </div>

      <AuthSubmit loading={loading} className="w-full">
        Sign in
      </AuthSubmit>
    </>
  );
};

export default AuthSignInForm;
