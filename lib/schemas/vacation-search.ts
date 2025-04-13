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
    /^\$\d+(-\$\d+)?$/,
    "Please enter a valid budget amount or range (e.g. $500-$1000)"
const locationValidation = z.string().min(1, "Please provide a location");

const pastExperienceValidation = z
  .string()
  .min(1, "Please share your experience");

const travelDateValidation = z.string().min(1, "Please provide a travel date");

export const VACATION_SEARCH_QUESTIONS: VacationSearchQuestion[] = [
  {
    id: 1,
    question: "What is your ideal vacation destination or rental?",
    placeholder: "Type your answer here...",
    validation: z.object({
      answer: destinationValidation,
    }),
  },
  {
    id: 2,
    question: "What amenities are most important to you?",
    placeholder: "Type your answer here...",
    validation: z.object({
      answer: amenitiesValidation,
    }),
  },
  {
    id: 3,
    question: "What is your budget range?",
    placeholder: "Enter your budget range (e.g. $500-$1000)",
    validation: z.object({
      answer: budgetValidation,
    }),
  },
  {
    id: 4,
    question: "Are you looking for a specific location?",
    placeholder: "Type your answer here...",
    validation: z.object({
      answer: locationValidation,
    }),
  },
  {
    id: 5,
    question: "What was your favorite vacation or rental experience?",
    placeholder: "Type your answer here...",
    validation: z.object({
      answer: pastExperienceValidation,
    }),
  },
  {
    id: 6,
    question: "When are you planning to travel?",
    placeholder: "When are you planning to travel? (e.g. June 2024)",
    validation: z.object({
      answer: travelDateValidation,
    }),
  },
];

export const VacationSearchSchema = z.object({
  destination: destinationValidation,
  amenities: amenitiesValidation,
  budget: budgetValidation,
  location: locationValidation,
  pastExperience: pastExperienceValidation,
  travelDate: travelDateValidation,
});
