"use server";
import { auth } from "@clerk/nextjs/server";
import PlaceDocument from "@/lib/mongoose/models/place";
import { connectDB } from "@/lib/mongoose";
import type { PlaceDocument as PlaceDocumentType } from "@/lib/mongoose/models/types";
const getFavorites = async (
  userDocID: string,
  limit?: number,
  skip?: number,
) => {
  try {
    await auth();
    await connectDB();

    console.log(userDocID);
    const favorites = await PlaceDocument.find({ userDocID, favorite: true })
      .limit(limit || 1000)
      .skip(skip || 0)
      .lean();
    return {
      success: true,
      data: favorites.map(({ userDocID, _id, ...fav }) => ({
        _id: _id?.toString(),
        userDocID: userDocID?.toString(),
        ...fav,
      })) as unknown as PlaceDocumentType[],
    };
  } catch (e) {
    console.log(e);
    if (e && e instanceof Error) throw Error(e.message);
  }
};

export default getFavorites;
