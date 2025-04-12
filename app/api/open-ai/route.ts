import { fetchOpenAIRecommendations } from "@/lib/actions/recommendations/engine";

/**
 * Handles a GET request to interact with the OpenAI API for vacation planning recommendations.
 *
 * This function extracts the `input` parameter from the request's query string, sends it to the
 * OpenAI API, and returns a JSON response containing the API's recommendations.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @returns {Promise<Response>} A promise that resolves to a JSON response containing the success status,
 *                              a message, and the data fetched from the OpenAI API.
 *
 * @throws {Error} If there is an issue with the network request or the OpenAI API response.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input");
  if (!input) {
    return Response.json(
      { success: false, message: "Input parameter is required" },
      { status: 400 },
    );
  }
  try {
    const openAIResponse = await fetchOpenAIRecommendations([input]);
    return Response.json(
      {
        success: true,
        message: "Data fetched successfully",
        data: openAIResponse,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Error:", error);
    if (error instanceof Error) {
      return Response.json(
        { success: false, message: error.message },
        { status: 500 },
      );
    } else {
      Response.json(
        { success: false, message: "An unknown error occurred" },
        { status: 500 },
      );
    }
  }
}
