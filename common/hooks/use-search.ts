import { useState } from "react";

const HERO_SEARCH_DEFAULTS = [
  "What is your ideal vacation destination or rental?",
  "What amenities are most important to you?",
  "What is your budget range?",
  "Are you looking for a specific location?",
  "What was your favorite vacation or rental experience?",
  "When are you planning to travel?",
];

const SEARCH_BUTTON_TEXT = ["Next", "Search"];

const useSearch = () => {
  const [searchIndex, setSearchIndex] = useState(0);
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    HERO_SEARCH_DEFAULTS[searchIndex],
  );
  const [buttonTextState, setButtonTextState] = useState(
    SEARCH_BUTTON_TEXT[searchIndex === HERO_SEARCH_DEFAULTS.length - 1 ? 1 : 0],
  );

  const handleSearch = (query: string) => {
    if (searchIndex < HERO_SEARCH_DEFAULTS.length - 1) {
      setSearchIndex((prevIndex) => prevIndex + 1);
      setSearchPlaceholder(HERO_SEARCH_DEFAULTS[searchIndex + 1]);
      setButtonTextState(SEARCH_BUTTON_TEXT[0]);
    } else {
      setSearchIndex(0);
      setSearchPlaceholder(HERO_SEARCH_DEFAULTS[0]);
      setButtonTextState(SEARCH_BUTTON_TEXT[1]);
    }
    return query;
  };
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
