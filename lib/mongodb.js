import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://excerpttech:excerpttech2021@cluster0.5vdeszu.mongodb.net/LookUp";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    console.log("Mongo already connected");
    return;
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Mongo connected");
}
