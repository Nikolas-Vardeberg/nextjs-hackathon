import { Home, Plane, Car, type LucideIcon } from "lucide-react";

type UserRegistrationProps = {
  id: string;
  type: "email" | "text" | "password";
  inputType: "select" | "input";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  name: string;
};

type UserRegistrationTypeProps = {
  value: string;
  title: string;
  text: string;
  icon: LucideIcon;
};

export const USER_REGISTRATION_FORM: UserRegistrationProps[] = [
  {
    id: "1",
    inputType: "input",
    label: "Full Name",
    placeholder: "John Smith",
    name: "fullName",
    type: "text",
  },
  {
    id: "2",
    inputType: "input",
    label: "Email",
    placeholder: "you@example.com",
    name: "email",
    type: "email",
  },
  {
    id: "3",
    inputType: "input",
    label: "Password",
    placeholder: "Min. 8 characters",
    name: "password",
    type: "password",
  },
  {
    id: "4",
    inputType: "input",
    label: "Confirm Password",
    placeholder: "Enter password again",
    name: "confirmPassword",
    type: "password",
  },
];

export const USER_LOGIN_FORM: UserRegistrationProps[] = [
  {
    id: "1",
    inputType: "input",
    label: "Email",
    placeholder: "you@example.com",
    name: "email",
    type: "email",
  },
  {
    id: "2",
    inputType: "input",
    label: "Password",
    placeholder: "Enter your password",
    name: "password",
    type: "password",
  },
];

export const USER_TYPE_FORM: UserRegistrationTypeProps[] = [
  {
    value: "explorer",
    title: "Frequent Explorer",
    text: "I travel 5-10 times per year",
    icon: Plane,
  },
  {
    value: "traveler",
    title: "Regular Traveler",
    text: "I travel 3-5 times per year",
    icon: Car,
  },

  {
    value: "none",
    title: "Homebody",
    text: "I rarely or never travel",
    icon: Home,
  },
];
