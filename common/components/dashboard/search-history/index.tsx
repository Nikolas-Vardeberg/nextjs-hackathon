import React from "react";
import SearchHeader from "./search-header";
import SearchTabs from "./search-tabs";
import { SearchHistoryProvider } from "./context";

interface SearchHistoryProps {
  searchTrigger: number;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ searchTrigger }) => {
  return (
    <SearchHistoryProvider>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white border-gray-200">
        <SearchHeader />
        <div className="p-6 pt-0">
          <SearchTabs searchTrigger={searchTrigger} />
        </div>
      </div>
    </SearchHistoryProvider>
  );
};

export default SearchHistory;
