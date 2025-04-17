import mongoose from "mongoose";
import { config } from "./app.config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MONGODB CONNECTED");
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR", error);
    process.exit(1);
  }
};

export default connectDB;
