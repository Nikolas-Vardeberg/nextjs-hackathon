import type { HTMLAttributes } from "react";
import type { badgeVariants } from "./Badge";
import type { VariantProps } from "class-variance-authority";

export type BadgeProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {
    className?: string;
  };
