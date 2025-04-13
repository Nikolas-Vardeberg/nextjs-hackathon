"use client";

import Container from "@/common/components/atoms/layouts/Container";
import Hero from "@/common/components/home/hero";
import useRecommendations from "@/common/providers/recommendations";
import GridSection from "./grid-section";

export default function HomeView() {
  const { loadRecommendations, recommendations, isLoading } =
    useRecommendations();

  return (
    <>
      <Hero
        onSearch={(answers) => !isLoading && loadRecommendations?.(answers)}
      />
      <Container as="section" className="py-20 flex flex-col gap-10">
        {recommendations &&
          Object.entries(recommendations.rentals).map(([key, value]) => (
            <div key={key}>
              {/* Render the section title */}

              {/* Render the grid section */}
              <GridSection
                title={key.replace(/_/g, " ")}
                recommendations={value}
              />
            </div>
          ))}
      </Container>
      {/*TODO NEED TAB SECTIONS*/}
      <Container as="section" className="py-20 flex flex-col gap-10">
        {recommendations &&
          Object.entries(recommendations.vacation_destinations || []).map(
            ([key, value]) => (
              <div key={key}>
                {/* Render the section title */}

                {/* Render the grid section */}
                <GridSection
                  title={key.replace(/_/g, " ")}
                  recommendations={value}
                />
              </div>
            ),
          )}
      </Container>
    </>
  );
}
