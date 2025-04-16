import React from "react";
import { MapPin, Star } from "lucide-react";
import SearchDetails from "../search-details";

interface Destination {
  name: string;
  recommended: boolean;
}

interface SearchCardProps {
  title: string;
  date: string;
  tags: string[];
  destinations: Destination[];
  summary: string;
}

const SearchCard: React.FC<SearchCardProps> = ({
  title,
  date,
  tags,
  destinations,
  summary,
}) => {
  const questions = [
    { label: "Duration", value: "7-10 days" },
    { label: "Budget", value: "Mid-range" },
    { label: "Activities", value: "Relaxation" },
    { label: "Accommodation", value: "Hotel or resort" },
  ];

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden border-gray-200">
      <div className="flex flex-col space-y-1.5 p-6 pb-2 pt-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-teal-50 text-teal-700 border-gray-300">
                Search
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="mr-1 text-yellow-500 fill-yellow-500" />
                {date}
              </div>
            </div>
            <h3 className="font-semibold tracking-tight text-lg">{title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0 pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground border-gray-300"
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="relative rounded-md border p-2 flex items-center gap-3 border-gray-300"
            >
              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                <MapPin className="text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{destination.name}</div>
                {destination.recommended && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="mr-1 text-yellow-500 fill-yellow-500" />
                    Recommended
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <SearchDetails questions={questions} summary={summary} />
    </div>
  );
};

export default SearchCard;
