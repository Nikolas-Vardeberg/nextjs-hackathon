import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Input from "../../ui/Input";

type Props = {
  type: "text" | "email" | "password";
  inputType: "select" | "input" | "textarea";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
  form?: string;
  autoFocus?: boolean;
};

const FormGenerator = ({
  errors,
  inputType,
  name,
  placeholder,
  register,
  type,
  form,
  label,
  lines,
  options,
  autoFocus,
}: Props) => {
  switch (inputType) {
    case "input":
      return (
        <label className="flex flex-col gap-2" htmlFor={`input-${name}`}>
          {label && <span className="font-semibold text-sm">{label}</span>}
          <Input
            id={`input-${name}`}
            type={type}
            placeholder={placeholder}
            form={form}
            autoFocus={autoFocus}
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-500 text-sm">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </label>
      );

    case "select":
      return (
        <label className="flex flex-col gap-2" htmlFor={`select-${name}`}>
          {label && <span className="font-semibold text-sm">{label}</span>}
          <select
            form={form}
            id={`select-${name}`}
            {...register(name)}
            autoFocus={autoFocus}
          >
            {options?.length &&
              options.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.label}
                </option>
              ))}
          </select>
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-500 text-sm">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </label>
      );

    case "textarea":
      return (
        <label className="flex flex-col gap-2" htmlFor={`input-${name}`}>
          {label && <span className="font-semibold text-sm">{label}</span>}
          <textarea
            form={form}
            id={`input-${name}`}
            placeholder={placeholder}
            {...register(name)}
            rows={lines}
            autoFocus={autoFocus}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-500 text-sm">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </label>
      );
    default:
      return <></>;
  }
};

export default FormGenerator;
