export default function placesImageLoader({ src }: { src: string }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Use an environment variable for the API key
  return `${src}&maxHeightPx=350&maxWidthPx=500&key=${apiKey}`;
}

export function tinyPlacesImageLoader({ src }: { src: string }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Use an environment variable for the API key
  return `${src}&maxHeightPx=100&maxWidthPx=100&key=${apiKey}`;
}
