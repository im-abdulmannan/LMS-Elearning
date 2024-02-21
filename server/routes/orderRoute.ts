import express from "express";
import {
  createOrder,
  getAllOrdersByAdmin,
} from "../controllers/orderController";
import { updateAccessToken } from "../controllers/userController";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const orderRouter = express.Router();
orderRouter.post(
  "/create-order",
  updateAccessToken,
  isAuthenticated,
  createOrder
);
orderRouter.get(
  "/get-all-orders",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  getAllOrdersByAdmin
);

export default orderRouter;
