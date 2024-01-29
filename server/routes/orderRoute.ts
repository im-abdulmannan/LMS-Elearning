import express from "express";
import { createOrder } from "../controllers/orderController";
import { isAuthenticated } from "../middleware/auth";

const orderRouter = express.Router();
orderRouter.post("/create-order", isAuthenticated, createOrder)

export default orderRouter;