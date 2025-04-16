import { useState } from "react";
import HeroContainer from "@/common/components/home/hero/hero-container";
import { HeroContent } from "@/common/components/home/hero/hero-content";
import { HeroSearch } from "@/common/components/home/hero/hero-search";
import VacationSearchModal from "@/common/components/vacation-search-modal";
import heroBg from "@/assets/images/hero/background.webp";

const Hero: React.FC<{ onSearch: (answers: string[]) => void }> = ({
  onSearch,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");

  const handleInitialSearch = (query: string) => {
    setInitialQuery(query);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInitialQuery("");
  };

  return (
    <HeroContainer backgroundImage={heroBg.src}>
      <HeroContent
        title="Your Perfect Getaway"
        description="Our AI helps you find the perfect rentals and vacations tailored just for you."
        alignment="left"
      >
        <HeroSearch
          placeholder="What is your ideal vacation destination or rental?"
          buttonText="Next"
          onSearch={handleInitialSearch}
        />
      </HeroContent>

      <VacationSearchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSearch={onSearch}
        initialQuery={initialQuery}
      />
    </HeroContainer>
  );
};

export default Hero;
