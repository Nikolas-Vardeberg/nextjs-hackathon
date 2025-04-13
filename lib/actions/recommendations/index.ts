"use server";
import { fetchGoogleDetails, fetchOpenAIRecommendations } from "./engine";
import { OpenAIResponse } from "./types";

export async function getSearchRecommendations(answers: string[]) {
  const recommendations: OpenAIResponse =
    await fetchOpenAIRecommendations(answers);

  return await fetchGoogleDetails(recommendations?.choices[0].message.content);
}
