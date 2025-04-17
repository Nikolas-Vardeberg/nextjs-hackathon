import React from "react";
import SearchTabContent from "../search-tab-content";

interface SearchTabsProps {
  searchTrigger: number;
}

const SearchTabs: React.FC<SearchTabsProps> = ({ searchTrigger }) => {
  return (
    <div dir="ltr" data-orientation="horizontal">
      <SearchTabContent searchTrigger={searchTrigger} />
    </div>
  );
};

export default SearchTabs;
