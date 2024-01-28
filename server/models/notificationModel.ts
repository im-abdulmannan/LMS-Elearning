import mongoose from "mongoose";

interface INotification extends mongoose.Document {
  title: string;
  message: string;
  status: string;
  userId: string;
}

const notificationSchema = new mongoose.Schema<INotification>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, required: true, default: "unread" },
  },
  { timestamps: true }
);

const notificationModel: mongoose.Model<INotification> = mongoose.model(
  "Notification",
  notificationSchema
);
export default notificationModel;
