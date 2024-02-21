import express from "express";
import {
  addAnswerToQuestion,
  addQuestionInCourse,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourses,
  getAllCoursesByAdmin,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/courseController";
import { updateAccessToken } from "../controllers/userController";
import { authorizeRole, isAuthenticated } from "../middleware/auth";

const courseRouter = express.Router();
courseRouter.post(
  "/create-course",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  uploadCourse
);
courseRouter.put(
  "/edit-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  editCourse
);
courseRouter.get("/get-course/:id", getSingleCourse);
courseRouter.get("/get-courses", getAllCourses);
courseRouter.get(
  "/get-course-content/:id",
  updateAccessToken,
  isAuthenticated,
  getCourseByUser
);
courseRouter.put(
  "/add-question",
  updateAccessToken,
  isAuthenticated,
  addQuestionInCourse
);
courseRouter.put(
  "/add-answer",
  updateAccessToken,
  isAuthenticated,
  addAnswerToQuestion
);
courseRouter.put(
  "/add-review/:id",
  updateAccessToken,
  isAuthenticated,
  addReview
);
courseRouter.put(
  "/reply-review",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  addReplyToReview
);
courseRouter.get(
  "/get-all-courses",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  getAllCoursesByAdmin
);
courseRouter.post("/getVdoCipherOtp", generateVideoUrl);
courseRouter.delete(
  "/delete-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRole("admin"),
  deleteCourse
);

export default courseRouter;
