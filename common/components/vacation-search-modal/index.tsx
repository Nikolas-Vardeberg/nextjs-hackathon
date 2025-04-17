"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/common/components/ui/Dialog";
import { useVacationSearch } from "@/common/hooks/use-vacation-search";
import VacationSearchProgress from "./vacation-search-progress";
import VacationSearchLoading from "./vacation-search-loading";
import VacationQuestionForm from "./vacation-question-form";

type VacationSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (answers: string[]) => void;
  initialQuery?: string;
  isLoading?: boolean;
  scrollToId?: string;
};

export default function VacationSearchModal({
  isOpen,
  onClose,
  onSearch,
  initialQuery,
  isLoading,
  scrollToId,
}: VacationSearchModalProps) {
  const {
    safeCurrentStep,
    totalSteps,
    currentQuestion,
    isFocusQuestion,
    answers,
    error,
    errors,
    isProcessing,
    register,
    handleBack,
    handleOpenChange,
    onSubmit,
    updateAnswer,
  } = useVacationSearch({
    isOpen,
    onClose,
    onSearch,
    initialQuery,
    isLoading,
    scrollToId,
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-nightocean">
            {isProcessing
              ? "Finding Your Perfect Vacation"
              : currentQuestion.question}
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-2">
            {isProcessing
              ? "Our AI is analyzing your preferences to curate the best recommendations for you"
              : "Please provide your answer to help us find your perfect vacation"}
          </DialogDescription>
        </DialogHeader>

        <VacationSearchProgress
          currentStep={safeCurrentStep}
          totalSteps={totalSteps}
          isProcessing={isProcessing}
        />

        {isProcessing ? (
          <VacationSearchLoading vacationFocus={answers[1]} />
        ) : (
          <VacationQuestionForm
            currentQuestion={currentQuestion}
            isFocusQuestion={isFocusQuestion}
            currentStep={safeCurrentStep}
            totalSteps={totalSteps}
            value={answers[safeCurrentStep] || ""}
            register={register}
            errors={errors}
            error={error}
            isProcessing={isProcessing}
            onValueChange={updateAnswer}
            onSubmit={onSubmit}
            handleBack={handleBack}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
