import { RecommendationItem } from "@/lib/actions/recommendations/types";
import PlaceCard from "@/common/components/home/place-card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/common/components/ui/Tabs";
import { TabType } from "../use-tabs";

interface RecommendationsTabsProps {
  activeTab: TabType;
  handleTabChange: (value: string) => void;
  destinationRecs: RecommendationItem[];
  rentalRecs: RecommendationItem[];
  hasDestinations: boolean;
  hasRentals: boolean;
}

export default function RecommendationsTabs({
  activeTab,
  handleTabChange,
  destinationRecs,
  rentalRecs,
  hasDestinations,
  hasRentals,
}: RecommendationsTabsProps) {
  return (
    <div className="mb-8">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <div className="flex justify-center mb-6">
          <TabsList className="bg-white">
            <TabsTrigger value="destinations" disabled={!hasDestinations}>
              Destinations
            </TabsTrigger>
            <TabsTrigger value="rentals" disabled={!hasRentals}>
              Rentals
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="destinations">
          {destinationRecs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destinationRecs.map((rec: RecommendationItem, index: number) => (
                <PlaceCard
                  key={`destination-${rec.business_name}-${index}`}
                  rec={rec}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600">
                No destination recommendations available
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="rentals">
          {rentalRecs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rentalRecs.map((rec: RecommendationItem, index: number) => (
                <PlaceCard
                  key={`rental-${rec.business_name}-${index}`}
                  rec={rec}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600">
                No rental recommendations available
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
