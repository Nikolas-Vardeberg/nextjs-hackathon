import { ObjectId } from "mongoose";

export interface PlaceDocument {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  userDocID: ObjectId;
  googlePlaceID: string;
  googlePlaceDataCache?: string;
  favorite: boolean;
  /* The custom values are here so you dont need to change the model - use these for whatever you want */
  customValue_1?: string;
  customValue_2?: string;
  customValue_3?: string;
}

export interface OpenAIDocument {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  userDocID: ObjectId;
  openAIID: string; // an ID is generated per conversation with open ai
  openAIDataCache?: string; // save the data from open ai here so if it goes down we can still use it
  /* The custom values are here so you dont need to change the model - use these for whatever you want */
  customValue_1?: string; //full response formatted
  customValue_2?: string; //answers
  customValue_3?: string; //unused
}

export interface UserDocument {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  authToken: string;
  clerkUserID: string; // the clerk user id
  authExpiry?: Date;
  fullName?: string;
  /* The custom values are here so you dont need to change the model - use these for whatever you want */
  customValue_1?: string;
  customValue_2?: string;
  customValue_3?: string;
}
