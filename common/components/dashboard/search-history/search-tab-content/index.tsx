"use client";

import React, { useState } from "react";
import SearchCard from "../search-card";
import { useSearchHistory } from "../context";
import SearchResultsSkeleton from "../search-results-skeleton";
import SearchNoResults from "../search-no-results";
import { Button } from "@/common/components/ui/Button";

const INITIAL_COUNT = 3;
const INCREMENT_COUNT = 5;

const SearchTabContent: React.FC = () => {
  const { searchHistory, isLoading, refetchSearchHistory } = useSearchHistory();
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  if (isLoading) {
    return <SearchResultsSkeleton count={INITIAL_COUNT} />;
  }

  const handleViewMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + INCREMENT_COUNT, searchHistory.length),
    );
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_COUNT);
  };

  const handleDelete = () => {
    refetchSearchHistory();
  };

  const visibleSearches = searchHistory.slice(0, visibleCount);

  return (
    <div className="space-y-4">
      {searchHistory.length === 0 ? (
        <SearchNoResults />
      ) : (
        <>
          {visibleSearches.map((search, index) => (
            <SearchCard
              key={search.id || index}
              {...search}
              onDelete={handleDelete}
            />
          ))}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {visibleCount > INITIAL_COUNT && (
              <Button variant="inverted-primary" onClick={handleShowLess}>
                Show Less
              </Button>
            )}
            {searchHistory.length > visibleCount && (
              <Button variant="primary" onClick={handleViewMore}>
                View More
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchTabContent;
