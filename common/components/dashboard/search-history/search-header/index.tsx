import Button from "@/common/components/ui/Button";
import React from "react";

const SearchHeader: React.FC = () => {
  return (
    <div className="flex flex-col space-y-1.5 p-6 pb-3">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">Search History</h2>
          <p className="text-sm text-gray-500">
            Your recent vacation and rental searches
          </p>
        </div>
        <Button variant="secondary" className="text-sm">
          Clear all
        </Button>
      </div>
    </div>
  );
};

export default SearchHeader;
