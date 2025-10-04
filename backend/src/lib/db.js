import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MOGODB connected: ", conn.connection.host);
  } catch (error) {
    console.error("error connection to MONGODB: ", error);
    process.exit(1); // 1 status code menas fail 0 means success
  }
};
