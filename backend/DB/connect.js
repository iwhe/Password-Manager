import mongoose from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
const DB_NAME = "password_manager";

const connectDB = asyncHandler(async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB}|${DB_NAME}`
    );
    // console.log("Connection Instance", connectionInstance);

    console.log(`MonogoDB Connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
});

export default connectDB;
