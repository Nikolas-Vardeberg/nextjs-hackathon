"use client";

import React, { useState } from "react";
import Button from "@/common/components/ui/Button";
import { useSearchHistory } from "../context";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/common/components/ui/AlertDialog";
import clearAllSavedRecommendations from "@/lib/actions/clear-all-saved-recommendations";
import useUserDocumentContext from "@/common/providers/user-document";

const SearchHeader: React.FC = () => {
  const { clearLocalHistory, searchHistory } = useSearchHistory();
  const { userDocID } = useUserDocumentContext();
  const [isClearing, setIsClearing] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleClearAll = async () => {
    if (!userDocID) {
      console.error("User Document ID not found.");
      return;
    }
    setIsClearing(true);
    try {
      const result = await clearAllSavedRecommendations({ userDocID });
      if (result?.success) {
        clearLocalHistory();
        setIsAlertOpen(false);
      } else {
        console.error(result?.error || "Failed to clear history.");
      }
    } catch (error) {
      console.error("Clear all failed:", error);
    } finally {
      setIsClearing(false);
    }
  };

  const isHistoryEmpty = searchHistory.length === 0;

  return (
    <div className="flex flex-col space-y-1.5 p-6 pb-3">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold">Search History</h2>
          <p className="text-sm text-gray-500">
            Your recent vacation and rental searches
          </p>
        </div>

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="secondary"
              className="text-sm"
              disabled={isHistoryEmpty || isClearing}
            >
              Clear all
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear All Search History?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all
                your saved searches.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAlertOpen(false)}
                disabled={isClearing}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleClearAll}
                loading={isClearing}
                disabled={isClearing}
              >
                Confirm Clear All
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default SearchHeader;
