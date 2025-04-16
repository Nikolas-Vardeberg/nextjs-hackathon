"use client";

import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VACATION_SEARCH_QUESTIONS } from "@/lib/schemas/vacation-search";
import { FormField } from "@/common/components/vacation-search-modal/types";

type UseVacationSearchProps = {
  initialQuery?: string;
  onSearch: (answers: string[]) => void;
  onClose: () => void;
  scrollToId?: string;
  isLoading?: boolean;
  isOpen: boolean;
};

export function useVacationSearch({
  initialQuery = "",
  onSearch,
  onClose,
  scrollToId,
  isLoading = false,
  isOpen,
}: UseVacationSearchProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const safeCurrentStep = Math.min(
    currentStep,
    VACATION_SEARCH_QUESTIONS.length - 1,
  );
  const currentQuestion = VACATION_SEARCH_QUESTIONS[safeCurrentStep];
  const isFocusQuestion = safeCurrentStep === 1;
  const totalSteps = VACATION_SEARCH_QUESTIONS.length;
  const isProcessing = isSubmitting || isLoading;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormField>({
    resolver: zodResolver(currentQuestion.validation),
    mode: "onSubmit",
  });

  const handleBack = () => {
    if (safeCurrentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const updateAnswer = (value: string) => {
    setValue("answer", value);
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[safeCurrentStep] = value;
      return newAnswers;
    });
  };

  const resetState = useCallback(() => {
    setCurrentStep(0);
    setAnswers([]);
    setError("");
    setIsSubmitting(false);
    reset();
  }, [reset]);

  const handleOpenChange = (open: boolean) => {
    // Prevent closing the dialog when processing
    if (!open && isProcessing) {
      return;
    }

    if (!open) {
      resetState();
      onClose();
    }
  };

  const onSubmit = handleSubmit((data) => {
    if (safeCurrentStep < VACATION_SEARCH_QUESTIONS.length - 1) {
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[safeCurrentStep] = data.answer || "";
        return newAnswers;
      });
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      const updatedAnswers = [...answers];
      updatedAnswers[safeCurrentStep] = data.answer || "";

      localStorage.setItem("vacation-focus", updatedAnswers[1]);

      const finalAnswers = [
        updatedAnswers[0],
        updatedAnswers[2],
        updatedAnswers[3],
        updatedAnswers[4],
        updatedAnswers[5],
        updatedAnswers[6],
      ];

      setIsSubmitting(true);
      onSearch(finalAnswers);
    }
  });

  // Handle modal open/close
  useEffect(() => {
    if (isOpen) {
      // When opening the modal
      if (initialQuery && initialQuery.trim()) {
        // If we have an initial query, set it and move to step 1
        setAnswers((prevAnswers) => {
          const newAnswers = [...prevAnswers];
          newAnswers[0] = initialQuery;
          return newAnswers;
        });
        setCurrentStep(1);
      } else {
        // Only reset if opening with no initial query
        resetState();
      }
    }
  }, [isOpen, initialQuery, resetState]);

  // Set form value when step changes
  useEffect(() => {
    if (answers[safeCurrentStep]) {
      setValue("answer", answers[safeCurrentStep]);
    } else {
      reset();
    }
    setError("");
  }, [safeCurrentStep, answers, setValue, reset]);

  // Reset submitting state when processing ends
  useEffect(() => {
    if (isOpen && !isProcessing) {
      setIsSubmitting(false);
    }
  }, [isOpen, isProcessing]);

  // Handle form completion and scrolling
  useEffect(() => {
    if (isSubmitting && !isLoading) {
      resetState();
      onClose();

      if (scrollToId) {
        setTimeout(() => {
          const resultsElement = document.getElementById(scrollToId);
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  }, [isLoading, isSubmitting, onClose, scrollToId, resetState]);

  return {
    currentStep,
    safeCurrentStep,
    totalSteps,
    currentQuestion,
    isFocusQuestion,
    answers,
    error,
    errors,
    isProcessing,
    register,
    setValue,
    handleBack,
    handleOpenChange,
    onSubmit,
    updateAnswer,
  };
}
