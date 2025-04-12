import mongoose, { Schema, model } from "mongoose";
import type { UserDocument } from "./types";
const UserSchema = new Schema<UserDocument>(
  {
    authToken: {
      type: String,
      required: [true, "An auth token is required"],
      unique: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^sess_[a-zA-Z0-9]{27}$/.test(v);
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid auth token!`,
      },
    },
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
    authExpiry: {
      type: Date,
    },
    clerkUserID: {
      type: String,
      required: [true, "A clerk user id is required"],
      unique: true,
    },
    fullName: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;
