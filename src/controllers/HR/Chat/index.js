import { ChatMessage } from "../../../models/HR/Chat/index.js";

export const getChatHistory = async (req, res) => {
  const { senderId, recipientId, limit = 50, page = 1 } = req.query;

  try {
    const messages = await ChatMessage.find({
      $or: [
        { senderId, recipientId },
        { senderId: recipientId, recipientId: senderId },
      ],
    })
      .sort({ timestamp: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.status(200).json({ success: true, messages: messages.reverse() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
