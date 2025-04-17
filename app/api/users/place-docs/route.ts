import { connectDB } from "@/lib/mongoose";
import PlaceDocument from "@/lib/mongoose/models/place";

/**
 * Handles a GET request to retrieve documents associated with a specific user from the database.
 *
 * This function fetches documents based on the provided `userDocID` and supports pagination
 * using `limit` and `skip` query parameters. The results are sorted by `createdAt` in descending order.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @returns {Promise<Response>} A promise that resolves to a JSON response containing the success status
 *                              and the retrieved documents.
 *
 * Query Parameters:
 * - `userDocID` (string, required): The ID of the user whose documents are being retrieved.
 * - `limit` (number, optional): The maximum number of documents to return. Defaults to 500.
 * - `skip` (number, optional): The number of documents to skip for pagination. Defaults to 0.
 *
 * @throws {Error} If the `userDocID` is missing or if there is an issue with the database query.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userDocID = searchParams.get("userDocID");
  const limit = searchParams.get("limit");
  const skip = searchParams.get("skip");

  if (!userDocID) {
    return Response.json(
      { success: false, message: "userDocID is required" },
      { status: 400 },
    );
  }

  try {
    await connectDB();
    const openAPIDocuments = await PlaceDocument.find({
      userDocID,
    })
      .sort({ createdAt: -1 })
      .limit(Number(limit) || 500)
      .skip(Number(skip) || 0);
    return Response.json({
      success: true,
      data: openAPIDocuments,
    });
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      return Response.json(
        { success: false, message: e.message },
        { status: 500 },
      );
    } else {
      return Response.json(
        { success: false, message: "An unknown error occurred" },
        { status: 500 },
      );
    }
  }
}

/**
 * Handles a POST request to create a new document in the database.
 *
 * This function accepts a JSON payload containing the necessary data to create a new `PlaceDocument`.
 * It connects to the database, saves the document, and returns the saved document in the response.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @returns {Promise<Response>} A promise that resolves to a JSON response containing the success status
 *                              and the saved document.
 *
 * Request Body:
 * - `googlePlaceID` (string, required): The ID related to the OpenAI document.
 * - `googlePlaceDataCache` (string, required): Cached data from OpenAI.
 * - `userDocID` (string, required): The ID of the associated user document.
 * - `customValue_1` (string, optional): Custom field 1. Defaults to an empty string if not provided.
 * - `customValue_2` (string, optional): Custom field 2. Defaults to an empty string if not provided.
 * - `customValue_3` (string, optional): Custom field 3. Defaults to an empty string if not provided.
 *
 * @throws {Error} If there is an issue with the database connection or saving the document.
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectDB();
    const openAPIDocument = new PlaceDocument({
      googlePlaceID: data.googlePlaceID,
      googlePlaceDataCache: data.googlePlaceDataCache,
      userDocID: data.userDocID,
      favorite: data.favorite,
      customValue_1: data.customValue_1 || "",
      customValue_2: data.customValue_2 || "",
      customValue_3: data.customValue_3 || "",
    });
    const savedDocument = await openAPIDocument.save();

    return Response.json({ success: true, data: savedDocument });
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      return Response.json(
        { success: false, message: e.message },
        { status: 500 },
      );
    } else {
      return Response.json(
        { success: false, message: "An unknown error occurred" },
        { status: 500 },
      );
    }
  }
}
