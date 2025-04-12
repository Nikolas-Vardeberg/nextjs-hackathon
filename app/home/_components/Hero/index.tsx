import Hero from "@/common/components/hero/Hero";
import { HeroContent } from "@/common/components/hero/HeroContent";
import { HeroSearch } from "@/common/components/hero/HeroSearch";
import useSearch from "@/common/hooks/use-search";
import heroBg from "@/assets/images/hero/background.webp";

const HeroComponent: React.FC<{ onSearch: (answers: string[]) => void }> = ({
  onSearch, //TODO: move to context
}) => {
  const { handleSearch, searchPlaceholder, buttonTextState } =
    useSearch(onSearch);

  return (
    <Hero backgroundImage={heroBg.src}>
      <HeroContent
        title="Your Vacation Starts Here"
        description="Tell us what inspires you, and our AI will craft the perfect journey tailored just for you"
        alignment="left"
      >
        <HeroSearch
          placeholder={searchPlaceholder}
          buttonText={buttonTextState}
          onSearch={handleSearch}
        />
      </HeroContent>
    </Hero>
  );
};

export default HeroComponent;
