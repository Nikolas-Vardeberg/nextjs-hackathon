import { connectDB } from "@/lib/mongoose";
import UserDocument from "@/lib/mongoose/models/user";

/**
 * Handles a GET request to retrieve a user document from the database.
 *
 * This function fetches a user document based on the provided `authToken` query parameter.
 * If the user document is found, it is returned in the response. If not, a 404 error is returned.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @returns {Promise<Response>} A promise that resolves to a JSON response containing the success status
 *                              and the retrieved user document or an error message.
 *
 * Query Parameters:
 * - `authToken` (string, required): The authentication token used to identify the user document.
 * - `clerkUserID` (string, required): The unique identifier for the user in Clerk.
 *
 * @throws {Error} If there is an issue with the database connection or the query.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const authToken = searchParams.get("authToken");
  const clerkUserID = searchParams.get("clerkUserID");
  if (!authToken && !clerkUserID) {
    return Response.json(
      { success: false, message: "authToken or clerkUserID is required" },
      { status: 400 },
    );
  }
  try {
    await connectDB();
    const userDoc = await UserDocument.findOne({
      $or: [{ authToken }, { clerkUserID }],
    });
    if (!userDoc) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }
    return Response.json({
      success: true,
      data: userDoc,
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
 * Handles a POST request to create a new user document in the database.
 *
 * This function accepts a JSON payload containing the necessary data to create a new `UserDocument`.
 * It connects to the database, saves the document, and returns the saved document in the response.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @returns {Promise<Response>} A promise that resolves to a JSON response containing the success status
 *                              and the saved user document.
 *
 * Request Body:
 * - `authToken` (string, required): The authentication token for the user.
 * - `authExpiry` (Date, required): The expiration date of the authentication token.
 * - `fullName` (string, optional): The full name of the user.
 * - `clerkUserID` (string, required): The unique identifier for the user in Clerk.
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
    const userDoc = new UserDocument({
      authToken: data.authToken,
      authExpiry: data.authExpiry,
      fullName: data.fullName,
      clerkUserID: data.clerkUserID,
      customValue_1: data.customValue_1 || "",
      customValue_2: data.customValue_2 || "",
      customValue_3: data.customValue_3 || "",
    });
    const savedDocument = await userDoc.save();

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

/**
 * Handles a PUT request to update an existing user document in the database.
 *
 * This function accepts a JSON payload containing the fields to update for a specific user document.
 * It searches for the document using the `clerkUserID` and updates only the provided fields with defined values.
 * If the document is not found, a 404 error is returned.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @returns {Promise<Response>} A promise that resolves to a JSON response containing the success status
 *                              and the updated user document or an error message.
 *
 * Request Body:
 * - `clerkUserID` (string, required): The unique identifier for the user in Clerk (used to locate the document).
 * - `authToken` (string, required): The updated authentication token for the user.
 * - `authExpiry` (Date, optional): The updated expiration date of the authentication token.
 * - `fullName` (string, optional): The updated full name of the user.
 * - `customValue_1` (string, optional): Updated custom field 1.
 * - `customValue_2` (string, optional): Updated custom field 2.
 * - `customValue_3` (string, optional): Updated custom field 3.
 *
 * @throws {Error} If the `clerkUserID` is missing, the document is not found, or there is an issue with the database.
 */
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    await connectDB();

    if (!data.clerkUserID || !data.authToken) {
      return Response.json(
        { success: false, message: "User ID or authToken are required" },
        { status: 400 },
      );
    }

    // Filter out undefined values from the update object
    const updateData = Object.fromEntries(
      Object.entries({
        authToken: data.authToken,
        authExpiry: data.authExpiry,
        fullName: data.fullName,
        customValue_1: data.customValue_1,
        customValue_2: data.customValue_2,
        customValue_3: data.customValue_3,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      }).filter(([_, value]) => value !== undefined), // Exclude undefined values
    );

    const updatedDocument = await UserDocument.findOneAndUpdate(
      {
        $or: [{ clerkUserID: data.clerkUserID }, { authToken: data.authToken }],
      }, // Search by clerkUserID or authToken
      updateData, // Only update fields with defined values
      { new: true, runValidators: true }, // Return the updated document and run validators
    );
    if (!updatedDocument) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, data: updatedDocument });
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
