import mongoose from "mongoose";
import { v4 as uuid } from "uuid";

const CandidatesSchema = new mongoose.Schema(
  {
    details: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phonenumber: {
        type: String,
      },
      position: {
        type: String,
      },
      experience: {
        type: String,
      },
      location: {
        type: String,
      },
      education: {
        type: String,
      },
      rating: {
        type: Number,
      },
      avatar: {
        type: String,
      },
      status: {
        type: String,
        enum: ["interview schedules","under review","shortlisted"]
      },
      applieddate: {
        type: Date,
      },
      skills: {
        type: [String],
      },
    },
    uuid: {
      type: String,
      required: false,
      unique: true,
      default: uuid,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const CandidatesModel = mongoose.model("Candidate", CandidatesSchema);
