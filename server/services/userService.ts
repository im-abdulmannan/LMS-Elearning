import { NextFunction, Response } from "express";
import userModel from "../models/userModel";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";

// get user by id
export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);

  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(200).json({
      success: true,
      user,
    });
  }
};

// get all users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    users,
  });
};

// update user role
export const updateUserRoleService = async (
  id: string,
  role: string,
  res: Response,
  next: NextFunction
) => {
  try {
    
    const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
    
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, error.code))
  }
};
