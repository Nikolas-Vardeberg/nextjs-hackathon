import Image from "next/image";
import { Star, Heart } from "lucide-react";
import placeholderImage from "@/assets/images/card/placeholder.png";

const SavedPanel: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-white border-gray-200">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Saved Destinations
          </h3>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-4">
            {/* Saved Destination Items */}
            {[
              {
                name: "Santorini, Greece",
                rating: 4.8,
                tags: ["Beach", "Romantic", "Scenic"],
              },
              {
                name: "Kyoto, Japan",
                rating: 4.7,
                tags: ["Cultural", "Historic"],
              },
              {
                name: "Bali, Indonesia",
                rating: 4.6,
                tags: ["Beach", "Adventure"],
              },
              {
                name: "Montreal, Canada",
                rating: 4.5,
                tags: ["Urban", "Cultural"],
              },
              {
                name: "Galapagos Islands, Ecuador",
                rating: 4.9,
                tags: ["Nature", "Wildlife"],
              },
            ].map((destination, index) => (
              <div
                key={index}
                className="flex gap-3 border rounded-md p-3 hover:bg-gray-50 transition-colors border-gray-300"
              >
                <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    alt={destination.name}
                    src={placeholderImage}
                    width={150}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium truncate">{destination.name}</h4>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground text-red-500 h-8 w-8">
                      <Heart className="fill-red-500" />
                    </button>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Star className="mr-1 text-yellow-500 fill-yellow-500" />
                    <span>{destination.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {destination.tags.map((tag, tagIndex) => (
                      <div
                        key={tagIndex}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground text-xs"
                      >
                        {tag}
                      </div>
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
