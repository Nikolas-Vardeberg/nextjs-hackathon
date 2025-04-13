import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { RecommendationItem } from "@/lib/actions/recommendations/types";
import Image from "next/image";
import placeholder from "@/assets/images/card/placeholder.png";
import placesImageLoader from "@/lib/image-loaders/places";
import { useState } from "react";
const PlaceCard: React.FC<{ rec: RecommendationItem }> = ({ rec }) => {
  const [photoUrl, setPhotoUrl] = useState(
    rec.photos?.[0]?.name
      ? `https://places.googleapis.com/v1/${rec.photos[0].name}/media/?maxHeightPx=500`
      : placeholder.src, // Use placeholder if no photo is available
  );
  return (
    <Card className="min-h-56">
      <CardHeader>
        <CardTitle>{rec.business_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-64">
          {/* Wrapper for responsive image */}
          <Image
            src={photoUrl}
            loader={
              photoUrl !== placeholder.src ? placesImageLoader : undefined
            }
            alt={rec.business_name}
            fill // Makes the image fill the parent container
            loading="lazy"
            placeholder="blur"
            blurDataURL={placeholder.src}
            onError={() => setPhotoUrl(placeholder.src)} // Set fallback image on error
            className="rounded-md" // Optional: Add rounded corners
          />
        </div>
      </CardContent>
      <CardFooter>{rec.categoryKey}</CardFooter>
    </Card>
  );
};

export default PlaceCard;
