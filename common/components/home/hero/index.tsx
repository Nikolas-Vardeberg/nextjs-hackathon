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

  return (
    <HeroContainer backgroundImage={heroBg.src}>
      <HeroContent
        title="Your Vacation Starts Here"
        description="Tell us what inspires you, and our AI will craft the perfect journey tailored just for you"
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
        onClose={() => setIsModalOpen(false)}
        onSearch={onSearch}
        initialQuery={initialQuery}
      />
    </HeroContainer>
  );
};

export default Hero;
