import clsx from "clsx";
import { ButtonProps } from "./types";
import { Slottable } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

function Button({ loading, className, variant, ...props }: ButtonProps) {
  const Component = "button";

  return (
    <Component
      className={clsx(buttonVariants({ variant }), className)}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <Slottable>{props.children}</Slottable>
      )}
    </Component>
  );
}

export const buttonVariants = cva(
  "inline-flex items-center hover:underline justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-black/80",
        destructive: "bg-red-500 text-black",
        outline: "text-black border border-black",
        link: "underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export { Button };
