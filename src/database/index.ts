import mongoose from "mongoose";

export const connectToDB = async (DB_URI: string): Promise<void> => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.error("DB connection failed.");
    console.error(error);
  }
};