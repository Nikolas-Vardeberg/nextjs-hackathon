"use client";

import Container from "@/common/components/atoms/layouts/Container";
import { cn } from "@/lib/cn";

export type HeroProps = {
  backgroundImage?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Hero({
  backgroundImage,
  className,
  children,
}: HeroProps) {
  const fallbackBackgroundColor = backgroundImage ? undefined : "bg-black";

  return (
    <section
      className={cn(
        "relative min-h-[80vh] flex flex-col justify-center py-28",
        fallbackBackgroundColor,
        className,
      )}
    >
      <Container className="px-4 sm:px-6">{children}</Container>

      {backgroundImage && (
        <div
          style={{ backgroundImage: `url(${backgroundImage})` }}
          className="absolute inset-0 bg-black/30 z-[-1] bg-cover bg-[60%_center] md:bg-center"
        />
      )}
    </section>
  );
}
