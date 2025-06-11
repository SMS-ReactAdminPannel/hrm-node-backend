import mongoose from 'mongoose';

const NotificationAuthSchema = new mongoose.Schema({
     message: { type: String, required: true },
  userId: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});


export const NotificationSchema = mongoose.model('NotificationModel', NotificationAuthSchema);