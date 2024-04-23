import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const { MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI as string)
  .then(() => console.log("Database connected"))
  .catch((e: Error) => console.log(e.message));
