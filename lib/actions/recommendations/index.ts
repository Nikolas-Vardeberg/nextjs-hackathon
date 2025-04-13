"use server";

import { cache } from "react";
import { fetchGoogleDetails, fetchOpenAIRecommendations } from "./engine";
import { OpenAIResponse } from "./types";

export async function getSearchRecommendations(answers: string[]) {
  const recommendations: OpenAIResponse = await cache(() =>
    fetchOpenAIRecommendations(answers),
  )();

  return await cache(() =>
    fetchGoogleDetails(recommendations?.choices[0].message.content),
  )();
}
