import mongoose from "mongoose";

export default async function connectDB() {
  const { DATABASE_URL } = process.env;
  if (!DATABASE_URL)
    throw new Error("DATABASE_URL environment variable is not defined");

  try {
    const conn = await mongoose.connect(DATABASE_URL);
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}
