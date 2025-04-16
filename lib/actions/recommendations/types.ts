export interface Business {
  business_name: string;
  business_address: string;
  business_city: string;
  business_state: string;
  business_country: string;
  appealing_description?: string;
  recommendation_title?: string;
  recommendation_summary?: string;
  categoryKey: string;
  typeKey: string;
}

export interface DetailsObject {
  places: Place[];
}

export interface PlaceDetails {
  details: DetailsObject;
}

export interface Place {
  formattedAddress: string;
  displayName: DisplayName;
  photos: Photo[];
  businessStatus?: string; // e.g., "OPERATIONAL"
  currentOpeningHours?: string; // e.g., "9:00 AM - 5:00 PM"
  priceRange?: string; // e.g., "$$"
  rating?: number; // e.g., 4.5
  userRatingCount?: number; // e.g., 1234
  websiteUri?: string; // e.g., "https://example.com"
  allowsDogs?: boolean; // e.g., true
  editorialSummary?: {
    text: string;
    languageCode: string;
  };
  goodForChildren?: boolean; // e.g., true
  reservable?: boolean; // e.g., true
  priceLevel?: string; // e.g., 2 (Google's price level system)
  types?: string[]; // e.g., ["restaurant", "food", "point_of_interest"]
  internationalPhoneNumber?: string; // e.g., "+1 123-456-7890"
  googleMapsUri?: string;
}

interface DisplayName {
  text: string;
  languageCode: string;
}

interface Photo {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: AuthorAttribution[];
  flagContentUri: string;
  googleMapsUri: string;
}

export interface AuthorAttribution {
  displayName: string;
  uri: string;
  photoUri: string;
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

export interface RecommendationsResponse {
  rentals: {
    top_10_recommendations: RecommendationItem[];
    best_deals?: RecommendationItem[];
    most_popular?: RecommendationItem[];
    most_luxurious?: RecommendationItem[];
  };
  vacation_destinations?: {
    top_10_recommendations?: RecommendationItem[];
    best_deals?: RecommendationItem[];
    most_popular?: RecommendationItem[];
    most_luxurious?: RecommendationItem[];
  };
}

export interface RecommendationItem extends Place {
  business_name: string;
  business_address: string;
  business_city: string;
  business_state: string;
  business_country: string;
  appealing_description: string;
  recommendation_title?: string;
  recommendation_summary?: string;
  categoryKey: string;
  typeKey: string;
}
