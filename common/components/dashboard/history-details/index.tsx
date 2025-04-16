"use client";

import { notFound } from "next/navigation";
import Container from "../../atoms/layouts/Container";
import SearchesSkeleton from "../searches-skeleton";
import useRecommendation from "../../../hooks/use-recommendation";
import useTabs from "./use-tabs";
import Header from "./header";
import SearchCriteria from "./search-criteria";
import RecommendationsTabs from "./recommendations-tabs";

export default function HistoryDetailsView({ id }: { id: string }) {
  const { recommendation, isLoading } = useRecommendation(id);
  const { activeTab, handleTabChange } = useTabs();

  if (isLoading) {
    return <SearchesSkeleton />;
  }

  if (!recommendation && !isLoading) {
    notFound();
  }

  if (!recommendation) {
    notFound();
  }

  const hasDestinations =
    !!recommendation.rawRecommendationsData?.vacation_destinations
      ?.top_10_recommendations &&
    recommendation.rawRecommendationsData.vacation_destinations
      .top_10_recommendations.length > 0;

  const hasRentals =
    !!recommendation.rawRecommendationsData?.rentals?.top_10_recommendations &&
    recommendation.rawRecommendationsData.rentals.top_10_recommendations
      .length > 0;

  const destinationRecs =
    recommendation.rawRecommendationsData?.vacation_destinations
      ?.top_10_recommendations || [];

  const rentalRecs =
    recommendation.rawRecommendationsData?.rentals?.top_10_recommendations ||
    [];

  return (
    <div className="bg-gray-100 min-h-screen w-full py-10">
      <Container>
        <Header recommendation={recommendation} />
        <SearchCriteria answers={recommendation.answers || []} />
        <RecommendationsTabs
          activeTab={activeTab}
          handleTabChange={handleTabChange}
          destinationRecs={destinationRecs}
          rentalRecs={rentalRecs}
          hasDestinations={hasDestinations}
          hasRentals={hasRentals}
        />
      </Container>
    </div>
  );
}
