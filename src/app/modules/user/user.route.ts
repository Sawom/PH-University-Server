import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validRequest";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createStudentValidationSchema } from "../student/student.zod.validation";
import { USER_ROLE } from "./user.constant";
import { UserControllers } from "./user.controller";

const router = express.Router();

// validateRequest = 1ta middleware. zodi error na thake to controller e send korbe
//  naile global error handeler e send korbe

// create student
router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent
);

// create faculty
router.post(
  "/create-faculty",
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty
);

// create admin
router.post(
  "/create-admin",
  // auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin
);

// /me route e faculty, admin, student ; 3types er user der info pawa zabe. 
// zar zar info se se pabe. keu karo ta access pabe na
router.get(
  '/me',
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  UserControllers.getMe,
);

export const UserRoutes = router;