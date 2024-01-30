import express from "express";
import {
    createLayout,
    getLayoutByType,
    updateLayout,
} from "../controllers/layoutController";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const layoutRouter = express.Router();
layoutRouter.post(
  "/create-layout",
  isAuthenticated,
  authorizeRole("admin"),
  createLayout
);
layoutRouter.put(
  "/update-layout",
  isAuthenticated,
  authorizeRole("admin"),
  updateLayout
);
layoutRouter.get("/get-layout", getLayoutByType);

export default layoutRouter;
