import mongoose from "mongoose";
const { MONGODB_URI } = process.env;
let connectionCache: mongoose.Connection;

export const connectDB = async () => {
  if (connectionCache) return connectionCache;
  try {
    const { connection } = await mongoose.connect(MONGODB_URI as string, {
      connectTimeoutMS: 60000, // Set connection timeout to 60 seconds
      socketTimeoutMS: 60000, // Set socket timeout to 60 seconds
    });
    connection.on("error", console.error.bind(console, "connection error:"));
    connection.once("open", () => {
      console.log("Database connected");
    });
    connectionCache = connection;
    if (connection.readyState === 1) {
      return Promise.resolve(connection);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
