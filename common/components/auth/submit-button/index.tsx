"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import Button from "@/common/components/ui/Button";

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
  loading: boolean;
};

export default function SubmitButton({
  children,
  className,
  loading,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      variant="tealwave"
      disabled={loading}
      loading={loading}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
}
