"use client";

import { ReactNode } from "react";
import Button from "@/common/components/ui/Button";

type SubmitButtonProps = {
  children: ReactNode;
  className?: string;
  loading: boolean;
};

export default function SubmitButton({
  children,
  className,
  loading,
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading}
      loading={loading}
      className={className}
    >
      {children}
    </Button>
  );
}
