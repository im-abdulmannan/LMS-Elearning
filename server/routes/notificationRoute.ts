import express from "express";
import {
    getAllNotifications,
    updateNotificationStatus,
} from "../controllers/notificationController";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const notificationRouter = express.Router();
notificationRouter.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRole("admin"),
  getAllNotifications
);
notificationRouter.put(
  "/update-notification-status/:id",
  isAuthenticated,
  authorizeRole("admin"),
  updateNotificationStatus
);

export default notificationRouter;
