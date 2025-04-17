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
import saveFavorite from "@/lib/actions/save-favorite";
import useUserDocumentContext from "@/common/providers/user-document";

const PlaceCard: React.FC<{
  rec: RecommendationItem;
  maxTagCount?: number;
}> = ({ rec, maxTagCount = 4 }) => {
  const [photoUrl, setPhotoUrl] = useState(
    rec.photos?.[0]?.name
      ? `https://places.googleapis.com/v1/${rec.photos[0].name}/media/?`
      : placeholder.src, // Use placeholder if no photo is available
  );

  const { isSignedIn } = useUser();
  const { userDocID, isFavoriteSelector, isLoading } = useUserDocumentContext();

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

  const toggleFavorite: (
    isSelected: boolean,
  ) => Promise<boolean | undefined> = async (isSelected: boolean) => {
    if (userDocID) {
      const saved = await saveFavorite(
        userDocID,
        rec.id,
        isSelected,
        JSON.stringify(rec),
      );
      return saved?.success && isSelected;
    }
    return isSelected;
  };

  return (
    <Card className="overflow-hidden bg-white hover:shadow-lg transition-shadow h-[550px] flex flex-col">
      <div className="relative h-56 w-full flex-shrink-0">
        {/* Wrapper for responsive image */}
        <Image
          src={photoUrl}
          fetchPriority="low"
          loader={photoUrl !== placeholder.src ? placesImageLoader : undefined}
          alt={rec.business_name}
          loading="lazy"
          placeholder="blur"
          fill
          className="object-cover object-center w-full h-full"
          blurDataURL={placeholder.src}
          onError={() => setPhotoUrl(placeholder.src)} // Set fallback image on error
        />

        {rec?.rating && (
          <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 flex items-center">
            {renderStars()}
            <span className="ml-1 text-sm font-medium">{rec?.rating}</span>
          </div>
        )}
        {isSignedIn && userDocID && rec?.id && !isLoading && (
          <div className="absolute top-2 right-2">
            <HeartButton
              defaultIsSelected={isFavoriteSelector(rec?.id) || false}
              onClick={toggleFavorite}
            />
          </div>
        )}
      </div>
      <CardContent className="p-4 flex-grow overflow-hidden">
        <div className="flex items-start justify-between mb-2 mt-6">
          <CardTitle className="line-clamp-1">{rec.business_name}</CardTitle>
          <div className="text-teal-600 font-medium">
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
        <p className="text-gray-600 mb-3 line-clamp-2">
          {rec.appealing_description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Get all badges first */}
          {(() => {
            const allBadges = [
              rec.categoryKey,
              rec.typeKey,
              ...(rec?.types?.slice(0, 5) || []),
            ].filter(Boolean);

            // Only show first x badges to prevent overflow
            const visibleBadges = allBadges.slice(0, maxTagCount);
            const remainingCount = allBadges.length - visibleBadges.length;

            return (
              <>
                {visibleBadges.map((badge, index) => (
                  <Badge variant="secondary" key={index}>
                    {typeof badge === "string"
                      ? badge.replaceAll("_", " ")
                      : ""}
                  </Badge>
                ))}

                {remainingCount > 0 && (
                  <Badge variant="dashed">+{remainingCount} more</Badge>
                )}
              </>
            );
          })()}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full" asChild>
          <a
            href={rec?.websiteUri || rec?.googleMapsUri}
            target="_blank"
            rel="noopener"
          >
            View Details
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlaceCard;
