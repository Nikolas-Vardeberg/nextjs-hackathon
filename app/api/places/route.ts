/**
 * Handles a GET request to interact with the Google Places API for place search functionality.
 *
 * This function extracts the `input` parameter from the request's query string, sends it to the
 * Google Places API, and returns a JSON response containing the API's results.
 *
 * @param {Request} req - The incoming HTTP request object.
 * @returns {Promise<Response>} A promise that resolves to a JSON response containing the success status
 *                              and the data fetched from the Google Places API.
 *
 * @throws {Error} If there is an issue with the network request or the Google Places API response.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input");

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GOOGLE_API_KEY}`,
        },
        body: JSON.stringify({
          textQuery: input,
        }),
      },
    ).then((response) => {
      if (!response.ok) {
        console.error("Network response was not ok:", response.statusText);
        throw new Error("Network response was not ok");
      }
      return { success: true, data: response.json() };
    });
    return Response.json(response, { status: 200 });
  } catch (e: unknown) {
    console.error("Error:", e);
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
