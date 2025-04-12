"use client";

import Container from "@/common/components/atoms/layouts/Container";
import { HeroSearch, type HeroSearchProps } from "./HeroSearch";
import { HeroContent, type HeroContentProps } from "./HeroContent";
import { cn } from "@/lib/cn";

export type HeroProps = {
  contentProps: Omit<HeroContentProps, "children">;
  searchProps?: HeroSearchProps;
  backgroundImage?: string;
  className?: string;
};

export default function Hero({
  contentProps,
  searchProps,
  backgroundImage,
  className,
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
      <Container className="px-4 sm:px-6">
        <HeroContent {...contentProps}>
          {searchProps && <HeroSearch {...searchProps} />}
        </HeroContent>
      </Container>

      {backgroundImage && (
        <div
          style={{ backgroundImage: `url(${backgroundImage})` }}
          className="absolute inset-0 bg-black/30 z-[-1] bg-cover bg-[60%_center] md:bg-center"
        />
      )}
    </section>
  );
}
