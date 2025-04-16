import React from "react";

const SearchHeader: React.FC = () => {
  return (
    <div className="flex flex-col space-y-1.5 p-6 pb-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Search History
          </h3>
          <p className="text-sm text-muted-foreground">
            Your recent vacation and rental searches and results
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
