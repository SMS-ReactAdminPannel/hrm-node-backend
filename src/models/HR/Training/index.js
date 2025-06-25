import mongoose from "mongoose";

const CreatedProgram = new mongoose.Schema({
  id: { type: String },
  title: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: String, required: true },
  instructor: { type: String, required: true },
  startDate: { type: Date, required: true },
  enrolled: { type: Number, default: 0 },
  completed: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  status: { type: String, enum: ["active", "completed"], default: "active" },
  //for getting employee to which training they are going into
  employId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'employeeUser' }],
});

export const CreatedProgramTraining = mongoose.model("CreatedProgramTraining",CreatedProgram
);


