import { HTMLAttributes } from "react";


export type BagdeProps = HTMLAttributes<HTMLDivElement> & {
    className?: string;
    variant?: "default";
}