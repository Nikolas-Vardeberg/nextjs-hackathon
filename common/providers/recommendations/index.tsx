"use client";

import { createContext, useContext, useState } from "react";
import { getSearchRecommendations } from "@/lib/actions/recommendations";
import { RecommendationsResponse } from "@/lib/actions/recommendations/types";
import defaultRecommendations from "@/lib/actions/recommendations/default.json";
import useUserDocumentContext from "../user-document";

type RecommendationsContextType = {
  isLoading?: boolean;
  loadRecommendations?: (answers: string[]) => Promise<void>;
  recommendations?: RecommendationsResponse | null;
};

const recommendationsContext = createContext<RecommendationsContextType>({
  isLoading: false,
  recommendations: defaultRecommendations as RecommendationsResponse,
});

export const Provider = recommendationsContext.Provider;

export const RecommendationsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { userDocID } = useUserDocumentContext();
  const [isLoading] = useState<boolean>(false);
  const [recommendations, setRecommendations] =
    useState<RecommendationsResponse | null>(
      defaultRecommendations as RecommendationsResponse,
    );

  const loadRecommendations = async (answers: string[]) => {
    try {
      const result = await getSearchRecommendations(answers, userDocID);
      setRecommendations(result);
    } catch (e) {
      console.error("Failed to fetch recommendations:", e);
    }
  };

  return (
    <Provider
      value={{
        isLoading,
        loadRecommendations,
        recommendations,
      }}
    >
      {children}
    </Provider>
  );
};

const useRecommendations = () => {
  const context = useContext(recommendationsContext);
  if (!context) {
    throw new Error(
      "useRecommendationsContext must be used within a RecommendationsProvider",
    );
  }
  return context;
};

export default useRecommendations;
