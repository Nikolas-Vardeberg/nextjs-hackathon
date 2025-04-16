"use client";

import { VacationSearchQuestion } from "@/lib/schemas/vacation-search";
import Input from "@/common/components/ui/Input";
import VacationFocusSelection from "../vacation-focus-selection";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Button } from "@/common/components/ui/Button";
import { FormField } from "../types";

type VacationQuestionFormProps = {
  currentQuestion: VacationSearchQuestion;
  isFocusQuestion: boolean;
  currentStep: number;
  totalSteps: number;
  value: string;
  register: UseFormRegister<FormField>;
  errors: FieldErrors<FormField>;
  error: string;
  isProcessing: boolean;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
  handleBack: () => void;
};

export default function VacationQuestionForm({
  currentQuestion,
  isFocusQuestion,
  currentStep,
  totalSteps,
  value,
  register,
  errors,
  error,
  isProcessing,
  onValueChange,
  onSubmit,
  handleBack,
}: VacationQuestionFormProps) {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="space-y-2">
          {isFocusQuestion ? (
            <VacationFocusSelection
              value={value || ""}
              onChange={onValueChange}
            />
          ) : (
            <Input
              type="text"
              placeholder={currentQuestion.placeholder}
              className="w-full border-gray-200 focus:border-tealwave focus:ring-tealwave"
              {...register("answer")}
            />
          )}
          {(errors.answer || error) && (
            <p className="text-red-500 text-sm">
              {errors.answer?.message?.toString() || error}
            </p>
          )}
        </div>
      </form>

      <div className="flex justify-between sm:justify-between mt-4">
        {currentStep > 0 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="min-w-24"
            type="button"
            disabled={isProcessing}
          >
            Back
          </Button>
        )}

        <Button
          variant="tealwave"
          onClick={onSubmit}
          className="min-w-24 ml-auto"
          type="submit"
          disabled={isProcessing}
          loading={isProcessing}
        >
          {currentStep === totalSteps - 1 ? "Find My Perfect Vacation" : "Next"}
        </Button>
      </div>
    </>
  );
}
