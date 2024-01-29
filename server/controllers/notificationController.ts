import { NextFunction, Request, Response } from "express";
import cron from "node-cron";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import notificationModel from "../models/notificationModel";
import ErrorHandler from "../utils/ErrorHandler";

// Get all notification -- admin
export const getAllNotifications = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update notifications status
export const updateNotificationStatus = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await notificationModel.findByIdAndUpdate(
        req.params.id,
        {
          status: "read",
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        notification,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// delete notification
cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await notificationModel.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
  console.log("Deleted read notification");
});
