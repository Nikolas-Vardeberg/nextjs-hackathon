const { OPEN_API_KEY_0 } = process.env;
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
  try {
    const openAIResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPEN_API_KEY_0}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          store: true,
          messages: [
            {
              role: "developer",
              content:
                "You are a vacation planner. Your job is to help me plan a vacation and provide recommendations based on my previous vacations. When providing recommendations provide a list of contries seperated by city and state and the top hotel recommendation name and address.",
            },
            {
              role: "user",
              content: input,
            },
          ],
        }),
      },
    )
      .then((response) => {
        if (!response.ok) {
          console.error("Network response was not ok:", response.statusText);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching data from OpenAI API:", error);
        // Handle the error as needed
        throw new Error("Error fetching data from OpenAI API");
      });
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
