import express from "express";
import {
  addAnswerToQuestion,
  addQuestionInCourse,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/courseController";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const courseRouter = express.Router();
courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRole("admin"),
  uploadCourse
);
courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRole("admin"),
  editCourse
);
courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-courses", getAllCourses);
courseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser);
courseRouter.put("/add-question", isAuthenticated, addQuestionInCourse);
courseRouter.put("/add-answer", isAuthenticated, addAnswerToQuestion);

export default courseRouter;
