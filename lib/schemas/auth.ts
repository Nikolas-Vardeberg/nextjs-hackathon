import { z, ZodType } from "zod";

export const userTypes = ["none", "traveler", "explorer"] as const;
export type UserType = (typeof userTypes)[number];

export type UserRegistrationProps = {
  type: UserType;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    type: z.enum(userTypes, {
      message: "You must select a user type",
    }),
    fullName: z
      .string()
      .min(4, { message: "Full name must be at least 4 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(64, { message: "Password must be at most 64 characters long" }),
    confirmPassword: z.string(),
    otp: z
      .string()
      .min(6, { message: "OTP must be at least 6 characters long" }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type UserLoginProps = {
  email: string;
  password: string;
};

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(64, { message: "Password must be at most 64 characters long" }),
});
