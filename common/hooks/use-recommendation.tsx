import { useState, useEffect } from "react";
import useUserDocumentContext from "@/common/providers/user-document";
import getSavedRecommendation from "@/lib/actions/get-saved-recommendation";
import { RecommendationsResponse } from "@/lib/actions/recommendations/types";
import {
  formatDate,
  SearchItem,
} from "../components/dashboard/search-history/context";

export default function useRecommendation(id: string) {
  const { userDocID } = useUserDocumentContext();
  const [isLoading, setIsLoading] = useState(true);
  const [recommendation, setRecommendation] = useState<SearchItem>();

  useEffect(() => {
    async function fetchRecommendation() {
      if (!id || !userDocID) return;

      try {
        setIsLoading(true);

        const result = await getSavedRecommendation({ id, userDocID });

        if (result?.success && result.data) {
          const recommendationsJSON = JSON.parse(
            result.data.customValue_1 || "",
          ) as RecommendationsResponse;

          const answersArray = JSON.parse(
            result.data.customValue_2 || "",
          ) as string[];

          const recommendationsSlice =
            recommendationsJSON?.vacation_destinations?.top_10_recommendations?.slice(
              0,
              3,
            ) || [];

          const formattedData = {
            id,
            recommendations: recommendationsSlice,
            rawRecommendationsData: recommendationsJSON,
            openAIID: result.data.openAIID,
            answers: answersArray,
            date: formatDate(result.data.updatedAt),
            title:
              recommendationsSlice[0].recommendation_title || answersArray[0],
            summary:
              recommendationsSlice[0].recommendation_summary || answersArray[3],
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
          setRecommendation(formattedData);
        }
      } catch (e) {
        console.error("Error fetching recommendation", e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendation();
  }, [id, userDocID]);

  return {
    recommendation,
    isLoading,
  };
}
