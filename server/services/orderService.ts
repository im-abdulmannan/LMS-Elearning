import { NextFunction, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import orderModel from "../models/orderModel";

// Create new order
export const newOrder = catchAsyncErrors(
  async (data: any, res:Response, next: NextFunction) => {
    const order = await orderModel.create(data);

    res.status(201).json({
        success: true,
        message: "Order created successfully",
        order,
      });
  }
);
