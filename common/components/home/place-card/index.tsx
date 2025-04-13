import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/common/components/ui/card";
import { RecommendationItem } from "@/lib/actions/recommendations/types";
import Image from "next/image";
const PlaceCard: React.FC<{ rec: RecommendationItem }> = ({ rec }) => {
  const photoUrl =
    rec.photos?.[0]?.authorAttributions[0].photoUri || "/placeholder.jpg"; // Fallback to a placeholder if no photo is available

  return (
    <Card className="min-h-56">
      <CardHeader>
        <CardTitle>{rec.business_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={photoUrl}
          alt={rec.business_name}
          width={400}
          height={300}
          className="object-cover"
        />
      </CardContent>
      <CardFooter>{rec.categoryKey}</CardFooter>
    </Card>
  );
};

export default PlaceCard;
