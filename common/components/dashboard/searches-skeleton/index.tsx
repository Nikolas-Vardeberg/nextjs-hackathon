"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/common/components/ui/Skeleton";
import Container from "../../atoms/layouts/Container";

export default function SearchesSkeleton() {
  return (
    <div className="bg-gray-100 min-h-screen w-full py-10">
      <Container>
        {/* Back to Dashboard and Header */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-teal-600 hover:text-teal-700 mb-4"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
            <Skeleton className="h-10 w-3/4 md:w-1/2" />
            <Skeleton className="h-8 w-32" />
          </div>

          <Skeleton className="h-16 w-full max-w-3xl mb-6" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-16 rounded-full" />
            ))}
          </div>
        </div>

        {/* Search Criteria Cards */}
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center mb-2">
                  <Skeleton className="h-5 w-5 mr-2 rounded" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-5 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Tabs and Results */}
        <div className="mb-8">
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex h-10 items-center justify-center rounded-full bg-white p-1 text-gray-600">
              <Skeleton className="h-8 w-32 rounded-full mr-2" />
              <Skeleton className="h-8 w-32 rounded-full" />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Card Image */}
      <div className="relative h-72">
        <Skeleton className="h-full w-full" />
        <div className="absolute top-2 right-2">
          <Skeleton className="h-8 w-16 rounded-full" />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2 mt-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-6 w-8" />
        </div>

        <Skeleton className="h-4 w-32 mb-3" />
        <Skeleton className="h-16 w-full mb-3" />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-20 rounded-full" />
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 pt-0">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
