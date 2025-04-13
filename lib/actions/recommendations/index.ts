"use server";
import { auth } from "@clerk/nextjs/server";
import { fetchGoogleDetails, fetchOpenAIRecommendations } from "./engine";
import { OpenAIResponse } from "./types";

export async function getSearchRecommendations(answers: string[]) {
  // Step 1: Retrieve session data
  const { sessionId } = await auth();
  if (!sessionId) {
    throw new Error("TODO(GUEST): User is not authenticated");
  }

  // Step 2: Call OpenAI API to get recommendations
  const recommendations: OpenAIResponse =
    await fetchOpenAIRecommendations(answers);

  // Step 3: Save the OpenAI snapshot for session continuity

  // Step 4: Return recommendations
  return await fetchGoogleDetails(recommendations?.choices[0].message.content);
}
