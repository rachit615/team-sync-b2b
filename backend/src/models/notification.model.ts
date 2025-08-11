import mongoose, { Document, Schema } from "mongoose";

export interface NotificationDocument extends Document {
  user: mongoose.Types.ObjectId; // recipient
  title: string;
  message?: string | null;
  type: string;
  link?: string | null;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<NotificationDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    message: { type: String, default: null },
    type: { type: String, required: true },
    link: { type: String, default: null },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model<NotificationDocument>(
  "Notification",
  notificationSchema
);

export default NotificationModel;
