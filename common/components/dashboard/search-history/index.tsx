import React from "react";
import SearchHeader from "./search-header";
import SearchTabs from "./search-tabs";

const SearchHistory: React.FC = () => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white border-gray-200">
      <SearchHeader />
      <div className="p-6 pt-0">
        <SearchTabs />
      </div>
    </div>
  );
};

export default SearchHistory;
