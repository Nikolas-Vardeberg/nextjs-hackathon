"use client";

import { useState } from "react";
import Input from "@/common/components/ui/Input";
import { Button } from "@/common/components/ui/Button";

export type HeroSearchProps = {
  placeholder?: string;
  buttonText?: string;
  onSearch?: (query: string) => void;
};

// TODO: This is placeholder for now
export function HeroSearch({
  placeholder = "What are you looking for?",
  buttonText = "Search",
  onSearch,
}: HeroSearchProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!onSearch) {
      console.warn("HeroSearch: onSearch prop is not provided");
      return;
    }

    if (query.trim() === "") {
      return;
    }

    onSearch(query);
  };

  return (
    <div className="flex items-center bg-white rounded-full p-1 sm:p-1.5 focus-within:ring-2 focus-within:ring-[var(--color-tealwave)] max-w-full sm:max-w-lg shadow-lg">
      <Input
        placeholder={placeholder}
        className="w-full border-none shadow-none focus-visible:ring-0 text-black text-sm md:text-base"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        variant="tealwave"
        className="rounded-full px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-sm md:text-base font-medium whitespace-nowrap"
        onClick={handleSearch}
      >
        {buttonText}
      </Button>
    </div>
  );
}
