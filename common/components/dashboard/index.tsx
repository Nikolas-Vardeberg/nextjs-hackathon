"use client";
import { useState } from "react";
import { HeroSearch } from "../home/hero/hero-search";
// import ActivityPanel from "./activity-panel";
import SavedPanel from "./saved-panel";
import SearchHistory from "./search-history";
import VacationSearchModal from "../vacation-search-modal";
import useRecommendations from "@/common/providers/recommendations";
import GridSection from "../home/grid-section";
import Container from "../atoms/layouts/Container";

const DashboardView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");
  const { loadRecommendations, recommendations, isLoading } =
    useRecommendations();

  const handleInitialSearch = (query: string) => {
    setInitialQuery(query);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInitialQuery("");
  };

  return (
    <div className="bg-gray-100 min-h-screen w-full py-10">
      <Container>
        <center className="my-10">
          <HeroSearch
            placeholder="What is your ideal vacation destination or rental?"
            buttonText="Next"
            onSearch={handleInitialSearch}
          />
        </center>
        <VacationSearchModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSearch={(answers) => !isLoading && loadRecommendations?.(answers)}
          initialQuery={initialQuery}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <SearchHistory />
          </div>
          <div className="space-y-4">
            {/* <ActivityPanel /> */}
            <SavedPanel />
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(recommendations?.vacation_destinations || {}).map(
            ([key, value]) => (
              <div key={key}>
                <GridSection
                  title={key.replace(/_/g, " ")}
                  recommendations={value}
                />
              </div>
            ),
          )}
        </div>
      </Container>
    </div>
  );
};

export default DashboardView;
