import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/common/components/ui/card";
import { Star, MapPin } from "lucide-react";
import { RecommendationItem } from "@/lib/actions/recommendations/types";
import Image from "next/image";
import placeholder from "@/assets/images/card/placeholder.png";
import placesImageLoader from "@/lib/image-loaders/places";
import { useState } from "react";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";

const PlaceCard: React.FC<{ rec: RecommendationItem }> = ({ rec }) => {
  const [photoUrl, setPhotoUrl] = useState(
    rec.photos?.[0]?.name
      ? `https://places.googleapis.com/v1/${rec.photos[0].name}/media/?maxHeightPx=500`
      : placeholder.src, // Use placeholder if no photo is available
  );

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
        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="ml-1 text-sm font-medium">1</span>
        </div>
      </div>
      <CardContent className="p-4 ">
        <div className="flex items-start justify-between mb-2 mt-6">
          <CardTitle>{rec.business_name}</CardTitle>
          <div className="text-teal-700 font-medium">$$$</div>
        </div>
        <div className="flex items-center text-gray-500 mb-3 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {rec.business_city}, {rec.business_country}
          </span>
        </div>
        <p className="text-gray-600 mb-3">
          A description will go here eventually
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="bg-teal-50">
            {rec.categoryKey}
          </Badge>
          <Badge variant="outline" className="bg-teal-50">
            {rec.typeKey.replaceAll("_", " ")}
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-teal-600 hover:bg-teal-700">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlaceCard;
