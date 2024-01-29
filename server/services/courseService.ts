import { NextFunction, Response } from "express";
import courseModel from "../models/courseModel";
import ErrorHandler from "../utils/ErrorHandler";

export const createCourse = async (
  data: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await courseModel.create(data);

    res.status(200).json({
      success: true,
      course: course,
    });
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
};

// get all courses
export const getAllCoursesService = async (res: Response) => {
  const courses = await courseModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    courses,
  });
};