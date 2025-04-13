"use server";

import { cache } from "react";
import { fetchGoogleDetails, fetchOpenAIRecommendations } from "./engine";
import { Business, OpenAIResponse, RecommendationsResponse } from "./types";

export async function getSearchRecommendations(answers: string[]) {
  const recommendations: OpenAIResponse = await cache(() =>
    fetchOpenAIRecommendations(answers),
  )();

  const data: Business[] = await (cache(() =>
    fetchGoogleDetails(recommendations?.choices[0].message.content),
  )() as Promise<Business[]>);

  // Group data by typeKey and categoryKey
  const groupedData = data.reduce(
    (acc, business) => {
      const { categoryKey, typeKey } = business;

      if (!acc[categoryKey]) {
        acc[categoryKey] = {};
      }

      if (!acc[categoryKey][typeKey]) {
        acc[categoryKey][typeKey] = [];
      }

      acc[categoryKey][typeKey].push(business);

      return acc;
    },
    {} as Record<string, Record<string, Business[]>>,
  );

  return groupedData as unknown as RecommendationsResponse;
}
