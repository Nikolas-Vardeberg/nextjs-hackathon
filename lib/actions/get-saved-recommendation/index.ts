"use server";

import { connectDB } from "@/lib/mongoose";
import OpenAIDocument from "@/lib/mongoose/models/open-ai";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";

const getSavedRecommendation = async ({
  id,
  userDocID,
}: {
  id: string;
  userDocID: string;
}) => {
  try {
    if (!mongoose.isValidObjectId(id)) {
      return { success: false, error: "Invalid ID" };
    }

    await auth();
    await connectDB();

    const recommendation = await OpenAIDocument.findOne({
      _id: id,
      userDocID,
    });
    if (!recommendation) {
      return { success: false, error: "Recommendation not found" };
    }

    const serializedData = {
      id: recommendation._id.toString(), // Convert _id to string
      userDocID: recommendation.userDocID?.toString(), // Convert userDocID to string
      createdAt: recommendation.createdAt,
      updatedAt: recommendation.updatedAt,
      openAIID: recommendation.openAIID,
      openAIDataCache: recommendation.openAIDataCache,
      customValue_1: recommendation.customValue_1,
      customValue_2: recommendation.customValue_2,
      customValue_3: recommendation.customValue_3,
    };
    return { success: true, data: serializedData };
  } catch (e) {
    console.log(e);
    if (e && e instanceof Error) throw Error(e.message);
  }
};

export default getSavedRecommendation;
