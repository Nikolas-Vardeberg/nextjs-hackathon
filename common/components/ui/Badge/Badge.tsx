import clsx from "clsx";
import { BagdeProps } from "./types";
import { cva } from "class-variance-authority";

export default function Badge({
    className,
    variant,
    ...props
}: BagdeProps) {
    return(
        <div className={clsx(badgeVariants({ variant }), className)} {...props}>
            {props.children}
        </div>
    )
}

const badgeVariants = cva(
    "inline-flex items-center justify-center rounded-md bg-black text-white text-sm font-medium",
    {
        variants: {
            variant: {
                default: "bg-black text-white",
            }, 
        }
    }
)
