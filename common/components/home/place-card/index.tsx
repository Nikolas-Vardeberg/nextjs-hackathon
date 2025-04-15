import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/common/components/ui/card";
import { Star, MapPin, StarHalf } from "lucide-react";
import { RecommendationItem } from "@/lib/actions/recommendations/types";
import Image from "next/image";
import placeholder from "@/assets/images/card/placeholder.png";
import placesImageLoader from "@/lib/image-loaders/places";
import { useState } from "react";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import { useUser } from "@clerk/nextjs";
import HeartButton from "../../ui/HeartButton";

const PlaceCard: React.FC<{ rec: RecommendationItem }> = ({ rec }) => {
  const [photoUrl, setPhotoUrl] = useState(
    rec.photos?.[0]?.name
      ? `https://places.googleapis.com/v1/${rec.photos[0].name}/media/?maxHeightPx=500`
      : placeholder.src, // Use placeholder if no photo is available
  );

  const { isSignedIn } = useUser();

  const renderStars = () => {
    const rating = rec?.rating || 0; // Get the rating value
    const fullStars = Math.floor(rating); // Number of fully filled stars
    const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half star
    const totalStars = 5; // Total number of stars

    return Array.from({ length: totalStars }, (_, index) => {
      if (index < fullStars) {
        // Fully filled star
        return (
          <Star
            key={index}
            className="h-4 w-4 text-yellow-400 fill-yellow-400"
          />
        );
      } else if (index === fullStars && hasHalfStar) {
        // Half-filled star
        return (
          <StarHalf
            key={index}
            className="h-4 w-4 text-yellow-400 fill-yellow-400"
          />
        );
      } else {
        // drop star
        return null;
      }
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-72">
        {/* Wrapper for responsive image */}
        <Image
          src={photoUrl}
          loader={photoUrl !== placeholder.src ? placesImageLoader : undefined}
          alt={rec.business_name}
          loading="lazy"
          placeholder="blur"
          fill
          blurDataURL={placeholder.src}
          onError={() => setPhotoUrl(placeholder.src)} // Set fallback image on error
          className="rounded-md object-cover  object-center" // Optional: Add rounded corners
        />
        {isSignedIn && (
          <div className="absolute top-2 left-2">
            <HeartButton onClick={(isSelected) => isSelected} />
          </div>
        )}
        {rec?.rating && (
          <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center">
            {renderStars()}

            <span className="ml-1 text-sm font-medium">{rec?.rating}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4 ">
        <div className="flex items-start justify-between mb-2 mt-6">
          <CardTitle>{rec.business_name}</CardTitle>
          <div className="text-teal-700 font-medium">
            {rec?.priceLevel === "PRICE_LEVEL_FREE" || !rec?.priceLevel
              ? "$"
              : rec?.priceLevel === "PRICE_LEVEL_MODERATE"
                ? "$$$"
                : "$$"}
          </div>
        </div>
        <div className="flex items-center text-gray-500 mb-3 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {rec.business_city}, {rec.business_country}
          </span>
        </div>
        <p className="text-gray-600 mb-3">{rec.appealing_description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-teal-50">
            {rec.categoryKey?.replaceAll("_", " ")}
          </Badge>
          <Badge variant="outline" className="bg-teal-50">
            {rec.typeKey?.replaceAll("_", " ")}
          </Badge>

          {rec?.types?.slice(0, 5).map((val) => (
            <Badge variant="outline" className="bg-teal-50" key={val}>
              {val.replaceAll("_", " ")}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <a
          className="w-full block"
          href={rec?.websiteUri || rec?.googleMapsUri}
          target="_blank"
          rel="noopener"
        >
          <Button className="w-full bg-teal-600 hover:bg-teal-700">
            View Details
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default PlaceCard;
