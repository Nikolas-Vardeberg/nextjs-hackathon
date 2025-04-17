"use server";

import { connectDB } from "../../mongoose";
import OpenAIDocument from "../../mongoose/models/open-ai";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const clearAllSavedRecommendations = async ({
  userDocID,
}: {
  userDocID: string;
}) => {
  try {
    if (!userDocID) {
      return { success: false, error: "User Document ID is required." };
    }

    await auth();
    await connectDB();

    const result = await OpenAIDocument.deleteMany({
      userDocID: userDocID,
    });

    if (result.acknowledged) {
      console.log(
        `Deleted ${result.deletedCount} recommendations for userDocID: ${userDocID}`,
      );

      revalidatePath("/dashboard");
      return { success: true, deletedCount: result.deletedCount };
    } else {
      return {
        success: false,
        error: "Unable to clear all recommendations.",
      };
    }
  } catch (e) {
    console.error("Error clearing all recommendations:", e);
    let errorMessage = "An unexpected error occurred while clearing history.";
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    return { success: false, error: errorMessage };
  }
};

export default clearAllSavedRecommendations;
