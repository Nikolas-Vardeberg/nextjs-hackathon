import React from "react";
import SearchCard from "../search-card";
import { useSearchHistory } from "../context";

const SearchTabContent: React.FC = () => {
  const { searchHistory } = useSearchHistory();

  return (
    <div className="space-y-4">
      {searchHistory.map((search, index) => (
        <SearchCard key={index} {...search} />
      ))}
    </div>
  );
};

export default SearchTabContent;
