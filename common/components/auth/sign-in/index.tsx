"use client";

import { USER_LOGIN_FORM } from "@/common/constants/forms";
import FormGenerator from "@/common/components/auth/sign-up/form-generator";
import { useFormContext } from "react-hook-form";
import SubmitButton from "@/common/components/auth/submit-button";
import { useSignInForm } from "@/common/hooks/use-sign-in";

const SignInForm = () => {
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

      <SubmitButton loading={loading} className="w-full">
        Sign in
      </SubmitButton>
    </>
  );
};

export default SignInForm;
