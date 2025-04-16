import { z } from "zod";

export type AnswerSchema = z.ZodObject<{
  answer: z.ZodTypeAny;
}>;

export type VacationSearchQuestion = {
  id: number;
  question: string;
  placeholder: string;
  validation: AnswerSchema;
};

export type VacationSearchAnswers = {
  destination: string;
  accommodationType: string;
  amenities: string;
  budget: string;
  location: string;
  pastExperience: string;
  travelDate: string;
};

const destinationValidation = z.string().min(1, "Please provide a destination");

const amenitiesValidation = z.string().min(1, "Please list some amenities");

const budgetValidation = z
  .string()
  .regex(
    /^(\$)?\d+(-(\$)?\d+)?$/,
    "Please enter a valid budget amount or range (e.g. $500-$1000)",
  );

const locationValidation = z.string().min(1, "Please provide a location");

const pastExperienceValidation = z
  .string()
  .min(1, "Please share your experience");

const travelDateValidation = z.string().min(1, "Please provide a travel date");

const accommodationTypeValidation = z
  .string()
  .refine((val) => val === "destinations" || val === "rentals", {
    message: "Please select either Vacation Destinations or Vacation Rentals",
  });

export const VACATION_SEARCH_QUESTIONS: VacationSearchQuestion[] = [
  {
    id: 1,
    question: "What is your ideal vacation destination or rental?",
    placeholder: "e.g. Mexico City, Mexico",
    validation: z.object({
      answer: destinationValidation,
    }),
  },
  {
    id: 2,
    question: "What is your vacation focus?",
    placeholder: "Select Vacation Destinations or Vacation Rentals",
    validation: z.object({
      answer: accommodationTypeValidation,
    }),
  },
  {
    id: 3,
    question: "What amenities are most important to you?",
    placeholder: "e.g. Pool, Free Wifi, etc.",
    validation: z.object({
      answer: amenitiesValidation,
    }),
  },
  {
    id: 4,
    question: "What is your budget range?",
    placeholder: "Enter your budget range (e.g. $500-$1000)",
    validation: z.object({
      answer: budgetValidation,
    }),
  },
  {
    id: 5,
    question: "Are you looking for a specific location?",
    placeholder: "e.g. San Francisco, CA",
    validation: z.object({
      answer: locationValidation,
    }),
  },
  {
    id: 6,
    question: "What was your favorite vacation or rental experience?",
    placeholder: "e.g. I loved the food in Mexico",
    validation: z.object({
      answer: pastExperienceValidation,
    }),
  },
  {
    id: 7,
    question: "When are you planning to travel?",
    placeholder: "e.g. June 2024",
    validation: z.object({
      answer: travelDateValidation,
    }),
  },
];

export const VacationSearchSchema = z.object({
  destination: destinationValidation,
  accommodationType: accommodationTypeValidation,
  amenities: amenitiesValidation,
  budget: budgetValidation,
  location: locationValidation,
  pastExperience: pastExperienceValidation,
  travelDate: travelDateValidation,
});
