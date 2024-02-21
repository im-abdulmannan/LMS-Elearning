import express from "express";
import {
  getAnalyticsCourses,
  getAnalyticsOrders,
  getAnalyticsUsers,
} from "../controllers/analyticsController";
import { updateAccessToken } from "../controllers/userController";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const analyticsRouter = express.Router();
analyticsRouter.get(
  "/analytics-users",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  getAnalyticsUsers
);
analyticsRouter.get(
  "/analytics-courses",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  getAnalyticsCourses
);
analyticsRouter.get(
  "/analytics-orders",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  getAnalyticsOrders
);

export default analyticsRouter;
