import React from "react";
import SearchTabContent from "../search-tab-content";

const SearchTabs: React.FC = () => {
  return (
    <div dir="ltr" data-orientation="horizontal">
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mb-4"
      >
        <button
          type="button"
          role="tab"
          aria-selected="true"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          All Searches
        </button>
        <button
          type="button"
          role="tab"
          aria-selected="false"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          With Favorites
        </button>
        <button
          type="button"
          role="tab"
          aria-selected="false"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
        >
          Last 30 Days
        </button>
      </div>
      <SearchTabContent />
    </div>
  );
};

export default SearchTabs;
