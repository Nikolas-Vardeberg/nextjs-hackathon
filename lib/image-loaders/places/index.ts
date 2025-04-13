export default function placesImageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Use an environment variable for the API key
  return `${src}?maxWidthPx=${width}&key=${apiKey}`;
}
