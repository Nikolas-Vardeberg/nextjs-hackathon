"use client";

import { Palmtree, Loader2, Sun, Umbrella } from "lucide-react";

type VacationSearchLoadingProps = {
  vacationFocus: string | undefined;
};

const getVacationFocusText = (focusType: string | undefined) => {
  if (focusType === "destinations") return "vacation destinations";
  if (focusType === "rentals") return "vacation rentals";
  return "vacation options";
};

export default function VacationSearchLoading({
  vacationFocus,
}: VacationSearchLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="flex items-center justify-center mb-6 animate-pulse">
        <Palmtree size={40} className="text-primary mr-3" />
        <Sun size={40} className="text-amber-400" />
        <Umbrella size={40} className="text-rose-500 ml-3" />
      </div>
      <div className="flex flex-col items-center justify-center mb-4">
        <p className="text-lg font-medium text-nightocean mb-3">
          Generating your perfect getaway
        </p>
        <Loader2 className="h-6 w-6 text-primary animate-spin" />
      </div>
      <p className="text-gray-500 text-center max-w-md">
        We&apos;re finding the best {getVacationFocusText(vacationFocus)} based
        on your preferences. This will just take a moment.
      </p>
    </div>
  );
}
