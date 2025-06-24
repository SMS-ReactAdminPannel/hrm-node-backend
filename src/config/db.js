import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const url = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@smsdb.bwmu5qv.mongodb.net/hrms?retryWrites=true&w=majority&appName=smsdb/hrms`;

const conenctionOptions = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

mongoose
  .connect(url, conenctionOptions)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });

export default mongoose.connection;