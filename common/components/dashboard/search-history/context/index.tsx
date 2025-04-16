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

export type SearchItem = {
  id: string;
  title: string;
  summary: string;
  answers: string[];
  date: string;
  tags: string[];
  destinations: { name: string; url?: string; country: string; city: string }[];
  recommendations: RecommendationItem[];
  rawRecommendationsData: RecommendationsResponse;
};

interface SearchHistoryContextType {
  searchHistory: SearchItem[];
  isLoading: boolean;
  refetchSearchHistory: () => Promise<void>;
  clearLocalHistory: () => void;
}

export const formatDate = (timestamp: string | number | Date): string => {
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
>({
  isLoading: false,
  searchHistory: [],
  refetchSearchHistory: async () => {},
  clearLocalHistory: () => {},
});

export const SearchHistoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchHistory, setSearchHistory] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userDocID } = useUserDocumentContext();

  const fetchSearchHistory = React.useCallback(async () => {
    if (!userDocID) {
      setIsLoading(false);
      setSearchHistory([]);
      return;
    }

    setIsLoading(true);
    try {
      const recs = await getSavedRecommendations(userDocID);
      if (recs?.success && recs?.data && recs.data.length > 0) {
        const formattedData = recs.data.map(
          ({ customValue_1, openAIID, updatedAt, customValue_2, id }) => {
            const recommendationsJSON = JSON.parse(
              customValue_1 || "",
            ) as RecommendationsResponse;

            const answersArray = JSON.parse(customValue_2 || "") as string[];

            const recommendationsSlice =
              recommendationsJSON?.vacation_destinations?.top_10_recommendations?.slice(
                0,
                3,
              ) || [];

            return {
              id,
              recommendations: recommendationsSlice,
              rawRecommendationsData: recommendationsJSON,
              openAIID,
              answers: answersArray,
              date: formatDate(updatedAt),
              title:
                recommendationsSlice?.[0]?.recommendation_title ||
                answersArray?.[0] ||
                "Search History Item",
              summary:
                recommendationsSlice?.[0]?.recommendation_summary ||
                answersArray?.[3] ||
                "",
              destinations:
                recommendationsSlice?.map((slice) => ({
                  name: slice.business_name,
                  city: slice.business_city,
                  country: slice.business_country,
                  url: slice.googleMapsUri || slice.websiteUri,
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
      } else {
        setSearchHistory([]);
      }
    } catch (e) {
      console.error("Error fetching search history:", e);
      setSearchHistory([]);
    } finally {
      setIsLoading(false);
    }
  }, [userDocID]);

  const clearLocalHistory = React.useCallback(() => {
    setSearchHistory([]);
  }, []);

  useEffect(() => {
    if (userDocID) {
      fetchSearchHistory();
    } else {
      setIsLoading(true);
      setSearchHistory([]);
    }
  }, [userDocID, fetchSearchHistory]);

  const contextValue = React.useMemo(
    () => ({
      searchHistory,
      isLoading,
      refetchSearchHistory: fetchSearchHistory,
      clearLocalHistory,
    }),
    [searchHistory, isLoading, fetchSearchHistory, clearLocalHistory],
  );

  return (
    <SearchHistoryContext.Provider value={contextValue}>
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
