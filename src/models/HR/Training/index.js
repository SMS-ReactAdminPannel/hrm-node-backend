import mongoose from "mongoose";

const CreatedProgram = new mongoose.Schema({
  id: { type: String },
//   uuid: { type: String, required: false, unique: true, default: uuid },
  title: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: String, required: true },
  instructor: { type: String, required: true },
  startDate: { type: Date, required: true },
  enrolled: { type: Number, default: 0 },
  completed: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "completed"], default: "active" },
});

export const CreatedProgramTraining = mongoose.model(
  "CreatedProgramTraining",
  CreatedProgram
);
