// db.js or dbConnect.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@smsdb.bwmu5qv.mongodb.net/hrms?retryWrites=true&w=majority&appName=smsdb/hrms`;

const ConnectDB = async () => {
  try {
    const connectionOptions = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    };

    await mongoose.connect(url, connectionOptions);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit with failure
  }
};

export default ConnectDB;
