import React from "react";
import { ChevronDown, Filter } from "lucide-react";

const SearchHeader: React.FC = () => {
  return (
    <div className="flex flex-col space-y-1.5 p-6 pb-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Search History
          </h3>
          <p className="text-sm text-muted-foreground">
            Your recent vacation searches and results
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-[140px] h-8 border-gray-300"
          >
            <span style={{ pointerEvents: "none" }}>Most Recent</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 h-8 border-gray-300">
            <Filter className="mr-1" />
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
