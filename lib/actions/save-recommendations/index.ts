"use server";

import { auth } from "@clerk/nextjs/server";
import {
  OpenAIResponse,
  RecommendationsResponse,
} from "../recommendations/types";
import OpenAIDocument from "@/lib/mongoose/models/open-ai";

const saveRecommendations = async (
  userDocID: string,
  openAIID: string,
  answers: string[],
  results: RecommendationsResponse,
  openAIResponse: OpenAIResponse,
) => {
  try {
    await auth();
    const openAPIDocument = new OpenAIDocument({
      userDocID,
      openAIID,
      openAIDataCache: JSON.stringify(openAIResponse),
      customValue_1: JSON.stringify(results),
      customValue_2: JSON.stringify(answers),
    });
    const savedDocument = await openAPIDocument.save();
    return Response.json({ success: true, data: savedDocument });
  } catch (e) {
    console.log(e);
    if (e && e instanceof Error) throw Error(e.message);
  }
};

export default saveRecommendations;
