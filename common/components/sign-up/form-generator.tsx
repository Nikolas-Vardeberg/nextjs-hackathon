import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"

type Props = {
    type: "text" | "email" | "password";
    inputType: "select" | "input" | "textarea";
    options?: { value: string; label: string; id: string }[];
    label?: string;
    placeholder: string;
    register: UseFormRegister<any>;
    name: string;
    errors: FieldErrors<FieldValues>;
    lines?: number;
    form?: string; 
}

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
    options
}: Props) => {
    switch (inputType) {
        case "input":
            return(
                <label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
                    {label && label}
                    <input 
                        id={`input-${label}`}
                        type={type}
                        placeholder={placeholder}
                        form={form}
                        {...register(name)}
                    />
                    <ErrorMessage 
                        errors={errors}
                        name={name}
                        render={({ message }) => (
                            <p className="text-red-500">{message === "Required" ? "": message}</p>
                        )}
                    />
                </label>
            )
            
        case "select": 
            return(
                <label htmlFor={`select-${label}`}>
                    {label && label}
                    <select
                        form={form}
                        id={`select-${label}`}
                        {...register(name)}
                    >
                        {options?.length && options.map((options) => (
                            <option value={options.value} key={options.id}>
                                {options.label}
                            </option>
                        ))}
                    </select>
                    <ErrorMessage 
                        errors={errors}
                        name={name}
                        render={({ message }) => (
                            <p className="text-red-500">{message === "Required" ? "": message}</p>
                        )}
                    />
                </label>
            )

        case "textarea":
            return(
                <label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
                    {label && label}
                    <textarea 
                        form={form}
                        id={`input-${label}`}
                        placeholder={placeholder}
                        {...register(name)}
                        rows={lines}
                    />
                    <ErrorMessage 
                        errors={errors}
                        name={name}
                        render={({ message }) => (
                            <p className="text-red-500">{message === "Required" ? "": message}</p>
                        )}               
                    />
                </label>
            )
        default: return <></>
    }
}

export default FormGenerator;