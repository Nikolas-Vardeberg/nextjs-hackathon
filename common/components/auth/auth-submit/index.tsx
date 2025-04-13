"use client";

import { ReactNode } from "react";
import Button from "@/common/components/ui/Button";

type AuthSubmitProps = {
  children: ReactNode;
  className?: string;
  loading: boolean;
};

export default function AuthSubmit({
  children,
  className,
  loading,
}: AuthSubmitProps) {
  return (
    <Button
      type="submit"
      variant="tealwave"
      disabled={loading}
      loading={loading}
      className={className}
    >
      {children}
    </Button>
  );
}
