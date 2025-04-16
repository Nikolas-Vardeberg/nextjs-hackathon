import React from "react";
import { Eye, Trash2, Search as SearchIcon, MapPin } from "lucide-react";
import Link from "next/link";
import Button from "@/common/components/ui/Button";
import Badge from "@/common/components/ui/Badge";

interface Destination {
  name: string;
  url?: string;
  country?: string;
  city?: string;
}

interface SearchCardProps {
  id: string;
  title: string;
  date: string;
  tags?: string[];
  destinations: Destination[];
  summary?: string;
  answers?: string[];
  maxDestinationsCount?: number;
}

const SearchCard: React.FC<SearchCardProps> = ({
  id,
  title,
  date,
  destinations,
  maxDestinationsCount = 3,
}) => {
  const displayDestinations = destinations.slice(0, maxDestinationsCount);
  const remainingDestinations =
    destinations.length - displayDestinations.length;

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-gray-200 p-4 space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <SearchIcon size={16} className="text-primary" />
          <span className="ml-1">{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <Link href={`/dashboard/history/${id}`}>
              <Eye size={16} />
              <span className="sr-only">View</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-destructive hover:bg-red-50"
          >
            <Trash2 size={16} />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>

      <h3 className="font-semibold tracking-tight text-lg pb-2">{title}</h3>

      <div className="flex flex-wrap gap-2 items-center">
        {displayDestinations.map((destination, index) =>
          destination.url ? (
            <a
              href={destination.url}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Badge variant="secondary" className="hover:bg-gray-200 ">
                <MapPin size={12} className="inline mr-1" />
                <span className="group-hover:underline">
                  {destination.name}
                </span>
              </Badge>
            </a>
          ) : (
            <Badge key={index} variant="secondary">
              <MapPin size={12} className="inline mr-1" />
              {destination.name}
            </Badge>
          ),
        )}
        {remainingDestinations > 0 && (
          <Badge variant="dashed">+{remainingDestinations} more</Badge>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
