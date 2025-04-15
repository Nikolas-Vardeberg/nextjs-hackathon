"use server";

import { cache } from "react";
import { fetchGoogleDetails, fetchOpenAIRecommendations } from "./engine";
import { Business, OpenAIResponse, RecommendationsResponse } from "./types";
import saveRecommendations from "../save-recommendations";

export async function getSearchRecommendations(
  answers: string[],
  userDocID?: string,
) {
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

  const retVal = groupedData as unknown as RecommendationsResponse;
  console.log("user doc id", userDocID);
  if (userDocID) {
    //don't wait... do it behind the scenes so the user can move on
    saveRecommendations(
      userDocID,
      recommendations.id,
      answers,
      retVal,
      recommendations,
    )
      .then(() =>
        console.log(
          "successfully saved recommendation to user document ID ",
          userDocID,
        ),
      )
      .catch(console.error);
  }
  return retVal;
}
