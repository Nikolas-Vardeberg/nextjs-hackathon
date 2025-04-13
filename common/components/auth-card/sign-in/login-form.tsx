"use client";

import { USER_LOGIN_FORM } from "@/common/constants/forms";
import FormGenerator from "../sign-up/form-generator";
import { useFormContext } from "react-hook-form";
import SubmitButton from "../submit-button";
import { useSignInForm } from "@/common/hooks/use-sign-in";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const { loading } = useSignInForm();

  return (
    <>
      {USER_LOGIN_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}

      <div className="w-full flex flex-col gap-3 items-center">
        <SubmitButton loading={loading} className="w-full">
          Sign in
        </SubmitButton>
      </div>
    </>
  );
};

export default LoginForm;
