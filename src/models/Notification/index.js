import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['leave', 'attendance', 'payroll', 'announcement', 'task'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['unread', 'read', 'archived'], 
    default: 'unread' 
  },
  date: {
      type: Date,
      Default: Date.now
  },
  isImportant: { type: Boolean, default: false },
  actionRequired: { type: Boolean, default: false },
  metadata: { type: Object }
}, { timestamps: true });

export const Notification =  mongoose.model('Notification', notificationSchema);