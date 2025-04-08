import { HTMLAttributes } from "react";

export type InputProps = HTMLAttributes<HTMLInputElement> & {
    className?: string;
}