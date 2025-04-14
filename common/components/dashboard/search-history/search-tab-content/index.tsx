import React from "react";
import SearchCard from "../search-card";

const SearchTabContent: React.FC = () => {
  const searches = [
    {
      title: "Beach vacation in Europe",
      date: "Apr 10, 2025",
      tags: ["7-10 days", "Mid-range", "Relaxation", "Hotel or resort"],
      destinations: [
        { name: "Santorini, Greece", recommended: true },
        { name: "Amalfi Coast, Italy", recommended: true },
        { name: "Mallorca, Spain", recommended: true },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {searches.map((search, index) => (
        <SearchCard key={index} {...search} />
      ))}
    </div>
  );
};

export default SearchTabContent;
