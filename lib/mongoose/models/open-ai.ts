import mongoose, { Schema, model } from "mongoose";
import type { OpenAIDocument } from "./types";
const OpenAISchema = new Schema<OpenAIDocument>(
  {
    customValue_1: {
      type: String,
      default: "",
    },
    customValue_2: {
      type: String,
      default: "",
    },
    customValue_3: {
      type: String,
      default: "",
    },
    userDocID: {
      type: Schema.Types.ObjectId, // Store only the ObjectId
      required: true,
      ref: "User", // Reference the User model
    },
    openAIID: {
      type: String,
      required: [true, "An open ai ID is required"],
    },
    openAIDataCache: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const OpenAI =
  mongoose.models?.OpenAI || model<OpenAIDocument>("OpenAI", OpenAISchema);
export default OpenAI;
