import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectdb = async () => {
  try {
    const { MONGO_URI } = ENV;
    if (!MONGO_URI) throw new Error("MONGO_URI is not set");

    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log("MOGODB connected: ", conn.connection.host);
  } catch (error) {
    console.error("error connection to MONGODB: ", error);
    process.exit(1); // 1 status code menas fail 0 means success
  }
};
