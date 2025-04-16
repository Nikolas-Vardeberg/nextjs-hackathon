import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import SearchDetails from "../search-details";
import Link from "next/link";
import Button from "@/common/components/ui/Button";
import Badge from "@/common/components/ui/Badge";

interface Destination {
  name: string;
  url?: string;
  country: string;
  city: string;
}

interface SearchCardProps {
  id: string;
  title: string;
  date: string;
  tags: string[];
  destinations: Destination[];
  summary: string;
  answers?: string[];
}

const SearchCard: React.FC<SearchCardProps> = ({
  id,
  title,
  date,
  tags,
  destinations,
  summary,
  answers,
}) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden border-gray-200">
      <div className="flex flex-col space-y-1.5 p-6 pb-2 pt-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="primary">Search</Badge>
              <div className="flex items-center text-sm text-gray-500">
                {date}
              </div>
            </div>
            <h3 className="font-semibold tracking-tight text-lg my-3">
              {title}
            </h3>
          </div>
          <Button variant="inverted-link" asChild>
            <Link href={`/dashboard/history/${id}`}>
              View <ArrowRight size={14} />
            </Link>
          </Button>
        </div>
      </div>
      <div className="p-6 pt-0 pb-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {destinations.map((destination, index) => (
            <a
              href={destination.url}
              target="_blank"
              rel="noopener"
              key={index}
              className="relative rounded-md border p-2 flex items-center gap-3 border-gray-300"
            >
              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center">
                <MapPin className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{destination.name}</div>

                <div className="flex items-center text-sm text-gray-500">
                  {destination.city}, {destination.country}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <SearchDetails tags={tags} answers={answers} summary={summary} />
    </div>
  );
};

export default SearchCard;
