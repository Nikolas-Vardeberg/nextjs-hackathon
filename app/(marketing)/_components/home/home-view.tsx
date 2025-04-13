"use client";

import Container from "@/common/components/atoms/layouts/Container";
import { Grid } from "@/common/components/atoms/layouts/Grid";
import Hero from "@/app/(marketing)/_components/home/Hero/Hero";
import useRecommendations from "@/common/providers/recommendations";

export default function HomeView() {
  const { loadRecommendations, recommendations, isLoading } =
    useRecommendations();

  return (
    <>
      <Hero
        onSearch={(answers) => !isLoading && loadRecommendations?.(answers)}
      />
      <Container as="section" className="py-20 flex flex-col gap-10">
        <Grid columns={{ sm: 1, md: 2, lg: 3 }} className="w-full">
          <h1>Top Rental Recommendations</h1>
          {recommendations?.rentals.top_10_recommendations.map((rec, index) => {
            return (
              <div className="w-full bg-red-500 h-52" key={index}>
                {rec.business_name}
              </div>
            );
          })}
        </Grid>

        <Grid columns={{ sm: 1, md: 3, lg: 6 }} className="w-full">
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
        </Grid>

        <Grid columns={{ sm: 1 }}>
          <div className="w-full bg-red-500 h-[700px]"></div>
        </Grid>

        <Grid columns={{ sm: 1, md: 2, lg: 4 }} className="w-full">
          <div className="w-full bg-red-500 h-[350px]"></div>
          <div className="w-full bg-red-500 h-[350px]"></div>
          <div className="w-full bg-red-500 h-[350px]"></div>
          <div className="w-full bg-red-500 h-[350px]"></div>
        </Grid>

        <Grid columns={{ sm: 1, md: 3, lg: 5 }} className="w-full">
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
          <div className="w-full bg-red-500 h-96"></div>
        </Grid>
      </Container>
    </>
  );
}
