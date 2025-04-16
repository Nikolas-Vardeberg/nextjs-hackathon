import React, { useState } from "react";
import { Eye, Trash2, Search as SearchIcon, MapPin } from "lucide-react";
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

const SearchCard: React.FC<SearchCardProps> = ({
  id,
  title,
  date,
  destinations,
  maxDestinationsCount = 3,
  onDelete,
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
