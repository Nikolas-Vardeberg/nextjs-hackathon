"use client";

type VacationSearchProgressProps = {
  currentStep: number;
  totalSteps: number;
  isProcessing: boolean;
};

export default function VacationSearchProgress({
  currentStep,
  totalSteps,
  isProcessing,
}: VacationSearchProgressProps) {
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 h-1.5 rounded-full mb-2">
      <div
        className="bg-primary h-1.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: isProcessing ? "100%" : `${progressPercentage}%` }}
      ></div>
    </div>
  );
}
