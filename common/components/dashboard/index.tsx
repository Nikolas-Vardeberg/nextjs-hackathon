"use client";
import { useState } from "react";
import { HeroSearch } from "../home/hero/hero-search";
import ActivityPanel from "./activity-panel";
import SavedPanel from "./saved-panel";
import SearchHistory from "./search-history";
import VacationSearchModal from "../vacation-search-modal";
import useRecommendations from "@/common/providers/recommendations";
import GridSection from "../home/grid-section";

const Dashboard: React.FC = () => {
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
    <div>
      <HeroSearch
        placeholder="What is your ideal vacation destination or rental?"
        buttonText="Next"
        onSearch={handleInitialSearch}
      />
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
        <div>
          <ActivityPanel />
          <SavedPanel />
        </div>
      </div>
      <div className="container m-auto">
        <div>
          {Object.entries(recommendations!.vacation_destinations || {}).map(
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
      </div>
    </div>
  );
};

export default Dashboard;
