import Image from "next/image";
import { Star, Heart, MapPin } from "lucide-react";
import placeholderImage from "@/assets/images/card/placeholder.png";
import Badge from "../../ui/Badge";

const SavedPanel: React.FC = () => {
  const destinations = [
    {
      name: "Santorini",
      location: "Greece",
      rating: 4.8,
      tags: ["Beach", "Romantic", "Scenic"],
    },
    {
      name: "Kyoto",
      location: "Japan",
      rating: 4.7,
      tags: ["Cultural", "Historic"],
    },
    {
      name: "Bali",
      location: "Indonesia",
      rating: 4.6,
      tags: ["Beach", "Adventure"],
    },
    {
      name: "Montreal",
      location: "Canada",
      rating: 4.5,
      tags: ["Urban", "Cultural"],
    },
    {
      name: "Galapagos Islands",
      location: "Ecuador",
      rating: 4.9,
      tags: ["Nature", "Wildlife"],
    },
  ];

  return (
    <div className="">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white border-gray-200">
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Saved Destinations</h2>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-4">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="flex items-start gap-4 py-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    alt={destination.name}
                    src={placeholderImage}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-0.5 right-0.5 inline-flex items-center justify-center text-red-500 bg-white/70 rounded-full p-0.5">
                    <Heart className="h-4 w-4 fill-red-500" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-base truncate">
                    {destination.name}
                  </h4>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <div className="flex items-center min-w-0">
                      <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                      <span className="truncate">{destination.location}</span>
                    </div>
                    <div className="flex items-center text-sm flex-shrink-0">
                      <Star
                        size={16}
                        className="mr-1 text-yellow-500 fill-yellow-500"
                      />
                      <span>{destination.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {destination.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedPanel;
