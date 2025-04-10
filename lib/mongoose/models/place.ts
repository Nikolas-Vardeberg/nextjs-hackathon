import mongoose, { Schema, model } from "mongoose";
import type { PlaceDocument } from "./types";
const PlaceSchema = new Schema<PlaceDocument>(
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
    googlePlaceID: {
      type: String,
      required: [true, "A google place ID is required"],
    },
    googlePlaceDataCache: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Place =
  mongoose.models?.Place || model<PlaceDocument>("Place", PlaceSchema);
export default Place;
