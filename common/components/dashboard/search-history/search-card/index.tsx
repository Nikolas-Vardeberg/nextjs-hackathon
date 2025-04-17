import React, { useState } from "react";
import {
  Eye,
  Trash2,
  Search as SearchIcon,
  MapPin,
  Home,
  DollarSign,
  Clock,
  Activity,
} from "lucide-react";
import Link from "next/link";
import Button from "@/common/components/ui/Button";
import Badge from "@/common/components/ui/Badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/components/ui/AlertDialog";
import deleteSavedRecommendation from "@/lib/actions/delete-saved-recommendation";
import useUserDocumentContext from "@/common/providers/user-document";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/Accordion";

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
  onDelete?: (id: string) => void;
}

// Define the structure for criteria including icons
const criteriaStructure = [
  {
    index: 3,
    label: "Destination",
    icon: MapPin,
  },
  {
    index: 1,
    label: "Accommodation",
    icon: Home,
  },
  {
    index: 2,
    label: "Budget",
    icon: DollarSign,
  },
  {
    index: 5,
    label: "Duration",
    icon: Clock,
  },
  {
    index: 4,
    label: "Activities",
    icon: Activity,
  },
];

const SearchCard: React.FC<SearchCardProps> = ({
  id,
  title,
  date,
  destinations,
  maxDestinationsCount = 3,
  onDelete,
  summary,
  answers,
}) => {
  const { userDocID } = useUserDocumentContext();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const displayDestinations = destinations.slice(0, maxDestinationsCount);
  const remainingDestinations =
    destinations.length - displayDestinations.length;

  const handleDelete = async () => {
    if (!userDocID) {
      console.error("User not found. Please try again.");
      return;
    }
    setIsDeleting(true);
    try {
      const result = await deleteSavedRecommendation({ id, userDocID });
      if (result?.success) {
        onDelete?.(id);
        setIsAlertOpen(false);
      } else {
        console.error(result?.error || "Failed to delete item.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-gray-200 p-4 space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <SearchIcon size={16} className="text-primary" />
          <span className="ml-1">{date}</span>
        </div>
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href={`/dashboard/history/${id}`}>
                <Eye size={16} />
                <span className="sr-only">View</span>
              </Link>
            </Button>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:text-destructive hover:bg-red-50"
                disabled={isDeleting}
              >
                <Trash2 size={16} />
                <span className="sr-only">Delete</span>
              </Button>
            </AlertDialogTrigger>
          </div>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                search history item.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAlertOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                loading={isDeleting}
                disabled={isDeleting}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={`item-${id}`} className="border-none -mb-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold tracking-tight text-lg">{title}</h3>
            {(summary || (answers && answers.length > 0)) && (
              <AccordionTrigger className="h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center hover:text-gray-700 [&[data-state=open]>svg]:rotate-180">
                <span className="sr-only">Toggle Details</span>
              </AccordionTrigger>
            )}
          </div>

          <div className="flex flex-wrap gap-2 items-center pt-2 pb-2">
            {displayDestinations.map((destination, index) =>
              destination.url ? (
                <a
                  href={destination.url}
                  key={`${destination.name}-${index}`}
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
                <Badge key={`${destination.name}-${index}`} variant="secondary">
                  <MapPin size={12} className="inline mr-1" />
                  {destination.name}
                </Badge>
              ),
            )}
            {remainingDestinations > 0 && (
              <Badge variant="dashed">+{remainingDestinations} more</Badge>
            )}
          </div>

          <AccordionContent className="pt-0">
            {(summary || (answers && answers.length > 0)) && (
              <div className="pt-3 mt-3 border-t border-gray-200 space-y-4">
                {summary && (
                  <div>
                    <h4 className="font-medium text-sm mb-1">Summary</h4>
                    <p className="text-sm text-gray-600">{summary}</p>
                  </div>
                )}

                {answers && answers.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">
                      Your Search Criteria
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                      {criteriaStructure.map((criterion) => {
                        const answer = answers[criterion.index];
                        if (!answer) return null;
                        const IconComponent = criterion.icon;

                        return (
                          <div key={`answer-criterion-${criterion.index}`}>
                            <div className="flex items-baseline text-sm">
                              <IconComponent className="h-3.5 w-3.5 mr-1.5 flex-shrink-0 text-gray-600 relative top-px" />
                              <span className="text-gray-600 mr-1">
                                {criterion.label}:
                              </span>
                              <span className="font-medium text-gray-800 break-words">
                                {answer}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SearchCard;
