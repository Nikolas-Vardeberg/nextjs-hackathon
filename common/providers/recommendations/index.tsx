"use client";

import { createContext, useContext, useState } from "react";
import { getSearchRecommendations } from "@/lib/actions/recommendations";

type RecommendationsContextType = {
  isLoading?: boolean;
  loadRecommendations?: (answers: string[]) => Promise<void>;
  recommendations?: unknown | null;
};

const recommendationsContext = createContext<RecommendationsContextType>({
  isLoading: false,
});

export const Provider = recommendationsContext.Provider;

export const RecommendationsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isLoading] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<unknown | null>(null);

  const loadRecommendations = async (answers: string[]) => {
    try {
      const result = await getSearchRecommendations(answers);
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
