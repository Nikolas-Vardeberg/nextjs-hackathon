import { HtmlHTMLAttributes } from "react";

export type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement> & {
  size?: "icon" | "default";
  variant?: "default" | "outline" | "link";
  loading?: boolean;
  className?: string;
  asChild?: boolean;
};
