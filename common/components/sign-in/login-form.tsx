"use client";

import { USER_LOGIN_FORM } from "@/common/constants/forms";
import FormGenerator from "../sign-up/form-generator";
import { useFormContext } from "react-hook-form";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <h2>Login</h2>
      <p>You will recive a one time password</p>
      {USER_LOGIN_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </>
  );
};

export default LoginForm;
