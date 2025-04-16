"use server";

import { connectDB } from "@/lib/mongoose";
import OpenAIDocument from "@/lib/mongoose/models/open-ai";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

const deleteSavedRecommendation = async ({
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

    const result = await OpenAIDocument.findOneAndDelete({
      _id: id,
      userDocID: userDocID,
    });

    if (!result) {
      return {
        success: false,
        error: "Recommendation not found or not authorized to delete.",
      };
    }

    revalidatePath("/dashboard");

    return { success: true, data: { id } };
  } catch (e) {
    console.error("Error deleting recommendation:", e);
    let errorMessage = "An unexpected error occurred.";
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    return { success: false, error: errorMessage };
  }
};

export default deleteSavedRecommendation;
