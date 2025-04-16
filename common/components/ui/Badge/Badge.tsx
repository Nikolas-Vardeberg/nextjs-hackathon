import { BadgeProps } from "./types";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";

export default function Badge({
  className,
  variant,
  size,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {props.children}
    </div>
  );
}

export const badgeVariants = cva(
  "inline-flex items-center rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "border-transparent bg-primary/10 text-primary",
        secondary: "border-transparent bg-gray-100 text-gray-600",
        white: "border-transparent bg-white text-gray-700",
        outline: "text-gray-800 border border-gray-200",
        success: "border-transparent bg-green-50 text-green-700",
        warning: "border-transparent bg-yellow-50 text-yellow-800",
        error: "border-transparent bg-red-50 text-red-700",
        info: "border-transparent bg-blue-50 text-blue-700",
        dashed: "border-dashed border border-gray-300 text-gray-500",
      },
      size: {
        sm: "text-xs px-2.5 py-0.5",
        md: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  },
);
