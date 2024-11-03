import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { createStudentValidationZodSchema } from "../student/student.zod.validation";
import validateRequest from "../../middlewares/validRequest";
import { AcademicSemesterControllers } from "../academicSemester/academicSemester.controller";

const router = express.Router();

// validateRequest = 1ta middleware. zodi error na thake to controller e send korbe
//  naile global error handeler e send korbe

router.post(
  "/create-student",
  validateRequest(createStudentValidationZodSchema),
  UserControllers.createStudent
);

export const UserRoutes = router;