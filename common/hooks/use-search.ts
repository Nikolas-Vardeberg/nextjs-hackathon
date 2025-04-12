import { useState } from "react";

const HERO_SEARCH_DEFAULTS = [
  "What is your ideal vacation destination or rental?",
  "What amenities are most important to you?",
  "What is your budget range?",
  "Are you looking for a specific location?",
  "What was your favorite vacation or rental experience?",
  "When are you planning to travel?",
];
const HERO_SEARCH_DEFAULTS_LAST_INDEX = HERO_SEARCH_DEFAULTS.length - 1;
const SEARCH_BUTTON_TEXT = ["Next", "Search"];

const useSearch = () => {
  const [searchIndex, setSearchIndex] = useState(0);
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    HERO_SEARCH_DEFAULTS[searchIndex],
  );
  const [buttonTextState, setButtonTextState] = useState(
    SEARCH_BUTTON_TEXT[searchIndex === HERO_SEARCH_DEFAULTS_LAST_INDEX ? 1 : 0],
  );
  const [answers, setAnswers] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    if (searchIndex < HERO_SEARCH_DEFAULTS_LAST_INDEX) {
      setSearchIndex((prevIndex) => prevIndex + 1);
      setSearchPlaceholder(HERO_SEARCH_DEFAULTS[searchIndex + 1]);
      setButtonTextState(
        SEARCH_BUTTON_TEXT[
          searchIndex + 1 === HERO_SEARCH_DEFAULTS_LAST_INDEX ? 1 : 0
        ],
      );
      setAnswers((prevAnswers) => [...prevAnswers, query]);
    }
  };
  console.log("answers", answers);
  return {
    handleSearch,
    searchPlaceholder,
    buttonTextState,
    searchIndex,
    setSearchIndex,
    setSearchPlaceholder,
    setButtonTextState,
  };
};
export default useSearch;
