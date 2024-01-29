import express from "express";
import {
    createOrder,
    getAllOrdersByAdmin,
} from "../controllers/orderController";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const orderRouter = express.Router();
orderRouter.post("/create-order", isAuthenticated, createOrder);
orderRouter.get(
  "/get-all-orders",
  isAuthenticated,
  authorizeRole("admin"),
  getAllOrdersByAdmin
);

export default orderRouter;
