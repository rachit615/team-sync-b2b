import NotificationModel from "../models/notification.model";
import { getIO } from "../sockets/socket";
import { NotFoundException } from "../utils/appError";

interface CreateNotificationInput {
  userId: string;
  title: string;
  message?: string | null;
  type: string;
  link?: string | null;
}

export const createNotificationService = async (
  payload: CreateNotificationInput
) => {
  const notification = new NotificationModel({
    user: payload.userId,
    title: payload.title,
    message: payload.message || null,
    type: payload.type,
    link: payload.link || null,
  });

  await notification.save();

  // Emit real-time event to the target user room
  try {
    const io = getIO();
    io.to(payload.userId).emit("notification:new", {
      _id: notification._id,
      user: notification.user,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      link: notification.link,
      read: notification.read,
      createdAt: notification.createdAt,
    });
  } catch (err) {
    // If sockets not initialized, ignore (server might be running without sockets in tests)
    // You can optionally log this.
  }

  return notification;
};

export const getNotificationsService = async (
  userId: string,
  pagination: { pageNumber: number; pageSize: number }
) => {
  const skip = (pagination.pageNumber - 1) * pagination.pageSize;
  const [notifications, totalCount] = await Promise.all([
    NotificationModel.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pagination.pageSize)
      .lean(),
    NotificationModel.countDocuments({ user: userId }),
  ]);

  const totalPages = Math.ceil(totalCount / pagination.pageSize);

  return {
    notifications,
    pagination: { ...pagination, totalCount, totalPages },
  };
};

export const markNotificationReadService = async (
  userId: string,
  notificationId: string
) => {
  const notification = await NotificationModel.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { $set: { read: true } },
    { new: true }
  );

  if (!notification) {
    throw new NotFoundException("Notification not found");
  }

  // Optionally emit update to client so they can update local UI
  try {
    const io = getIO();
    io.to(userId).emit("notification:updated", {
      _id: notification._id,
      read: true,
    });
  } catch (err) {}

  return notification;
};
