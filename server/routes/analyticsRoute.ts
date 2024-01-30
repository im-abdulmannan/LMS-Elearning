import express from "express";
import {
    getAnalyticsCourses,
    getAnalyticsOrders,
    getAnalyticsUsers,
} from "../controllers/analyticsController";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const analyticsRouter = express.Router();
analyticsRouter.get(
  "/analytics-users",
  isAuthenticated,
  authorizeRole("admin"),
  getAnalyticsUsers
);
analyticsRouter.get(
  "/analytics-courses",
  isAuthenticated,
  authorizeRole("admin"),
  getAnalyticsCourses
);
analyticsRouter.get(
  "/analytics-orders",
  isAuthenticated,
  authorizeRole("admin"),
  getAnalyticsOrders
);

export default analyticsRouter;
