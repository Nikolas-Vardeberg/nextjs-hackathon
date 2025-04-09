import clsx from "clsx"
import React from "react";

type HeadingProps = {
    children: React.ReactNode;
    className?: string;
}

const SectionHeading: React.FC<HeadingProps> = ({ children, className }: HeadingProps) => {
    return(
        <h2 className={clsx("inline-flex flex-wrap", className)}>
            {children}
        </h2>
    )
}


export { SectionHeading };