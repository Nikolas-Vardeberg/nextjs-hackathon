"use client";

import Container from "@/common/components/atoms/layouts/Container";
import Hero from "@/common/components/home/hero";
import useRecommendations from "@/common/providers/recommendations";
import GridSection from "./grid-section";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/common/components/ui/Tabs";
import { useState } from "react";

export default function HomeView() {
  const { loadRecommendations, recommendations, isLoading } =
    useRecommendations();
  const [activeTab, setActiveTab] = useState("destinations");

  const hasRentals =
    recommendations?.rentals && Object.keys(recommendations.rentals).length > 0;
  const hasDestinations =
    recommendations?.vacation_destinations &&
    Object.keys(recommendations.vacation_destinations).length > 0;
  const hasData = hasRentals || hasDestinations;

  return (
    <>
      <Hero
        onSearch={(answers) => !isLoading && loadRecommendations?.(answers)}
      />
      <Container as="section" className="py-20">
        {!hasData && (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-nightocean mb-4">
              Discover Your Perfect Getaway
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Use the search above to find personalized vacation recommendations
              tailored just for you.
            </p>
          </div>
        )}

        {hasData && (
          <Tabs
            defaultValue={hasDestinations ? "destinations" : "rentals"}
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="destinations" disabled={!hasDestinations}>
                  Destinations
                </TabsTrigger>
                <TabsTrigger value="rentals" disabled={!hasRentals}>
                  Rentals
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="destinations" className="flex flex-col gap-10">
              {hasDestinations &&
                Object.entries(
                  recommendations!.vacation_destinations || {},
                ).map(([key, value]) => (
                  <div key={key}>
                    <GridSection
                      title={key.replace(/_/g, " ")}
                      recommendations={value}
                    />
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="rentals" className="flex flex-col gap-10">
              {hasRentals &&
                Object.entries(recommendations!.rentals).map(([key, value]) => (
                  <div key={key}>
                    <GridSection
                      title={key.replace(/_/g, " ")}
                      recommendations={value}
                    />
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        )}
      </Container>
    </>
  );
}
