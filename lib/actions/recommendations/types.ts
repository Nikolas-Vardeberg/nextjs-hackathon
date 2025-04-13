export interface Business {
  business_name: string;
  business_address: string;
  business_city: string;
  business_state: string;
  business_country: string;
}

export interface RecommendationsCategory {
  top_10_recommendations: Business[];
  best_deals: Business[];
  most_popular: Business[];
  most_luxurious: Business[];
}

export interface Recommendations {
  rentals: RecommendationsCategory;
  vacation_destinations: RecommendationsCategory;
}

export interface OpenAIMessage {
  role: string; // e.g., "assistant" or "user"
  content: string; // The JSON string containing recommendations
}

export interface OpenAIChoice {
  index: number;
  message: OpenAIMessage;
  finish_reason: string; // e.g., "stop"
}

export interface OpenAIResponse {
  id: string; // Unique identifier for the response
  object: string; // e.g., "chat.completion"
  created: number; // Timestamp of the response
  model: string; // Model used, e.g., "gpt-4o-mini"
  choices: OpenAIChoice[]; // Array of choices returned by OpenAI
}
