"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Tag,
  ArrowLeft,
  MapPin,
  Home,
  DollarSign,
  Clock,
  Activity,
  LucideIcon,
  Container,
} from "lucide-react";
import Link from "next/link";

import useUserDocumentContext from "@/common/providers/user-document";
import getSavedRecommendation from "@/lib/actions/get-saved-recommendation";
import {
  RecommendationsResponse,
  RecommendationItem,
} from "@/lib/actions/recommendations/types";
import { formatDate, SearchItem } from "../search-history/context";
import PlaceCard from "@/common/components/home/place-card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/common/components/ui/Tabs";
import SearchesSkeleton from "../searches-skeleton";
import { notFound } from "next/navigation";

type TabType = "destinations" | "rentals";

const CriterionCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <div className="flex items-center mb-2">
      <Icon className="h-5 w-5 text-teal-600 mr-2" />
      <span className="font-medium">{label}</span>
    </div>
    <p className="text-gray-700">{value || "Not specified"}</p>
  </div>
);

export default function SearchesView({ id }: { id: string }) {
  const { userDocID } = useUserDocumentContext();
  const [isLoading, setIsLoading] = useState(true);
  const [recommendation, setRecommendation] = useState<SearchItem>();
  const [activeTab, setActiveTab] = useState<TabType>("destinations");

  useEffect(() => {
    const savedTab =
      typeof window !== "undefined"
        ? (localStorage.getItem("vacation-focus") as TabType)
        : null;
    setActiveTab(savedTab || "destinations");

    async function fetchRecommendation() {
      if (!id || !userDocID) return;

      try {
        setIsLoading(true);

        const result = await getSavedRecommendation({ id, userDocID });

        if (result?.success && result.data) {
          const recommendationsJSON = JSON.parse(
            result.data.customValue_1 || "",
          ) as RecommendationsResponse;

          const answersArray = JSON.parse(
            result.data.customValue_2 || "",
          ) as string[];

          const recommendationsSlice =
            recommendationsJSON?.vacation_destinations?.top_10_recommendations?.slice(
              0,
              3,
            ) || [];

          const formattedData = {
            id,
            recommendations: recommendationsSlice,
            rawRecommendationsData: recommendationsJSON,
            openAIID: result.data.openAIID,
            answers: answersArray,
            date: formatDate(result.data.updatedAt),
            title:
              recommendationsSlice[0].recommendation_title || answersArray[0],
            summary:
              recommendationsSlice[0].recommendation_summary || answersArray[3],
            destinations:
              recommendationsSlice?.map((slice) => ({
                name: slice.business_name,
                city: slice.business_city,
                country: slice.business_country,
                url: slice.googleMapsUri || slice.websiteUri,
              })) || [],
            tags:
              recommendationsSlice?.flatMap(
                (slice) =>
                  slice.types?.map((t) => t.replaceAll(/_/g, " ")) || [],
              ) || [],
          };
          setRecommendation(formattedData);
        }
      } catch (e) {
        console.error("Error fetching recommendation", e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendation();
  }, [id, userDocID]);

  const handleTabChange = (value: string) => {
    const tab = value as TabType;
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      localStorage.setItem("vacation-focus", tab);
    }
  };

  if (isLoading) {
    return <SearchesSkeleton />;
  }

  if (!recommendation && !isLoading) {
    notFound();
  }

  const hasDestinations =
    recommendation?.rawRecommendationsData?.vacation_destinations
      ?.top_10_recommendations &&
    recommendation.rawRecommendationsData.vacation_destinations
      .top_10_recommendations.length > 0;
  const hasRentals =
    recommendation?.rawRecommendationsData?.rentals?.top_10_recommendations &&
    recommendation.rawRecommendationsData.rentals.top_10_recommendations
      .length > 0;

  const destinationRecs =
    recommendation?.rawRecommendationsData?.vacation_destinations
      ?.top_10_recommendations || [];
  const rentalRecs =
    recommendation?.rawRecommendationsData?.rentals?.top_10_recommendations ||
    [];

  return (
    <Container className="bg-gray-100 min-h-screen w-full">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-teal-600 hover:text-teal-700 mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
        </Link>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
          <h1 className="text-3xl font-bold">{recommendation?.title}</h1>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-teal-50 text-teal-700 border-teal-200">
              <Calendar className="mr-1 h-4 w-4" /> {recommendation?.date}
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-6 max-w-3xl">
          {recommendation?.summary}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {recommendation?.tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-white text-gray-800 border-gray-200"
            >
              <Tag className="mr-1 h-3 w-3" /> {tag}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Your Search Criteria</h2>
        {recommendation?.answers && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                icon: MapPin,
                label: "Destination",
                value: recommendation.answers[3],
                index: 3,
              },
              {
                icon: Home,
                label: "Accommodation",
                value: recommendation.answers[1],
                index: 1,
              },
              {
                icon: DollarSign,
                label: "Budget",
                value: recommendation.answers[2],
                index: 2,
              },
              {
                icon: Clock,
                label: "Duration",
                value: recommendation.answers[5],
                index: 5,
              },
              {
                icon: Activity,
                label: "Activities",
                value: recommendation.answers[4],
                index: 4,
              },
            ].map((criterion, idx) => (
              <CriterionCard
                key={`criterion-${idx}`}
                icon={criterion.icon}
                label={criterion.label}
                value={criterion.value}
              />
            ))}
          </div>
        )}
      </div>

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
                {destinationRecs.map(
                  (rec: RecommendationItem, index: number) => (
                    <PlaceCard
                      key={`destination-${rec.business_name}-${index}`}
                      rec={rec}
                    />
                  ),
                )}
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
    </Container>
  );
}
