"use client";

import Container from "@/common/components/atoms/layouts/Container";
import Hero from "@/app/(marketing)/_components/home/Hero/Hero";
import useRecommendations from "@/common/providers/recommendations";
import GridSection from "./GridSection";

export default function HomeView() {
  const { loadRecommendations, recommendations, isLoading } =
    useRecommendations();

  return (
    <>
      <Hero
        onSearch={(answers) => !isLoading && loadRecommendations?.(answers)}
      />
      <Container as="section" className="py-20 flex flex-col gap-10">
        <GridSection
          title="Top Recommendations"
          recommendations={recommendations?.rentals.top_10_recommendations}
        />
      </Container>
    </>
  );
}
