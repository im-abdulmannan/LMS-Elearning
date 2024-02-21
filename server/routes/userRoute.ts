import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsersByAdmin,
  getUser,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updateAvatar,
  updatePassword,
  updateUserInfo,
  updateUserRole,
} from "../controllers/userController";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();
userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", updateAccessToken, isAuthenticated, logoutUser);
userRouter.get("/refresh-token", updateAccessToken);
userRouter.get("/me", updateAccessToken, isAuthenticated, getUser);
userRouter.post("/social-auth", socialAuth);
userRouter.put(
  "/update-user",
  updateAccessToken,
  isAuthenticated,
  updateUserInfo
);
userRouter.put(
  "/update-password",
  updateAccessToken,
  isAuthenticated,
  updatePassword
);
userRouter.put(
  "/update-avatar",
  updateAccessToken,
  isAuthenticated,
  updateAvatar
);
userRouter.get(
  "/get-all-users",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  getAllUsersByAdmin
);
userRouter.put(
  "/update-user-role",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  updateUserRole
);
userRouter.delete(
  "/delete-user/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  deleteUser
);

export default userRouter;
