import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import { catchAsyncErrors } from "./catchAsyncErrors";

// Authenticated users
export const isAuthenticated = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.access_token as string;
    if (!accessToken) {
      return next(
        new ErrorHandler("Please login to access this resource.", 400)
      );
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;
    if (!decoded) {
      return next(new ErrorHandler("Access token is not valid", 400));
    }

    const user = await redis.get(decoded.id);

    if (!user) {
      return next(new ErrorHandler("Please login to access this resource", 400));
    }

    req.user = JSON.parse(user);

    next();
  }
);

// Authorize user role
export const authorizeRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Roles: ${req.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
