"use server";

import { OpenAIDocument as OpenAIDocumentType } from "./../../mongoose/models/types";

import { auth } from "@clerk/nextjs/server";
import OpenAIDocument from "@/lib/mongoose/models/open-ai";
import { connectDB } from "@/lib/mongoose";

const getSavedRecommendations = async (
  userDocID: string,
  limit?: number,
  skip?: number,
) => {
  try {
    await auth();
    await connectDB();

    const openAPIDocuments = await OpenAIDocument.find({
      userDocID,
    })
      .sort({ createdAt: -1 })
      .limit(limit || 10)
      .skip(skip || 0);

    const serializedData = openAPIDocuments.map((doc: OpenAIDocumentType) => ({
      id: doc._id.toString(), // Convert _id to string
      userDocID: doc.userDocID?.toString(), // Convert userDocID to string
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      openAIID: doc.openAIID,
      openAIDataCache: doc.openAIDataCache,
      customValue_1: doc.customValue_1,
      customValue_2: doc.customValue_2,
      customValue_3: doc.customValue_3,
    }));

    return { success: true, data: serializedData };
  } catch (e) {
    console.log(e);
    if (e && e instanceof Error) throw Error(e.message);
  }
};

export default getSavedRecommendations;
