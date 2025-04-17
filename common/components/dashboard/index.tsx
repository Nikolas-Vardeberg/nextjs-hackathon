"use client";
import { useState } from "react";
import { HeroSearch } from "../home/hero/hero-search";
// import ActivityPanel from "./activity-panel";
import SavedPanel from "./saved-panel";
import SearchHistory from "./search-history";
import VacationSearchModal from "../vacation-search-modal";
import useRecommendations from "@/common/providers/recommendations";
import Container from "../atoms/layouts/Container";
import ScrollSection from "../home/scroll-section";

const DashboardView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);
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

  const onSearch = async (answers: string[]) => {
    if (isLoading) return;
    try {
      await loadRecommendations?.(answers);
      setSearchTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Error loading recommendations:", error);
    }
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
          onSearch={onSearch}
          initialQuery={initialQuery}
          isLoading={isLoading}
          scrollToId="vacation-search-results"
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <SearchHistory searchTrigger={searchTrigger} />
          </div>
          <div className="space-y-4">
            {/* <ActivityPanel /> */}
            <SavedPanel />
          </div>
        </div>

        <div id="vacation-search-results" className="space-y-4">
          {Object.entries(recommendations?.vacation_destinations || {}).map(
            ([key, value]) => (
              <div key={key}>
                <ScrollSection
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
