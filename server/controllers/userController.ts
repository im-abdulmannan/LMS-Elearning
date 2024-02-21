require("dotenv").config();
import cloudinary from "cloudinary";
import ejs from "ejs";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import path from "path";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import userModel, { IUser } from "../models/userModel";
import {
  getAllUsersService,
  getUserById,
  updateUserRoleService,
} from "../services/userService";
import ErrorHandler from "../utils/ErrorHandler";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
import sendMail from "../utils/sendMail";

// Register user
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registrationUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("User already exists", 400));
      }

      const user: IRegistrationBody = { name, email, password };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activationMail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activationMail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: "Activation link sent to your email",
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;

      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Activation code is Invalid", 400));
      }

      const { name, email, password } = newUser.user;

      const user = await userModel.create({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Login User
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(new ErrorHandler("Please provide email and password", 400));
      }

      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid password", 400));
      }

      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Logout User
export const logoutUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      const userId = req.user?._id || "";
      redis.del(userId);

      res.status(200).json({
        success: true,
        message: "Successfully logged out",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update access token
export const updateAccessToken = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = (await req.cookies.refresh_token) as string;
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;
      if (!decoded) {
        return next(new ErrorHandler("Invalid refresh token", 400));
      }

      const session = await redis.get(decoded.id as string);
      if (!session) {
        return next(
          new ErrorHandler("Please login to access this resources", 400)
        );
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: "5m",
        }
      );
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "7d",
        }
      );

      req.user = user;

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      await redis.set(user._id, JSON.stringify(user), "EX", 604800);

      next();
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get user information
export const getUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getUserById(req.user?._id, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Social auth
interface ISocialAuthBody {
  name: string;
  email: string;
  avatar: string;
}

export const socialAuth = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as ISocialAuthBody;
      const user = await userModel.findOne({ email });
      if (!user) {
        const newUser = await userModel.create({ email, name, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update user information
interface IUpdateUserInfo {
  name?: string;
}

export const updateUserInfo = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body as IUpdateUserInfo;
      const userId = req.user?._id;
      const user = await userModel.findById(userId);
      if (name && user) {
        user.name = name;
      }

      await user?.save();
      await redis.set(userId, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user: user,
      });
    } catch (error: any) {}
  }
);

// Update user password
interface IPasswordUpdate {
  oldPassword: string;
  newPassword: string;
}

export const updatePassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IPasswordUpdate;
      if (!oldPassword || !newPassword) {
        return next(
          new ErrorHandler("Please provide old password and new password", 400)
        );
      }

      const userId = req.user?._id;
      const user = await userModel.findById(userId).select("+password");
      if (user?.password === undefined) {
        return next(new ErrorHandler("Invalid User", 400));
      }

      const isPasswordMatch = await user?.comparePassword(oldPassword);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid old password", 400));
      }

      user.password = newPassword;
      await user.save();
      await redis.set(userId, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user: user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update avatar
interface IUpdateAvatar {
  avatar: string;
}

export const updateAvatar = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUpdateAvatar;
      const userId = req.user?._id;
      const user = await userModel.findById(userId);

      if (!user) {
        return next(new ErrorHandler("Invalid User", 400));
      }

      if (avatar && user) {
        if (user?.avatar?.public_id) {
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });

          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });

          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await user?.save();
      await redis.set(userId, JSON.stringify(user));

      res.status(201).json({
        success: true,
        message: "Avatar saved successfully",
        user: user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// get all users -- admin
export const getAllUsersByAdmin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// update user role -- admin
export const updateUserRole = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, role } = req.body;
      const user = await userModel.findOne({email});
      if (user) {
        const id = user._id
        updateUserRoleService(id, role, res, next);
      } else {
        return next(new ErrorHandler("User not found", 400));
      }

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// delete user -- admin
export const deleteUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      await user.deleteOne({ id });
      await redis.del(id);

      res.status(201).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
