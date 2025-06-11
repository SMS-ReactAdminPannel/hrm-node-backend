import { NotificationSchema } from '../models/Notification/Auth/index.js';

export const socketCreateNotification = async (data, callback) => {
  try {
    const { message, userId } = data;

    const notification = new NotificationSchema({
      message,
      userId,
      read: false,
      createdAt: new Date(),
    });

    await notification.save();

    callback({
      message: {
        success: true,
        message: "Notification created successfully",
      },
      data: notification,
    });
  } catch (err) {
    callback({
      status: "failed",
      message: err?.message,
    });
  }
};

export const socketGetNotifications = async (_, callback) => {
  try {
    const notifications = await NotificationSchema.find().sort({ createdAt: -1 });

    callback({
      message: {
        success: true,
        message: "Notifications fetched successfully",
      },
      data: notifications,
    });
  } catch (err) {
    callback({
      status: "failed",
      message: err?.message,
    });
  }
};

export const socketGetNotificationById = async (data, callback) => {
  try {
    const { id } = data;

    const notification = await NotificationSchema.findById(id);

    if (!notification) {
      return callback({
        status: "failed",
        message: "Notification not found",
      });
    }

    callback({
      message: {
        success: true,
        message: "Notification fetched successfully",
      },
      data: notification,
    });
  } catch (err) {
    callback({
      status: "failed",
      message: err?.message,
    });
  }
};

export const socketUpdateNotificationById = async (data, callback) => {
  try {
    const { id, updates } = data;

    const updated = await NotificationSchema.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updated) {
      return callback({
        status: "failed",
        message: "Notification not found",
      });
    }

    callback({
      message: {
        success: true,
        message: "Notification updated successfully",
      },
      data: updated,
    });
  } catch (err) {
    callback({
      status: "failed",
      message: err?.message,
    });
  }
};
