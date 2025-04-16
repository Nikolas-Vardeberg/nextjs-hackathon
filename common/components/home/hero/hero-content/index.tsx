import { ReactNode } from "react";

export type HeroContentProps = {
  title: string | ReactNode;
  description: string | ReactNode;
  alignment?: "left" | "center";
  children?: ReactNode;
};

export function HeroContent({
  title,
  description,
  alignment = "left",
  children,
}: HeroContentProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
  };

  return (
    <div
      className={`max-w-lg md:max-w-4xl xl:max-w-3xl ${alignmentClasses[alignment]}`}
    >
      <h1 className="text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-bold mb-3 md:mb-4 text-white">
        {title}
      </h1>
      <p className="text-lg sm:text-xl md:text-xl xl:text-2xl mb-6 md:mb-8 text-white/90 max-w-xs sm:max-w-sm md:max-w-md xl:max-w-lg">
        {description}
      </p>
      {children}
    </div>
  );
}
