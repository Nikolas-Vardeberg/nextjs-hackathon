"use server";
import { auth } from "@clerk/nextjs/server";
import PlaceDocument from "@/lib/mongoose/models/place";
import { connectDB } from "@/lib/mongoose";

const saveFavorite = async (
  userDocID: string,
  googlePlaceID: string,
  favorite: boolean,
  dataCache: string,
) => {
  try {
    await auth();
    await connectDB();
    await PlaceDocument.findOneAndUpdate(
      { userDocID, googlePlaceID }, // Match criteria
      {
        userDocID,
        googlePlaceID,
        googlePlaceDataCache: dataCache,
        favorite: favorite,
      }, // New data to update or replace
      { upsert: true, new: true }, // Options: create if not found, return the updated document
    );
    return { success: true };
  } catch (e) {
    if (e && e instanceof Error) throw Error(e.message);
  }
};

export default saveFavorite;
