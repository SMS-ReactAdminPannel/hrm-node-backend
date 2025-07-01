import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  recipientId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);
