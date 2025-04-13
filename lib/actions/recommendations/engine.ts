import mock from "./mock.json";
import googleMock from "./google-mock.json";
import { Business, DetailsObject, Recommendations } from "./types";
export const HERO_SEARCH_DEFAULTS = [
  "What is your ideal vacation destination or rental?",
  "What amenities are most important to you?",
  "What is your budget range?",
  "Are you looking for a specific location?",
  "What was your favorite vacation or rental experience?",
  "When are you planning to travel?",
];
const MOCK_AI_MODE = process.env.NEXT_PUBLIC_MOCK_AI_MODE === "true";

export async function fetchOpenAIRecommendations(answers: string[]) {
  const formattedPrompt = HERO_SEARCH_DEFAULTS.map((question, index) => {
    return `Question ${index + 1}: ${question} Answer: ${answers[index]}`;
  }).join("\n");
  if (MOCK_AI_MODE) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mock);
      }, 2000);
    });
  }
  const openAIResponse = await fetch(
    "https://api.openai.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_API_KEY_0}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          {
            role: "system",
            content:
              'You are a vacation and rental finder. Your primary function is to generate structured JSON output to help generate data for Google Places. I will send you a series of questions followed by answers to provide context. Based on this context, return recommendations in the following JSON format:\n\n{\n  "rentals": {\n    "top_10_recommendations": [\n      {\n        "business_name": "...",\n        "business_address": "...",\n        "business_city": "...",\n        "business_state": "...",\n        "business_country": "..."\n      }\n      // 9 more\n    ],\n    "best_deals": [ ... 10 objects ... ],\n    "most_popular": [ ... 10 objects ... ],\n    "most_luxurious": [ ... 10 objects ... ]\n  },\n  "vacation_destinations": {\n    "top_10_recommendations": [ ... 10 objects ... ],\n    "best_deals": [ ... 10 objects ... ],\n    "most_popular": [ ... 10 objects ... ],\n    "most_luxurious": [ ... 10 objects ... ]\n  }\n}\n\nEach item in each list must be an object with the following fields:\n- business_name\n- business_address\n- business_city\n- business_state\n- business_country\n\nOnly return the JSON. Do not include any other text or explanation.',
          },
          {
            role: "user",
            content: formattedPrompt,
          },
        ],
      }),
    },
  )
    .then((response) => {
      if (!response.ok) {
        console.error("Network response was not ok:", response);
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data from OpenAI API:", error);
      // Handle the error as needed
      throw new Error("Error fetching data from OpenAI API");
    });
  return openAIResponse;
}

export async function fetchGoogleDetails(messageContent: string) {
  if (MOCK_AI_MODE) {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Mocking Google API response");
        resolve(googleMock);
      }, 2000);
    });
  }
  const content: Recommendations = JSON.parse(messageContent);
  const businesses = Object.entries(content).flatMap(
    ([categoryKey, category]) =>
      Object.entries(category).flatMap(([typeKey, businessList]) =>
        (businessList as Business[]).map((business) => ({
          ...business,
          categoryKey,
          typeKey,
        })),
      ),
  ) as Business[];

  const googleApiUrl = "https://places.googleapis.com/v1/places:searchText";

  const fetchDetails = async (business: Business) => {
    const query = `${business.business_name}, ${business.business_address}, ${business.business_city}, ${business.business_state}, ${business.business_country}`;

    try {
      const response = await fetch(googleApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": `${process.env.GOOGLE_API_KEY}`, // Replace with your actual API key
          "X-Goog-FieldMask":
            "places.businessStatus,places.currentOpeningHours,places.priceRange,places.rating,places.userRatingCount,places.websiteUri,places.allowsDogs,places.editorialSummary,places.goodForChildren,places.reservable,places.displayName,places.formattedAddress,places.priceLevel,places.googleMapsUri,places.photos,places.types,places.internationalPhoneNumber",
        },
        body: JSON.stringify({
          textQuery: query,
          maxResultCount: 1,
        }),
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch details for ${business.business_name}`,
        );
      }
      const data: DetailsObject = await response.json();
      const retVal = { ...business, ...data.places?.[0] };
      return retVal;
    } catch (error) {
      console.error(
        `Error fetching details for ${business.business_name}:`,
        error,
      );
      return { business, details: null };
    }
  };

  const results = await Promise.all(businesses.map(fetchDetails));
  return results;
}
