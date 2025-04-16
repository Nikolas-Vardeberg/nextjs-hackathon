import useUserDocumentContext from "@/common/providers/user-document";
import getSavedRecommendations from "@/lib/actions/get-saved-recommendations";
import {
  RecommendationItem,
  RecommendationsResponse,
} from "@/lib/actions/recommendations/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type SearchItem = {
  title: string;
  summary: string;
  date: string;
  tags: string[];
  destinations: { name: string; recommended: boolean }[];
  recommendations: RecommendationItem[];
  rawRecommendationsData: RecommendationsResponse;
};

interface SearchHistoryContextType {
  searchHistory: SearchItem[];
  isLoading: boolean;
}

const formatDate = (timestamp: string | number | Date): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

// Example usage
const formattedDate = formatDate("2025-04-10T00:00:00Z");
console.log(formattedDate); // Output: Apr 10, 2025
const SearchHistoryContext = createContext<
  SearchHistoryContextType | undefined
>({ isLoading: false, searchHistory: [] });

export const SearchHistoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchHistory, setSearchHistory] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userDocID } = useUserDocumentContext();
  const [didAttemptNoResults, setDidAttemptNoResults] = useState(false);
  useEffect(() => {
    const getRecs = async () => {
      if (
        !isLoading &&
        userDocID &&
        searchHistory.length < 1 &&
        !didAttemptNoResults
      ) {
        try {
          setIsLoading(true);
          const recs = await getSavedRecommendations(userDocID);
          if (recs?.success && recs?.data) {
            const formattedData = recs?.data.map(
              ({ customValue_1, openAIID, updatedAt, customValue_2 }) => {
                const recommendationsJSON = JSON.parse(
                  customValue_1 || "",
                ) as RecommendationsResponse;

                const answersArray = JSON.parse(
                  customValue_2 || "",
                ) as string[];

                const recommendationsSlice =
                  recommendationsJSON?.vacation_destinations?.top_10_recommendations?.slice(
                    0,
                    3,
                  ) || []; // TODO: NEED TO HAVE USER SELECT IF THEY ARE SEARCHING FOR A DESTINATION OR RENTAL

                return {
                  recommendations: recommendationsSlice,
                  rawRecommendationsData: recommendationsJSON,
                  openAIID,
                  date: formatDate(updatedAt),
                  title:
                    recommendationsSlice[0].recommendation_title ||
                    answersArray[0],
                  summary:
                    recommendationsSlice[0].recommendation_summary ||
                    answersArray[3],
                  destinations:
                    recommendationsSlice?.map((slice) => ({
                      name: slice.business_name,
                      recommended: true,
                    })) || [],
                  tags:
                    recommendationsSlice?.flatMap(
                      (slice) =>
                        slice.types?.map((t) => t.replaceAll(/_/g, " ")) || [],
                    ) || [],
                };
              },
            );

            setSearchHistory(formattedData);
          }
          setIsLoading(false);
        } catch (e) {
          console.error(e);
          setIsLoading(false);
        } finally {
          setDidAttemptNoResults(true);
        }
      }
    };
    getRecs();
  }, [isLoading, userDocID, searchHistory, didAttemptNoResults]);
  return (
    <SearchHistoryContext.Provider value={{ searchHistory, isLoading }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};

export const useSearchHistory = (): SearchHistoryContextType => {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error(
      "useSearchHistory must be used within a SearchHistoryProvider",
    );
  }
  return context;
};
