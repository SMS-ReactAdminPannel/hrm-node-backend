import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    room: { type: String, required: true },
    sender: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
