"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/common/components/ui/Dialog";
import { Button } from "@/common/components/ui/Button";
import Input from "@/common/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VACATION_SEARCH_QUESTIONS } from "@/lib/schemas/vacation-search";

type VacationSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (answers: string[]) => void;
  initialQuery?: string;
};

export default function VacationSearchModal({
  isOpen,
  onClose,
  onSearch,
  initialQuery = "",
}: VacationSearchModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [error, setError] = useState("");

  const currentQuestion = VACATION_SEARCH_QUESTIONS[currentStep];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(currentQuestion.validation),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (initialQuery && initialQuery.trim() && isOpen) {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[0] = initialQuery;
        return newAnswers;
      });

      setCurrentStep(1);
      reset();
    }
  }, [initialQuery, isOpen, reset]);

  useEffect(() => {
    if (answers[currentStep]) {
      setValue("answer", answers[currentStep]);
    } else {
      reset();
    }
    setError("");
  }, [currentStep, answers, setValue, reset]);

  const onSubmit = handleSubmit((data) => {
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentStep] = data.answer;
      return newAnswers;
    });

    if (currentStep < VACATION_SEARCH_QUESTIONS.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      const finalAnswers = [...answers.slice(0, currentStep), data.answer, ...answers.slice(currentStep + 1)];
      onSearch(finalAnswers);
      onClose();
    }
  });

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const progressPercentage =
    ((currentStep + 1) / VACATION_SEARCH_QUESTIONS.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl text-nightocean">
            {currentQuestion.question}
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-2">
            Please provide your answer to help us find your perfect vacation
          </DialogDescription>
        </DialogHeader>

        <div className="w-full bg-gray-200 h-1.5 rounded-full mb-6">
          <div
            className="bg-tealwave h-1.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <form onSubmit={onSubmit} className="py-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder={currentQuestion.placeholder}
              className="w-full border-gray-200 focus:border-tealwave focus:ring-tealwave"
              {...register("answer")}
            />
            {(errors.answer || error) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.answer?.message?.toString() || error}
              </p>
            )}
          </div>
        </form>

        <DialogFooter className="flex justify-between sm:justify-between mt-6">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="min-w-24"
              type="button"
            >
              Back
            </Button>
          )}

          <Button
            variant="tealwave"
            onClick={onSubmit}
            className="min-w-24 ml-auto"
            type="button"
          >
            {currentStep === VACATION_SEARCH_QUESTIONS.length - 1
              ? "Find My Perfect Vacation"
              : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
