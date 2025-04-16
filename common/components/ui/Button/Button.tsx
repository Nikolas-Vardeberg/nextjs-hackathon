import { ButtonProps } from "./types";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

function Button({
  loading,
  className,
  size,
  variant,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      data-testid="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin h-4 w-4" /> : children}
    </Component>
  );
}

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary/80 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary",
        "inverted-primary":
          "bg-white text-primary border border-primary hover:bg-primary hover:text-white",
        secondary:
          "bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline:
          "text-gray-600 border border-gray-600 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black",
        link: "inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors underline",
        "inverted-link":
          "inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors hover:underline",
        ghost: "hover:bg-gray-100 text-gray-500 hover:text-gray-700",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export { Button };
