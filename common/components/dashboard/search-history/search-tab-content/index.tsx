import React from "react";
import SearchCard from "../search-card";
import { useSearchHistory } from "../context";
import SearchResultsSkeleton from "../search-results-skeleton";
import SearchNoResults from "../search-no-results";

const SearchTabContent: React.FC = () => {
  const { searchHistory, isLoading } = useSearchHistory();

  if (isLoading) {
    return <SearchResultsSkeleton count={3} />;
  }

  if (searchHistory.length === 0 && !isLoading) {
    return <SearchNoResults />;
  }

  return (
    <div className="space-y-4">
      {searchHistory.map((search, index) => (
        <SearchCard key={index} {...search} />
      ))}
    </div>
  );
};

export default SearchTabContent;
