import { HERO_SEARCH_DEFAULTS } from "@/lib/actions/recommendations/engine";
import { useState } from "react";

const HERO_SEARCH_DEFAULTS_LAST_INDEX = HERO_SEARCH_DEFAULTS.length - 1;
const SEARCH_BUTTON_TEXT = ["Next", "Search"];

const testsearch = [
  "Somewhere in mexico with a beach and beautiful sunsets. I dont want to pay much and I want to be able to bring my dog.",
  "Close bars and beaches. Free drinks and food.",
  "500 USD",
  "Mexico",
  "Cancun",
];

const useSearch = (onSearch: (answers: string[]) => void) => {
  const [searchIndex, setSearchIndex] = useState(0);
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    HERO_SEARCH_DEFAULTS[searchIndex],
  );
  const [buttonTextState, setButtonTextState] = useState(
    SEARCH_BUTTON_TEXT[searchIndex === HERO_SEARCH_DEFAULTS_LAST_INDEX ? 1 : 0],
  );
  const [answers, setAnswers] = useState<string[]>([]);
  const isLastIndex = searchIndex + 1 === HERO_SEARCH_DEFAULTS_LAST_INDEX;
  const handleSearch = (query: string) => {
    if (searchIndex < HERO_SEARCH_DEFAULTS_LAST_INDEX) {
      setSearchIndex((prevIndex) => prevIndex + 1);
      setSearchPlaceholder(HERO_SEARCH_DEFAULTS[searchIndex + 1]);
      setButtonTextState(SEARCH_BUTTON_TEXT[isLastIndex ? 1 : 0]);
      setAnswers((prevAnswers) => [...prevAnswers, query]);
    } else {
      console.log("search!");
      if (process.env.NEXT_PUBLIC_MOCK_AI_MODE === "true") {
        console.log("mock mode");
        onSearch(testsearch);
      } else {
        alert("$$$$$$$$$ Real mode! set NEXT_PUBLIC_MOCK_AI_MODE to true");
        onSearch([...answers, query]);
      }
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
