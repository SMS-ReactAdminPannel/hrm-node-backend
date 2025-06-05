import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const url = `mongodb://localhost:27017/HRM`;

const conenctionOptions = {};

mongoose
  .connect(url, conenctionOptions)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });

export default mongoose.connection;