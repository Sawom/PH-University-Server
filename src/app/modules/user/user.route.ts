import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import { createStudentValidationSchema } from "../student/student.zod.validation";
import validateRequest from "../../middlewares/validRequest";

const router = express.Router();

// validateRequest = 1ta middleware. zodi error na thake to controller e send korbe
//  naile global error handeler e send korbe

router.post(
  "/create-student",
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent
);

export const UserRoutes = router;