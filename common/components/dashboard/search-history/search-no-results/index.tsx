import React from "react";
import { Search } from "lucide-react";

interface SearchNoResultsProps {
  message?: string;
}

const SearchNoResults: React.FC<SearchNoResultsProps> = ({
  message = "No search history found",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-gray-100 rounded-full p-4 mb-4">
        <Search className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
      <p className="text-sm text-gray-500 max-w-md">
        Your previous searches for vacation spots and rentals will appear here.
        Start searching to build your travel history.
      </p>
    </div>
  );
};

export default SearchNoResults;
