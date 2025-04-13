import HeroContainer from "@/app/home/_components/Hero/HeroContainer";
import { HeroContent } from "@/app/home/_components/Hero/HeroContent";
import { HeroSearch } from "@/app/home/_components/Hero/HeroSearch";
import useSearch from "@/common/hooks/use-search";
import heroBg from "@/assets/images/hero/background.webp";

const Hero: React.FC<{ onSearch: (answers: string[]) => void }> = ({
  onSearch, //TODO: move to context
}) => {
  const { handleSearch, searchPlaceholder, buttonTextState } =
    useSearch(onSearch);

  return (
    <HeroContainer backgroundImage={heroBg.src}>
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
    </HeroContainer>
  );
};

export default Hero;
